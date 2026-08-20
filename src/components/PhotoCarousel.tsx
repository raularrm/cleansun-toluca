import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselPhoto {
  thumb: string;
  full: string;
  alt: string;
  caption: string;
  source: string;
}

const AUTO_ADVANCE_MS = 4500;

export function PhotoCarousel({
  photos,
  onOpen,
}: {
  photos: CarouselPhoto[];
  onOpen: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const go = (next: number) => {
    setIndex(((next % photos.length) + photos.length) % photos.length);
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (photos.length < 2) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, photos.length]);

  const current = photos[index];

  return (
    <div
      className="relative rounded-[26px] overflow-hidden bg-surface border border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="relative block w-full aspect-[16/9] group"
        aria-label={`Ampliar foto: ${current.caption}`}
      >
        {photos.map((p, i) => (
          <img
            key={p.thumb}
            src={p.thumb}
            alt={p.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 liquid-glass rounded-full p-2.5 text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Siguiente foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 liquid-glass rounded-full p-2.5 text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 inset-x-0 z-10 flex items-center justify-center gap-2">
            {photos.map((p, i) => (
              <button
                key={p.thumb}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="px-5 py-4 flex items-center justify-between gap-4 border-t border-line">
        <p className="text-[14.5px] text-ink">{current.caption}</p>
        <p className="text-xs text-[rgba(var(--text-primary-rgb),0.4)] shrink-0">{current.source}</p>
      </div>
    </div>
  );
}
