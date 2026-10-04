# Panfletos Pratic Limp

Abra index.html para comparar as quatro opções. Cada PDF tem duas páginas: frente e verso. Os PNGs feed têm 1080 × 1350 px; os PNGs story têm 1080 × 1920 px.

## Editar e regenerar

Os 12 HTMLs contêm CSS, fontes e logotipo incorporados e podem ser editados em código. O arquivo build.mjs centraliza textos e estilos; regenerá-lo sobrescreve os HTMLs. Não há editor visual.

Na raiz do projeto: node docs/panfletos/build.mjs; depois node docs/panfletos/export.mjs. O exportador requer Playwright e Python com pypdf, Pillow e zxing-cpp, além do executável pdftoppm (Poppler) no PATH. PANFLETO_PYTHON permite indicar o executável Python. Os recursos de marca e as fontes são reutilizados do projeto e dos cartões existentes; respectivas licenças estão em ../cartao-de-visitas/assets.

## Impressão

PDF de conferência em RGB, com texto e logo vetoriais e fontes incorporadas. Página com sangria: 154 × 216 mm. Corte: 148 × 210 mm. Sangria: 3 mm por lado. Conteúdo importante a pelo menos 5 mm do corte. Não há marcas de corte; TrimBox e BleedBox identificam as áreas.

Confirmar gabarito, perfil de cor e exigência de PDF/X com a gráfica. A conversão profissional deve usar o perfil informado por ela. Não imprimir com ajuste à página. A prova física e a leitura do QR no papel ainda precisam ser feitas antes da tiragem.

## Contatos e campanha

Os QR codes direcionam ao WhatsApp com mensagem identificando a opção e o canal. O destinatário pode editar a mensagem; a identificação não é um sistema automático de analytics. A abertura da conversa não envia mensagem.

Use textos-de-apoio.md para acompanhar as imagens. No Instagram, os links da legenda não são clicáveis: configure o link no perfil e o adesivo dos stories. Área sugerida para o adesivo: y=1620–1720 px, evitando a interface inferior.

## Fontes

Informações comerciais: ../fontes-e-conteudo.md e ../../src/data/content.ts. Contato: ../../src/data/company.ts.

Pesquisa de comunicação: https://www.nngroup.com/articles/applying-writing-guidelines-web-pages/ e https://www.uspsdelivers.com/create-a-winning-message-how-to-attract-new-customers-with-direct-mail/

Sangria: https://www.adobe.com/learn/indesign/web/set-print-bleed?locale=en
