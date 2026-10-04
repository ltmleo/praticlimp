import { company } from '../../data/company';
import Icon from '../Icon';

export default function TopBar() {
return (<div className="topbar"><div className="container"><span><i/> Pratic Limp. No mercado desde 1991.</span><a href={company.phoneHref}>Fale com a equipe: <strong>{company.phone}</strong> <Icon name="arrow" size={13}/></a></div></div>);
}
