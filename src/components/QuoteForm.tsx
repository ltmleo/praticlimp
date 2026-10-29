import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { company } from '../data/company';
import Icon from './Icon';
const privacyUrl = `${import.meta.env.BASE_URL}privacidade/`;
export default function QuoteForm() {
 const [message,setMessage]=useState('');
 const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 const output=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>{if(message)output.current?.focus()},[message]);
 function prepare(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const data=new FormData(event.currentTarget);
  setMessage(`Olá, Pratic Limp! Gostaria de solicitar um orçamento.\n\nNome: ${String(data.get('name')).trim()}\nTelefone: ${data.get('phone')}\nCidade: ${String(data.get('city')).trim()}\nServiço: Terceirização de limpeza\nPeríodo: ${data.get('period')}\nDetalhes: ${String(data.get('message')).trim() || 'A combinar'}`);
 }
 return <form id="quote-form" onSubmit={prepare} onChange={()=>{if(message)setMessage('')}}>
 <h3>Peça um orçamento</h3><p>Conte o que precisa. Você revisa a mensagem antes de enviá-la pelo WhatsApp.</p>
 <label htmlFor="name">Seu nome</label><input id="name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required pattern=".*\S.*" maxLength={100}/>
 <div className="form-row"><div><label htmlFor="phone">Telefone com DDD</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(19) 99999-9999" required maxLength={20} onInput={event=>{const field=event.currentTarget;const digits=field.value.replace(/\D/g,'');field.setCustomValidity(digits.length>=10&&digits.length<=13?'':'Informe um telefone válido com DDD.')}}/></div><div><label htmlFor="city">Cidade</label><input id="city" name="city" autoComplete="address-level2" placeholder="Sua cidade" required pattern=".*\S.*" maxLength={100}/></div></div>
 <label htmlFor="period">Período de trabalho</label><select id="period" name="period" required defaultValue=""><option value="" disabled>Selecione o período</option><option>Meio período</option><option>Período integral</option><option>Ainda não sei</option></select>
 <label htmlFor="message">Conte um pouco sobre o espaço <span>(opcional)</span></label><textarea id="message" name="message" rows={3} placeholder="Tipo de empresa, tamanho do espaço e frequência da limpeza." maxLength={1000}/>
 <p className="privacy-note">Seus dados serão incluídos apenas na mensagem que você decidir enviar. <a href={privacyUrl}>Saiba mais</a>.</p>
 <motion.button disabled={!ready} whileTap={{scale:0.98}} className="button" type="submit">Preparar mensagem <Icon name="arrow" size={19}/></motion.button>
 <p id="form-status" role="status" aria-live="polite">{message ? 'Revise sua mensagem abaixo antes de enviar.' : ''}</p>
 <AnimatePresence>{message && <motion.div id="quote-result" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><label htmlFor="prepared-message">Sua mensagem está pronta</label><textarea ref={output} id="prepared-message" rows={7} readOnly value={message}/><a id="send-quote" className="button" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <Icon name="arrow" size={18}/></a><small>A solicitação só será enviada quando você confirmar no WhatsApp.</small></motion.div>}</AnimatePresence>
 <noscript>Envie os detalhes diretamente para <a href={`https://wa.me/${company.whatsapp}`}>nosso WhatsApp</a> ou ligue para <a href={company.phoneHref}>{company.phone}</a>.</noscript>
 </form>
}
