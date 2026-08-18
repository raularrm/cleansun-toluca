import { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';
import { MAPS_LINK, SECTION_IDS } from '../lib/constants';
import { scrollToId } from '../lib/lenis';
import heroPhoto from '../assets/img/hero-solar-panels.jpg';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id={SECTION_IDS.Inicio}
      className="relative min-h-[92vh] w-full overflow-hidden bg-bg flex flex-col"
    >
      {/* Real installation photo — full-bleed hero background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark scrim for text contrast, plus a touch of warm accent glow so
          the photo still feels branded rather than just "darkened stock". */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,8,10,0.72) 0%, rgba(6,8,10,0.45) 32%, rgba(6,8,10,0.55) 68%, rgba(6,8,10,0.85) 100%), radial-gradient(60% 45% at 50% 28%, rgba(var(--accent-rgb),0.22) 0%, rgba(var(--accent-rgb),0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Particle field on top of the photo — kept, dialed back so the
          photo still reads through it rather than being buried. */}
      <div className="absolute inset-0 z-[2] opacity-60 mix-blend-screen">
        <ParticleCanvas />
      </div>

      <div
        className={`relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-12 transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
          {/* Trust badge — glassmorphism pill, above the headline */}
          <div className="liquid-glass-strong inline-flex items-center gap-2 rounded-full pl-3 pr-4 py-2 text-xs sm:text-sm font-medium text-white/90">
            <Star size={14} className="text-accent fill-accent shrink-0 drop-shadow-[0_0_6px_rgba(var(--accent-rgb),0.8)]" />
            <span className="max-w-xs sm:max-w-none">
              5.0★ en Google, con el mismo Ingeniero Medina y Maurilio atendiendo cada instalación
            </span>
          </div>

          <h1 className="hero-title text-white select-none">CleanSun</h1>

          <p className="text-center text-white/75 font-body text-base max-w-md">
            Instalación fotovoltaica en Toluca — el mismo equipo técnico en cada proyecto, no es una
            empresa anónima.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => scrollToId(SECTION_IDS.Calculadora)}
              className="btn-glow rounded-full bg-ink text-bg font-medium text-sm px-6 py-3 min-h-[44px] inline-flex items-center active:scale-95"
            >
              Calcula tu ahorro
            </button>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps liquid-glass rounded-full text-white text-sm px-6 py-3 min-h-[44px] inline-flex items-center gap-2 font-medium"
              aria-label="Ver la ubicación real de CleanSun en Google Maps (se abre en una pestaña nueva)"
            >
              <MapPin size={16} className="shrink-0" />
              Ver ubicación real
            </a>
          </div>

          {/* CFE savings claim, kept as a compact caption rather than a
              separate bottom row */}
          <div className="mt-1 max-w-sm">
            <p className="text-xs sm:text-sm text-white/70 font-body">
              Baja tu recibo de CFE hasta 85% en verano, según datos del propio programa de Techos
              Solares de CFE — no es una cifra inventada.
            </p>
            <p className="text-[11px] font-body mt-1 text-white/45">
              Esa cifra es del programa federal (Mexicali y Hermosillo), no una garantía de CleanSun. Tu
              estimación real está más abajo.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade so content below reads as a distinct block, not a continuation of the hero */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-bg z-[5] pointer-events-none" aria-hidden="true" />
    </section>
  );
}
