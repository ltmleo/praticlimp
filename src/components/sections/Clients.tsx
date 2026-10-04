import { clients } from '../../data/content';
import { asset } from '../../utils/site';

export default function Clients() {
  return (<section className="clients container" id="clientes"><div className="clients-caption"><p className="eyebrow">EMPRESAS QUE FAZEM PARTE<br/>DA NOSSA HISTÓRIA.</p><p>Alguns dos clientes<br/>que já atendemos.</p></div><div className="client-logos">{clients.map(client=><img key={client.name} src={asset(`brand/${client.file}`)} alt={client.name} width="140" height="70" loading="lazy"/>)}</div></section>);
}
