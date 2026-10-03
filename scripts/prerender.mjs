import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const shell = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', shell.replace('<div id="root"></div>', () => `<div id="root">${renderToString(createElement(App, { privacy: false }))}</div>`));
  await mkdir('dist/privacidade', { recursive: true });
  await writeFile('dist/privacidade/index.html', shell.replace('<div id="root"></div>', () => `<div id="root">${renderToString(createElement(App, { privacy: true }))}</div>`).replace('<title>Pratic Limp | Terceirização e limpeza desde 1991</title>', '<title>Privacidade | Pratic Limp</title>').replace('href="https://www.praticlimp.com.br/"', 'href="https://www.praticlimp.com.br/privacidade/"'));
} finally { await server.close(); }
