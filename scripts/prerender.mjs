import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
// Domínio definitivo: o mesmo do canonical em index.html.
const site = 'https://www.praticlimp.com.br/';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { company } = await server.ssrLoadModule('/src/data/company.ts');
  const { services, faq } = await server.ssrLoadModule('/src/data/content.ts');
  const { coverageText } = await server.ssrLoadModule('/src/utils/site.ts');
  const shell = await readFile('dist/index.html', 'utf8');
  const render = (privacy) => (html) => html.replace('<div id="root"></div>', () => `<div id="root">${renderToString(createElement(App, { privacy }))}</div>`);
  // Somente dados confirmados (docs/fontes-e-conteudo.md); o endereço não é publicado.
  const business = {
    '@type': 'LocalBusiness', '@id': site + '#empresa', name: 'Pratic Limp', url: site,
    description: `Terceirização de limpeza para empresas, condomínios e consultórios em ${coverageText}, com cobertura de férias, faltas e afastamentos, no mercado institucional desde 1991.`,
    logo: site + 'brand/pratic-limp.svg', image: site + 'og-image.png', foundingDate: '1991',
    telephone: company.phoneHref.replace('tel:', ''), email: company.email, sameAs: [company.facebook],
    ...(company.cnpj ? { taxID: company.cnpj } : {}),
    ...(company.address ? { address: company.address } : {}),
    ...(company.coverage.length ? { areaServed: company.coverage.map(name => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'São Paulo' } })) } : {}),
    makesOffer: services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name, description: service.text } })),
  };
  const home = { '@context': 'https://schema.org', '@graph': [
    business,
    { '@type': 'WebSite', '@id': site + '#site', url: site, name: 'Pratic Limp', inLanguage: 'pt-BR', publisher: { '@id': site + '#empresa' } },
    { '@type': 'FAQPage', '@id': site + '#duvidas', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ] };
  const privacyData = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pratic Limp', item: site },
    { '@type': 'ListItem', position: 2, name: 'Privacidade', item: site + 'privacidade/' },
  ] };
  const jsonLd = (data) => (html) => html.replace('</head>', () => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script></head>`);
  const privacyDescription = 'Como o formulário de orçamento da Pratic Limp trata seus dados e como o site mede acessos com o Google Analytics.';
  const privacyMeta = (html) => html
    .replace(/<title>[^<]*<\/title>/, '<title>Privacidade | Pratic Limp</title>')
    .replace(/(<meta (?:name|property)="(?:og|twitter):title" content=")[^"]*/g, '$1Privacidade | Pratic Limp')
    .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g, (_, start) => start + privacyDescription)
    .replace(/href="https:\/\/www\.praticlimp\.com\.br\/"/, `href="${site}privacidade/"`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${site}privacidade/`);
  await writeFile('dist/index.html', jsonLd(home)(render(false)(shell)));
  await mkdir('dist/privacidade', { recursive: true });
  await writeFile('dist/privacidade/index.html', jsonLd(privacyData)(privacyMeta(render(true)(shell))));
} finally { await server.close(); }
