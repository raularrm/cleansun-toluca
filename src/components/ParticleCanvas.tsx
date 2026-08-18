import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../lib/theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number; // per-particle intensity multiplier, applied to the theme's base alpha
}

const PARTICLE_COUNT = 40;

function readParticleColor(): { r: number; g: number; b: number; a: number } {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
  const m = raw.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\)/);
  if (!m) return { r: 255, g: 145, b: 66, a: 0.5 };
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
}

/**
 * Fixed, full-viewport Canvas 2D ambient particle field. Replaces the
 * heavier video/boomerang background approach: no video decoding, no
 * frame buffering — just ~40 drifting radial-gradient dots plus a
 * gsap-ticker-driven parallax offset that eases toward the pointer
 * position (0.06 lerp smoothing), same subtle mouse-follow feel as a
 * video parallax layer at a fraction of the cost.
 *
 * Color reads from the theme's --particle-color custom property, so it
 * shifts hue and intensity with the light/dark toggle without needing
 * to restart the particle field.
 */
export function ParticleCanvas() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const colorRef = useRef(readParticleColor());

  // Re-read the theme color whenever it changes, without touching particle
  // positions/velocities — the field keeps drifting, only the tint shifts.
  useEffect(() => {
    colorRef.current = readParticleColor();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(0.05 + Math.random() * 0.15),
      r: 1 + Math.random() * 2.6,
      o: 0.5 + Math.random() * 0.9,
    }));

    const mouse = { targetX: 0, targetY: 0, x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
    }
    if (!reducedMotion) window.addEventListener('pointermove', onPointerMove);

    const tick = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      const offsetX = mouse.x * 14;
      const offsetY = mouse.y * 10;

      ctx!.clearRect(0, 0, width, height);

      const { r, g, b, a: baseAlpha } = colorRef.current;
      const rgb = `${r},${g},${b}`;

      particles.current.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const cx = p.x + offsetX;
        const cy = p.y + offsetY;
        const alpha = Math.min(1, baseAlpha * p.o);
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, p.r * 6);
        grad.addColorStop(0, `rgba(${rgb},${alpha})`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(cx, cy, p.r * 6, 0, Math.PI * 2);
        ctx!.fill();
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
