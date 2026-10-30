// Converte os logos de clientes em WebP leves para o carrossel da home.
// Coloque o original (SVG, PNG, JPG ou WebP) em docs/clientes/logos/<nome>.<ext> e rode:
//   node scripts/optimize-client-logos.mjs
// Saída: public/brand/clientes/<nome>.webp, no máximo 300 × 156 px (o dobro do espaço no cartão, para telas de alta densidade).
// Depois, informe `logo: 'clientes/<nome>.webp'` no cliente em src/data/content.ts.
import { chromium } from '@playwright/test';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const source = 'docs/clientes/logos', target = 'public/brand/clientes';
const types = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const files = (await readdir(source)).filter(file => types[path.extname(file).toLowerCase()]);
if (!files.length) { console.log(`Nenhum logo em ${source}.`); process.exit(0); }
await mkdir(target, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const file of files) {
    const data = `data:${types[path.extname(file).toLowerCase()]};base64,` + (await readFile(path.join(source, file))).toString('base64');
    const webp = await page.evaluate(async data => {
      const img = new Image();
      img.src = data;
      await img.decode();
      // SVGs sem dimensões intrínsecas são desenhados no tamanho máximo.
      const nw = img.naturalWidth || 300, nh = img.naturalHeight || 156;
      const scale = Math.min(300 / nw, 156 / nh, img.naturalWidth ? 1 : Infinity);
      const canvas = Object.assign(document.createElement('canvas'), { width: Math.round(nw * scale), height: Math.round(nh * scale) });
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', 0.85).split(',')[1];
    }, data);
    const out = path.join(target, path.basename(file, path.extname(file)) + '.webp');
    const buffer = Buffer.from(webp, 'base64');
    await writeFile(out, buffer);
    console.log(`${out} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }
} finally { await browser.close(); }
