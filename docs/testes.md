# Verificação do site

Antes de reorganizar componentes, os testes registram o comportamento da home existente.

- `npm run test:unit`: componentes e integração em jsdom.
- `npm test`: Playwright com um build novo no caminho raiz, preservando o comando anterior.
- `npm run test:e2e`: Playwright com builds novos em `/` e `/praticlimp/`.
- `npx tsc --noEmit -p tsconfig.test.json`: tipos do código e dos testes.

Instale o navegador com `npx playwright install chromium` na primeira execução.
Os testes não enviam mensagens; verificam o link preparado para o WhatsApp.
O carregamento do GA4 é bloqueado durante a automação.

## Referências visuais

As referências em `tests/visual/win32` foram geradas antes da extração dos componentes.
Depois da extração, foram atualizadas e revisadas para a reformulação intencional do Liquid Glass.
O pipeline usa Windows e a versão de Chromium fixada no package-lock, como na criação dessas referências.
Capturas da seção financeira ocultam somente os elementos fixos que poderiam cobri-la.
As capturas usam movimento reduzido; a animação das barras é verificada em um teste separado.
No desktop, a transparência é controlada explicitamente: verificamos o vidro ativo e uma captura adicional com superfícies opacas, respeitando a preferência de acessibilidade.

Não atualize referências para aceitar uma regressão. Revise as diferenças primeiro.
Para uma alteração visual intencional, gere e revise novas capturas com
`npm run test:e2e -- --update-snapshots` no Windows.
As fontes externas precisam estar acessíveis; falhas de carregamento podem causar diferenças visuais.

O pipeline impede a publicação quando qualquer verificação falha.

## Organização dos componentes

`src/pages/Home.tsx` reúne as seções na ordem da página e mantém o serviço escolhido para o orçamento.
`src/App.tsx` seleciona a home ou a página de privacidade, inclusive na geração do HTML estático.

- `src/components/layout`: barra superior, cabeçalho e rodapé. O cabeçalho controla seu menu.
- `src/components/sections`: hero, diferenciais, clientes, serviços, história, compromisso, FAQ e contato. Serviços controla seu filtro e informa a escolha à Home.
- `src/components`: marca, animação compartilhada, WhatsApp flutuante e os componentes existentes de formulário, comparativo e ícones.
- `src/utils/site.ts`: caminho base, URLs de imagens e contato inicial pelo WhatsApp.

Os estilos continuam nos arquivos existentes, sem mudanças na ordem das seções ou nos seletores.
