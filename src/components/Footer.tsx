import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import {
  CONTACT_EMAIL_PLACEHOLDER,
  PRIVACY_ROUTE,
  TERMS_ROUTE,
  PHONE_DISPLAY,
  WHATSAPP_LINK_QUOTE,
} from '../lib/constants';

// Placeholders: CleanSun hasn't confirmed these accounts exist yet, so
// they're shown disabled (not clickable) rather than pointing anywhere.
const REDES_PENDIENTES = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="accent-on-dark relative border-t border-[#faf7f3]/10 bg-[#14110e] text-[#faf7f3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h2 className="font-heading font-black text-3xl sm:text-[42px] leading-[1] tracking-tight m-0">
            ¿Listo para bajar tu recibo de <span className="text-accent">CFE</span>?
          </h2>
          <div>
            <p className="text-lg text-[#faf7f3]/70 max-w-[44ch] m-0 mb-6">
              Cuéntanos tu consumo por WhatsApp y agenda tu visita técnica sin costo de diagnóstico.
            </p>
            <a
              href={WHATSAPP_LINK_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2.5 bg-accent text-accentOn font-heading font-bold text-lg px-8 py-5 rounded-full min-h-[60px]"
            >
              <MessageCircle size={19} />
              {PHONE_DISPLAY} · Escribir por WhatsApp
            </a>
            <p className="flex items-center gap-2 text-sm text-[#faf7f3]/50 mt-4">
              <Mail size={14} className="shrink-0" />
              {CONTACT_EMAIL_PLACEHOLDER}
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-6 border-t border-[#faf7f3]/15 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 text-[13.5px] text-[#faf7f3]/55">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 text-[#faf7f3]">
              <LogoMark className="w-6 h-6 text-accent" />
              <span>© {new Date().getFullYear()} CleanSun. Todos los derechos reservados.</span>
            </Link>
          </div>

          {/* Redes sociales — placeholders deshabilitados, no enlaces reales:
              CleanSun aún no nos confirma que estas cuentas existan. */}
          <div className="flex items-center gap-2" title="Redes sociales pendientes de confirmar con CleanSun">
            {REDES_PENDIENTES.map(({ Icon, label }) => (
              <span
                key={label}
                aria-disabled="true"
                title={`${label} (pendiente de confirmar)`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#faf7f3]/15 text-[#faf7f3]/30"
              >
                <Icon size={14} />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span>Dirección y reseñas verificables en la ficha pública de Google Negocios de CleanSun.</span>
            <Link to={PRIVACY_ROUTE} className="text-[#faf7f3]/70 hover:text-[#faf7f3] transition-colors whitespace-nowrap">
              Aviso de privacidad
            </Link>
            <Link to={TERMS_ROUTE} className="text-[#faf7f3]/70 hover:text-[#faf7f3] transition-colors whitespace-nowrap">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
