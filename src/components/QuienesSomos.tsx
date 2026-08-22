import { User } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';
import { TiltCard } from './TiltCard';

const DATOS = [
  { label: 'Años de experiencia', value: '[PENDIENTE]' },
  { label: 'Instalaciones realizadas', value: '[PENDIENTE]' },
];

export function QuienesSomos() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id="quienes-somos" ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Quiénes somos"
          title="El mismo equipo, en cada instalación"
          description="Sin subcontratistas: el Ingeniero Maurilio Medina es quien diseña tu sistema y quien sube al techo a instalarlo."
        />

        <div data-reveal className="max-w-xl">
          <TiltCard className="rounded-[28px] border border-line bg-surface p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line bg-surface2 text-muted">
                <User size={26} />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl tracking-tight text-ink">
                  Ingeniero Maurilio Medina
                </h3>
                <p className="text-xs text-[rgba(var(--text-primary-rgb),0.4)] mt-0.5">
                  [PENDIENTE: foto real]
                </p>
              </div>
            </div>
            <p className="text-[15px] text-muted mt-5 leading-relaxed">
              [PENDIENTE: bio corta de Ingeniero Maurilio Medina — formación, especialidad, años en el
              sector solar]
            </p>
          </TiltCard>
        </div>

        <div data-reveal className="mt-7 max-w-xl">
          <TiltCard className="grid grid-cols-2 gap-6 rounded-[28px] border border-line bg-surface px-6 py-7 sm:px-9 sm:py-8">
            {DATOS.map((d) => (
              <div key={d.label}>
                <div className="font-heading font-black text-2xl tracking-tight text-accent sm:text-3xl">
                  {d.value}
                </div>
                <p className="mt-1.5 text-sm text-muted">{d.label}</p>
              </div>
            ))}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
