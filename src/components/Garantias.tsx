import { HardHat, ShieldCheck } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';

const GARANTIAS = [
  {
    Icon: ShieldCheck,
    title: 'Garantía de equipo',
    desc: 'Cubre paneles e inversor ante defectos de fabricación.',
    term: '[PENDIENTE: confirmar con cliente — años de garantía de paneles e inversor]',
  },
  {
    Icon: HardHat,
    title: 'Garantía de mano de obra',
    desc: 'Cubre la instalación realizada por nuestro equipo técnico.',
    term: '[PENDIENTE: confirmar con cliente — años de garantía de mano de obra]',
  },
];

export function Garantias() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id="garantias" ref={sectionRef} className="section-anchor relative bg-bg">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <SectionIntro eyebrow="Garantías" title="Respaldo sobre equipo e instalación" />

        <div className="grid gap-5 sm:grid-cols-2">
          {GARANTIAS.map(({ Icon, title, desc, term }) => (
            <div key={title} data-reveal className="rounded-[26px] border border-line bg-surface p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent">
                <Icon size={19} />
              </span>
              <h3 className="font-heading font-extrabold text-base tracking-tight text-ink mt-5">{title}</h3>
              <p className="text-sm text-muted mt-2">{desc}</p>
              <p className="text-xs text-[rgba(var(--text-primary-rgb),0.4)] mt-4 pt-4 border-t border-line">
                {term}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
