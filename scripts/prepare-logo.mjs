import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const svg=await readFile('public/Logo vetorizado.svg','utf8');
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
  // getBBox() is local to each element: text groups have transforms.
  // Convert every bound back to the root SVG space before isolating the drop.
  const rootInverse=svg.getCTM().inverse();
  const bounds=element=>{
   const b=element.getBBox(),matrix=rootInverse.multiply(element.getCTM());
   const points=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(matrix));
   const x=Math.min(...points.map(p=>p.x)),y=Math.min(...points.map(p=>p.y));
   return {x,y,width:Math.max(...points.map(p=>p.x))-x,height:Math.max(...points.map(p=>p.y))-y};
  };
  const pieces=Array.from(svg.children).filter(element=>{
   if(typeof element.getBBox!=='function')return false;
   const b=bounds(element);return b.width>0&&b.x>350&&b.y>210&&b.x+b.width<650&&b.y+b.height<580;
  });
  const boxes=pieces.map(bounds);
  const x=Math.min(...boxes.map(b=>b.x)),y=Math.min(...boxes.map(b=>b.y));
  const right=Math.max(...boxes.map(b=>b.x+b.width)),bottom=Math.max(...boxes.map(b=>b.y+b.height));
  const width=right-x,height=bottom-y,side=Math.max(width,height)+24;
  return {viewBox:`${x-(side-width)/2} ${y-(side-height)/2} ${side} ${side}`,paths:pieces.map(element=>element.outerHTML).join('\n'),count:pieces.length};
 });
 const drop=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${symbol.viewBox}"><title>Gota Pratic Limp</title>${symbol.paths}</svg>`;
 await writeFile('public/brand/pratic-limp-gota.svg',drop);
 await writeFile('public/favicon.svg',drop);
 console.log({viewBox,output:'public/brand/pratic-limp.svg',symbol:'public/brand/pratic-limp-gota.svg',pieces:symbol.count,embeddedRaster:optimized.includes('<image')});
} finally {await browser.close()}
