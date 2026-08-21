import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';

const PREGUNTAS = [
  {
    q: '¿Qué pasa en días nublados o de noche?',
    a: 'En esos momentos tu sistema no genera, y tomas la energía que necesitas directamente de la red de CFE, igual que antes de instalarlo. Gracias a la medición neta, la energía que exportaste en tus horas de mayor generación se descuenta de tu recibo — el servicio nunca se interrumpe.',
  },
  {
    q: '¿Qué mantenimiento requiere el sistema?',
    a: 'En general, el mantenimiento de un sistema fotovoltaico es mínimo: limpieza periódica de los paneles y una revisión visual ocasional. [PENDIENTE: confirmar si CleanSun ofrece un servicio de mantenimiento programado y su costo.]',
  },
  {
    q: '¿Qué pasa si me mudo de casa?',
    a: 'El sistema queda instalado como parte de la infraestructura eléctrica del inmueble. [PENDIENTE: confirmar con CleanSun si ofrecen servicio de desinstalación o reubicación, y en qué condiciones.]',
  },
  {
    q: '¿Qué permisos se necesitan?',
    a: 'El trámite de interconexión y medición neta ante CFE está incluido en la instalación y lo gestiona el mismo equipo técnico. [PENDIENTE: confirmar si tu municipio requiere algún permiso de construcción adicional.]',
  },
];

export function FAQ() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro eyebrow="Preguntas frecuentes" title="Antes de que preguntes" />

        <div data-reveal className="flex flex-col gap-3">
          {PREGUNTAS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="rounded-2xl border border-line bg-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left min-h-[44px]"
                >
                  <span className="font-heading font-semibold text-[15.5px] sm:text-base text-ink">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-muted leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
