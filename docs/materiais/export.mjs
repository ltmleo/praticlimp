import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../..');
const out = path.join(root, 'output/pdf');
fs.mkdirSync(out, { recursive: true });
const pieces = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const browser = await chromium.launch({ headless: true });
const validation = [];
try {
  for (const p of pieces) {
    const page = await browser.newPage({ viewport: { width: 1500, height: 1100 } });
    await page.goto(pathToFileURL(path.join(dir, p.id + '.html')).href);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => i.decode()));
    });
    const errors = await page.evaluate(() => [...document.querySelectorAll('.inside')].flatMap(el => {
      const safe = el.getBoundingClientRect();
      const kids = [...el.children].filter(c => getComputedStyle(c).position !== 'absolute');
      const issues = [];
      for (const child of kids) {
        const r = child.getBoundingClientRect();
        if (r.top < safe.top - 1 || r.left < safe.left - 1 || r.bottom > safe.bottom + 1 || r.right > safe.right + 1) issues.push('Fora da área segura: ' + child.className);
        if (getComputedStyle(child).overflow !== 'hidden' && child.scrollWidth > child.clientWidth + 2) issues.push('Overflow horizontal: ' + child.className);
      }
      const vertical = getComputedStyle(el).flexDirection === 'column';
      for (let i = 1; i < kids.length; i++) {
        const a = kids[i-1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
        if ((vertical ? b.top < a.bottom - 1 : b.left < a.right - 1)) issues.push('Sobreposição: ' + kids[i].className);
      }
      return issues;
    }));
    if (errors.length) throw Error(`${p.id}: ${errors.join('; ')}`);
    await page.pdf({ path: path.join(out, p.id + '.pdf'), preferCSSPageSize: true, printBackground: true });
    validation.push(p.id + ': fontes e imagens carregadas; layout dentro da área segura.');
    await page.close();
  }
} finally { await browser.close(); }
execFileSync(process.env.MATERIAL_PYTHON || 'python', [path.join(dir, 'verify.py')], { stdio: 'inherit' });
fs.writeFileSync(path.join(dir, 'validacao.txt'), validation.join('\n') + '\nPDFs rasterizados com Poppler; dimensões, texto, fontes e QR verificados.\nProva física e conversão conforme perfil da gráfica pendentes.\n');
console.log(validation.join('\n'));
