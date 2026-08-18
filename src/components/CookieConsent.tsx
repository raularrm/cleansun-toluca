import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { PRIVACY_ROUTE } from '../lib/constants';

const COOKIE_NAME = 'cleansun_cookie_consent';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      const t = window.setTimeout(() => setVisible(true), 700);
      return () => window.clearTimeout(t);
    }
  }, []);

  function accept() {
    setCookie(COOKIE_NAME, 'accepted', 180);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-5"
    >
      <div className="mx-auto max-w-3xl liquid-glass-strong rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie size={22} className="text-accent shrink-0 hidden sm:block" />
        <p className="text-xs sm:text-sm text-ink/90 flex-1">
          Usamos una cookie esencial para recordar que aceptaste este aviso. Si abres el mapa de la sección
          de contacto, Google Maps puede establecer sus propias cookies.{' '}
          <Link to={PRIVACY_ROUTE} className="text-accent hover:underline">
            Ver aviso de privacidad
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 w-full sm:w-auto rounded-full bg-ink text-bg font-medium text-sm px-5 py-2.5 min-h-[44px]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
