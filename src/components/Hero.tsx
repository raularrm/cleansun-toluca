import { useEffect, useState } from 'react';
import { Clock, MapPin, Phone, Star, Sun, Wrench } from 'lucide-react';
import { MAPS_LINK, PHONE_DISPLAY, PHONE_TEL, SECTION_IDS } from '../lib/constants';
import { scrollToId } from '../lib/lenis';
import panelPhoto from '../assets/img/cleansun-fotovoltaico-real-2-wide.jpg';
import cardPhoto from '../assets/img/cleansun-fotovoltaico-real-2.jpg';

const CONFIANZA = [
  {
    Icon: Star,
    title: '5.0 en Google',
    sub: '10 reseñas verificadas en la ficha del negocio',
  },
  {
    Icon: Clock,
    title: 'Atención de lunes a sábado',
    sub: 'L–V 9:00–18:00 · Sáb 9:00–12:00',
  },
  {
    Icon: Wrench,
    title: 'Mismo equipo en cada instalación',
    sub: 'Ingeniero Medina y Maurilio, no subcontratistas',
  },
  {
    Icon: Sun,
    title: 'Trámite CFE incluido',
    sub: 'Interconexión y medición neta',
  },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id={SECTION_IDS.Inicio}
      className="accent-on-dark relative bg-[#14110e] text-[#faf7f3] overflow-hidden"
    >
      {/* Real photo ambient panel — desktop only, right half. Mounted as a
          plain <img> (not a canvas/WebGL context), so hiding it below xl
          costs nothing on mobile beyond the network request. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] xl:block">
        <img src={panelPhoto} alt="" className="w-full h-full object-cover opacity-[0.55]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #14110e 0%, rgba(20,17,14,0.94) 22%, rgba(20,17,14,0.62) 58%, rgba(20,17,14,0.5) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,17,14,0.85) 0%, rgba(20,17,14,0.35) 34%, rgba(20,17,14,0.72) 78%, #14110e 100%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute -right-[12%] top-[-18%] h-[62vw] max-h-[900px] w-[62vw] max-w-[900px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(184,240,74,0.18) 0%, rgba(95,224,240,0.06) 45%, rgba(184,240,74,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-[2] max-w-6xl mx-auto px-4 sm:px-6 pb-14 pt-32 sm:pb-20 transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="grid items-center gap-11 xl:grid-cols-12 xl:gap-[52px]">
          <div className="xl:col-span-7">
            {/* Prueba social arriba del titular */}
            <div className="glass-pill-dark mb-7 text-[13.5px]">
              <Star size={15} className="text-accent fill-accent shrink-0" />
              <span>5.0 en Google · 10 reseñas</span>
              <span aria-hidden="true" className="h-3.5 w-px bg-[#faf7f3]/20" />
              <span className="text-[#faf7f3]/70">Mismo Ingeniero Medina y Maurilio</span>
            </div>

            <h1 className="hero-title max-w-[16ch] text-balance">
              El mismo equipo que diseña tu sistema es el que{' '}
              <span className="text-accent">sube al techo.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-[#faf7f3]/75">
              Instalación fotovoltaica y cargadores para autos eléctricos en Toluca. 5.0★ en Google,
              con el mismo Ingeniero Medina y Maurilio atendiendo cada instalación.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={() => scrollToId(SECTION_IDS.Calculadora)}
                className="btn-glow inline-flex items-center bg-accent text-accentOn font-medium text-[15px] px-7 py-4 rounded-full min-h-[52px]"
              >
                Calcula tu ahorro
              </button>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill-dark inline-flex items-center gap-2 font-medium text-[15px] px-6 py-4 min-h-[52px]"
                aria-label="Ver la ubicación real de CleanSun en Google Maps (se abre en una pestaña nueva)"
              >
                <MapPin size={16} className="shrink-0" />
                Ver ubicación real
              </a>
            </div>
          </div>

          {/* Foto + tarjeta de confianza, superpuestas como en el resto de
              los sitios de la casa. */}
          <div className="w-full max-w-[520px] mx-auto xl:col-span-5 xl:col-start-8 xl:max-w-none">
            <div className="-mb-[34px] overflow-hidden rounded-[28px] border border-[#faf7f3]/16 bg-[#faf7f3]/5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
              <div className="aspect-[3/2]">
                <img
                  src={cardPhoto}
                  alt="Sistema fotovoltaico instalado por CleanSun sobre un techo industrial en Toluca"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2.5 border-t border-[#faf7f3]/12 px-5 py-4">
                <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
                <p className="text-[13px] text-[#faf7f3]/72">Foto real — ficha de Google de CleanSun</p>
              </div>
            </div>

            <div className="glass-dark-card relative z-[2] rounded-[28px] p-7 sm:p-8">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-accent">
                Negocio verificable
              </p>

              <ul className="mt-6 grid gap-5">
                {CONFIANZA.map(({ Icon, title, sub }) => (
                  <li key={title} className="flex items-start gap-3.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-[15.5px] font-semibold text-[#faf7f3]">{title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-[#faf7f3]/64">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-[#faf7f3]/12 pt-6">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#faf7f3] text-[#14110e] font-medium text-[15px] px-6 py-3.5 min-h-[50px]"
                >
                  <Phone size={17} />
                  Llamar al {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
