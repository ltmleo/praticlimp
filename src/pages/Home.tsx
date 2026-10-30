import { MotionConfig } from 'motion/react';
import Header from '../components/layout/Header';
import TopBar from '../components/layout/TopBar';
import Footer from '../components/layout/Footer';
import CostComparison from '../components/CostComparison';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Hero from '../components/sections/Hero';
import ExpertiseStrip from '../components/sections/ExpertiseStrip';
import Clients from '../components/sections/Clients';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
 return (
  <MotionConfig reducedMotion="user">
   <a className="skip" href="#conteudo">Pular para o conteúdo</a>
   <TopBar />
   <Header />
   <main id="conteudo">
    <Hero />
    <ExpertiseStrip />
    <Services />
    <About />
    <Clients />
    <CostComparison />
    <FAQ />
    <Contact />
   </main>
   <Footer />
   <FloatingWhatsApp />
  </MotionConfig>
 );
}
