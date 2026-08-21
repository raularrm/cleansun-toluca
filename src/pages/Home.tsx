import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { QuienesSomos } from '../components/QuienesSomos';
import { Servicios } from '../components/Servicios';
import { ComoFunciona } from '../components/ComoFunciona';
import { FichaTecnica } from '../components/FichaTecnica';
import { Garantias } from '../components/Garantias';
import { Financiamiento } from '../components/Financiamiento';
import { Calculadora } from '../components/Calculadora';
import { Resenas } from '../components/Resenas';
import { FAQ } from '../components/FAQ';
import { Contacto } from '../components/Contacto';
import { scrollToId } from '../lib/lenis';
import { PENDING_SECTION_KEY } from '../lib/constants';

export function Home() {
  // If the nav was clicked from a different route (e.g. /privacidad),
  // it stashes the target section id here and navigates to "/" — once
  // this page's sections are mounted, finish that scroll.
  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_SECTION_KEY);
    if (!pending) return;
    sessionStorage.removeItem(PENDING_SECTION_KEY);
    const raf = requestAnimationFrame(() => scrollToId(pending));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <Hero />
      <QuienesSomos />
      <Servicios />
      <ComoFunciona />
      <FichaTecnica />
      <Garantias />
      <Financiamiento />
      <Calculadora />
      <Resenas />
      <FAQ />
      <Contacto />
    </>
  );
}
