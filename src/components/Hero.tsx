import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Phone, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHONE_DISPLAY, PHONE_TEL, SECTION_IDS } from '../lib/constants';
import { scrollToId } from '../lib/lenis';
import heroPhoto from '../assets/img/cleansun-fotovoltaico-real-2-wide.jpg';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '5.0★', label: '10 reseñas en Google, calificación máxima' },
  { value: '70–95%', label: 'reducción típica en el recibo de CFE' },
  { value: '3–5 años', label: 'retorno de inversión típico' },
  { value: 'CFE', label: 'trámite de interconexión incluido' },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Parallax on the background photo — a real scroll-scrub (the case
  // ScrollTrigger is meant for), not a discrete reveal.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Stat strip: a staggered pop-in once the hero's own entrance
  // transition has settled — it's above the fold on load, not something
  // scrolled into later, so this runs on mount rather than ScrollTrigger.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 18, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.09, ease: 'back.out(1.6)', delay: 0.5 }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.Inicio}
      ref={sectionRef}
      className="accent-on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-[#14110e] text-[#faf7f3]"
    >
      <img
        ref={photoRef}
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-[116%] w-full object-cover"
      />
      {/* Velo calculado para que el texto blanco pase 7:1 de contraste
          sobre la parte más clara de la foto (el cielo): flat 0.86 +
          refuerzo en los bordes donde vive el nav y la tira de stats. */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'rgba(20,17,14,0.86)' }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,17,14,0.55) 0%, rgba(20,17,14,0.1) 24%, rgba(20,17,14,0.3) 64%, rgba(20,17,14,0.92) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[10%] top-[-16%] h-[58vw] max-h-[820px] w-[58vw] max-w-[820px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(184,240,74,0.16) 0%, rgba(95,224,240,0.05) 45%, rgba(184,240,74,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-[2] flex flex-1 flex-col items-center justify-center px-4 pt-[104px] pb-10 text-center transition-all duration-700 ease-out sm:px-6 sm:pt-[128px] ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="glass-pill-dark mb-7 text-[13.5px]">
          <Star size={15} className="text-accent fill-accent shrink-0" />
          <span>5.0 en Google · 10 reseñas</span>
          <span aria-hidden="true" className="h-3.5 w-px bg-[#faf7f3]/20" />
          <span className="text-[#faf7f3]/70">Mismo Ingeniero Maurilio Medina</span>
        </div>

        <h1 className="hero-title mx-auto max-w-[16ch] text-balance">
          El mismo equipo que diseña tu sistema es el que{' '}
          <span className="text-accent">sube al techo.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-[46ch] text-lg leading-relaxed text-[#faf7f3]/75">
          Instalación fotovoltaica y cargadores para autos eléctricos en Toluca. 5.0★ en Google,
          con el mismo Ingeniero Maurilio Medina atendiendo cada instalación.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => scrollToId(SECTION_IDS.Calculadora)}
            className="btn-glow group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-accent py-2 pl-7 pr-2 font-medium text-[15px] text-accentOn"
          >
            Calcula tu ahorro
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14110e] text-accent transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={17} />
            </span>
          </button>
          <a
            href={PHONE_TEL}
            className="glass-pill-dark group inline-flex min-h-[52px] items-center gap-3 py-2 pl-7 pr-2 font-medium text-[15px] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Llamar al {PHONE_DISPLAY}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#faf7f3]/12 transition-transform duration-300 group-hover:rotate-12">
              <Phone size={16} />
            </span>
          </a>
        </div>
      </div>

      {/* Tira de datos reales, pegada al borde inferior del hero como en
          la referencia — sin avatares inventados: solo cifras que ya
          teníamos verificadas. */}
      <div className="relative z-[2] mx-4 mb-6 sm:mx-6 sm:mb-8">
        <div
          ref={statsRef}
          className="glass-dark-card mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-[24px] px-6 py-7 sm:gap-8 sm:px-9 sm:py-8 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-heading font-black text-2xl tracking-tight text-[#faf7f3] sm:text-3xl">
                {s.value}
              </div>
              <p className="mt-1.5 text-sm text-[#faf7f3]/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
