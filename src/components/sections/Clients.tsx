import { clients } from '../../data/content';
import Reveal from '../Reveal';
import { asset } from '../../utils/site';

// The list is rendered twice so the CSS marquee loops seamlessly; the copy is hidden from assistive tech.
const Track = ({ copy = false }: { copy?: boolean }) => (
  <ul className="client-track" aria-hidden={copy || undefined} aria-label={copy ? undefined : 'Principais clientes'}>
    {clients.map(c => <li key={c.name} className={c.logo ? 'has-logo' : ''}>{c.logo ? <img src={asset(`brand/${c.logo}`)} alt={copy ? '' : c.name} width="110" height="72" loading="lazy"/> : c.name}</li>)}
  </ul>
);

export default function Clients() {
  return (<section className="clients-section section" id="clientes"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">NOSSOS PRINCIPAIS CLIENTES</p><h2>Empresas que contam<br/><span>com a Pratic Limp.</span></h2></div><p>Indústrias, comércios, shoppings e escritórios da região confiam a limpeza à nossa equipe.</p></Reveal></div><div className="client-marquee"><div className="client-rail"><Track/><Track copy/></div></div></section>);
}
