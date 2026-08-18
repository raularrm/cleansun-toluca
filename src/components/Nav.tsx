import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS, SECTION_IDS, PENDING_SECTION_KEY, WHATSAPP_LINK_QUOTE } from '../lib/constants';
import { scrollToId } from '../lib/lenis';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Close the mobile panel on every route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Scrollspy: highlight whichever section is crossing the vertical
  // center of the viewport. Only meaningful on the single-page "/" route.
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId('');
      return;
    }
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  function goToSection(id: string) {
    if (location.pathname !== '/') {
      sessionStorage.setItem(PENDING_SECTION_KEY, id);
      navigate('/');
    } else {
      scrollToId(id);
    }
    setOpen(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6">
        <nav
          className="liquid-glass rounded-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5"
          aria-label="Navegación principal"
        >
          <button
            type="button"
            onClick={() => goToSection(SECTION_IDS.Inicio)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full text-ink"
            aria-label="CleanSun — ir al inicio"
          >
            <LogoMark className="w-7 h-7 text-accent" />
            <span className="font-heading font-black text-lg tracking-tight text-ink hidden xs:inline">CleanSun</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((label) => {
              const isActive = activeId === SECTION_IDS[label];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => goToSection(SECTION_IDS[label])}
                  className={`font-body text-sm transition-colors px-3 py-2 rounded-full hover:bg-[rgba(var(--text-primary-rgb),0.05)] ${
                    isActive ? 'text-ink bg-[rgba(var(--text-primary-rgb),0.08)]' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <a
              href={WHATSAPP_LINK_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp liquid-glass-strong hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-ink"
            >
              Cotizar por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden liquid-glass rounded-full p-3 text-ink"
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-nav-panel"
            className="bg-surface border border-line shadow-2xl rounded-3xl mt-2 md:hidden flex flex-col p-2"
          >
            {NAV_LINKS.map((label) => {
              const isActive = activeId === SECTION_IDS[label];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => goToSection(SECTION_IDS[label])}
                  className={`text-left font-body px-4 py-3 rounded-2xl hover:bg-[rgba(var(--text-primary-rgb),0.05)] min-h-[44px] flex items-center ${
                    isActive ? 'text-ink bg-[rgba(var(--text-primary-rgb),0.08)]' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <div className="flex items-center gap-2 mt-1 px-1">
              <a
                href={WHATSAPP_LINK_QUOTE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp liquid-glass-strong flex-1 text-center rounded-2xl px-4 py-3 text-ink font-medium min-h-[44px] flex items-center justify-center"
              >
                Cotizar por WhatsApp
              </a>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
