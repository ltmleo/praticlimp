# SEO / GEO / AEO Audit Report

- **Site:** https://ltmleo.github.io/praticlimp/ (Pratic Limp)
- **Audit type:** Full
- **Audit date:** 2026-10-24

## Executive Summary

O site é uma página única (one-page) bem escrita, com texto claro, FAQ visível de seis perguntas, dados de contato completos e HTML semântico razoável. O problema mais urgente é de indexação: a tag canonical aponta para `https://www.praticlimp.com.br/`, um site diferente e mais antigo (título "Pratic Limp - Terceirização de limpeza para sua empresa e para você"), então o Google é instruído a ignorar esta versão. Faltam também dados estruturados (nenhum JSON-LD), Open Graph/Twitter Card, `robots.txt` e `sitemap.xml`. A maior oportunidade é adicionar `LocalBusiness` + `FAQPage` e transformar o conteúdo já existente em respostas extraíveis por buscadores e IAs.

| Dimension | Score | Status | Key Takeaway |
|---|---|---|---|
| SEO | 5/10 | 🟡 On Track | Conteúdo e meta tags básicas boas; canonical aponta para outro domínio, sem sitemap/robots/OG |
| GEO | 4/10 | 🔴 Needs Work | Entidade clara no texto, mas sem schema Organization/LocalBusiness, sem `sameAs`, sem endereço e sem provas verificáveis |
| AEO | 5/10 | 🟡 On Track | FAQ visível em `<details>` com boas respostas, mas sem `FAQPage` schema e sem títulos em forma de pergunta |
| **Combined** | **14/30** | | |

## Pages Audited

Método: HTML bruto obtido com `curl` (a ferramenta WebFetch devolve apenas texto renderizado) e conferido com a leitura renderizada. Domínio de teste: `ltmleo.github.io`. O site tem uma página de conteúdo e uma página legal, então não foi preciso chegar perto do limite de 40 páginas.

| URL | Page Type | Notes |
|---|---|---|
| `/praticlimp/` | Homepage (one-page) | 200. Título, descrição, canonical, 1 H1, 6 seções H2, 6 `<details>` de FAQ; sem JSON-LD/OG |
| `/praticlimp/privacidade/` | Política de privacidade | 200. Título próprio, canonical para `www.praticlimp.com.br/privacidade/`; meta description copiada da home (duplicada) |
| `/praticlimp/robots.txt` | Crawl directives | 404 (também 404 em `ltmleo.github.io/robots.txt`) |
| `/praticlimp/sitemap.xml` | Sitemap | 404 |
| `/praticlimp/llms.txt` | Arquivo para IAs | 404 (opcional) |
| `https://www.praticlimp.com.br/` | Domínio do canonical | 200, site diferente, título distinto; sem robots.txt nem sitemap.xml (404) |

Não existem páginas separadas de Sobre, Serviços, Cases, Blog ou Contato: tudo vive como âncoras (`#servicos`, `#sobre`, `#clientes`, `#duvidas`, `#orcamento`) na home. Nada disso foi marcado como "ausente" por engano; é uma decisão de arquitetura (ver recomendações).

## SEO Analysis — 5/10 🟡

### Technical On-Page

| Signal | Finding | Status |
|---|---|---|
| Title | `Pratic Limp \| Terceirização e limpeza desde 1991` (48 caracteres). Marca primeiro, sem cidade/região | 🟡 Needs Attention |
| Meta description | "Terceirização de limpeza, pós-obra, vidros e tratamento de pisos e pedras. Pratic Limp: no mercado institucional desde 1991. Solicite seu orçamento." (~150 caracteres, com CTA) | 🟢 Good |
| H1 | Um único H1: "A limpeza da sua empresa em boas mãos." Bonito, mas sem palavra-chave de serviço ou local | 🟡 Needs Attention |
| Hierarquia H2/H3 | H2 por seção (Qual serviço sua empresa precisa?, Você precisa saber com quem conta, O salário é só uma parte do custo, etc.) e H3 por serviço. Estrutura lógica | 🟢 Good |
| Canonical | `https://www.praticlimp.com.br/` na home e `.../privacidade/` na página legal. Aponta para **outro site** que não é este | 🔴 Missing (incorreto) |
| Robots meta | Sem `noindex`; indexável | 🟢 Good |
| Viewport | `width=device-width, initial-scale=1` | 🟢 Good |
| `robots.txt` / `sitemap.xml` | Ambos 404 | 🔴 Missing |
| Open Graph / Twitter Card | Nenhuma tag `og:*` ou `twitter:*` | 🔴 Missing |
| Idioma | Não foi possível confirmar `lang="pt-BR"` no `<html>` pelo trecho analisado; verifique | 🟡 Needs Attention |
| Alt text | Logo e logos de clientes com alt ("Divelp", "Bandini"...); imagem principal com alt genérico ("Imagem de limpeza de superfície publicada pela Pratic Limp"); ícones decorativos com `alt=""` corretos | 🟡 Needs Attention |
| URLs | `/praticlimp/` e `/praticlimp/privacidade/`: limpas. Prefixo `/praticlimp/` vem do GitHub Pages | 🟢 Good |
| Links internos | Navegação por âncoras com texto descritivo; CTAs repetidos "Pedir orçamento" | 🟢 Good |
| Meta description da privacidade | Idêntica à da home | 🟡 Needs Attention |
| Favicon / theme-color | `favicon.svg` e `theme-color #102f43` presentes | 🟢 Good |

### Content Quality

| Signal | Finding | Status |
|---|---|---|
| Volume de texto | Uma página com conteúdo considerável (serviços, história, comparação de custo, FAQ), mas cada serviço tem só 1-2 frases. Nenhum serviço tem página própria para ranquear | 🟡 Needs Attention |
| Tema e palavras-chave | Tema claro: terceirização de limpeza, pós-obra, vidros, pisos e pedras (ardósia, granito, porcelanato, granilite). Faltam termos de busca comuns como "empresa de limpeza em [cidade]", "limpeza predial", "limpeza industrial" | 🟡 Needs Attention |
| Local | Telefone é (19) (região de Campinas/SP), mas a cidade/região de atendimento nunca é citada; o site pede "Informe a cidade para confirmar o atendimento" | 🔴 Missing |
| Datas | Só "© 2026" no rodapé; sem datas de atualização | 🟡 Needs Attention |
| Legibilidade | Seções numeradas (01-06), subtítulos, listas e blocos curtos | 🟢 Good |
| Renderização | Conteúdo presente no HTML inicial (não depende de JS para aparecer); a página tem 34 KB | 🟢 Good |

### Structured Data

| Signal | Finding | Status |
|---|---|---|
| JSON-LD / microdata | Nenhum encontrado | 🔴 Missing |
| Tipos recomendados | `LocalBusiness` (ou `ProfessionalService`/`CleaningService`), `Organization`, `FAQPage`, `Service`, `WebSite`, `BreadcrumbList` (na página de privacidade) | 🔴 Missing |

## GEO Analysis — 4/10 🔴

### E-E-A-T Assessment

| Signal | Finding | Status |
|---|---|---|
| Quem está por trás | Seção "Nossa história": "Trabalhamos com limpeza e conservação no mercado institucional desde 1991". Nenhum nome de sócio, responsável ou equipe | 🟡 Needs Attention |
| Autoria | Sem autores, sem blog | 🔴 Missing |
| Contato | Telefone `(19) 97416-3336`, e-mail `adm@praticlimp.com.br`, WhatsApp, formulário. Sem endereço físico nem CNPJ | 🟡 Needs Attention |
| Prova social | Seis logos de clientes (Divelp, Bandini, Metalfarma, Fatex, Volcano, Sega). Sem depoimentos, números, certificações, fotos de trabalhos ou avaliações | 🟡 Needs Attention |
| Organization schema | Ausente | 🔴 Missing |
| Transparência | Página de privacidade existe e é linkada; o formulário não envia dados a servidor (abre WhatsApp), o que é bom e está explicado | 🟢 Good |

### Content for AI Synthesis

| Signal | Finding | Status |
|---|---|---|
| Afirmação central | Clara no topo: limpeza para empresas, meio período ou integral, equipe treinada e uniformizada | 🟢 Good |
| Densidade factual | Poucos fatos citáveis: ano (1991), tipos de piso, modalidades. Sem números (clientes atendidos, equipe, área, tempo de resposta) | 🟡 Needs Attention |
| Clareza da entidade | "Pratic Limp" usada de forma consistente. Há ambiguidade entre este site e o domínio `praticlimp.com.br`, que tem outro conteúdo | 🟡 Needs Attention |
| Fontes externas | Nenhuma citação (ex.: normas, NR, legislação trabalhista ao comparar custos) | 🟡 Needs Attention |
| Comparação de custos | Seção "O custo da limpeza" é original e útil, mas ilustrativa e sem valores ("Comparação ilustrativa, sem escala de valores"), logo pouco citável | 🟡 Needs Attention |

### Technical GEO

| Signal | Finding | Status |
|---|---|---|
| HTTPS | Sim | 🟢 Good |
| Rastreabilidade | HTML estático com conteúdo; sem bloqueio (não há robots.txt, então nada impede crawlers de IA) | 🟢 Good |
| `sameAs` | Link para Facebook (`facebook.com/praticlimpSP/`) existe no rodapé, mas sem marcação `sameAs`; sem Instagram/LinkedIn/Google Business Profile | 🟡 Needs Attention |
| Canonical x entidade | Sinal conflitante: o canonical aponta para outro domínio, o que confunde qual é a fonte oficial | 🔴 Missing (incorreto) |
| `llms.txt` | Ausente (opcional, baixo impacto comprovado) | 🟡 Needs Attention |

## AEO Analysis — 5/10 🟡

### Featured Snippet Eligibility

| Signal | Finding | Status |
|---|---|---|
| Respostas diretas | As seis respostas do FAQ têm 25-45 palavras, diretas e começam com "Sim." ou com a resposta (ex.: "Sim. Você pode contratar a limpeza em meio período ou período integral.") | 🟢 Good |
| Definição "X é..." | Não há frase definindo "terceirização de limpeza" | 🟡 Needs Attention |
| Listas | Listas de benefícios e itens incluídos existem, mas não são passos numerados nem respondem perguntas de busca | 🟡 Needs Attention |
| Tabelas | Nenhuma; a comparação equipe própria x terceirizada é um diagrama visual, não uma tabela legível por máquina | 🟡 Needs Attention |

### Structured Answer Formats

| Signal | Finding | Status |
|---|---|---|
| FAQPage schema | Ausente apesar de 6 perguntas e respostas prontas em `<details>/<summary>` | 🔴 Missing |
| HowTo | Ausente; "Como peço um orçamento?" poderia virar passo a passo | 🟡 Needs Attention |
| Títulos em forma de pergunta | Só o H2 de FAQ ("O que você quer saber antes de contratar?") e as próprias perguntas em `<summary>`; os H2/H3 de serviços são afirmativos | 🟡 Needs Attention |
| Speakable | Ausente (pouco relevante em pt-BR) | 🟡 Needs Attention |

### Voice Search Readiness

| Signal | Finding | Status |
|---|---|---|
| Linguagem | Conversacional e direta | 🟢 Good |
| Perguntas long-tail | Cobre "meio período", "se o profissional faltar", "materiais incluídos". Faltam: preço/quanto custa, prazo de início, áreas atendidas, diferença entre terceirizar e contratar CLT, pós-obra (como funciona) | 🟡 Needs Attention |
| Sinais locais | Sem endereço, cidade, região ou `areaServed`; sem Google Business Profile citado | 🔴 Missing |

## Priority Recommendations

| Priority | Issue | Dimension | Effort | Impact |
|---|---|---|---|---|
| 🔴 Critical | Canonical aponta para `www.praticlimp.com.br` (site antigo diferente). Defina o domínio definitivo: se este site vai substituir o antigo, publique-o nesse domínio e mantenha o canonical; se vai coexistir, aponte o canonical para a própria URL | SEO / GEO | Low | Very High |
| 🟠 High | Adicionar JSON-LD `LocalBusiness` com nome, logo, telefone, e-mail, `areaServed`, `foundingDate: 1991`, `sameAs` (Facebook) e `openingHours` | GEO / SEO | Low | High |
| 🟠 High | Adicionar `FAQPage` JSON-LD com as 6 perguntas já escritas (o texto precisa bater com o visível) | AEO | Low | High |
| 🟠 High | Citar cidade/região de atendimento e endereço (ou área de cobertura) no texto, título e schema | SEO / AEO | Low | High |
| 🟠 High | Criar `robots.txt` e `sitemap.xml` (em `public/`) com a URL definitiva e `Sitemap:` apontando para ele | SEO | Low | Medium |
| 🟡 Medium | Adicionar Open Graph e Twitter Card (`og:title`, `og:description`, `og:image` 1200x630, `og:locale pt_BR`) | SEO | Low | Medium |
| 🟡 Medium | Páginas dedicadas por serviço (pós-obra, vidros, pisos e pedras, terceirização) com 400+ palavras, FAQ próprio e schema `Service` | SEO / AEO | High | High |
| 🟡 Medium | Reforçar E-E-A-T: depoimentos autorizados de clientes, fotos reais de serviços, números (anos, clientes, equipe), responsável pela empresa, CNPJ no rodapé | GEO | Medium | Medium |
| 🟡 Medium | Ampliar o FAQ (preço, prazo, áreas atendidas, pós-obra, CLT x terceirização) e usar perguntas como H2/H3 nas páginas de serviço | AEO | Medium | Medium |
| 🟢 Quick Win | Incluir serviço e região no título/H1 (ex.: "Terceirização de limpeza em [cidade] \| Pratic Limp") | SEO | Low | Medium |
| 🟢 Quick Win | Meta description própria para `/privacidade/` (ou `noindex` nela) | SEO | Low | Low |
| 🟢 Quick Win | Melhorar alt da imagem principal para descrever a cena real; confirmar `lang="pt-BR"` no `<html>` | SEO | Low | Low |
| 🟢 Quick Win | Criar/verificar Google Business Profile e citá-lo no `sameAs`; registrar o site no Google Search Console e Bing Webmaster | GEO / SEO | Low | High |

## What's Working Well

- **HTML estático com conteúdo real:** o texto está no HTML inicial (34 KB), sem depender de JavaScript para ser lido por crawlers.
- **Meta description forte:** descreve os serviços, cita 1991 e termina com CTA.
- **Estrutura clara:** um H1, H2 por seção e H3 por serviço, com seções numeradas e âncoras de navegação.
- **FAQ útil e honesto:** seis respostas diretas em `<details>`, que evitam promessas absolutas ("Combine as condições na proposta").
- **Dados de contato completos:** telefone, e-mail, WhatsApp com mensagem pré-preenchida e formulário que apenas prepara a mensagem.
- **Acessibilidade e performance básicas:** `alt` correto nos logos, `alt=""` nos ícones decorativos, `loading="lazy"` nos logos de clientes, `width`/`height` definidos, `fetchPriority="high"` na imagem principal e `preload`.
- **Privacidade transparente:** página própria, linkada do formulário.
- **Tema e identidade consistentes:** `theme-color`, favicon SVG, nome da marca usado de forma uniforme.

## Limites desta auditoria

Não foi possível avaliar, só com HTML: Core Web Vitals e velocidade real (use [pagespeed.web.dev](https://pagespeed.web.dev)), renderização móvel, perfil de backlinks e autoridade de domínio (Ahrefs, Semrush ou Search Console), indexação real e posições (Google Search Console), e o atributo `lang` do `<html>`, que o recorte analisado não mostrou. Avaliei apenas `ltmleo.github.io/praticlimp/`; o domínio `www.praticlimp.com.br` foi consultado só para entender o canonical, não auditado.

## Glossary

- **SEO (Search Engine Optimization):** otimização para aparecer bem nos resultados orgânicos de buscadores como Google e Bing.
- **GEO (Generative Engine Optimization):** otimização para ser lido, entendido e citado por buscadores com IA (ChatGPT Search, Perplexity, Gemini, Google AI Overviews).
- **AEO (Answer Engine Optimization):** otimização para ser a resposta direta em snippets em destaque, caixas "As pessoas também perguntam" e assistentes de voz.
- **Canonical:** tag que informa ao buscador qual URL é a versão oficial de uma página.
- **JSON-LD:** formato de dados estruturados que descreve a página (empresa, FAQ, serviços) de forma legível por máquinas.
- **E-E-A-T:** Experiência, Especialização, Autoridade e Confiabilidade, critérios de qualidade usados pelos buscadores.
