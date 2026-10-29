// Gera public/og-image.png (1200 × 630) para Open Graph e Twitter Card, seguindo docs/design-system.md.
// Uso: node scripts/build-og-image.mjs
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';

// Fontes e imagem embutidas: setContent não carrega arquivos locais.
const file = async (p) => `data:${p.endsWith('.ttf') ? 'font/ttf' : 'image/png'};base64,${(await readFile(p)).toString('base64')}`;
const fonts = 'docs/cartao-de-visitas/assets/';
const logo = await readFile('public/brand/pratic-limp.svg', 'utf8');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Manrope;font-weight:600;src:url(${await file(fonts + 'manrope-600.ttf')})}
@font-face{font-family:'DM Sans';font-weight:400;src:url(${await file(fonts + 'dm-sans-400.ttf')})}
@font-face{font-family:'DM Sans';font-weight:600;src:url(${await file(fonts + 'dm-sans-600.ttf')})}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:'DM Sans';color:#102f43;background:radial-gradient(ellipse 620px 520px at 88% 10%,#c7e9ff8c,transparent),radial-gradient(ellipse 480px 420px at 70% 100%,#e2f4d066,transparent),#fcfdfe;display:grid;grid-template-columns:600px 1fr;gap:32px;padding:64px}
.copy{display:flex;flex-direction:column}
.logo svg{width:220px;height:auto;display:block}
.eyebrow{margin-top:56px;display:flex;align-items:center;gap:12px;font-size:16px;letter-spacing:2.4px;font-weight:600}
.eyebrow i{width:32px;height:3px;background:#a2d21a}
h1{font-family:Manrope;font-weight:600;font-size:60px;line-height:1.08;letter-spacing:-2.4px;margin-top:24px}
h1 span{color:#0073b9}
.contact{margin-top:auto;display:flex;align-items:center;gap:16px;font-size:22px;font-weight:600}
.contact b{background:#0073b9;color:#fff;border-radius:999px;padding:14px 26px;font-weight:600;font-size:20px}
.panel{align-self:stretch;border-radius:38px 38px 115px 38px;background:linear-gradient(135deg,#ffffffcc,#eef7fc 70%);border:1px solid #fff;box-shadow:inset 0 1px 0 #fff,0 8px 24px #173b5814;display:grid;place-items:center;position:relative;overflow:hidden}
.panel img{width:100%;mix-blend-mode:multiply}
.since{position:absolute;left:28px;bottom:28px;font-size:14px;letter-spacing:2px;font-weight:600;color:#0073b9}
</style></head><body>
<div class="copy"><div class="logo">${logo}</div><p class="eyebrow"><i></i>DESDE 1991</p><h1>A limpeza da<br>sua empresa<br><span>em boas mãos.</span></h1><p class="contact"><b>Solicite seu orçamento</b>(19) 97416-3336</p></div>
<div class="panel"><img src="${await file('public/brand/terceirizacao.png')}" alt=""><span class="since">TERCEIRIZAÇÃO DE LIMPEZA</span></div>
</body></html>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og-image.png' });
} finally { await browser.close(); }
