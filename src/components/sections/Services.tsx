import { services } from '../../data/content';
import Icon from '../Icon';
import Reveal from '../Reveal';
import { contact } from '../../utils/site';

export default function Services({ onSelectService }: { onSelectService: (service: string) => void }) {
  return (<section className="solutions section" id="servicos"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow"><span className="section-index">01 /</span> NOSSOS SERVIÇOS</p><h2>Qual serviço sua<br/><span>empresa precisa?</span></h2></div><p>Da limpeza do dia a dia à cobertura de ausências, veja como podemos atender sua empresa.</p></Reveal><div className="services">{services.map(s=><article key={s.id} className={`service service-featured ${s.id==='terceirizacao'?'':'service-light'}`}><div className="service-top"><span className="service-number">{s.number}</span><Icon name={s.icon} size={46}/></div><div className="service-content"><p className="eyebrow">{s.tag}</p><h3>{s.name}</h3><p>{s.text}</p>{s.details.length>0&&<ul>{s.details.map(detail=><li key={detail}><Icon name="check" size={16}/>{detail}</li>)}</ul>}</div><a href="#orcamento" className="service-link" aria-label={`Solicitar orçamento: ${s.name}`} onClick={()=>onSelectService(s.name)}><span>Pedir orçamento</span><span className="circle-arrow"><Icon name="arrow" size={20}/></span></a></article>)}</div><div className="solutions-bottom"><span>Precisa de ajuda para escolher?</span><a href={contact}>Conte sua necessidade pelo WhatsApp <Icon name="arrow" size={17}/></a></div></div></section>);
}
