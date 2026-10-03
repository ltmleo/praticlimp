# Pratic Limp

Site estático em **React + Vite + TypeScript + Motion**, com pré-renderização de HTML durante a compilação.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Publicar apenas `dist/` em uma hospedagem estática. Não há backend em produção. A home e `/privacidade/` são geradas com conteúdo HTML antes da hidratação React.

- Estratégia e textos: [PROPOSTA-CRO.md](./PROPOSTA-CRO.md).
- Contatos e informações pendentes: `src/data/company.ts`.
- Interface: `src/App.tsx`, `src/components/QuoteForm.tsx` e `src/styles/global.css`.
- WhatsApp confirmado: `5519974163336`. O formulário prepara uma mensagem e só o usuário a envia no aplicativo. Sem banco de dados, armazenamento local ou envio automático.
- Fotos ilustrativas do Unsplash e fontes do Google Fonts requerem conexão. Não representam clientes da empresa.
- Analytics/Meta Pixel/Hotjar não estão instalados. Planejamento de tracking e cuidados com dados constam na proposta.
- Não há números de prova social inventados. Confirmar cobertura, CNPJ, endereço, modalidades, depoimentos e fotos reais antes de publicar.

## Verificação

`npm run build` executa TypeScript, Vite e a pré-renderização. `npm test` executa os testes de navegador, usando Chrome instalado. A configuração de Playwright inicia a prévia em `http://localhost:4173`.
