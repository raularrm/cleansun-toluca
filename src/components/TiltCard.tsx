import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import gsap from 'gsap';

const MAX_TILT_DEG = 7;

/**
 * Pointer-tracked 3D tilt for cards — rotateX/rotateY + a slight lift and
 * a shadow that shifts with the tilt, with GSAP quickTo easing the return
 * to rest. Desktop-with-a-mouse only (skipped on touch and under
 * prefers-reduced-motion): a coarse pointer can't "aim" a tilt, so it'd
 * just be jittery there. The `.tilt-card` class (src/index.css) supplies
 * the actual box-shadow, driven by the --tilt-shadow-y custom property.
 */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    gsap.set(el, { transformPerspective: 900 });
    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const lift = gsap.quickTo(el, 'z', { duration: 0.6, ease: 'power3.out' });
    const shadowY = gsap.quickTo(el, '--tilt-shadow-y', { duration: 0.6, ease: 'power3.out' });

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * MAX_TILT_DEG * 2);
      rotX(-py * MAX_TILT_DEG * 2);
      lift(16);
      shadowY(18 + py * 10);
    }
    function onLeave() {
      rotX(0);
      rotY(0);
      lift(0);
      shadowY(10);
    }

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ '--tilt-shadow-y': 10 } as CSSProperties}>
      {children}
    </div>
  );
}
