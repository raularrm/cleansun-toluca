import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselPhoto {
  thumb: string;
  full: string;
  alt: string;
  caption: string;
  source: string;
}

const AUTO_ADVANCE_MS = 5000;

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
      className="relative w-full h-[300px] sm:h-[440px] lg:h-[580px] overflow-hidden bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="absolute inset-0 block h-full w-full"
        aria-label={`Ampliar foto: ${current.caption}`}
      >
        {photos.map((p, i) => (
          <img
            key={p.thumb}
            src={p.thumb}
            alt={p.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,17,14,0.1) 0%, rgba(20,17,14,0.02) 30%, rgba(20,17,14,0.15) 62%, rgba(20,17,14,0.88) 100%)',
          }}
        />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-4 pb-5 sm:px-6 sm:pb-7 lg:px-10 lg:pb-9">
        <div>
          <p className="text-[15px] font-medium text-[#faf7f3] sm:text-base">{current.caption}</p>
          <p className="mt-1 text-xs text-[#faf7f3]/55 sm:text-sm">{current.source}</p>
        </div>
        {photos.length > 1 && (
          <div className="pointer-events-auto flex items-center gap-2 pb-1">
            {photos.map((p, i) => (
              <button
                key={p.thumb}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-7 bg-[#faf7f3]' : 'w-2 bg-[#faf7f3]/45 hover:bg-[#faf7f3]/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto anterior"
            className="liquid-glass absolute left-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full p-3 text-white sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Siguiente foto"
            className="liquid-glass absolute right-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full p-3 text-white sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
