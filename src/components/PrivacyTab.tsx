import { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { PrivacyContent } from './PrivacyContent';
import { LogoMark } from './LogoMark';

/**
 * The "ceja" — a persistent side tab present on every page (rendered once,
 * in the root Layout) that opens the privacy + cookies notice in place,
 * without navigating away from whatever page the visitor is on.
 */
export function PrivacyTab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="privacy-fab fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-40 flex items-center justify-center rounded-full bg-surface border border-line text-muted hover:text-ink w-12 h-12 min-w-[44px] min-h-[44px]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Aviso de privacidad y cookies"
        title="Privacidad y cookies"
      >
        <ShieldCheck size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label="Aviso de privacidad y cookies">
          <button
            type="button"
            aria-label="Cerrar aviso de privacidad"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-full sm:max-w-md h-full bg-bg border-l border-line overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LogoMark className="w-6 h-6 text-accent" />
                <span className="font-heading font-black text-ink">CleanSun</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="liquid-glass rounded-full p-2.5 text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-accent bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.25)] rounded-full px-3 py-1.5">
              <ShieldCheck size={13} />
              Aviso de privacidad y cookies
            </span>
            <h2 className="font-heading text-2xl text-ink mt-4 mb-6">Cómo tratamos tus datos en este sitio</h2>
            <PrivacyContent />
          </div>
        </div>
      )}
    </>
  );
}
