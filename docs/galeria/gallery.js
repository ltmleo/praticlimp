const $ = selector => document.querySelector(selector);
const arts = [...document.querySelectorAll('.art')];
const normalized = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function filter() {
  const query = normalized($('#search').value.trim());
  let total = 0;
  for (const art of arts) {
    const show = normalized(art.dataset.search).includes(query) && (!$('#type').value || art.dataset.type === $('#type').value) && (!$('#status').value || art.dataset.status === $('#status').value);
    art.hidden = !show;
    total += Number(show);
  }
  $('#count').textContent = `${total} ${total === 1 ? 'arte' : 'artes'}`;
  $('#empty').hidden = total !== 0;
}
for (const input of [$('#search'), $('#type'), $('#status')]) input.addEventListener('input', filter);
$('#clear').addEventListener('click', () => { $('.filters').reset(); filter(); $('#search').focus(); });
let toastTimer;
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    $('#toast').textContent = 'Referência copiada';
    $('#toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2500);
  } catch {
    $('#copy-text').value = text;
    $('#copy-fallback').showModal();
    $('#copy-text').focus();
    $('#copy-text').select();
  }
}
function directLink(code) {
  const url = new URL(location.href);
  url.search = '';
  url.hash = code;
  return url.href;
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.copy) {
    const article = button.closest('article');
    copy(`Arte: ${button.dataset.copy}\nPeça: ${article.querySelector('h2').textContent}\nColeção: ${article.dataset.status}\nLink: ${directLink(button.dataset.copy)}\nAlteração desejada: `);
  }
  if (button.dataset.link) copy(directLink(button.dataset.link));
  if (button.dataset.image) {
    $('#viewer-image').src = button.dataset.image;
    $('#viewer-image').alt = button.dataset.caption;
    $('#viewer-title').textContent = button.dataset.caption;
    $('#viewer-download').href = button.dataset.image;
    $('#viewer').showModal();
  }
});
$('#close-viewer').addEventListener('click', () => $('#viewer').close());
$('#close-copy').addEventListener('click', () => $('#copy-fallback').close());
function revealHash() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.closest('.art')) {
    $('.filters').reset();
    filter();
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
}
window.addEventListener('hashchange', revealHash);
revealHash();
