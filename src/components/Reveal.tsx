import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
export default function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}) {
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={false} whileInView={reduce?undefined:{transform:['translateY(24px)','translateY(0px)']}} viewport={{once:true,amount:0.12}} transition={{duration:.75,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
