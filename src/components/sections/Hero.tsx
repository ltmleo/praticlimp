import { motion, useReducedMotion } from 'motion/react';
import Icon from '../Icon';
import Reveal from '../Reveal';
import { asset, contact } from '../../utils/site';

export default function Hero() {
  const reduced = useReducedMotion();
  return (<section className="hero"><div className="container hero-grid">
    <Reveal className="hero-copy"><p className="eyebrow"><span className="small-rule"/> PRATIC LIMP · DESDE 1991</p><h1>A limpeza da<br/>sua empresa<br/><span>em boas mãos.</span></h1><p className="hero-description">Conte com profissionais treinados e uniformizados, em meio período ou período integral. Fale com a Pratic Limp sobre a rotina do seu espaço.</p><div className="hero-actions"><a className="button button-blue" href="#orcamento">Solicitar orçamento <span><Icon name="arrow" size={20}/></span></a><a className="hero-secondary" href={contact}>Conversar pelo WhatsApp <Icon name="chat" size={17}/></a></div><div className="hero-footnote"><span className="tiny-logo"><img className="brand-drop" src={asset('brand/pratic-limp-gota.svg')} alt="" width="32" height="32"/></span><p>Responsabilidade com a sua empresa.<br/><strong>Respeito por quem trabalha nela.</strong></p></div></Reveal>
    <div className="hero-stage"><div className="stage-rings" aria-hidden="true"><span/><span/><span/></div><div className="stage-top"><span>EQUIPE PREPARADA<br/>PARA O DIA A DIA.</span><img className="brand-drop" src={asset('brand/pratic-limp-gota.svg')} alt="" width="40" height="40"/></div><motion.img initial={false} animate={reduced?undefined:{transform:['translateY(18px)','translateY(0px)']}} transition={{duration:1,ease:[.22,1,.36,1]}} className="hero-business-image" src={asset('brand/terceirizacao.png')} width="472" height="317" fetchPriority="high" alt="Imagem de limpeza de superfície publicada pela Pratic Limp"/><div className="stage-note"><span className="lime-dot"/> TERCEIRIZAÇÃO DE LIMPEZA</div><div className="heritage-card"><span>NO MERCADO<br/>INSTITUCIONAL DESDE</span><strong>1991<span>↗</span></strong><p>Experiência em limpeza<br/>e conservação.</p></div><span className="stage-caption">LIMPEZA E CONSERVAÇÃO PARA EMPRESAS.</span></div>
   </div></section>);
}
