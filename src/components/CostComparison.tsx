import { motion, useReducedMotion } from 'motion/react';
import Icon from './Icon';
import '../styles/cost-comparison.css';

const additionalCosts = [
  { title: 'Encargos e benefícios', description: 'As obrigações de quem contrata.', icon: 'shield' },
  { title: 'Férias e 13º salário', description: 'Despesas que precisam de planejamento.', icon: 'clock' },
  { title: 'Cobertura de ausências', description: 'A limpeza continua nas faltas e férias.', icon: 'people' },
  { title: 'Produtos e equipamentos', description: 'A estrutura para executar o serviço.', icon: 'spark' },
];

const chartItems = [
  { label: 'Salário', id: 'salary' },
  { label: 'Encargos e benefícios', id: 'charges' },
  { label: 'Férias e 13º', id: 'vacation' },
  { label: 'Cobertura de ausências', id: 'coverage' },
  { label: 'Produtos e equipamentos', id: 'supplies' },
  { label: 'Outros*', id: 'other' },
];

export default function CostComparison({ onRequestQuote }: { onRequestQuote: () => void }) {
  const reducedMotion = useReducedMotion();
  const fillBar = reducedMotion ? undefined : { transform: ['scaleX(0)', 'scaleX(1)'] };
  const fillTransition = { duration: 1.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="cost-section section" id="vale-a-pena" aria-labelledby="cost-heading">
      <div className="container">
        <div className="cost-heading">
          <div>
            <p className="eyebrow"><span className="section-index">03 /</span> O CUSTO DA LIMPEZA</p>
            <h2 id="cost-heading">O salário é só<br/><span>uma parte do custo.</span></h2>
          </div>
          <p>Manter a limpeza com equipe própria envolve outras despesas e tarefas de gestão. Vale olhar para tudo isso antes de decidir como contratar.</p>
        </div>

        <div className="cost-diagram">
          <figure className="cost-own">
            <figcaption className="cost-kicker">COM EQUIPE PRÓPRIA</figcaption>
            <div className="cost-salary">
              <span className="cost-salary-icon"><Icon name="people" size={27}/></span>
              <div><h3>Salário</h3><p>O ponto de partida da conta</p></div>
            </div>
            <div className="cost-addition" aria-hidden="true"><span>+</span></div>
            <ul className="cost-extras">
              {additionalCosts.map(item => (
                <li key={item.title}>
                  <Icon name={item.icon} size={23}/>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
            <div className="cost-total-line">
              <span aria-hidden="true">=</span>
              <p>O custo completo de manter<br/><strong>a limpeza da sua empresa</strong></p>
            </div>
          </figure>

          <div className="cost-service">
            <p className="cost-kicker">COM A PRATIC LIMP</p>
            <div className="cost-hub" aria-hidden="true">
              <div className="cost-hub-orbit"/>
              <div className="cost-hub-mark"><img src={`${import.meta.env.BASE_URL}brand/pratic-limp-gota.svg`} width="74" height="74" alt=""/></div>
              <span className="cost-hub-node cost-node-people"><Icon name="people" size={25}/></span>
              <span className="cost-hub-node cost-node-clock"><Icon name="clock" size={25}/></span>
              <span className="cost-hub-node cost-node-spark"><Icon name="spark" size={25}/></span>
            </div>
            <h3>Uma empresa para cuidar<br/>dessa rotina com você.</h3>
            <p className="cost-service-intro">Ao terceirizar, você conta com uma equipe preparada e tem com quem resolver as necessidades da limpeza.</p>
            <ul className="cost-included">
              <li><Icon name="check" size={19}/> Profissionais treinados e uniformizados</li>
              <li><Icon name="check" size={19}/> Substituições em férias, faltas e afastamentos</li>
              <li><Icon name="check" size={19}/> Produtos, materiais e equipamentos</li>
            </ul>
            <p className="cost-scope">A proposta define o período de trabalho, os itens incluídos e as condições de reposição.</p>
          </div>
        </div>

        <figure className="cost-chart" aria-labelledby="cost-chart-heading" aria-describedby="cost-illustration">
          <h3 id="cost-chart-heading">Do salário ao custo total</h3>
          <div className="cost-chart-rows">
            <div className="cost-chart-row">
              <span className="cost-row-label">Equipe própria</span>
              <div className="cost-track" aria-hidden="true">
                <motion.div className="cost-stacked-bar" initial={false} whileInView={fillBar} viewport={{ once: true, amount: 0.8 }} transition={fillTransition}>
                  {chartItems.map(item => <span key={item.id} className={`cost-segment cost-tone-${item.id}`}/>)}
                </motion.div>
              </div>
            </div>
            <div className="cost-chart-row">
              <span className="cost-row-label cost-row-pratic">Pratic Limp</span>
              <div className="cost-track" aria-hidden="true"><motion.div className="cost-pratic-bar" initial={false} whileInView={fillBar} viewport={{ once: true, amount: 0.8 }} transition={{ ...fillTransition, delay: 0.18 }}/></div>
            </div>
          </div>
          <ul className="cost-chart-legend" aria-label="Componentes do custo da equipe própria">
            {chartItems.map(item => <li key={item.id}><span className={`cost-swatch cost-tone-${item.id}`} aria-hidden="true"/>{item.label}</li>)}
          </ul>
          <figcaption className="cost-chart-caption">
            <p className="cost-other-note"><strong>*Outros:</strong> contratação, treinamento, desligamento e eventuais custos judiciais.</p>
            <p id="cost-illustration">Comparação ilustrativa, sem escala de valores. A economia depende dos custos da sua empresa e da proposta contratada.</p>
          </figcaption>
        </figure>

        <div className="cost-action">
          <div><h3>Vale comparar o serviço completo.</h3><p>Peça uma proposta e veja o que a Pratic Limp pode assumir na sua rotina.</p></div>
          <a href="#orcamento" className="button button-blue" onClick={onRequestQuote}>Pedir orçamento <Icon name="arrow" size={19}/></a>
        </div>
      </div>
    </section>
  );
}
