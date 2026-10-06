import assert from 'node:assert/strict';
import { readFile, access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { catalog, route } from '../docs/galeria/catalog.mjs';

const base = process.argv[2] || 'http://127.0.0.1:4175/praticlimp/';
const galleryUrl = new URL(`${route}/`, base).href;
const galleryRoot = path.resolve('dist', route);
const index = await readFile(path.join(galleryRoot, 'index.html'), 'utf8');
const home = await readFile('dist/index.html', 'utf8');
assert(!home.includes(route) && !home.includes('gallery.js') && !home.includes('gallery.css'));
assert(index.includes('noindex, nofollow, noarchive, nosnippet, noimageindex'));
assert.equal(new Set(catalog.map(c => c.code)).size, catalog.length);
for (const art of catalog) {
  assert(index.includes(`id="${art.code}"`));
  for (const f of art.faces) assert(index.includes(`id="${art.code}-${f.suffix}"`));
}
// Walk all local href/src values, including the copied standalone artworks.
const htmlFiles = ['index.html', ...catalog.filter(c => c.source.endsWith('.html')).map(c => `artes/${c.code}/arte.html`)];
for (const file of htmlFiles) {
  const html = await readFile(path.join(galleryRoot, file), 'utf8');
  assert(html.includes('noindex'), file);
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const [, link] of markup.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:|tel:|#|blob:)/.test(link)) continue;
    const resolved = path.resolve(galleryRoot, path.dirname(file), decodeURIComponent(link.split('#')[0]));
    assert(resolved.startsWith(galleryRoot + path.sep), `${file}: saída do acervo: ${link}`);
    await access(resolved);
  }
}
const browser = await chromium.launch({ headless: true });
await mkdir('tmp/galeria', { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const response = await page.goto(galleryUrl);
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.art:visible').count(), 22);
  await page.selectOption('#status', 'Atual');
  assert.equal(await page.locator('.art:visible').count(), 4);
  await page.selectOption('#type', 'Cartões');
  assert.equal(await page.locator('.art:visible').count(), 2);
  await page.click('#clear');
  await page.fill('#search', 'confianca');
  assert.equal(await page.locator('.art:visible').count(), 3);
  await page.fill('#search', 'PL-P01-V');
  assert.equal(await page.locator('.art:visible').count(), 1);
  await page.fill('#search', 'nao-existe-arte');
  assert(await page.locator('#empty').isVisible());
  await page.click('#clear');
  await page.locator('#PL-P01-F .image-button').click();
  assert(await page.locator('#viewer').isVisible());
  assert((await page.locator('#viewer-title').textContent()).includes('PL-P01-F'));
  await page.keyboard.press('Escape');
  assert(!(await page.locator('#viewer').isVisible()));
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedText = text; } } }));
  await page.locator('[data-copy="PL-P01-V"]').click();
  assert((await page.evaluate(() => window.copiedText)).includes(`${route}/#PL-P01-V`));
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Sem permissão'); } } }));
  await page.locator('[data-copy="PL-C01-F"]').click();
  assert(await page.locator('#copy-fallback').isVisible());
  assert((await page.inputValue('#copy-text')).includes('PL-C01-F'));
  await page.click('#close-copy');
  await page.selectOption('#status', 'Atual');
  await page.evaluate(() => { location.hash = 'AR-C01-V'; });
  await page.waitForFunction(() => !document.querySelector('#AR-C01').hidden);
  assert(await page.locator('#AR-C01-V').isVisible());
  await page.goto(galleryUrl);
  await page.screenshot({ path: 'tmp/galeria/desktop.png' });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow: ${width}`);
  }
  await page.screenshot({ path: 'tmp/galeria/mobile.png' });
  // Verify served binary downloads and images at the project subpath.
  for (const art of catalog) {
    for (const f of art.faces) {
      const r = await context.request.get(new URL(`artes/${art.code}/${f.suffix}${path.extname(f.source)}`, galleryUrl).href);
      assert.equal(r.status(), 200);
      assert(r.headers()['content-type'].startsWith('image/'));
    }
    if (art.pdf) {
      const r = await context.request.get(new URL(`artes/${art.code}/arte.pdf`, galleryUrl).href);
      assert.equal(r.status(), 200);
      assert((await r.body()).subarray(0,5).toString() === '%PDF-');
    }
  }
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const plainPage = await plain.newPage();
  await plainPage.goto(galleryUrl + '#PL-P02');
  assert.equal(await plainPage.locator('.art:visible').count(), 22);
  assert.equal(await plainPage.locator('a.primary').count(), 12);
  assert.deepEqual(errors, []);
  await plain.close();
  await context.close();
  console.log('Galeria OK: 22 artes; 34 faces; 12 PDFs; links e assets locais; filtros; ampliação; cópia e fallback; âncoras; mobile 320/390; sem JS; home isolada.');
} finally { await browser.close(); }
