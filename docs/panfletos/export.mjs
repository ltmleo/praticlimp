import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {chromium} from '@playwright/test';
const dir=path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.join(dir,'previews'),{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
 for(const id of ['01-direta','02-confianca','03-flexibilidade','04-empresario']){
  for(const format of ['print','feed','story']){
   const page=await browser.newPage({viewport:{width:1200,height:2000},deviceScaleFactor:1});
   await page.goto(pathToFileURL(path.join(dir,`${id}-${format}.html`)).href);
   await page.evaluate(()=>document.fonts.ready);
   const problems=await page.evaluate(()=>[...document.querySelectorAll('.inside')].flatMap(el=>{
    const b=el.getBoundingClientRect();const children=[...el.children];
    const errors=children.filter(c=>{const r=c.getBoundingClientRect();return r.bottom>b.bottom+1||r.right>b.right+1}).map(c=>'Outside safe content: '+c.className);
    for(let i=1;i<children.length;i++){const prev=children[i-1].getBoundingClientRect(),next=children[i].getBoundingClientRect();if(next.top<prev.bottom-1)errors.push('Overlap: '+children[i].className)}
    return errors;
   }));
   if(problems.length)throw Error(`${id}-${format}: ${problems.join(', ')}`);
   if(format==='print'){
    await page.pdf({path:path.join(dir,id+'.pdf'),preferCSSPageSize:true,printBackground:true});
   }else await page.locator('.sheet').screenshot({path:path.join(dir,`${id}-${format}.png`)});
   results.push(`${id}-${format}: layout OK`);
   await page.close();
  }
 }
}finally{await browser.close();}
execFileSync(process.env.PANFLETO_PYTHON||'python',[path.join(dir,'verify.py')],{stdio:'inherit'});
fs.writeFileSync(path.join(dir,'validacao.txt'),results.join('\n')+'\nPDFs: 2 páginas; caixas A5 e sangria verificadas. QR codes decodificados nas renderizações.\nProva física pendente antes da tiragem.\n');
console.log(results.join('\n'));
