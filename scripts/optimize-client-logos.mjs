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
      const full = Object.assign(document.createElement('canvas'), { width: nw, height: nh });
      const fctx = full.getContext('2d', { willReadFrequently: true });
      fctx.drawImage(img, 0, 0, nw, nh);
      const pixels = fctx.getImageData(0, 0, nw, nh), d = pixels.data;
      // Fundo chapado claro (JPGs sem transparência): a cor dos cantos vira transparente, com borda suave.
      const corners = [0, nw - 1, (nh - 1) * nw, nh * nw - 1].map(i => d.slice(i * 4, i * 4 + 4));
      const [br, bg, bb] = corners[0];
      const flat = corners.every(c => c[3] === 255 && Math.abs(c[0] - br) + Math.abs(c[1] - bg) + Math.abs(c[2] - bb) < 24);
      if (flat && 0.299 * br + 0.587 * bg + 0.114 * bb > 230) {
        for (let i = 0; i < d.length; i += 4) {
          const dist = Math.max(Math.abs(d[i] - br), Math.abs(d[i + 1] - bg), Math.abs(d[i + 2] - bb));
          d[i + 3] = Math.min(d[i + 3], Math.max(0, Math.min(255, (dist - 12) * 8)));
        }
        fctx.putImageData(pixels, 0, 0);
      }
      // Recorta as margens transparentes para que todos os logos ocupem o cartão por igual.
      let x0 = nw, y0 = nh, x1 = -1, y1 = -1;
      for (let y = 0; y < nh; y++) for (let x = 0; x < nw; x++) if (d[(y * nw + x) * 4 + 3] > 16) {
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
      if (x1 < 0) { x0 = y0 = 0; x1 = nw - 1; y1 = nh - 1; }
      const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
      const scale = Math.min(300 / cw, 156 / ch, img.naturalWidth ? 1 : Infinity);
      const canvas = Object.assign(document.createElement('canvas'), { width: Math.round(cw * scale), height: Math.round(ch * scale) });
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(full, x0, y0, cw, ch, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', 0.7).split(',')[1];
    }, data);
    const out = path.join(target, path.basename(file, path.extname(file)) + '.webp');
    const buffer = Buffer.from(webp, 'base64');
    await writeFile(out, buffer);
    console.log(`${out} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }
} finally { await browser.close(); }
