import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { MAPS_LINK, SECTION_IDS } from '../lib/constants';
import { scrollToId } from '../lib/lenis';
import heroPhoto from '../assets/img/cleansun-fotovoltaico-real-2-wide.jpg';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id={SECTION_IDS.Inicio}
      className="relative bg-[#14110e] text-[#faf7f3] pt-28 sm:pt-32 overflow-hidden"
    >
      <div
        className="absolute -top-40 -right-28 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(184,240,74,0.26) 0%, rgba(95,224,240,0.12) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#faf7f3]/50">
          <span className="w-9 h-px bg-accent" aria-hidden="true" />
          Toluca · Estado de México
        </div>

        <h1 className="hero-title mt-6 max-w-[15ch] text-balance">
          El mismo equipo que diseña tu sistema es el que{' '}
          <span className="text-accent">sube al techo.</span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-8 mt-8">
          <p className="text-lg leading-relaxed text-[#faf7f3]/70 max-w-[46ch] m-0">
            Instalación fotovoltaica y cargadores para autos eléctricos en Toluca. 5.0★ en Google,
            con el mismo Ingeniero Medina y Maurilio atendiendo cada instalación.
          </p>
          <div className="flex flex-wrap gap-3">
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
              className="inline-flex items-center gap-2 border border-[#faf7f3]/25 hover:border-[#faf7f3]/60 text-[#faf7f3] font-medium text-[15px] px-6 py-4 rounded-full min-h-[52px] transition-colors"
              aria-label="Ver la ubicación real de CleanSun en Google Maps (se abre en una pestaña nueva)"
            >
              <MapPin size={16} className="shrink-0" />
              Ver ubicación real
            </a>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-14 rounded-t-[26px] overflow-hidden aspect-[21/9] min-h-[220px]">
          <img
            src={heroPhoto}
            alt="Sistema fotovoltaico instalado sobre techo industrial por CleanSun"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3.5 py-1.5 border border-white/15">
            Foto real — ficha de Google de CleanSun
          </span>
        </div>
      </div>
    </section>
  );
}
