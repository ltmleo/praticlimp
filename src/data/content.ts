// Source ledger: docs/fontes-e-conteudo.md. No unsupported factual claims.
export const services = [
 {id:'terceirizacao',name:'Terceirização de limpeza',icon:'building',tag:'LIMPEZA DO DIA A DIA',text:'Uma equipe da Pratic Limp cuida da limpeza da sua empresa em período integral. A proposta define o que está incluído no serviço.',details:['Equipe em período integral','Contrato com vigência mensal','Proposta conforme a rotina do seu espaço']},
];
// Benefícios incluídos na terceirização; a cobertura de ausências não é contratada à parte.
export const benefits = [
 {icon:'clock',title:'Cobertura de ausências',text:'Substituição em férias, faltas e afastamentos, ou por solicitação da sua empresa. As condições ficam definidas na proposta.'},
 {icon:'people',title:'Profissionais preparados',text:'Equipe treinada e uniformizada para executar a limpeza na sua empresa.'},
 {icon:'spark',title:'Materiais e equipamentos',text:'Produtos e equipamentos para executar o serviço, conforme a proposta.'},
 {icon:'shield',title:'Responsabilidade na contratação',text:'Compromisso com os encargos, benefícios e direitos dos colaboradores.'},
];
// Perguntas de busca, em ordem do genérico ao orçamento. Respostas só com fatos de docs/fontes-e-conteudo.md (sem preço ou prazo).
export const faq = [
 ['O que é a terceirização de limpeza da Pratic Limp?', 'É a contratação de uma equipe de limpeza da Pratic Limp para trabalhar no seu espaço em período integral. Os profissionais são treinados e uniformizados, e nós cuidamos da substituição em faltas, férias e afastamentos. Materiais, produtos, equipamentos e demais condições ficam definidos na proposta.'],
 ['Quais cidades a Pratic Limp atende?', "Atendemos Americana, Santa Bárbara d'Oeste e Nova Odessa, no interior de São Paulo. Se o seu espaço fica em outra cidade da região, informe o endereço no pedido de orçamento para confirmarmos o atendimento."],
 ['Que tipos de empresa e local vocês atendem?', 'Indústrias, comércios, shoppings e escritórios, além de diversos condomínios e consultórios da região. Conte no pedido de orçamento como é o espaço e a rotina do local para prepararmos a proposta certa.'],
 ['Quanto custa terceirizar a limpeza?', 'O valor depende do espaço, da rotina de limpeza e do que entra na proposta, por isso cada local recebe um orçamento próprio. Para comparar, lembre que uma equipe própria custa mais que o salário: há encargos e benefícios, férias e 13º, cobertura de ausências, produtos e equipamentos.'],
 ['Vale mais a pena terceirizar ou contratar uma equipe própria?', 'Depende da sua empresa, mas a comparação justa é com o custo completo, não só com o salário. Na terceirização, a Pratic Limp cuida da equipe, das substituições e dos materiais previstos na proposta, e você acompanha o resultado sem administrar a rotina da limpeza.'],
 ['E se a profissional faltar ou sair de férias?', 'A Pratic Limp providencia a substituição em faltas, férias e afastamentos, e também quando o cliente pede a troca. Assim a limpeza continua. As condições de reposição para o seu local ficam definidas na proposta.'],
 ['Materiais, produtos e equipamentos estão incluídos?', 'A Pratic Limp trabalha com materiais, produtos e equipamentos para executar a limpeza. A proposta detalha o que está incluído no seu caso, para você saber exatamente o que está contratando.'],
 ['Como funciona o contrato?', 'A equipe trabalha em período integral, com contrato de vigência mensal. A Pratic Limp assume o compromisso com os encargos, benefícios e direitos dos colaboradores. Itens incluídos e condições de reposição ficam definidos na proposta.'],
 ['Por que escolher a Pratic Limp em vez de uma empresa de facilities?', 'Porque limpeza é a nossa especialidade desde 1991. A Pratic Limp se dedica à limpeza e conservação, com profissionais treinados e uniformizados para cuidar do seu espaço, e você contrata uma empresa experiente justamente no serviço de que precisa.'],
 ['Como peço um orçamento?', 'Preencha o formulário com nome, telefone e cidade e conte um pouco sobre o local. Ele prepara uma mensagem para você revisar e enviar pelo WhatsApp. Se preferir, ligue para (19) 97416-3336 ou escreva para adm@praticlimp.com.br.'],
];
// Lista informada e corrigida pelo usuário em 2026-10-30; AMA e Monta Farma acrescentados e Metalfarma removido no mesmo dia. Textk e AS Park aguardam confirmação e ficam de fora.
export const clients: { name: string; logo?: string; showName?: boolean }[] = [
 {name:'Tauá Biodiesel',logo:'clientes/taua-biodiesel.webp'}, {name:'Bandini',logo:'bandini.webp'},
 {name:'Supermercados Crema',logo:'clientes/supermercados-crema.webp'},
 // O logo do Welcome Center é só o símbolo "W"; o nome aparece abaixo dele.
 {name:'Welcome Center',logo:'clientes/welcome-center.webp',showName:true},
 {name:'Nova Giulen',logo:'clientes/nova-giulen.webp'}, {name:'Shopping Via Direta',logo:'clientes/shopping-via-direta.webp'},
 {name:'Droga Pires',logo:'clientes/droga-pires.webp'},
 {name:'Smart Mall',logo:'clientes/smart-mall.webp'}, {name:'Maxi Água',logo:'clientes/maxi-agua.webp'},
 {name:'Contabilidade Giordano',logo:'clientes/contabilidade-giordano.webp'},
 {name:'Associação Médica de Americana',logo:'clientes/associacao-medica-de-americana.webp'}, {name:'Monta Farma',logo:'clientes/monta-farma.webp'},
];
