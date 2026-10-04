import QuoteForm from '../QuoteForm';
import Icon from '../Icon';
import Reveal from '../Reveal';
import { company } from '../../data/company';

export default function Contact({ selectedService }: { selectedService: string }) {
  return (<section className="contact-section section container" id="orcamento"><Reveal className="contact-copy"><p className="eyebrow"><span className="section-index">06 /</span> VAMOS CONVERSAR</p><h2>Vamos conversar sobre<br/>a limpeza <span>da sua empresa?</span></h2><p>Diga onde fica o espaço e o que você precisa.<br/>A equipe da Pratic Limp conversa com você sobre o serviço.</p><a className="contact-line" href={company.phoneHref}><Icon name="phone" size={22}/><span><small>LIGUE PARA A EQUIPE</small>{company.phone}</span><Icon name="arrow" size={20}/></a><a className="contact-line" href={`mailto:${company.email}`}><Icon name="mail" size={22}/><span><small>ENVIE UM E-MAIL</small>{company.email}</span><Icon name="arrow" size={20}/></a><div className="coverage"><Icon name="pin" size={20}/><p>Informe a cidade para confirmar<br/>o atendimento no seu local.</p></div></Reveal><QuoteForm selectedService={selectedService}/></section>);
}
