import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import Brand from '../Brand';
import Icon from '../Icon';
import useGlassTone from '../../hooks/useGlassTone';

export default function Header() {
 const [menuOpen,setMenuOpen]=useState(false);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll();
 const menuButton=useRef<HTMLButtonElement>(null);
 const { ref: glassRef, tone } = useGlassTone<HTMLDivElement>(true);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape'&&menuOpen){setMenuOpen(false);menuButton.current?.focus()}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[menuOpen]);
 return (<header><div ref={glassRef} data-tone={tone} className="container nav"><Brand/><nav id="menu" className={menuOpen?'open':''} aria-label="Navegação principal" onClick={()=>setMenuOpen(false)}><a href="#servicos">Serviços</a><a href="#sobre">Sobre a Pratic Limp</a><a href="#clientes">Clientes</a><a href="#duvidas">Dúvidas</a><a className="mobile-menu-cta" href="#orcamento">Solicitar orçamento ↗</a></nav><a className="button header-cta" href="#orcamento">Solicitar orçamento <Icon name="arrow" size={18}/></a><button ref={menuButton} className="menu-toggle" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} aria-controls="menu" onClick={()=>setMenuOpen(!menuOpen)}><span/><span/></button></div>{!reduced&&<motion.div className="reading-progress" style={{scaleX:scrollYProgress}}/>}</header>);
}
