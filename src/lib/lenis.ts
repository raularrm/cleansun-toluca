import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let initialized = false;

const NAV_OFFSET = 110;

/**
 * Sets up the single, page-wide Lenis instance and wires it into GSAP's
 * ticker so ScrollTrigger stays in sync (per GSAP's documented Lenis
 * integration pattern). Guarded so React 19 StrictMode's mount → cleanup
 * → remount in dev never creates a second instance.
 */
export function initSmoothScroll() {
  if (initialized) return lenis;
  initialized = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.1,
    wheelMultiplier: 1.35,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.1 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}
