# Pratic Limp

Site estático em React, Vite, TypeScript e Motion, com HTML pré-renderizado.

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

`scripts/prepare-logo.mjs` reproduz o enquadramento do logo e a extração da gota a partir de `public/Logo vetorizado.svg`, preservando o original.

O formulário prepara uma mensagem no navegador e abre o WhatsApp para confirmação. Sem banco de dados, envio automático ou armazenamento local. O Google Analytics 4 está ativo com a propriedade `G-HTV2EWQWDX`; Meta Pixel e Hotjar não estão instalados. Sem JavaScript, links de telefone/WhatsApp continuam disponíveis e o botão do formulário permanece desabilitado.

O workflow `.github/workflows/deploy-pages.yml` compila e publica `dist/` no GitHub Pages em cada push para `main`. O arquivo `public/CNAME` configura `www.praticlimp.com.br` como domínio personalizado.

Imagens institucionais estão locais. Fontes usam Google Fonts. Nenhuma imagem gerada por IA integra a página. CNPJ, endereço e cobertura aguardam dados confirmados. A versão não foi publicada em produção.
