import { CheckCircle2, Zap } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SECTION_IDS } from '../lib/constants';
import { SectionIntro } from './SectionIntro';
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
        <div className="grid gap-6 md:grid-cols-5 items-start">
          <article data-reveal className="md:col-span-3 rounded-[32px] overflow-hidden bg-surface border border-line">
            <div className="relative aspect-[16/10]">
              <img
                src={fotovoltaicoSrc}
                alt="Fotografía real de un sistema fotovoltaico instalado en un techo, publicada en la ficha de Google Negocios de CleanSun"
                className="w-full h-full object-cover"
                loading="lazy"
                width={420}
                height={560}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface2 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1 border border-white/15">
                Foto real — ficha de Google de CleanSun
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-heading text-xl text-ink mb-2">
                Sistemas fotovoltaicos interconectados a CFE
              </h3>
              <p className="text-muted text-sm mb-5">
                Diseñamos e instalamos tu sistema para que trabaje directamente con tu contrato de CFE, con
                el trámite de interconexión incluido.
              </p>
              <ul className="space-y-2.5">
                {PV_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article data-reveal className="md:col-span-2 rounded-3xl overflow-hidden card-glass md:mt-8">
            <div className="relative aspect-square">
              <img
                src={cargadorSrc}
                alt="Fotografía real de un cargador para auto eléctrico Mercedes-Benz instalado en una pared exterior residencial, tomada de una reseña de cliente en el perfil de Google de CleanSun"
                className="w-full h-full object-cover"
                loading="lazy"
                width={420}
                height={315}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1 border border-white/15">
                Foto real — reseña de cliente en Google
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-heading text-xl text-ink mb-2">Cargadores para autos eléctricos</h3>
              <p className="text-muted text-sm mb-5">
                El mismo equipo técnico que instala tu sistema solar instala el cargador de tu auto
                eléctrico en casa — la foto de arriba es de un cliente real que lo confirma en Google.
              </p>
              <ul className="space-y-2.5">
                {EV_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-xs italic mt-5 text-[rgba(var(--text-primary-rgb),0.4)]">
                <Zap size={13} className="shrink-0" />
                Ideal si ya tienes paneles: puedes cargar tu auto con tu propia energía.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
