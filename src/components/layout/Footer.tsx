import Brand from '../Brand';
import { company } from '../../data/company';
import { basePath } from '../../utils/site';

export default function Footer() {
return (<footer><div className="container footer-main"><div><Brand footer/><p>Limpeza e conservação<br/>para empresas desde 1991.</p></div><div><h3>Explore</h3><a href="#servicos">Nossos serviços</a><a href="#sobre">Sobre a Pratic Limp</a><a href="#clientes">Clientes</a></div><div><h3>Fale com a gente</h3><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href="https://www.facebook.com/praticlimpSP/" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div><a href="#conteudo" className="back-top" aria-label="Voltar ao início">↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Pratic Limp.</span><span>LIMPEZA E CONSERVAÇÃO DESDE 1991.</span><a href={`${basePath}privacidade/`}>Privacidade</a></div></footer>);
}
