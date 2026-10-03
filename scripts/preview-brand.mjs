import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:900,height:450},deviceScaleFactor:1});
 const drop=await readFile('public/brand/pratic-limp-gota.svg','utf8');
 const logo=await readFile('public/brand/pratic-limp.svg','utf8');
 await page.setContent(`<html><body style="margin:0;background:#eaf4fa;display:flex;align-items:center;justify-content:space-evenly;height:450px"><div style="width:330px">${logo}</div><div style="width:180px">${drop}</div><div style="width:32px">${drop}</div><div style="width:16px">${drop}</div></body></html>`);
 await page.screenshot({path:'test-results/brand-preview.png'});
} finally {await browser.close()}
