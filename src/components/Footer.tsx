import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { PRIVACY_ROUTE, PHONE_DISPLAY, WHATSAPP_LINK_QUOTE } from '../lib/constants';

export function Footer() {
  return (
    <footer className="relative bg-[#14110e] text-[#faf7f3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h2 className="font-heading font-black text-4xl sm:text-6xl leading-[0.95] tracking-tight m-0">
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
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-6 border-t border-[#faf7f3]/15 flex flex-wrap items-center justify-between gap-4 text-[13.5px] text-[#faf7f3]/55">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 text-[#faf7f3]">
              <LogoMark className="w-6 h-6 text-accent" />
              <span>© {new Date().getFullYear()} CleanSun. Todos los derechos reservados.</span>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <span>Dirección y reseñas verificables en la ficha pública de Google Negocios de CleanSun.</span>
            <Link to={PRIVACY_ROUTE} className="text-[#faf7f3]/70 hover:text-[#faf7f3] transition-colors whitespace-nowrap">
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
