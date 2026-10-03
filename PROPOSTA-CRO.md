# Pratic Limp — reformulação e CRO

## 1. Diagnóstico e objetivo

Transformar a presença institucional em um caminho claro para pedidos qualificados de orçamento. O domínio atual incorpora uma página Wix por `frameset`; a nova implementação entrega HTML estático diretamente, com React, Vite e Motion para as interações.

Não foi executada uma auditoria de conversão ou medição de campo do site anterior. O diagnóstico é estrutural: a oportunidade é destacar o serviço, a história e o contato, utilizando a identidade verdadeira da empresa. [Fonte original](https://www.praticlimp.com.br/).

Toda afirmação institucional e cada ativo têm sua origem registrada em [Fontes e conteúdo](docs/fontes-e-conteudo.md). Nenhuma avaliação, certificação, cidade ou métrica foi criada.

## 2. Arquitetura da home — wireframe em texto

1. **Cabeçalho:** logo SVG original, links Soluções, Nossa história, Clientes, Dúvidas e CTA Solicitar orçamento. Barra superior com telefone; menu compacto no celular. Superfície translúcida com contraste preservado.
2. **Hero:** “Limpeza para sua empresa. Cuidado para sua rotina.”; explicação objetiva de terceirização e limpeza especializada; CTA Encontre sua solução e acesso direto ao WhatsApp. Composição usa material do site original e o início de atuação em 1991. Fotografias futuras ficam para outra etapa.
3. **Compromissos em destaque:** equipe treinada/uniformizada, período integral ou meio período e contrato mensal — informações declaradas na página de terceirização.
4. **Clientes:** seis logos da galeria institucional, apresentados como histórico de clientes. Sem dizer que são contratos atuais ou acrescentar avaliações.
5. **Serviços:** terceirização em destaque; pós-obra, vidros, pisos/pedras e cobertura de ausências em uma lista com descrições e orçamento por serviço. Filtros distinguem serviços empresariais e especializados.
6. **Nossa história:** atuação desde 1991, missão e valores. Fundo azul profundo com contraste entre títulos, texto e detalhes verde-lima.
7. **Diferenciais:** gente preparada; continuidade do serviço; estrutura de materiais e equipamentos; transparência da relação contratual. Quatro blocos com ícones, todos baseados no conteúdo institucional.
8. **FAQ:** cinco dúvidas sobre período de contratação, substituições, equipamentos, serviços especializados e orçamento.
9. **Orçamento:** nome, telefone, cidade, serviço e detalhes opcionais; revisão da mensagem e envio pelo WhatsApp. Telefone e e-mail como alternativas.
10. **Rodapé:** logo original, navegação, telefone, e-mail, Facebook e privacidade. CNPJ/endereço/mapa dependem de dados confirmados; não há cobertura geográfica inventada.

## 3. Copywriting pronto

**H1:** “Limpeza para sua empresa. Cuidado para sua rotina.”

**Subtítulo:** “Terceirização e limpeza especializada, com profissionais treinados e uniformizados. Para sua empresa e para você.”

### CTAs

- Cabeçalho: **Solicitar orçamento**.
- Hero: **Encontre sua solução**; secundário: **Falar pelo WhatsApp**.
- Serviços: **Quero essa solução**.
- Formulário: **Preparar meu orçamento** → **Continuar no WhatsApp**.
- Widget: **Fale com a Pratic**; nome acessível: **Falar com a Pratic Limp no WhatsApp**.
- Mensagem inicial: **Olá! Quero solicitar um orçamento da Pratic Limp.**

Não prometer gratuidade, atendimento 24 horas ou resposta em um prazo sem validação comercial. Preparar uma mensagem e enviá-la são etapas distintas, refletidas nos textos.

### Modalidades

**Terceirização de limpeza:** Profissionais de limpeza em período integral ou meio período. Equipe uniformizada e treinada, com materiais, produtos e equipamentos para a execução do serviço.

**Limpeza pós-obra:** Limpeza ao final de construções e reformas de pequeno, médio ou grande porte. Atendimento a construtoras, arquitetos e pessoas físicas.

**Limpeza de vidros:** Limpeza profissional de vidros com responsabilidade e cuidado na execução.

**Tratamento de pisos e pedras:** Limpeza, impermeabilização e remoção de ceras e sujeiras acumuladas. Tratamento de ardósia, granito, porcelanato, cerâmica, granilite e outros materiais.

**Cobertura de ausências:** Soluções para cobrir férias, faltas e afastamentos de funcionários de outras empresas.

### FAQ

1. **É possível contratar por meio período?** Sim. A Pratic Limp oferece terceirização de limpeza em período integral ou meio período. Fale com a equipe para alinhar a necessidade da sua empresa.
2. **Como funciona a substituição de profissionais?** A empresa prevê substituições em caso de faltas, afastamentos, férias ou por solicitação do cliente. Consulte as condições para a sua contratação.
3. **A empresa trabalha com materiais e equipamentos?** Sim. A execução dos serviços inclui o uso de materiais, produtos e equipamentos. Os detalhes do serviço devem ser alinhados na proposta.
4. **Quais serviços especializados estão disponíveis?** Limpeza pós-obra, limpeza de vidros e tratamento de pisos e pedras, incluindo limpeza, impermeabilização e remoção de ceras e sujeiras acumuladas.
5. **Como solicito um orçamento?** Preencha o formulário e revise a mensagem antes de continuar no WhatsApp. Você também pode ligar para (19) 97416-3336 ou enviar um e-mail para adm@praticlimp.com.br. Informe sua cidade para consultar a disponibilidade de atendimento.

## 4. UX e direção visual

- **Identidade:** logo vetorial fornecido; cores dos caminhos preservadas. Azul vivo e verde-lima da marca, com azul profundo como base de contraste. A gota é o favicon e um elemento discreto de assinatura.
- **Transparência:** efeito de vidro com blur, saturação moderada, bordas luminosas e sombras discretas. Aplicado ao cabeçalho, selo de história, filtros, FAQ, formulário e widget. Textos permanecem opacos; fallback sólido para navegadores sem suporte.
- **Composição:** hierarquia editorial, títulos amplos, espaços generosos e destaque maior para terceirização. O conteúdo não depende de uma galeria de fotografias genéricas.
- **Motion:** entrada por deslocamento curto, transições dos filtros, feedback de contato e progresso de leitura. Respeita movimento reduzido; sem rolagem sequestrada, parallax ou vídeo automático.
- **Mobile:** menu compacto, formulário adaptado, alvos de toque adequados e campos com 16 px. Foco visível, rótulos persistentes, link de pular conteúdo e FAQ nativo.
- **Prova social futura:** recolher depoimentos reais com contexto e autorização; só publicar métricas com período, fonte e responsável. Os logos atuais têm origem na galeria institucional.

## 5. Tecnologia, performance e mensuração

React + Vite + TypeScript + Motion. Build estático com HTML pré-renderizado da home e da privacidade; a pasta `dist/` pode ser publicada sem servidor de aplicação.

O formulário monta a solicitação localmente. O envio depende de confirmação pelo usuário no WhatsApp. Não há banco de leads nem confirmação automática de recebimento. Para captura independente do aplicativo, uma futura integração precisa de endpoint, antispam e CRM.

Metas de campo no percentil 75: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. São metas, não resultados medidos nesta entrega. Imagens locais, dimensões definidas, carregamento adiado abaixo da dobra e HTML pré-renderizado ajudam na base técnica. Avaliar fontes locais, compressão e cache na publicação. [Core Web Vitals](https://web.dev/articles/vitals).

| Ferramenta | Recomendação |
| --- | --- |
| GA4 | Mensurar origem, serviço escolhido, início/preparação de orçamento e clique no WhatsApp. Separar intenção de contato de lead recebido. |
| Meta Pixel | Ativar ao configurar campanhas e a política de consentimento; não tratar qualquer clique como lead confirmado. |
| Hotjar | Amostragem limitada para identificar fricção; mascarar campos e excluir a mensagem de orçamento. |
| CRM ou planilha comercial | Confirmar recebimento, qualificação, proposta e fechamento. É a fonte para qualidade real dos leads. |

Não há rastreadores ativos. Não enviar nome, telefone, cidade detalhada, texto livre ou URL completa de WhatsApp para analytics: o parâmetro `text` contém dados pessoais. Filtrar eventos automáticos de links externos se coletarem esse endereço.

GA4 recomenda `generate_lead` para solicitação enviada. Preparar a mensagem ou abrir o WhatsApp não comprova envio; registrar essa conversão apenas com confirmação adequada. [Eventos recomendados do GA4](https://support.google.com/analytics/answer/9267735).

## 6. Próximas validações

Antes de publicar: confirmar dados legais e cobertura, rever condições comerciais e autorizações dos ativos. Depois: medir taxa de contatos recebidos e qualificados, custo por oportunidade e propostas aceitas. Testar uma variável por vez, começando por CTA direto ao WhatsApp versus formulário de qualificação, com amostra e duração definidas pelo tráfego real.
