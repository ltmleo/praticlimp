import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { company } from '../data/company';
import Icon from './Icon';
export default function QuoteForm({selectedService}:{selectedService:string}) {
 const [service,setService]=useState('');
 const [message,setMessage]=useState('');
 const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 const output=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>{if(selectedService)setService(selectedService)},[selectedService]);
 useEffect(()=>{if(message)output.current?.focus()},[message]);
 function prepare(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const data=new FormData(event.currentTarget);
  setMessage(`Olá, Pratic Limp! Gostaria de solicitar um orçamento.\n\nNome: ${String(data.get('name')).trim()}\nTelefone: ${data.get('phone')}\nCidade: ${String(data.get('city')).trim()}\nServiço: ${service}\nDetalhes: ${String(data.get('message')).trim() || 'A combinar'}`);
 }
 return <form id="quote-form" onSubmit={prepare} onChange={()=>{if(message)setMessage('')}}>
 <h3>Seu espaço merece esse cuidado.</h3><p>Preencha os dados para preparar sua solicitação.</p>
 <label htmlFor="name">Seu nome</label><input id="name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required pattern=".*\S.*" maxLength={100}/>
 <div className="form-row"><div><label htmlFor="phone">Telefone com DDD</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(19) 99999-9999" required maxLength={20} onInput={event=>{const field=event.currentTarget;const digits=field.value.replace(/\D/g,'');field.setCustomValidity(digits.length>=10&&digits.length<=13?'':'Informe um telefone válido com DDD.')}}/></div><div><label htmlFor="city">Cidade</label><input id="city" name="city" autoComplete="address-level2" placeholder="Sua cidade" required pattern=".*\S.*" maxLength={100}/></div></div>
 <label htmlFor="service">Qual solução você procura?</label><select id="service" name="service" value={service} onChange={e=>setService(e.target.value)} required><option value="">Selecione um serviço</option>{['Limpeza corporativa','Limpeza de condomínios','Limpeza pós-obra','Terceirização de limpeza','Limpeza residencial','Limpeza industrial / outra necessidade'].map(s=><option key={s}>{s}</option>)}</select>
 <label htmlFor="message">Conte um pouco sobre o espaço <span>(opcional)</span></label><textarea id="message" name="message" rows={3} placeholder="Tipo de ambiente, área aproximada, frequência desejada…" maxLength={1000}/>
 <p className="privacy-note">Seus dados serão incluídos apenas na mensagem que você decidir enviar. <a href="/privacidade/">Saiba mais</a>.</p>
 <motion.button disabled={!ready} whileTap={{scale:0.98}} className="button" type="submit">Preparar meu orçamento <Icon name="arrow" size={19}/></motion.button>
 <p id="form-status" role="status" aria-live="polite">{message ? 'Revise sua mensagem abaixo antes de enviar.' : ''}</p>
 <AnimatePresence>{message && <motion.div id="quote-result" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><label htmlFor="prepared-message">Sua mensagem está pronta</label><textarea ref={output} id="prepared-message" rows={7} readOnly value={message}/><a id="send-quote" className="button" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <Icon name="arrow" size={18}/></a><small>A solicitação só será enviada quando você confirmar no WhatsApp.</small></motion.div>}</AnimatePresence>
 <noscript>Envie os detalhes diretamente para <a href={`https://wa.me/${company.whatsapp}`}>nosso WhatsApp</a> ou ligue para {company.phone}.</noscript>
 </form>
}
