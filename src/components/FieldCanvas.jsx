import { useEffect, useRef } from 'react';

// ponytail: tuning knobs. GAP = dot spacing, RADIUS = cursor influence, PUSH / RIPPLE = force.
const GAP = 30;
const RADIUS = 150;
const PUSH = 5;
const RIPPLE = 320;

// Interactive dot grid behind the hero: dots flee the cursor and spring home; click/tap sends a ripple.
// The loop sleeps once everything settles, and while the hero is off-screen.
export default function FieldCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -1e4, y: -1e4 };
    let dots = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let base = '';
    let hot = '';

    const readColors = () => {
      const s = getComputedStyle(canvas);
      base = s.getPropertyValue('--dot').trim();
      hot = s.getPropertyValue('--field-hot').trim();
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      }
      readColors();
      draw();
    };

    // One pass: physics + render. Far dots share a single path; only near dots get their own fill.
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = base;
      ctx.beginPath();
      const near = [];
      let energy = 0;
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < RADIUS) {
          const f = (1 - dist / RADIUS) * PUSH;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx = (d.vx + (d.ox - d.x) * 0.08) * 0.82;
        d.vy = (d.vy + (d.oy - d.y) * 0.08) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
        energy += Math.abs(d.vx) + Math.abs(d.vy);
        const t = dist < RADIUS ? 1 - dist / RADIUS : 0;
        if (t > 0.04) near.push([d, t]);
        else {
          ctx.moveTo(d.x + 1.2, d.y);
          ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      ctx.fillStyle = hot;
      for (const [d, t] of near) {
        ctx.globalAlpha = 0.35 + t * 0.65;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2 + t * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return energy > 0.05 || near.length > 0;
    };

    const loop = () => {
      raf = draw() && visible ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      wake();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
      wake();
    };
    const onDown = (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      if (cy < 0 || cy > h) return;
      for (const d of dots) {
        const dx = d.x - cx;
        const dy = d.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < RIPPLE) {
          const f = (1 - dist / RIPPLE) * 22;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
      }
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    const themeWatch = new MutationObserver(() => {
      readColors();
      draw();
    });

    resize();
    io.observe(canvas);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', resize);
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      window.addEventListener('pointerdown', onDown, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeWatch.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} className="dot-field" aria-hidden="true" />;
}
