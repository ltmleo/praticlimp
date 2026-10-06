import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const data = (p, mime) => `data:${mime};base64,${fs.readFileSync(path.join(root, p)).toString('base64')}`;
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const company = read('src/data/company.ts');
const field = key => {
  const value = company.match(new RegExp(`\\b${key}:\\s*'([^']*)'`))?.[1];
  if (!value) throw Error(`Contato ausente: ${key}`);
  return value;
};
const phone = field('phone');
const email = field('email');
const contact = `https://wa.me/${field('whatsapp')}`;
const logo = data('public/brand/pratic-limp-horizontal.svg', 'image/svg+xml');
const drop = data('public/brand/pratic-limp-gota.svg', 'image/svg+xml');
const qrContext = {};
vm.runInNewContext(read('docs/cartao-de-visitas/assets/qrcode.js'), qrContext);
const qr = qrContext.qrcode(0, 'M');
qr.addData(contact);
qr.make();
const qrSvg = qr.createSvgTag({ cellSize: 1, margin: 4, scalable: true });
const fonts = [['Manrope', 600, 'manrope-600.ttf'], ['DM Sans', 400, 'dm-sans-400.ttf'], ['DM Sans', 600, 'dm-sans-600.ttf']]
  .map(([family, weight, file]) => `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};src:url('${data('docs/cartao-de-visitas/assets/' + file, 'font/ttf')}') format('truetype');font-display:block}`).join('\n');

const brand = () => `<img class="brand" src="${logo}" alt="Pratic Limp">`;
const eyebrow = text => `<p class="eyebrow"><i></i>${text}</p>`;
const action = text => `<a class="pill" href="${contact}">${text}<span>↗</span></a>`;
const qrBlock = () => `<a class="qr" href="${contact}" aria-label="Conversar pelo WhatsApp">${qrSvg}</a>`;
const footer = () => `<footer><span>PRATIC LIMP · DESDE 1991</span><span>LIMPEZA E CONSERVAÇÃO</span></footer>`;

const css = `${fonts}
:root{--ink:#102f43;--blue:#0073b9;--lime:#a2d21a;--muted:#65717a;--line:#dbe3e7;font-family:'DM Sans',sans-serif;color:var(--ink);font-synthesis:none}
*{box-sizing:border-box}body{margin:0;background:#e8eef2}h1,h2,h3,p{margin:0}h1,h2,h3{font-family:Manrope,sans-serif;font-weight:600}a{color:inherit;text-decoration:none}img{display:block}p{line-height:1.5}
.toolbar{max-width:1050px;margin:auto;padding:28px 24px;font-size:14px;display:flex;gap:20px;align-items:center;flex-wrap:wrap}.toolbar a{color:var(--blue)}.toolbar small{color:var(--muted)}
.pages{display:flex;justify-content:center;align-items:flex-start;gap:28px;padding:12px 24px 48px;flex-wrap:wrap}
.sheet{position:relative;overflow:hidden;flex:none;background:#fcfdfe;box-shadow:0 12px 35px #102f4320;print-color-adjust:exact;-webkit-print-color-adjust:exact}
.sheet::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 100% 12%,#d3edfc 0,transparent 54%),radial-gradient(ellipse at 4% 80%,#e7f0d6 0,transparent 48%)}
.inside{position:absolute;display:flex;flex-direction:column}.inside>*{position:relative;flex-shrink:0}.brand{object-fit:contain;object-position:left center}
.eyebrow{display:flex;align-items:center;gap:2.5mm;text-transform:uppercase;font-size:8pt;font-weight:600;letter-spacing:.8pt;line-height:1.4}.eyebrow i{width:7mm;height:.6mm;background:var(--lime);flex:none}
h1 span,h2 span{color:var(--blue)}.muted{color:var(--muted)}
.glass{background:linear-gradient(135deg,#ffffffb8,#ffffff66 60%,#eef8fc66);border:.3mm solid #fff;border-radius:7mm;box-shadow:inset 0 .3mm .4mm #fff,0 3mm 8mm #24445d10}
.pill{display:flex;align-items:center;justify-content:space-between;gap:5mm;width:fit-content;background:linear-gradient(160deg,#0073b9,#0066a5);color:#fff;border:.25mm solid #ffffffb3;border-radius:999px;padding:3mm 5mm;font-size:10pt;font-weight:600;box-shadow:inset 0 .3mm .3mm #ffffff55,0 1mm 3mm #102f4310}.pill span{font-size:14pt;border-left:.2mm solid #ffffff55;padding-left:4mm}
.qr{display:block;background:#fff;width:25mm;height:25mm;flex:none}.qr svg{display:block;width:100%;height:100%}.qr-caption{font-size:8pt;text-align:center;margin-top:1.5mm}
footer{display:flex;justify-content:space-between;font-size:8pt;letter-spacing:.3pt;color:#4d6978;margin-top:auto;padding-top:4mm;border-top:.2mm solid var(--line)}
.flyer{width:154mm;height:216mm}.flyer .inside{inset:12mm 13mm}.flyer .brand{width:47mm;height:14mm;margin-bottom:9mm}.flyer h1{font-size:31pt;line-height:1.09;letter-spacing:-1.1pt;margin-top:4mm}.flyer .intro{font-size:11pt;max-width:114mm;margin-top:5mm}
.signature{height:62mm;margin-top:8mm;border-radius:8mm 8mm 22mm 8mm;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;padding:7mm 9mm;background:radial-gradient(ellipse at 80% 20%,#cceaff88,transparent 70%),linear-gradient(125deg,#ffffffb8,#ffffff55)}
.signature::before,.signature::after{content:'';position:absolute;border:.25mm solid #a9cad580;width:83mm;height:110mm;border-radius:50%;transform:rotate(40deg);right:-7mm;top:-25mm;pointer-events:none}.signature::after{width:60mm;height:82mm;right:5mm;top:-12mm}
.signature .heritage{z-index:1}.signature .heritage small{display:block;font-size:8pt;letter-spacing:.8pt;line-height:1.6}.signature .heritage strong{font-size:39pt;line-height:1.3;font-weight:400;letter-spacing:-2pt;color:var(--blue)}.signature .heritage p{font-size:10pt;line-height:1.4}.signature .drop{width:43mm;height:43mm;object-fit:contain;z-index:1}
.front-action{margin-top:7mm;display:flex;justify-content:space-between;align-items:center;gap:5mm}.front-action strong{font-size:15pt;font-weight:600;white-space:nowrap}.front-action small{font-size:8pt;display:block;margin-top:1mm;color:#4d6978}.flyer.front footer{margin-top:auto}
.flyer.back .brand{width:40mm;height:12mm;margin-bottom:5mm}.flyer h2{font-size:24pt;line-height:1.12;letter-spacing:-.7pt;margin-top:3mm}.services{margin-top:4mm}.service{display:grid;grid-template-columns:9mm 1fr;gap:3mm;border-top:.2mm solid var(--line);padding:2.4mm 0}.service .number{font-size:8pt;color:var(--blue);padding-top:1mm}.service h3{font-size:12pt;line-height:1.3;margin-bottom:1mm}.service p{font-size:10pt;line-height:1.4;color:#526773}
.contact-panel{display:flex;align-items:center;justify-content:space-between;gap:5mm;padding:5mm 6mm;margin-top:4mm;border-radius:6mm}.contact-panel h3{font-size:13pt;line-height:1.3}.contact-panel .phone{display:block;font-size:18pt;font-weight:600;margin:3mm 0 1mm;white-space:nowrap}.contact-panel .email{font-size:10pt}.contact-panel .help{font-size:9pt;color:#526773;margin-top:2mm}
.flyer .condition{font-size:8pt;color:#526773;margin-top:4mm;line-height:1.45}.flyer.back footer{font-size:8pt}
.routine .intro{max-width:120mm}.routine .signature{height:46mm;padding:5mm 8mm;margin-top:6mm}.routine .signature .drop{width:34mm;height:34mm}.routine .signature .heritage strong{font-size:30pt}.routine .signature .heritage p{font-size:9pt}
.choices{display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin-top:6mm}.choice{padding:4mm 5mm;border-radius:5mm;background:#ffffffb0;border:.25mm solid #fff}.choice small{font-size:8pt;color:#526773}.choice h3{font-size:15pt;line-height:1.25;margin-top:1mm}.routine .front-action{margin-top:6mm}
.card{width:96mm;height:56mm}.card .inside{inset:8mm}.card .brand{width:49mm;height:14mm}.card.front .eyebrow{font-size:8pt;letter-spacing:.45pt;margin-top:4mm}.card.front .descriptor{font-family:Manrope,sans-serif;font-size:11pt;line-height:1.4;margin-top:3mm;max-width:64mm}.card.front .corner{position:absolute;right:-48mm;bottom:-24mm;width:60mm;height:60mm;border:.3mm solid #b7d8e6;border-radius:50%;pointer-events:none}.card.front .corner::after{content:'';position:absolute;inset:8mm;border:.3mm solid #c7dfe7;border-radius:50%}
.card.front .brand-panel{padding:4mm 5mm;width:69mm;min-height:23mm;display:flex;align-items:center;border-radius:5mm 5mm 12mm 5mm}.card.front .brand-panel .brand{width:48mm;height:14mm}.card.front.soft .inside{inset:7mm 8mm}.card.front.soft .eyebrow{margin-top:3mm}.card.front.soft .descriptor{font-size:9pt;margin-top:2mm;max-width:none}
.card.back .inside{flex-direction:row;align-items:center;justify-content:space-between;gap:4mm}.card.back .contact-copy{width:49mm}.card.back .eyebrow{font-size:8pt;letter-spacing:0;gap:2mm;margin-bottom:4mm;text-transform:none}.card.back .eyebrow i{width:4mm}.card.back .phone{font-size:13pt;line-height:1.3;font-weight:600;white-space:nowrap;display:block;margin-bottom:2mm}.card.back .email{font-size:9pt;white-space:nowrap;display:block}.card.back .since{font-size:8pt;color:#526773;margin-top:4mm}.card.back .qr{width:25mm;height:25mm}.card.back .qr-caption{font-size:8pt}
@media print{body{background:#fff}.toolbar{display:none}.pages{display:block;padding:0}.sheet{box-shadow:none;break-after:page}.sheet:last-child{break-after:auto}}
`;

const signature = (compact = false) => `<div class="signature glass"><div class="heritage"><small>LIMPEZA E CONSERVAÇÃO<br>DESDE</small><strong>1991</strong><p>${compact ? 'Cuidado com o seu espaço.' : 'Responsabilidade com a sua empresa.<br>Respeito por quem trabalha nela.'}</p></div><img class="drop" src="${drop}" alt=""></div>`;
const frontAction = () => `<div class="front-action">${action('Solicite uma proposta')}<div><strong>${escape(phone)}</strong><small>Fale com a equipe pelo WhatsApp</small></div></div>`;
const service = (n, title, text) => `<div class="service"><span class="number">0${n}</span><div><h3>${title}</h3><p>${text}</p></div></div>`;
const contactPanel = () => `<div class="contact-panel glass"><div><h3>Peça sua proposta.</h3><a class="phone" href="${contact}">${escape(phone)}</a><a class="email" href="mailto:${escape(email)}">${escape(email)}</a><p class="help">Conte sua cidade e o que precisa.</p></div><div>${qrBlock()}<p class="qr-caption">Abra o WhatsApp</p></div></div>`;

const pieces = [
  { id: 'panfleto-institucional', name: 'Panfleto · Institucional', kind: 'flyer', trim: [148,210],
    front: `${brand()}${eyebrow('Limpeza para empresas')}<h1>A limpeza da<br>sua empresa<br><span>em boas mãos.</span></h1><p class="intro">Profissionais treinados e uniformizados para cuidar da rotina do seu espaço.</p>${signature()}${frontAction()}${footer()}`,
    back: `${brand()}${eyebrow('Nossos serviços')}<h2>O cuidado que<br><span>seu espaço precisa.</span></h2><div class="services">${service(1,'Terceirização de limpeza','Equipe em meio período ou período integral.')}${service(2,'Limpeza pós-obra','Limpeza para a entrega de obras e reformas.')}${service(3,'Limpeza de vidros','Cuidado com a apresentação do seu espaço.')}${service(4,'Tratamento de pisos e pedras','Limpeza, impermeabilização e remoção de ceras.')}${service(5,'Cobertura de ausências','Apoio em férias, faltas e afastamentos da equipe própria.')}</div>${contactPanel()}<p class="condition">Período de trabalho, materiais, equipamentos e condições de reposição definidos na proposta.</p>${footer()}` },
  { id: 'panfleto-terceirizacao', name: 'Panfleto · Terceirização', kind: 'flyer', trim: [148,210], extra: 'routine',
    front: `${brand()}${eyebrow('Terceirização de limpeza')}<h1>Sua empresa funciona.<br><span>A gente cuida<br>da limpeza.</span></h1><p class="intro">Conte com uma equipe treinada e uniformizada, em uma rotina alinhada com o seu espaço.</p><div class="choices"><div class="choice"><small>CONTRATAÇÃO EM</small><h3>Meio período</h3></div><div class="choice"><small>OU EM</small><h3>Período integral</h3></div></div>${signature(true)}${frontAction()}${footer()}`,
    back: `${brand()}${eyebrow('Uma rotina bem cuidada')}<h2>Mais clareza<br><span>na contratação.</span></h2><div class="services">${service(1,'Profissionais preparados','Equipe treinada e uniformizada para a limpeza do dia a dia.')}${service(2,'Reposição de equipe','Cobertura em faltas, férias e afastamentos.')}${service(3,'Materiais e equipamentos','Itens incluídos definidos conforme o seu serviço.')}${service(4,'Período de trabalho','Meio período ou integral, conforme a sua necessidade.')}</div><div class="other"><h3>Precisa de um serviço pontual?</h3><p>Pós-obra, vidros e tratamento de pisos e pedras.</p></div>${contactPanel()}<p class="condition">Converse com a equipe para definir o escopo e as condições do seu serviço.</p>${footer()}` },
  { id: 'cartao-essencial', name: 'Cartão · Essencial', kind: 'card', trim: [90,50],
    front: `<div class="corner"></div>${brand()}${eyebrow('Desde 1991')}<p class="descriptor">Terceirização e<br>limpeza especializada.</p>` },
  { id: 'cartao-vidro', name: 'Cartão · Vidro suave', kind: 'card', trim: [90,50], extra: 'soft',
    front: `<div class="corner"></div><div class="brand-panel glass">${brand()}</div>${eyebrow('Desde 1991')}<p class="descriptor">Terceirização e limpeza especializada.</p>` },
];
const cardBack = () => `<div class="contact-copy">${eyebrow('Converse com a equipe')}<a class="phone" href="${contact}">${escape(phone)}</a><a class="email" href="mailto:${escape(email)}">${escape(email)}</a><p class="since">Limpeza e conservação<br>desde 1991.</p></div><div>${qrBlock()}<p class="qr-caption">WhatsApp</p></div>`;

for (const piece of pieces) {
  const pageCss = `@page{size:${piece.trim[0]+6}mm ${piece.trim[1]+6}mm;margin:0}.other{border-top:.2mm solid var(--line);padding-top:4mm;margin-top:1mm}.other h3{font-size:11pt;margin-bottom:1mm}.other p{font-size:10pt;color:#526773;line-height:1.4}`;
  const faces = ['front', 'back'].map(side => `<article class="sheet ${piece.kind} ${side} ${side === 'front' ? piece.extra || '' : ''}" aria-label="${side === 'front' ? 'Frente' : 'Verso'}"><div class="inside">${side === 'front' ? piece.front : piece.back || cardBack()}</div></article>`).join('');
  fs.writeFileSync(path.join(dir, `${piece.id}.html`), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${piece.name} | Pratic Limp</title><style>${css}${pageCss}</style></head><body><nav class="toolbar"><a href="index.html">← Todos os materiais</a><b>${piece.name}</b><a href="../../output/pdf/${piece.id}.pdf">Baixar PDF</a><small>Frente e verso · corte ${piece.trim.join(' × ')} mm · sangria de 3 mm</small></nav><main class="pages">${faces}</main></body></html>`);
}
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(pieces.map(({ id, name, kind, trim }) => ({ id, name, kind, trim })), null, 2));
const galleryCss = `${fonts}*{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 100% 0%,#d9efff,transparent 40%),#fcfdfe;color:#102f43;font-family:'DM Sans',sans-serif}main,header,footer{max-width:1240px;margin:auto;padding:36px}header{padding-top:64px}header>p{max-width:680px;line-height:1.6}h1,h2{font-family:Manrope;font-weight:600}h1{font-size:44px;letter-spacing:-1.5px;margin:18px 0}h1 span{color:#0073b9}small{color:#0073b9;letter-spacing:1.4px}section{padding:32px 0 50px;border-top:1px solid #dbe3e7}.previews{display:grid;grid-template-columns:1fr 1fr;gap:28px}figure{margin:0}img{display:block;width:100%;border-radius:8px;box-shadow:0 12px 28px #102f4312}figcaption{font-size:13px;margin:0 0 12px;color:#65717a}nav{display:flex;gap:12px;margin:24px 0}a{color:#0073b9}nav a{padding:12px 20px;border:1px solid #dbe3e7;border-radius:99px;text-decoration:none}nav a:first-child{background:#0073b9;color:white}footer{color:#65717a;line-height:1.6;font-size:13px}@media(max-width:680px){main,header,footer{padding:24px}.previews{grid-template-columns:1fr}h1{font-size:34px}}`;
fs.writeFileSync(path.join(dir, 'index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Novos materiais | Pratic Limp</title><style>${galleryCss}</style></head><body><header><small>PRATIC LIMP · MATERIAIS DA MARCA</small><h1>A mesma marca.<br><span>Em cada ponto de contato.</span></h1><p>Dois panfletos e dois cartões seguindo o visual do site. A experiência aparece como “Desde 1991”, sem contagem de anos ou lista de clientes.</p><a href="../design-system.md">Design system</a> · <a href="LEIA-ME.md">Edição e impressão</a></header><main>${pieces.map(p => `<section><h2>${p.name}</h2><nav><a href="../../output/pdf/${p.id}.pdf">Baixar PDF</a><a href="${p.id}.html">Abrir arte</a></nav><div class="previews">${['front','back'].map((side,i) => `<figure><figcaption>${i ? 'Verso' : 'Frente'} · ${p.trim.join(' × ')} mm</figcaption><img src="previews/${p.id}-${side}.png" alt="${p.name}, ${i ? 'verso' : 'frente'}"></figure>`).join('')}</div></section>`).join('')}</main><footer>Prévias com corte final, sem a sangria. Os PDFs incluem 3 mm de sangria por lado e duas páginas, frente e verso. Arquivos de conferência RGB; confirmar perfil de cor e gabarito com a gráfica. Prova física pendente.</footer></body></html>`);
console.log('4 artes frente e verso + galeria geradas em docs/materiais.');




