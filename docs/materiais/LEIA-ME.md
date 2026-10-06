# Materiais Pratic Limp — design system 1.0

Abra [a galeria](index.html) para comparar dois panfletos e dois cartões, todos
frente e verso. Os PDFs estão em [output/pdf](../../output/pdf/).

- **Panfleto institucional:** apresenta a marca e as cinco modalidades de serviço.
- **Panfleto terceirização:** enfatiza a rotina de limpeza e a clareza na contratação.
- **Cartão essencial:** marca e contatos em uma composição clara com curvas discretas.
- **Cartão vidro suave:** mesma estrutura de contatos, com a marca em um painel claro.

As fotos em `../references/` orientaram a continuidade do símbolo da gota.
A identidade aplicada vem de `../design-system.md` e do site atual. Nenhuma peça
inclui contagem de anos, lista, número ou logos de clientes. A experiência é
expressa por “Desde 1991”. O QR abre o WhatsApp confirmado no cadastro do projeto.

## Arquivos e edição

`build.mjs` centraliza conteúdo, fontes, composição e cores. Lê os contatos de
`src/data/company.ts`, reutiliza os SVGs oficiais e incorpora os recursos nos
HTMLs. As fontes e suas licenças estão em `../cartao-de-visitas/assets/`.

Para recriar, a partir da raiz:

```sh
node docs/materiais/build.mjs
node docs/materiais/export.mjs
```

O exportador usa Playwright/Chromium, Python com pypdf, Pillow e zxing-cpp e
Poppler (`pdftoppm`). `MATERIAL_PYTHON` permite selecionar o interpretador Python.
Os HTMLs e a galeria são gerados: faça alterações no gerador para preservá-las.
Os arquivos antigos foram mantidos em suas pastas originais.

## Impressão

| Material | Corte | Página com sangria | Margem de conteúdo do corte |
|---|---|---|---|
| Panfleto | 148 × 210 mm (A5) | 154 × 216 mm | pelo menos 9 mm |
| Cartão | 90 × 50 mm | 96 × 56 mm | pelo menos 4 mm |

Cada PDF tem duas páginas: frente e verso. Inclui 3 mm de sangria por lado,
TrimBox e BleedBox, sem marcas de corte. As prévias mostram o corte final.
O acabamento de vidro foi composto com gradientes e bordas; não depende de
desfoque dinâmico. Logo, textos e QR permanecem vetoriais na exportação.

Arquivos de conferência em RGB. Solicite à gráfica o perfil de cor e o gabarito
antes da conversão de produção. Imprima a 100%, sem ajustar à página, e confira
frente e verso, cores e QR em uma prova física antes da tiragem.

## Validação

O exportador verifica carregamento dos recursos, área segura e sobreposição dos
blocos principais. O verificador confere duas páginas por PDF, dimensões, caixas
de corte/sangria, fontes incorporadas, contatos, ausência de idade calculada e
leitura do QR na renderização final do PDF. Veja `validacao.txt`.

Prova física, conversão de cor e leitura do QR no papel permanecem pendentes.
