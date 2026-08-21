import { Banknote, CreditCard } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { useSectionReveal } from '../lib/useSectionReveal';
import { SectionIntro } from './SectionIntro';

const OPCIONES = [
  {
    Icon: Banknote,
    title: 'Pago de contado',
    desc: '[PENDIENTE: confirmar si aplica algún descuento por pago de contado]',
  },
  {
    Icon: CreditCard,
    title: 'Meses sin intereses',
    desc: '[PENDIENTE: confirmar plazo, banco/tarjetas participantes y condiciones de MSI]',
  },
];

export function Financiamiento() {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section id="financiamiento" ref={sectionRef} className="section-anchor relative bg-surface2">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <SectionIntro eyebrow="Financiamiento" title="Formas de pago" />

        <div className="grid gap-5 sm:grid-cols-2">
          {OPCIONES.map(({ Icon, title, desc }) => (
            <div key={title} data-reveal className="rounded-[26px] border border-line bg-surface p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--accent-rgb),0.1)] text-accent">
                <Icon size={19} />
              </span>
              <h3 className="font-heading font-extrabold text-base tracking-tight text-ink mt-5">{title}</h3>
              <p className="text-sm text-muted mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
