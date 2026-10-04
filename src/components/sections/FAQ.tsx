import { faq } from '../../data/content';
import Icon from '../Icon';
import Reveal from '../Reveal';
import { contact } from '../../utils/site';

export default function FAQ() {
  return (<section className="faq-section" id="duvidas"><div className="container faq-grid"><Reveal><p className="eyebrow"><span className="section-index">05 /</span> ANTES DE CONTRATAR</p><h2>O que você quer saber<br/><span>antes de contratar?</span></h2><p>Veja as condições de contratação<br/>e como pedir sua proposta.</p><a href={contact} className="text-link">Tenho outra dúvida <Icon name="arrow" size={18}/></a></Reveal><div className="faq-list">{faq.map(([q,a],i)=><details key={q}><summary><span className="faq-number">0{i+1}</span>{q}<span className="plus">+</span></summary><p>{a}</p></details>)}</div></div></section>);
}
