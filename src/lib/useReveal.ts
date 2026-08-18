import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal for a container's direct [data-reveal] children.
 * Uses IntersectionObserver as the primary mechanism, with a hard
 * timeout fallback so content can never get stuck invisible if
 * observer/scroll events misbehave in a given browser.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!els.length) return;

    els.forEach((el) => el.classList.add('reveal-pending'));

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
      );
      els.forEach((el) => observer!.observe(el));
    }

    const safety = window.setTimeout(() => {
      els.forEach((el) => el.classList.add('reveal-visible'));
    }, 1500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return ref;
}
