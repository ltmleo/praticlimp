import { asset, basePath } from '../utils/site';
export default function Brand({footer=false}:{footer?:boolean}) {
 return <a className={`brand ${footer?'brand-footer':''}`} href={basePath} aria-label="Pratic Limp — início"><picture><source media="(max-width: 620px)" srcSet={asset('brand/pratic-limp-horizontal.svg')}/><img src={asset('brand/pratic-limp.svg')} width="490" height="290" alt="Pratic Limp"/></picture><span>TERCEIRIZAÇÃO<br/>E LIMPEZA ESPECIALIZADA</span></a>;
}
