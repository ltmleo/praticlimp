import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const sourcePath='public/PRATIC LIMP 2026.svg';
const svg=await readFile(sourcePath,'utf8');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage();
 await page.setContent(svg);
 const box=await page.locator('svg').evaluate(svg=>{const b=svg.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height}});
 const padding=8;
 const viewBox=[box.x-padding,box.y-padding,box.width+padding*2,box.height+padding*2].map(n=>n.toFixed(2)).join(' ');
 const optimized=svg.replace(/<\?xml[^>]*\?>\s*/,'').replace(/<!DOCTYPE[^>]*>\s*/,'').replace(/viewBox="[^"]*"/,`viewBox="${viewBox}"`);
 await writeFile('public/brand/pratic-limp.svg',optimized);
 const symbol=await page.locator('svg').evaluate(svg=>{
  // The 2026 artwork keeps the three colored pieces of the drop in one group.
  // Locate that group from its visible geometry so the script does not depend
  // on Illustrator's generated class names.
  const groups=Array.from(svg.querySelectorAll('g'));
  const group=groups.find(candidate=>{
   const visibleShapes=Array.from(candidate.children).filter(element=>{
    const style=getComputedStyle(element);
    return typeof element.getBBox==='function'&&style.display!=='none'&&style.visibility!=='hidden'&&element.getBBox().width>0&&element.getBBox().height>0;
   });
   if(visibleShapes.length!==3)return false;
   const b=candidate.getBBox();
   return b.x>300&&b.x+b.width<700&&b.y<250&&b.y+b.height<600&&b.height>250;
  });
  if(!group)throw new Error('Não foi possível localizar o grupo vetorial da gota.');
  const box=group.getBBox();
  const x=box.x,y=box.y,right=x+box.width,bottom=y+box.height;
  const width=right-x,height=bottom-y,side=Math.max(width,height)+24;
  const defs=svg.querySelector('defs')?.outerHTML??'';
  return {viewBox:`${x-(side-width)/2} ${y-(side-height)/2} ${side} ${side}`,defs,paths:group.outerHTML,count:group.children.length};
 });
 const drop=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${symbol.viewBox}"><title>Gota Pratic Limp</title>${symbol.defs}${symbol.paths}</svg>`;
 await writeFile('public/brand/pratic-limp-gota.svg',drop);
 await writeFile('public/favicon.svg',drop);
 console.log({source:sourcePath,viewBox,output:'public/brand/pratic-limp.svg',symbol:'public/brand/pratic-limp-gota.svg',pieces:symbol.count,embeddedRaster:optimized.includes('<image')});
} finally {await browser.close()}
