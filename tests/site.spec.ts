import { test, expect } from '@playwright/test';

test('home, filters, FAQ and qualified WhatsApp message',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toContainText('sua rotina');
 await expect(page.locator('.service')).toHaveCount(5);
 await page.getByRole('button',{name:/Limpeza especializada/}).click();
 await expect(page.locator('.service')).toHaveCount(3);
 await page.getByRole('link',{name:'Solicitar orçamento: Limpeza pós-obra'}).click();
 await expect(page.locator('#service')).toHaveValue('Limpeza pós-obra');
 await page.getByLabel('Seu nome',{exact:true}).fill('Cliente de teste');
 await page.getByLabel('Telefone com DDD').fill('(19) 99999-1234');
 await page.getByLabel('Cidade',{exact:true}).fill('Campinas');
 await page.getByRole('button',{name:'Preparar meu orçamento'}).click();
 const href=await page.locator('#send-quote').getAttribute('href');
 expect(href).toContain('https://wa.me/5519974163336?text=');
 expect(decodeURIComponent(href!)).toContain('Serviço: Limpeza pós-obra');
 expect(decodeURIComponent(href!)).toContain('Cidade: Campinas');
 await page.getByLabel('Cidade',{exact:true}).fill('Valinhos');
 await expect(page.locator('#send-quote')).not.toBeVisible();
 await page.locator('summary').first().click();
 await expect(page.locator('details').first()).toHaveAttribute('open','');
 expect(errors).toEqual([]);
});

test('mobile layout, navigation, validation and reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('button',{name:'Abrir menu'}).click();
 await expect(page.locator('#menu')).toBeVisible();
 await page.locator('#menu').getByText('Soluções',{exact:true}).click();
 await expect(page.getByRole('button',{name:'Abrir menu'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:'Preparar meu orçamento'}).click();
 await expect(page.locator('#send-quote')).toHaveCount(0);
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{})})));
 await page.screenshot({path:'test-results/mobile.png',fullPage:true,animations:'disabled'});
});

test('desktop imagery and static privacy page',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('/');
 await page.locator('.hero-business-image').evaluate((img:HTMLImageElement)=>img.decode());
 await expect(page.locator('header .brand img')).toHaveAttribute('src','/brand/pratic-limp.svg');
 await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{})})));
 await page.screenshot({path:'test-results/desktop.png',fullPage:true,animations:'disabled'});
 await page.goto('/privacidade/');
 await expect(page.getByRole('heading',{level:1})).toHaveText('Sua privacidade');
});

test('HTML contains main content without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto('http://localhost:4173/');
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.locator('.service').first()).toBeVisible();
 await expect(page.locator('.service').first()).toHaveCSS('opacity','1');
 await expect(page.getByRole('button',{name:'Preparar meu orçamento'})).toBeDisabled();
 await expect(page.getByRole('link',{name:'nosso WhatsApp'})).toBeVisible();
 await context.close();
});
