import { motion, useReducedMotion } from 'motion/react';
import Icon from './Icon';
import { contact } from '../utils/site';
export default function FloatingWhatsApp() {
 const reduced = useReducedMotion();
 return (<motion.a className="floating-contact" href={contact} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Pratic Limp no WhatsApp" whileHover={reduced?undefined:{transform:'translateY(-3px)'}} whileTap={reduced?undefined:{scale:.96}}><Icon name="chat" size={23}/><span>Fale por WhatsApp</span></motion.a>);
}
