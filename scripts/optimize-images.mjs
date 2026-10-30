// Gera versões WebP redimensionadas das imagens da home (relatório PageSpeed de 24/10/2026).
// Os originais em public/brand ficam preservados. Uso: node scripts/optimize-images.mjs
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

const jobs = [
  ['terceirizacao.png', 'terceirizacao.webp', 472],
  ['terceirizacao.png', 'terceirizacao-320.webp', 320],
  // bandini.webp foi gerado de bandini.jpg (220 px), que não está mais no repositório.
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  for (const [source, target, width] of jobs) {
    const type = source.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const data = 'data:' + type + ';base64,' + (await readFile('public/brand/' + source)).toString('base64');
    const webp = await page.evaluate(async ({ data, width }) => {
      const img = new Image();
      img.src = data;
      await img.decode();
      const w = Math.min(width, img.naturalWidth), h = Math.round(img.naturalHeight * w / img.naturalWidth);
      const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h });
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.82).split(',')[1];
    }, { data, width });
    await writeFile('public/brand/' + target, Buffer.from(webp, 'base64'));
    console.log(target);
  }
} finally { await browser.close(); }
