import { BatteryCharging, PanelTop } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';

const EQUIPO = [
  {
    Icon: PanelTop,
    title: 'Paneles solares',
    marca: '[PENDIENTE: especificar marca de paneles]',
    modelo: '[PENDIENTE: modelo / potencia]',
  },
  {
    Icon: BatteryCharging,
    title: 'Inversor',
    marca: '[PENDIENTE: especificar marca de inversor]',
    modelo: '[PENDIENTE: modelo]',
  },
];

export function FichaTecnica() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id="ficha-tecnica" ref={sectionRef} className="section-anchor relative bg-surface2">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <SectionIntro eyebrow="Ficha técnica" title="Equipo que instalamos" />

        <div className="grid gap-5 sm:grid-cols-2">
          {EQUIPO.map(({ Icon, title, marca, modelo }) => (
            <div
              key={title}
              data-reveal
              className="rounded-[26px] border border-line bg-surface p-6 sm:p-7 flex items-start gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent">
                <Icon size={19} />
              </span>
              <div>
                <h3 className="font-heading font-extrabold text-base tracking-tight text-ink">{title}</h3>
                <p className="text-sm text-muted mt-1.5">
                  Marca: <span className="text-[rgba(var(--text-primary-rgb),0.55)]">{marca}</span>
                </p>
                <p className="text-sm text-muted mt-0.5">
                  Modelo: <span className="text-[rgba(var(--text-primary-rgb),0.55)]">{modelo}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
