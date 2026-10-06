// Recria apenas as prévias dos cartões antigos; não altera os originais.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
await mkdir('docs/galeria/previews', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const id of ['01-essencial','02-azul-institucional','03-gota-grafica','04-editorial']) {
    const page = await browser.newPage({ deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(path.resolve(`docs/cartao-de-visitas/${id}.html`)).href);
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
    await page.addStyleTag({ content: '.sheet::after{display:none!important}' });
    for (const [index, side] of ['front','back'].entries()) await page.locator('.sheet').nth(index).screenshot({ path: `docs/galeria/previews/${id}-${side}.png` });
    await page.close();
  }
} finally { await browser.close(); }
