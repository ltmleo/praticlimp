import { useEffect, useRef, useState } from 'react';
import { clients } from '../../data/content';
import Reveal from '../Reveal';
import { asset } from '../../utils/site';

type Client = (typeof clients)[number];

// The prerendered HTML shows the logo; once hydrated, the name stands in until the image arrives or if it fails.
// No lazy loading: the marquee clips cards outside its window, so lazy images would only start loading as they slide in.
// Low priority keeps these small files from competing with the hero.
function Logo({ client, copy }: { client: Client & { logo: string }; copy: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<'ready' | 'loading' | 'failed'>('ready');
  useEffect(() => {
    const img = ref.current;
    if (img && !img.complete) setState('loading');
    else if (img && !img.naturalWidth) setState('failed');
  }, []);
  return (
    <li className={['has-logo', client.showName && 'with-name', state !== 'ready' && `is-${state}`].filter(Boolean).join(' ')}>
      <img ref={ref} src={asset(`brand/${client.logo}`)} alt={copy || client.showName ? '' : client.name} width="110" height="72" fetchPriority="low" decoding="async"
        onLoad={() => setState('ready')} onError={() => setState('failed')}/>
      {client.showName ? <span>{client.name}</span> : <span className="client-name" aria-hidden="true">{client.name}</span>}
    </li>
  );
}

// The list is rendered twice so the CSS marquee loops seamlessly; the copy is hidden from assistive tech.
const Track = ({ copy = false }: { copy?: boolean }) => (
  <ul className="client-track" aria-hidden={copy || undefined} aria-label={copy ? undefined : 'Principais clientes'}>
    {clients.map(c => c.logo ? <Logo key={c.name} client={{ ...c, logo: c.logo }} copy={copy}/> : <li key={c.name}>{c.name}</li>)}
  </ul>
);

export default function Clients() {
  return (<section className="clients-section section" id="clientes"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">NOSSOS PRINCIPAIS CLIENTES</p><h2>Empresas que contam<br/><span>com a Pratic Limp.</span></h2></div><p>Indústrias, comércios, shoppings, escritórios e diversos condomínios e consultórios da região confiam a limpeza à nossa equipe.</p></Reveal></div><div className="client-marquee"><div className="client-rail"><Track/><Track copy/></div></div></section>);
}
