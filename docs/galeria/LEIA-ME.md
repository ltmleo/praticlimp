# Galeria não listada de artes

Rota estável: `/acervo-7f3c9a2e/`, relativa à base do site.
No GitHub Pages configurado neste projeto, após publicar:
`https://ltmleo.github.io/praticlimp/acervo-7f3c9a2e/`.

## Conteúdo e referências

O catálogo inclui 22 artes: quatro atuais, quatro cartões anteriores, doze
formatos de panfletos anteriores (A5, feed e story) e duas fotos históricas.
As peças com frente e verso têm uma referência para cada face, totalizando 34
imagens. As fotos históricas não representam informações comerciais atuais.

`catalog.mjs` é o cadastro. Seus códigos são permanentes:

- `PL-P01` / `PL-P02`: panfletos atuais.
- `PL-C01` / `PL-C02`: cartões atuais.
- `AR-*`: materiais anteriores ao design system.
- `REF-*`: fotografias de referência.
- Sufixos `-F`, `-V`, `-D` e `-R`: frente, verso, digital e referência.

Exemplo de pedido: “Na PL-P01-V, aumente o telefone”. O botão de referência
copia código, nome, coleção e link direto. “Arquivos para edição” mostra o
gerador e o identificador a localizar. A página não salva modificações nas
artes; a alteração deve ser feita no arquivo de origem e exportada novamente.

Ao adicionar uma peça, crie um código novo; não renumere as existentes. Ao
revisar uma peça, mantenha o código e atualize a revisão. Se quiser preservar
as duas versões, cadastre a anterior com um novo código de arquivo histórico.

## Build e publicação

`npm run build` compila o site, pré-renderiza as páginas existentes e executa
`scripts/build-gallery.mjs`. A galeria é escrita diretamente em sua pasta em
`dist/`, com CSS, JavaScript, fontes, imagens, HTMLs e PDFs próprios.

O builder copia apenas os arquivos listados no catálogo e recursos da galeria.
Não copia o repositório inteiro nem importa o acervo no bundle do site. Links
relativos funcionam tanto na raiz de um domínio quanto em `/praticlimp/`.
Arquivos ausentes ou códigos duplicados interrompem o build.

O workflow existente publica `dist/` em pushes para `main`. A criação desta
página não executa commit ou push automaticamente. É necessário incluir os
originais listados no catálogo, as prévias em `docs/galeria/previews/`, os PDFs
em `output/pdf/` e os demais arquivos desta alteração na publicação.

Para reconstruir só a galeria após um build do site:

```sh
npm run build:gallery
```

Para atualizar as prévias dos cartões anteriores, caso seus HTMLs mudem:

```sh
node scripts/preview-gallery.mjs
```

As prévias dos demais materiais são geradas por seus exportadores originais.
O build do GitHub Pages usa os arquivos já exportados; não precisa de Python,
Poppler ou um navegador para preparar a galeria.

## Acesso

A galeria não tem links na home, cabeçalho ou rodapé do site, nem entrada em
sitemap. A página e os HTMLs de arte copiados recebem `noindex`, `nofollow`,
`noarchive`, `nosnippet` e `noimageindex`. Não há analytics na galeria.

Isso é uma página **não listada**, não um controle de acesso. GitHub Pages serve
os arquivos estaticamente: quem descobrir ou receber o endereço poderá acessar
e compartilhar os materiais. As tags orientam buscadores cooperativos e não
garantem sigilo, especialmente dos PDFs e imagens. Não há senha ou autenticação.
Não guardar dados confidenciais nesse acervo.

## Conferência

Depois de `npm run build`, servir `dist/` com a base de homologação e executar:

```sh
node scripts/check-gallery.mjs http://127.0.0.1:4175/praticlimp/
```

O teste confere os arquivos do catálogo, links locais, referências por face,
filtros, ampliação, cópia e alternativa sem permissão de clipboard, navegação
por âncora, tela estreita, acesso sem JavaScript e isolamento da home.
