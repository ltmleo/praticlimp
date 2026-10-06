// IDs públicos são permanentes: não renumerar ao reorganizar o catálogo.
export const route = 'acervo-7f3c9a2e';
const face = (label, source, suffix) => ({ label, source, suffix });
export const catalog = [
  ...[
    ['PL-P01', 'panfleto-institucional', 'Panfleto institucional', 'Panfletos', '148 × 210 mm · A5'],
    ['PL-P02', 'panfleto-terceirizacao', 'Panfleto terceirização', 'Panfletos', '148 × 210 mm · A5'],
    ['PL-C01', 'cartao-essencial', 'Cartão essencial', 'Cartões', '90 × 50 mm'],
    ['PL-C02', 'cartao-vidro', 'Cartão vidro suave', 'Cartões', '90 × 50 mm'],
  ].map(([code, id, title, type, size]) => ({ code, id, title, type, size, status: 'Atual', revision: 'DS 1.0',
    note: 'Design system atual. Desde 1991, sem contagem de anos ou carteira de clientes.',
    generator: 'docs/materiais/build.mjs', selector: `pieces → ${id}`, source: `docs/materiais/${id}.html`, pdf: `output/pdf/${id}.pdf`,
    faces: [face('Frente', `docs/materiais/previews/${id}-front.png`, 'F'), face('Verso', `docs/materiais/previews/${id}-back.png`, 'V')] })),
  ...['01-essencial', '02-azul-institucional', '03-gota-grafica', '04-editorial'].map((id, i) => ({
    code: `AR-C0${i+1}`, id, title: ['Cartão essencial anterior', 'Cartão azul institucional', 'Cartão gota gráfica', 'Cartão editorial'][i],
    type: 'Cartões', size: '90 × 50 mm', status: 'Anterior', revision: 'Antes do DS',
    note: 'Versão anterior ao design system. Mantida para comparação.', generator: 'docs/cartao-de-visitas/tools/build.mjs', selector: `variants → ${id}`,
    source: `docs/cartao-de-visitas/${id}.html`, pdf: `docs/cartao-de-visitas/${id}.pdf`,
    faces: [face('Frente', `docs/galeria/previews/${id}-front.png`, 'F'), face('Verso', `docs/galeria/previews/${id}-back.png`, 'V')],
  })),
  ...['01-direta','02-confianca','03-flexibilidade','04-empresario'].flatMap((id, i) => ['print','feed','story'].map(format => ({
    code: `AR-P0${i+1}-${{print:'A5',feed:'FEED',story:'STORY'}[format]}`, id,
    title: `${['Direta','Confiança','Flexibilidade','Empresário'][i]} · ${{print:'A5',feed:'Feed',story:'Story'}[format]}`,
    type: format === 'print' ? 'Panfletos' : 'Digital', size: {print:'148 × 210 mm · A5',feed:'1080 × 1350 px',story:'1080 × 1920 px'}[format],
    status: 'Anterior', revision: 'Antes do DS', note: 'Campanha anterior ao design system. Mantida para comparação.',
    generator: 'docs/panfletos/build.mjs', selector: `variants → ${id}; formato ${format}`, source: `docs/panfletos/${id}-${format}.html`,
    ...(format === 'print' ? { pdf: `docs/panfletos/${id}.pdf` } : {}),
    faces: format === 'print' ? [face('Frente', `docs/panfletos/previews/${id}-front.png`, 'F'), face('Verso', `docs/panfletos/previews/${id}-back.png`, 'V')]
      : [face(format === 'feed' ? 'Feed' : 'Story', `docs/panfletos/${id}-${format}.png`, 'D')],
  }))),
  ...[['19.21.05','Frente'], ['19.21.04','Verso']].map(([time, label], i) => ({ code: `REF-0${i+1}`, id: `referencia-${i+1}`, title: `Material histórico · ${label.toLowerCase()}`,
    type: 'Referências', size: 'Fotografia do material original', status: 'Referência', revision: 'Histórico',
    note: 'Referência de origem. Idade e logos de clientes retratados não devem ser repetidos nas novas peças.',
    source: `docs/references/WhatsApp Image 2026-10-04 at ${time}.jpeg`,
    faces: [face(label, `docs/references/WhatsApp Image 2026-10-04 at ${time}.jpeg`, 'R')],
  })),
];
