import { clients } from '../../data/content';

export default function Clients() {
  return (<section className="clients container" id="clientes"><div className="clients-caption"><p className="eyebrow">NOSSOS PRINCIPAIS<br/>CLIENTES.</p><p>Empresas da região que<br/>contam com a Pratic Limp.</p></div><ul className="client-names" aria-label="Principais clientes">{clients.map(name=><li key={name}>{name}</li>)}</ul></section>);
}
