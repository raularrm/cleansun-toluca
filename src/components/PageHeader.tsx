import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Used only by standalone routes (currently just /privacidad) — real
// separate pages still get a full page-top header with a breadcrumb back
// to the single-page site. In-flow sections use SectionIntro instead.
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative bg-bg pt-32 sm:pt-40 pb-10 sm:pb-14 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-[rgba(var(--text-primary-rgb),0.4)] mb-5">
          <Link to="/" className="hover:text-ink transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted">{eyebrow}</span>
        </nav>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink">{title}</h1>
        {description && <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl">{description}</p>}
      </div>
    </div>
  );
}
