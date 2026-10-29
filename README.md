# Pratic Limp

Site estático em React, Vite, TypeScript e Motion, com HTML pré-renderizado.

Identidade visual: consulte o [design system da Pratic Limp](docs/design-system.md)
antes de criar ou alterar o site, cartões, panfletos ou outras peças da marca.
O guia documenta a aparência atual do site e sua adaptação para impressão e redes sociais.

Novos cartões e panfletos: [galeria](docs/materiais/index.html) e
[instruções de edição e impressão](docs/materiais/LEIA-ME.md).

Acervo completo não listado: [documentação e referências](docs/galeria/LEIA-ME.md).
O build inclui a rota isolada `/acervo-7f3c9a2e/`, sem links ou recursos adicionais
na página principal. Acesso por link, sem autenticação.

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

Publicar somente `dist/`. Home e `/privacidade/` são geradas no build; não é necessário backend em produção. `npm test` usa Chrome instalado e inicia uma prévia em `http://localhost:4173`.

- `src/data/content.ts`: serviços e perguntas baseados no site original.
- `src/data/company.ts`: contatos. WhatsApp confirmado pelo usuário.
- `src/styles/global.css` e `glass.css`: layout e superfícies translúcidas.
- `public/brand/pratic-limp.svg`: logo completo derivado do SVG fornecido.
- `public/brand/pratic-limp-gota.svg`: símbolo isolado; também aplicado em `public/favicon.svg`.
- `docs/fontes-e-conteudo.md`: registro de fontes, ativos e informações não confirmadas.
- `PROPOSTA-CRO.md`: arquitetura, copywriting, UX e plano de mensuração.

SEO e desempenho (relatórios em `docs/analises/`): o pré-render injeta JSON-LD (`LocalBusiness`, `WebSite`, `FAQPage` a partir de `src/data/content.ts`) e metadados próprios em `/privacidade/`. `robots.txt`, `sitemap.xml` e `llms.txt` ficam em `public/` e usam o domínio definitivo `www.praticlimp.com.br`, como o canonical. Fontes do Google carregam sem bloquear a renderização e o script do GA4 é baixado na primeira interação ou 5 s após o carregamento. Após trocar imagens em `public/brand/`, rode `node scripts/optimize-images.mjs` (WebP redimensionado) e `node scripts/build-og-image.mjs` (`public/og-image.png`, 1200 × 630).

`scripts/prepare-logo.mjs` reproduz o enquadramento do logo e a extração da gota a partir de `public/PRATIC LIMP 2026.svg`, preservando o original.

O formulário prepara uma mensagem no navegador e abre o WhatsApp para confirmação. Sem banco de dados, envio automático ou armazenamento local. O Google Analytics 4 está ativo com a propriedade `G-HTV2EWQWDX`; Meta Pixel e Hotjar não estão instalados. Sem JavaScript, links de telefone/WhatsApp continuam disponíveis e o botão do formulário permanece desabilitado.

O workflow `.github/workflows/deploy-pages.yml` compila e publica `dist/` no GitHub Pages em cada push para `main`. Durante a homologação ele define `VITE_BASE_PATH=/praticlimp/`, compatível com `https://ltmleo.github.io/praticlimp/`.

Quando o domínio personalizado for ativado, altere `VITE_BASE_PATH` para `/` e crie `public/CNAME` contendo `www.praticlimp.com.br`. Essa troca deve acompanhar a configuração de DNS e de domínio no GitHub Pages.

Imagens institucionais estão locais. Fontes usam Google Fonts. Nenhuma imagem gerada por IA integra a página. CNPJ e cidades atendidas foram confirmados pelo usuário em 24/10/2026; o endereço não é publicado. A versão não foi publicada em produção.
