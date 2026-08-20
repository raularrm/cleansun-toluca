import { useSectionReveal } from '../lib/useSectionReveal';

const STATS = [
  { value: '5.0★', label: '10 reseñas en Google, las 10 con la calificación máxima.' },
  { value: '70–95%', label: 'reducción típica en sistemas residenciales bien dimensionados.' },
  { value: '3–5 años', label: 'retorno de inversión típico de un sistema residencial.' },
  { value: 'CFE', label: 'trámite de interconexión y medición neta incluidos.' },
];

export function StatBar() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-bg border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-ink">
              {s.value}
            </div>
            <p className="text-sm text-muted mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
