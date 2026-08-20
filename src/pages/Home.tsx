import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { StatBar } from '../components/StatBar';
import { Servicios } from '../components/Servicios';
import { Calculadora } from '../components/Calculadora';
import { Resenas } from '../components/Resenas';
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
      <StatBar />
      <Servicios />
      <Calculadora />
      <Resenas />
      <Contacto />
    </>
  );
}
