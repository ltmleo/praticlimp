# Design system — Pratic Limp

Versão 1.0 · 6 de outubro de 2026

## 1. Finalidade e referência

Este é o guia visual para o site e todos os materiais da Pratic Limp: cartões,
panfletos, apresentações, redes sociais e imagens de campanha. Uma peça deve ser
reconhecível como parte do site mesmo antes da leitura do logotipo.

A referência é o site atual deste repositório. Sua identidade combina tipografia
limpa, bastante espaço livre, azul institucional, pequenos acentos verdes,
formas arredondadas e superfícies de vidro discretas sobre fundos claros.

Fontes da especificação:

- [global.css](../src/styles/global.css): estrutura, tipografia e cores de base.
- [glass.css](../src/styles/glass.css): cores e acabamento visual vigentes.
- [main.tsx](../src/main.tsx): importa `glass.css` depois de `global.css`.
- [Brand.tsx](../src/components/Brand.tsx) e [Hero.tsx](../src/components/sections/Hero.tsx): marca e composição principal.
- [Referência desktop](../tests/visual/win32/desktop.png) e [mobile](../tests/visual/win32/mobile.png): capturas locais para comparação; podem precisar ser renovadas após mudanças no site.

Leia a cascata completa, inclusive as regras finais e os breakpoints. Copiar
somente o início do CSS produz uma versão antiga da identidade.

Os valores descritos como **site atual** vêm da implementação. Recomendações
para papel, redes sociais, proporções e área de proteção são **normas deste
guia**, criadas para estender essa identidade; não são medidas extraídas do site.

## 2. O que torna uma peça parte da marca

1. Predominância de branco ou branco azulado, com respiro real entre os blocos.
2. Título em Manrope, alinhado à esquerda, com uma expressão destacada em azul.
3. Texto em DM Sans, azul escuro; verde reservado para pequenos acentos.
4. Um painel de cantos suaves, com profundidade leve e boa legibilidade.
5. Marca oficial preservada e uma ação principal fácil de localizar.

Nos formatos pequenos, priorize marca, tipografia, cores e espaço livre. Não é
necessário incluir fotografia, vidro, anéis e selo de experiência em toda peça.

Evite composições inteiras em azul saturado, faixas verdes largas, recortes
diagonais dominantes, sombras pretas, excesso de selos e títulos pesados em caixa
alta. As seções escuras do site são contrapontos; não devem transformar todo
material em um anúncio escuro.

## 3. Cores

| Papel | Valor vigente | Uso |
|---|---|---|
| Texto principal / institucional escuro | `#102F43` | Títulos, textos, painéis escuros pontuais |
| Azul principal | `#0073B9` | Destaques, CTA, ícones e números |
| Verde de acento | `#A2D21A` | Traço curto, ponto, detalhe e acento em fundo escuro |
| Branco | `#FFFFFF` | Base, áreas de leitura e proteção da marca |
| Fundo principal claro | `#FCFDFE` | Base atual de `main` |
| Papel frio | `#F5F7F8` | Fundo neutro de apoio |
| Texto secundário | `#65717A` | Descrições em fundo claro opaco |
| Linha neutra | `#DBE3E7` | Separadores e bordas discretas |
| Fundo sólido de apoio | `#F7FAFC` | Alternativa legível ao vidro |

O azul `#006BAA` e o verde `#A8CF16` ainda aparecem na base e nos geradores dos
materiais antigos. **Não são os tokens principais para novas peças**: `glass.css`
os substitui por `#0073B9` e `#A2D21A`. Não altere as cores internas dos SVGs
oficiais para forçá-los a coincidir com os tokens da interface.

Como ponto de partida para peças claras, reserve aproximadamente 75% da área a
fundos claros e espaço livre, 20% a informação/imagens/azuis e até 5% ao verde.
São proporções de composição, não uma fórmula de preenchimento.

Verde não serve para texto pequeno sobre branco. Sobre fundos claros, use texto
escuro. Sobre azul ou fundo escuro, confira o contraste do texto branco. Em
superfícies translúcidas, verifique a cor composta real; a cor nominal do painel
não garante leitura. Meta do projeto: contraste de 4,5:1 para texto comum e 3:1
para texto grande e elementos funcionais.

## 4. Marca e ativos

| Ativo | Aplicação |
|---|---|
| [pratic-limp.svg](../public/brand/pratic-limp.svg) | Marca completa usada no desktop |
| [pratic-limp-horizontal.svg](../public/brand/pratic-limp-horizontal.svg) | Espaços horizontais e compactos; usada no mobile |
| [pratic-limp-gota.svg](../public/brand/pratic-limp-gota.svg) | Símbolo auxiliar, nunca substituto único da identificação em uma peça de primeiro contato |
| [terceirizacao.png](../public/brand/terceirizacao.png) | Imagem principal do hero |
| [sobre.png](../public/brand/sobre.png) | Ativo disponível; avaliar adequação e resolução antes de aplicar |

Use SVG para a marca sempre que o formato permitir. Não redesenhe, distorça,
incline, recolora, aplique contorno ou sombra ao logotipo. Não gere uma versão da
marca por IA. Em fundos que prejudicam a leitura, mantenha uma área clara de
proteção, integrada à composição.

Norma de proteção: deixe ao redor da arte visível uma área livre de pelo menos
25% da altura visível do logo. A área vazia interna do arquivo não deve ser
confundida com esse espaço. Como ponto de partida para a marca horizontal, use
largura mínima de 30 mm em impressão ou 140 px em tela; aumente se os detalhes
não estiverem legíveis no tamanho final. Não reduza a marca para acomodar texto
excessivo.

## 5. Tipografia

**Manrope** em títulos e chamadas. **DM Sans** em textos, contatos, legendas e
botões. Não substituir por uma fonte “parecida” na arte final. Aguarde o
carregamento das fontes antes de exportar; incorpore-as no PDF.

O site usa títulos de peso moderado, geralmente 500–600, e não um conjunto de
manchetes em peso 800. Os arquivos locais dos cartões oferecem Manrope 600/700 e
DM Sans 400/600 em [assets](cartao-de-visitas/assets/), junto das licenças. Com
esses arquivos, use Manrope 600; não simule um peso intermediário inexistente.

| Elemento | Site atual / referência | Adaptação para novas peças |
|---|---|---|
| Título principal | Manrope; base desktop 48–74 px; peso 550; entrelinha 1,055 | Uma ideia, 2–4 linhas, peso 500–600 |
| Título de seção | Manrope; base 32–46 px; entrelinha 1,24 | Hierarquia claramente abaixo do título principal |
| Texto | DM Sans; tamanho depende do componente e breakpoint | Entrelinha 1,45–1,75; evitar blocos longos |
| Rótulo de seção | Caixa alta pequena, letras espaçadas, traço verde | Usar como apoio; nunca para informação essencial minúscula |
| Contato / CTA | DM Sans 550–600 | Uma ação principal; número sem quebra |

As medidas de base do site são sobrescritas em componentes e media queries. Não
use esta tabela como substituta do CSS para reproduzir uma tela exata.

Normas de partida para impressão: corpo de 10–12 pt no A5; contatos de 9–11 pt
no cartão; informação secundária de pelo menos 8 pt. Títulos A5 de 24–34 pt.
Reduza o texto antes de reduzir a fonte. Para feed de 1080 px, comece com títulos
de 64–88 px e corpo de 28–36 px; confira também uma prévia com 360 px de largura.

## 6. Composição, espaçamento e formas

O hero do site organiza texto à esquerda e imagem/painel à direita. Títulos,
descrições e ação compartilham o mesmo eixo. A assimetria vem da proporção entre
blocos, sem desalinhamentos arbitrários.

- Site atual: container de até 1296 px; margem-base desktop de 56 px por lado;
  seções com 104 px de espaço vertical na base, ajustadas nos breakpoints.
- Escala recomendada para novas peças digitais: 4, 8, 12, 16, 24, 32, 48, 64 e
  96 px. Use poucos intervalos consistentes.
- Painéis do site: raios de aproximadamente 16–38 px. Hero desktop:
  `38px 38px 115px 38px`; mobile pequeno: `28px 28px 75px 28px`.
- Botões e etiquetas: formato de cápsula (`999px`). Campos: cerca de 11 px.
- Linhas divisórias: finas e discretas. Anéis elípticos: contorno leve, sem
  atravessar informação importante.

Nas peças impressas, adapte as curvas à escala física; não converta cada pixel
literalmente em milímetros. Um painel pode começar com raio de 4–7 mm no A5 e
2–3 mm no cartão. O canto ampliado é uma assinatura opcional de um único painel.

## 7. Vidro, luz e profundidade

O acabamento atual usa fundos azulados/esverdeados suaves, superfícies claras
translúcidas, bordas brancas e sombras azuladas de baixa intensidade. Texto e
marca permanecem opacos.

Referência compacta derivada das regras finais do site para telas menores:

```css
.superficie-marca {
  color: #102f43;
  background: linear-gradient(135deg, #ffffff38, #ffffff12 65%, #e8f6ff1a);
  border: 1px solid #ffffffb3;
  border-radius: 24px;
  backdrop-filter: blur(5px) saturate(125%);
  -webkit-backdrop-filter: blur(5px) saturate(125%);
  box-shadow: inset 0 1px 0 #fffffff0,
    inset 1px 0 0 #ffffff66,
    inset 0 -1px 0 #41677a26,
    0 8px 24px #173b5814;
}
```

Esse tratamento precisa de um fundo suave por trás para ser perceptível. Não
empilhe transparências até tornar o texto difícil de ler. Quando a leitura ou o
suporte exigir, use `#F7FAFC` opaco e remova o desfoque.

**Impressão e imagens estáticas:** reproduza a aparência com preenchimentos
claros e gradientes suaves já compostos. Não dependa de `backdrop-filter` no
exportador. Verifique o resultado rasterizado; mantenha textos, marca e QR
vetoriais no PDF quando possível. A curva, o respiro e a hierarquia precisam
continuar funcionando mesmo se a sombra desaparecer no papel.

## 8. Fotografia, ilustração e ícones

Prefira os ativos institucionais existentes, ligados à limpeza em ambientes de
trabalho. Faça recortes intencionais, preserve o assunto e evite imagens
esticadas ou com baixa resolução. Uma imagem principal por face é suficiente.
Não introduza personagens 3D, clip-art, bolhas de sabão ou colagens decorativas
como uma nova linguagem paralela.

Use ícones de contorno coerentes com [Icon.tsx](../src/components/Icon.tsx), com
mesmo peso visual e tamanho dentro de cada grupo. Azul em superfícies claras;
verde como acento em superfícies escuras. Não misture emojis, ícones preenchidos
e traços de espessuras diferentes.

## 9. Componentes que podem ser reutilizados

| Componente | Receita visual |
|---|---|
| Rótulo de abertura | Traço verde curto + identificação pequena em caixa alta |
| Título | Manrope escuro + uma expressão azul; alinhamento à esquerda |
| Painel principal | Fundo claro, curvas suaves, borda leve, imagem ou conteúdo bem espaçado |
| Experiência | “Desde 1991”; número azul em destaque, suporte discreto |
| CTA | Cápsula azul com texto branco e seta; contraste conferido na exportação |
| Lista de serviços | Número ou ícone azul, título e descrição; separadores finos |
| Contato | Informação escura legível; QR isolado sobre branco |

“Desde 1991” é preferível a uma contagem de anos que fica desatualizada. Em
impressos, o CTA é uma chamada para ação com contato/QR, sem depender de clique.

Para materiais duráveis, não incluir quantidade, lista ou logos de clientes:
a carteira pode mudar. Esta regra foi confirmada pelo usuário em 6 de outubro
de 2026 a partir dos materiais históricos em `docs/references/`.

## 10. Receitas por formato

### Cartão de visitas — 90 × 50 mm

Frente clara: marca horizontal com respiro, descrição curta e pequeno traço
verde. Um fundo azul muito suave ou painel curvo pode trazer o acabamento do
site, sem competir com a marca.

Verso: contatos alinhados à esquerda e QR à direita sobre branco, separados por
espaço. Use uma chamada curta, como “Converse com a nossa equipe”. Não comprima
uma lista de serviços no cartão. Uma face escura é uma variação secundária,
desde que preserve a tipografia, o respiro e a leitura da marca.

### Panfleto A5 — 148 × 210 mm

Frente: marca no topo, rótulo curto, título de benefício, imagem institucional
em painel claro e uma ação principal no rodapé. Retome o título do site quando
adequado: “A limpeza da sua empresa em boas mãos.” Destaque apenas o trecho
principal em azul. Limite a três benefícios curtos.

Verso: serviços em blocos separados por linhas leves; experiência “Desde 1991”;
contato e QR. A leitura deve seguir título → benefício → prova → ação.

### Feed e stories

Feed: 1080 × 1350 px. Story: 1080 × 1920 px. Reorganize a composição; não estique
o A5. Comece com 80 px de margem lateral; no story, reserve aproximadamente
200 px no topo e 300 px embaixo para a interface e confira no canal de destino.
Use uma mensagem por peça, com marca, título, imagem/painel e contato legíveis
no celular. Para leitura no mesmo aparelho, dê preferência também a link ou
contato escrito, sem depender apenas do QR.

## 11. Produção para impressão

- Sangria inicial de 3 mm por lado: cartão com página de 96 × 56 mm; A5 com
  página de 154 × 216 mm. Ajustar ao gabarito da gráfica.
- Conteúdo essencial pelo menos 4 mm para dentro do corte no cartão e 5 mm no
  A5. Sangria não conta como margem de segurança.
- Logo e textos preferencialmente vetoriais; imagens a 300 ppi no tamanho de
  uso, sem ampliar arquivos pequenos artificialmente.
- QR escuro sobre branco, sem vidro ou textura; preservar uma zona livre de
  quatro módulos. Começar com 23–25 mm e testar o código real no tamanho final.
- Os HEX deste guia são referências RGB. Conversão CMYK depende do perfil e do
  papel informados pela gráfica; não inventar uma equivalência universal.
- Exportar com fontes incorporadas e dimensões corretas. Conferir frente e
  verso, corte, sangria, leitura do QR e prova física antes da tiragem.

## 12. Texto e informações da empresa

Tom direto, próximo e profissional. Falar de rotina, equipe, cuidado e
contratação com clareza. Evitar superlativos genéricos, excesso de exclamações,
promessas de economia não demonstradas e serviços não confirmados.

Consultar [company.ts](../src/data/company.ts),
[content.ts](../src/data/content.ts) e
[fontes-e-conteudo.md](fontes-e-conteudo.md) antes de inserir contatos, serviços,
condições ou afirmações comerciais. Não preencher endereço, CNPJ ou cobertura
com suposições. Manter os dados em sua fonte de origem, sem usar este guia como
cadastro comercial.

## 13. Materiais anteriores e manutenção

Os arquivos em `docs/cartao-de-visitas/` e `docs/panfletos/` são materiais
anteriores a este guia. Não foram redesenhados ou aprovados por este documento.
Podem fornecer textos, recursos de exportação e dimensões; seus estilos não
devem servir como referência para uma nova peça.

A coleção nova está em [docs/materiais](materiais/index.html), com fontes
editáveis, galeria e PDFs em `output/pdf/`. Ela aplica este guia e usa somente
“Desde 1991”, sem idade calculada ou carteira de clientes impressa.

Na próxima revisão desses materiais, corrigir primeiro a paleta antiga,
reduzir a predominância de fundos saturados e pesos tipográficos altos,
reintroduzir fundos claros, curvas e profundidade suave, e comparar com o site.
Editar os geradores `tools/build.mjs` dos cartões e `build.mjs` dos panfletos,
não apenas os HTMLs gerados: a regeneração sobrescreve os arquivos derivados.

Quando houver mudança de identidade solicitada pelo usuário, atualizar este
guia e os componentes afetados juntos, registrando data e mudança. Ajustes
isolados de campanha devem preservar os elementos de reconhecimento da marca.

## 14. Checklist de revisão

- [ ] Comparei a peça com o site atual ou uma captura atualizada, lado a lado.
- [ ] Usei a marca oficial, preservando proporção, cores e área de proteção.
- [ ] Usei Manrope e DM Sans reais, carregadas e incorporadas quando necessário.
- [ ] A paleta usa azul `#0073B9`, verde `#A2D21A` e escuro `#102F43`.
- [ ] Há predominância clara, espaço livre e hierarquia de leitura evidente.
- [ ] Curvas, bordas e sombras seguem o acabamento do site sem excesso.
- [ ] Há apenas uma ação principal por face/tela.
- [ ] Textos, contatos e condições foram conferidos nas fontes do projeto.
- [ ] Conferi a arte exportada, sem cortes, sobreposição ou fontes substituídas.
- [ ] Testei legibilidade no tamanho real e contraste sobre o fundo composto.
- [ ] Quando aplicável, conferi sangria, margens, resolução e QR no tamanho final.
- [ ] Registrei verificações pendentes, como prova física ou leitura do QR em papel.

## 15. Briefing reutilizável

> Crie [peça/formato] para a Pratic Limp seguindo `docs/design-system.md`.
> Use o site atual como referência: predominância clara, Manrope e DM Sans,
> texto #102F43, destaque #0073B9, pequenos acentos #A2D21A, curvas suaves e
> profundidade discreta. Preserve os SVGs oficiais. Organize marca, título,
> conteúdo e uma ação principal com bastante respiro. Adapte o vidro ao suporte
> sem comprometer a leitura. Consulte os dados comerciais do projeto, compare a
> peça com o site e revise a exportação no tamanho final. Os materiais antigos
> não são modelos visuais aprovados.
