import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar imagen"
          className="absolute -top-14 right-0 sm:-top-3 sm:-right-14 liquid-glass-strong rounded-full p-2.5 text-white z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={20} />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        {caption && <p className="text-white/80 text-sm text-center mt-4 px-4">{caption}</p>}
      </div>
    </div>
  );
}
