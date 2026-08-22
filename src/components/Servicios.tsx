import { Zap } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SECTION_IDS } from '../lib/constants';
import { SectionIntro } from './SectionIntro';
import { TiltCard } from './TiltCard';
import fotovoltaicoSrc from '../assets/img/cleansun-fotovoltaico-real.jpg';
import cargadorSrc from '../assets/img/cleansun-cargador-mercedes-real.jpg';

const PV_POINTS = [
  'Dimensionamiento del sistema según tu consumo real',
  'Instalación y trámite de interconexión ante CFE',
  'Medición neta: exportas tu excedente y lo descuentas de tu recibo',
  'Seguimiento técnico después de la instalación',
];

const EV_POINTS = [
  'Instalación de cargador residencial en cochera o garaje',
  'Compatible con los modelos de auto eléctrico más comunes',
  'Instalación eléctrica segura, mismo estándar técnico que un sistema solar',
];

export function Servicios() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id={SECTION_IDS.Servicios} ref={sectionRef} className="section-anchor relative bg-surface2">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Servicios"
          title="Dos formas de bajar el gasto de energía en tu casa"
          description="CleanSun no es solo una empresa de paneles: instala soluciones de energía completas para el hogar, desde la interconexión con CFE hasta el cargador de tu auto eléctrico."
        />
        <div className="grid gap-7 md:grid-cols-2 items-start">
          <div data-reveal>
            <TiltCard className="rounded-[28px] overflow-hidden bg-surface border border-line flex flex-col">
              <div className="relative aspect-[16/10]">
                <img
                  src={fotovoltaicoSrc}
                  alt="Fotografía real de un sistema fotovoltaico instalado en un techo, publicada en la ficha de Google Negocios de CleanSun"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={420}
                  height={560}
                />
                <span className="absolute top-3.5 left-3.5 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1.5 border border-white/15">
                  Foto real — ficha de Google
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <h3 className="font-heading font-extrabold text-[26px] tracking-tight text-ink">
                  Sistemas fotovoltaicos interconectados a CFE
                </h3>
                <p className="text-base text-muted mt-3.5 mb-6">
                  Diseñamos e instalamos tu sistema para que trabaje directamente con tu contrato de CFE,
                  con el trámite de interconexión incluido.
                </p>
                <ul className="space-y-3">
                  {PV_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15.5px] text-ink">
                      <span className="text-accent font-bold shrink-0">/</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>

          <div data-reveal>
            <TiltCard className="rounded-[28px] overflow-hidden bg-surface border border-line flex flex-col">
              <div className="relative aspect-[16/10]">
                <img
                  src={cargadorSrc}
                  alt="Fotografía real de un cargador para auto eléctrico Mercedes-Benz instalado en una pared exterior residencial, tomada de una reseña de cliente en el perfil de Google de CleanSun"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={420}
                  height={315}
                />
                <span className="absolute top-3.5 left-3.5 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1.5 border border-white/15">
                  Foto real — reseña de cliente
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <h3 className="font-heading font-extrabold text-[26px] tracking-tight text-ink">
                  Cargadores para autos eléctricos
                </h3>
                <p className="text-base text-muted mt-3.5 mb-6">
                  El mismo equipo técnico que instala tu sistema solar instala el cargador de tu auto
                  eléctrico en casa — la foto de arriba es de un cliente real que lo confirma en Google.
                </p>
                <ul className="space-y-3">
                  {EV_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15.5px] text-ink">
                      <span className="text-accent font-bold shrink-0">/</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-2 text-[13.5px] italic text-muted mt-5">
                  <Zap size={13} className="shrink-0" />
                  Ideal si ya tienes paneles: puedes cargar tu auto con tu propia energía.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
