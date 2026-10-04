import { test, expect } from '@playwright/test';

const base = process.env.VITE_BASE_PATH || '/';
test.beforeEach(async ({ page }) => {
 await page.route('https://www.googletagmanager.com/**', route => route.abort());
});

test('home, filters, FAQ and qualified WhatsApp message',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);
 await expect(page.getByRole('heading',{level:1})).toContainText('em boas mãos');
 await expect(page.locator('.service')).toHaveCount(5);
 await page.getByRole('button',{name:/Limpeza especializada/}).click();
 await expect(page.locator('.service')).toHaveCount(3);
 await page.getByRole('link',{name:'Solicitar orçamento: Limpeza pós-obra'}).click();
 await expect(page.locator('#service')).toHaveValue('Limpeza pós-obra');
 await page.getByLabel('Seu nome',{exact:true}).fill('Cliente de teste');
 await page.getByLabel('Telefone com DDD').fill('(19) 99999-1234');
 await page.getByLabel('Cidade',{exact:true}).fill('Campinas');
 await page.getByRole('button',{name:'Preparar mensagem'}).click();
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
 await page.goto(base);
 await expect(page.locator('.floating-contact span')).toBeHidden();
 await expect(page.locator('.floating-contact')).toHaveCSS('width','52px');
 await page.getByRole('button',{name:'Abrir menu'}).click();
 await expect(page.locator('#menu')).toBeVisible();
 await page.locator('#menu').getByText('Serviços',{exact:true}).click();
 await expect(page.getByRole('button',{name:'Abrir menu'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:'Preparar mensagem'}).click();
 await expect(page.locator('#send-quote')).toHaveCount(0);
 for(const width of [320,390,768,1024,1280,1440,1920]){
  await page.setViewportSize({width,height:900});
  const fits = await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth);
  const overflow = fits ? [] : await page.evaluate(() => Array.from(document.querySelectorAll('body *'))
   .filter(el => el.getBoundingClientRect().right > innerWidth + 1)
   .slice(0, 12).map(el => ({tag:el.tagName, class:el.className, parent:el.parentElement?.className, text:el.textContent?.slice(0,70), right:el.getBoundingClientRect().right})));
  expect(fits, `Horizontal overflow at ${width}px: ${JSON.stringify(overflow)}`).toBe(true);
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(base);
 await page.locator('img').evaluateAll((images:HTMLImageElement[])=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{})})));
 await page.evaluate(() => document.fonts.ready);
 await expect(page).toHaveScreenshot('mobile.png',{fullPage:true,animations:'disabled'});
 await expect(page.locator('.cost-section')).toHaveScreenshot('cost-comparison-mobile.png',{animations:'disabled',stylePath:'tests/screenshot.css'});
});

test('desktop imagery and static privacy page',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(base);
 await page.locator('.hero-business-image').evaluate((img:HTMLImageElement)=>img.decode());
 // Pin this preference: Windows runners may default to reduced transparency.
 const media = await page.context().newCDPSession(page);
 await media.send('Emulation.setEmulatedMedia', { features: [
  {name:'prefers-reduced-motion',value:'reduce'},
  {name:'prefers-reduced-transparency',value:'no-preference'},
 ] });
 await expect(page.locator('.hero-stage')).not.toHaveCSS('backdrop-filter', 'none');
 await expect(page.locator('header .brand img')).toHaveAttribute('src',base+'brand/pratic-limp.svg');
 await page.locator('img').evaluateAll((images:HTMLImageElement[])=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{})})));
 await page.evaluate(() => document.fonts.ready);
 await page.screenshot({path:'test-results/desktop-hero-review.png',animations:'disabled'});
 await expect(page).toHaveScreenshot('desktop.png',{fullPage:true,animations:'disabled'});
 await expect(page.locator('.cost-section')).toHaveScreenshot('cost-comparison-desktop.png',{animations:'disabled',stylePath:'tests/screenshot.css'});
 await media.send('Emulation.setEmulatedMedia', { features: [
  {name:'prefers-reduced-motion',value:'reduce'},
  {name:'prefers-reduced-transparency',value:'reduce'},
 ] });
 await page.goto(base);
 await page.locator('img').evaluateAll((images:HTMLImageElement[])=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{})})));
 await page.evaluate(() => document.fonts.ready);
 await expect(page.locator('.hero-stage')).toHaveCSS('backdrop-filter','none');
 await expect(page.locator('header .nav')).toHaveCSS('backdrop-filter','none');
 await expect(page.locator('.hero-stage')).not.toHaveCSS('background-image','none');
 await expect(page).toHaveScreenshot('desktop-opaque.png',{animations:'disabled'});
 await page.goto(base+'privacidade/');
 await expect(page.getByRole('heading',{level:1})).toHaveText('Sua privacidade');
});

test('HTML contains main content without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto('http://localhost:4173'+base);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.locator('.service').first()).toBeVisible();
 await expect(page.locator('.service').first()).toHaveCSS('opacity','1');
 await expect(page.getByRole('button',{name:'Preparar mensagem'})).toBeDisabled();
 await expect(page.getByRole('link',{name:'nosso WhatsApp'})).toBeVisible();
 await context.close();
});

test('GA4 tag is installed with the configured measurement id',async({page})=>{
 await page.route('https://www.googletagmanager.com/**',route=>route.abort());
 await page.goto(base);
 await expect(page.locator('script[src*="G-HTV2EWQWDX"]')).toHaveCount(1);
 expect(await page.evaluate(()=>(window as typeof window & {dataLayer?:unknown[]}).dataLayer?.some((entry:any)=>entry?.[0]==='config'&&entry?.[1]==='G-HTV2EWQWDX'))).toBe(true);
});

test('native validation, mobile brand, telephone links and Escape',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(base);
 await expect.poll(() => page.locator('header .brand img').evaluate((img:HTMLImageElement)=>img.currentSrc)).toContain(base+'brand/pratic-limp-horizontal.svg');
 for (const link of await page.locator('a[href^="tel:"]').all()) await expect(link).toHaveAttribute('href','tel:+5519974163336');
 const toggle=page.getByRole('button',{name:'Abrir menu'});
 await toggle.click();
 await page.locator('#menu a').first().focus();
 await page.keyboard.press('Escape');
 await expect(toggle).toBeFocused();
 await expect(toggle).toHaveAttribute('aria-expanded','false');
 await page.locator('#name').fill('   ');
 await page.locator('#city').fill('   ');
 await page.locator('#phone').fill('123');
 await page.locator('#service').selectOption('Terceirização de limpeza');
 await page.getByRole('button',{name:/Preparar mensagem/}).click();
 await expect(page.locator('#send-quote')).toHaveCount(0);
 for (const id of ['name','city','phone']) expect(await page.locator('#'+id).evaluate((input:HTMLInputElement)=>input.checkValidity())).toBe(false);
 for(const phone of ['1999991234','5519999991234','55199999912345']) {
  await page.locator('#phone').fill(phone);
  expect(await page.locator('#phone').evaluate((input:HTMLInputElement)=>input.checkValidity())).toBe(phone.length<=13);
 }
 await expect(page.locator('summary').first()).toContainText('Por que escolher a Pratic Limp');
});

test('bars animate when visible and respect reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(base);
 await page.evaluate(()=>{
  const samples:number[]=[];
  (window as any).barSamples=samples;
  const record=()=>{
   const bar=document.querySelector('.cost-pratic-bar')!;
   samples.push(new DOMMatrixReadOnly(getComputedStyle(bar).transform).a);
   if(samples.length<240)requestAnimationFrame(record);
  };
  requestAnimationFrame(record);
 });
 await page.locator('.cost-chart').scrollIntoViewIfNeeded();
 await expect.poll(()=>page.evaluate(()=>(window as any).barSamples.some((v:number)=>v>0&&v<0.99))).toBe(true);
 await expect.poll(()=>page.locator('.cost-pratic-bar').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBe(1);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(base);
 await page.locator('.cost-chart').scrollIntoViewIfNeeded();
 expect(await page.locator('.cost-pratic-bar').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBe(1);
});
