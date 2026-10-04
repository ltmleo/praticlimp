import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({ headless:true });
try {
 for(const id of ['01-essencial','02-azul-institucional','03-gota-grafica','04-editorial']){
  const page=await browser.newPage();
  await page.goto(pathToFileURL(path.join(dir,id+'.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  await page.pdf({path:path.join(dir,id+'.pdf'),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false,scale:1});
  execFileSync(process.env.CARD_PYTHON || 'python',[path.join(dir,'tools/normalize-pdf.py'),path.join(dir,id+'.pdf')]);
  console.log(id+'.pdf');
  await page.close();
 }
}finally{await browser.close();}
