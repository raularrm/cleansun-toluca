import { Link } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import { PRIVACY_ROUTE } from '../lib/constants';

// Kept deliberately minimal: phone, WhatsApp, address and hours already
// live in the Contacto section directly above this footer now that the
// site is a single scrolling page — repeating them here would just be
// the same links twice in a row.
export function Footer() {
  return (
    <footer className="relative bg-bg border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark className="w-6 h-6 text-accent" />
          <span className="font-heading font-black text-lg tracking-tight text-ink">CleanSun</span>
        </Link>
        <Link to={PRIVACY_ROUTE} className="text-muted hover:text-ink text-sm transition-colors">
          Aviso de privacidad y cookies
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pt-6 border-t border-line flex flex-wrap gap-3 justify-between text-xs text-[rgba(var(--text-primary-rgb),0.3)]">
        <span>© {new Date().getFullYear()} CleanSun. Todos los derechos reservados.</span>
        <span>Dirección y reseñas verificables en la ficha pública de Google Negocios de CleanSun.</span>
      </div>
    </footer>
  );
}
