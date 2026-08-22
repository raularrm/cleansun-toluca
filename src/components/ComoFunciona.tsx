import { ClipboardList, FileText, Sun, Wrench } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';
import { TiltCard } from './TiltCard';

const PASOS = [
  {
    Icon: ClipboardList,
    title: 'Visita técnica',
    desc: 'Revisamos tu techo y tu consumo real para dimensionar el sistema.',
    tiempo: '[PENDIENTE: tiempo estimado]',
  },
  {
    Icon: FileText,
    title: 'Cotización',
    desc: 'Te presentamos el sistema propuesto y lo que incluye.',
    tiempo: '[PENDIENTE: tiempo estimado]',
  },
  {
    Icon: Wrench,
    title: 'Instalación',
    desc: 'El mismo equipo técnico instala tu sistema en sitio.',
    tiempo: '[PENDIENTE: tiempo estimado]',
  },
  {
    Icon: Sun,
    title: 'Trámite CFE',
    desc: 'Gestionamos la interconexión y la medición neta con CFE.',
    tiempo: '[PENDIENTE: tiempo estimado]',
  },
];

export function ComoFunciona() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id="como-funciona" ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Cómo funciona"
          title="De la visita técnica a tu recibo de CFE más bajo"
          description="Cuatro pasos, con el mismo equipo acompañándote en todos."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map(({ Icon, title, desc, tiempo }, i) => (
            <div key={title} data-reveal>
              <TiltCard className="rounded-[26px] border border-line bg-surface p-6 sm:p-7 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="font-heading font-black text-2xl text-[rgba(var(--text-primary-rgb),0.15)]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg tracking-tight text-ink mt-5">{title}</h3>
                <p className="text-sm text-muted mt-2 flex-1">{desc}</p>
                <p className="text-xs text-[rgba(var(--text-primary-rgb),0.4)] mt-4 pt-4 border-t border-line">
                  {tiempo}
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
