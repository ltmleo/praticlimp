import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { catalog, route } from '../docs/galeria/catalog.mjs';

const output = path.resolve('dist', route);
const esc = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const noindex = '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">';
await mkdir(output, { recursive: true });
await mkdir(path.join(output, 'assets'), { recursive: true });
for (const file of ['gallery.css','gallery.js']) await copyFile(`docs/galeria/${file}`, path.join(output, file));
for (const file of ['dm-sans-400.ttf','dm-sans-600.ttf','manrope-600.ttf','DM-Sans-OFL.txt','Manrope-OFL.txt']) await copyFile(`docs/cartao-de-visitas/assets/${file}`, path.join(output, 'assets', file));
await copyFile('public/brand/pratic-limp-horizontal.svg', path.join(output, 'assets/logo.svg'));

const ids = new Set();
const cards = [];
for (const item of catalog) {
  if (ids.has(item.code)) throw Error(`Código duplicado: ${item.code}`);
  ids.add(item.code);
  const local = `artes/${item.code}`;
  await mkdir(path.join(output, local), { recursive: true });
  const faces = [];
  for (const face of item.faces) {
    const file = `${face.suffix}${path.extname(face.source)}`;
    await copyFile(face.source, path.join(output, local, file));
    const code = `${item.code}-${face.suffix}`;
    faces.push(`<figure id="${code}"><figcaption><span>${esc(face.label)}</span><a href="#${code}" aria-label="Link para ${code}">${code}</a></figcaption><button class="image-button" data-image="${local}/${file}" data-caption="${esc(`${code} · ${item.title} · ${face.label}`)}" aria-label="Ampliar ${esc(item.title)}: ${esc(face.label)}"><img src="${local}/${file}" alt="${esc(`${item.title}, ${face.label}`)}" loading="lazy" decoding="async"></button><div class="face-actions"><a href="${local}/${file}" download>Baixar imagem</a><button data-copy="${code}">Copiar referência</button></div></figure>`);
  }
  if (item.pdf) await copyFile(item.pdf, path.join(output, local, 'arte.pdf'));
  if (item.source.endsWith('.html')) {
    let html = await readFile(item.source, 'utf8');
    html = html.replace(/<head>/i, `<head>${noindex}<meta name="referrer" content="no-referrer">`)
      .replace(/href="(?:\.\.\/)*index\.html"/g, `href="../../index.html#${item.code}"`)
      .replace(/href="[^"]*\.pdf"/g, 'href="arte.pdf"');
    await writeFile(path.join(output, local, 'arte.html'), html);
  }
  const provenance = `<details><summary>Arquivos para edição</summary><dl><dt>Arquivo da arte</dt><dd><code>${esc(item.source)}</code></dd>${item.generator ? `<dt>Editar no gerador</dt><dd><code>${esc(item.generator)}</code></dd><dt>Localizar</dt><dd><code>${esc(item.selector)}</code></dd>` : '<dt>Origem</dt><dd>Fotografia de referência, sem arquivo editável.</dd>'}</dl>${item.generator ? '<p>Edite o gerador e regenere a arte; alterações apenas no HTML podem ser sobrescritas.</p>' : ''}</details>`;
  cards.push(`<article class="art" id="${item.code}" data-type="${esc(item.type)}" data-status="${esc(item.status)}" data-search="${esc([item.code,item.title,item.type,item.status,item.id,...item.faces.map(f=>`${item.code}-${f.suffix}`)].join(' '))}"><header class="art-heading"><div><div class="art-meta"><a class="code" href="#${item.code}">${item.code}</a><span class="badge ${item.status === 'Atual' ? 'current' : ''}">${esc(item.status)}</span><span>${esc(item.revision)}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.size)}</p></div><button class="copy-link" data-link="${item.code}">Copiar link</button></header><p class="note">${esc(item.note)}</p><div class="faces ${item.type === 'Cartões' ? 'cards' : ''} ${item.faces.length === 1 ? 'single' : ''}">${faces.join('')}</div><div class="downloads">${item.pdf ? `<a class="primary" href="${local}/arte.pdf" download>Baixar PDF <span>↓</span></a>` : ''}${item.source.endsWith('.html') ? `<a href="${local}/arte.html" target="_blank" rel="noopener">Abrir arte HTML ↗</a>` : ''}</div>${provenance}</article>`);
}
const content = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${noindex}<meta name="referrer" content="no-referrer"><title>Acervo de artes | Pratic Limp</title><link rel="stylesheet" href="gallery.css"><script src="gallery.js" defer></script></head><body><a class="skip" href="#catalogo">Ir para as artes</a><header class="top"><img src="assets/logo.svg" width="208" height="60" alt="Pratic Limp"><span>GALERIA NÃO LISTADA</span></header><main><section class="intro"><p class="eyebrow"><i></i> ACERVO DA MARCA</p><h1>Todas as artes.<br><span>Uma referência para cada uma.</span></h1><p>Compare versões, baixe arquivos e use o código da peça para pedir uma alteração. As opções atuais seguem o design system do site.</p><div class="stats"><span><b>04</b> atuais</span><span><b>16</b> anteriores</span><span><b>02</b> referências</span></div></section><form class="filters" role="search" onsubmit="return false"><label class="search">Buscar uma arte<input id="search" type="search" placeholder="Nome ou código, como PL-P01-V" autocomplete="off"></label><label>Tipo<select id="type"><option value="">Todos os formatos</option>${['Panfletos','Cartões','Digital','Referências'].map(x=>`<option>${x}</option>`).join('')}</select></label><label>Coleção<select id="status"><option value="">Todas as coleções</option>${['Atual','Anterior','Referência'].map(x=>`<option>${x}</option>`).join('')}</select></label><button id="clear" type="button">Limpar</button></form><div class="result-line"><p id="count" role="status">${catalog.length} artes</p><p>F = frente · V = verso · D = digital · R = referência</p></div><noscript><p>Todas as artes estão abaixo. Para filtros e ampliação, ative o JavaScript; imagens e downloads continuam disponíveis.</p></noscript><div id="catalogo">${cards.join('')}</div><p id="empty" hidden>Nenhuma arte encontrada. Experimente outro código ou limpe os filtros.</p><aside class="usage"><h2>Como pedir uma alteração</h2><p>Use o botão “Copiar referência” da face desejada. Por exemplo: <strong>“Na PL-P01-V, aumente o telefone e mantenha o restante.”</strong> Os códigos permanecem os mesmos quando uma peça é revisada.</p><p>PDFs de conferência em RGB. Confirme o gabarito e o perfil de cor com a gráfica antes da tiragem.</p></aside></main><footer class="bottom">Pratic Limp · Acervo de materiais<br>Sem divulgação no site. Acesso por link, sem autenticação.</footer><dialog id="viewer" aria-labelledby="viewer-title"><div class="viewer-heading"><h2 id="viewer-title"></h2><button id="close-viewer" aria-label="Fechar ampliação">Fechar ×</button></div><img id="viewer-image" alt=""><a id="viewer-download" download>Baixar imagem</a></dialog><div id="toast" role="status" aria-live="polite"></div><dialog id="copy-fallback" aria-labelledby="copy-title"><h2 id="copy-title">Copie esta referência</h2><textarea id="copy-text" readonly aria-label="Referência para copiar"></textarea><button id="close-copy">Fechar</button></dialog></body></html>`;
await writeFile(path.join(output, 'index.html'), content);
await writeFile(path.join(output, 'catalogo.json'), JSON.stringify(catalog, null, 2));
console.log(`Galeria: dist/${route}/ (${catalog.length} artes, ${catalog.reduce((n,a)=>n+a.faces.length,0)} faces).`);
