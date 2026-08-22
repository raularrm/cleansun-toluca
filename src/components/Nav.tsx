import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LogoMark } from './LogoMark';
import { NAV_LINKS, SECTION_IDS, PENDING_SECTION_KEY, WHATSAPP_LINK_QUOTE } from '../lib/constants';
import { scrollToId } from '../lib/lenis';

gsap.registerPlugin(ScrollTrigger);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement | null>(null);

  // Small "condensed" state once scrolled past the very top — a plain
  // scroll listener would drift out of sync with Lenis's rAF-driven
  // smoothing, so this rides the same ScrollTrigger instance everything
  // else on the page already syncs with.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top -40',
      end: 99999,
      toggleClass: { targets: navRef.current, className: 'nav-scrolled' },
    });
    return () => st.kill();
  }, []);

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
      <nav
        ref={navRef}
        className="nav-bar backdrop-blur-xl border-b border-line bg-[rgba(var(--bg-rgb),0.86)]"
        aria-label="Navegación principal"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-[68px] sm:h-[74px] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToSection(SECTION_IDS.Inicio)}
            className="flex items-center gap-2.5 text-ink shrink-0"
            aria-label="CleanSun — ir al inicio"
          >
            <LogoMark className="w-8 h-8 text-accent" />
            <span className="font-heading font-black text-lg tracking-tight text-ink">CleanSun</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((label) => {
              const isActive = activeId === SECTION_IDS[label];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => goToSection(SECTION_IDS[label])}
                  className={`font-body text-[14.5px] font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-accent'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WHATSAPP_LINK_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium min-h-[44px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              Cotizar por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-full p-3 text-ink border border-line"
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav-panel"
          className="mx-4 mt-2 bg-surface border border-line shadow-2xl rounded-3xl md:hidden flex flex-col p-2"
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
          <a
            href={WHATSAPP_LINK_QUOTE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-1 text-center rounded-2xl bg-ink text-bg px-4 py-3 font-medium min-h-[44px] flex items-center justify-center"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
