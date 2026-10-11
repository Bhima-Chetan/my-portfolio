// Small DOM helpers shared by sections. Plain handlers, no hooks: they only touch the element's own style.

export const ease = [0.2, 0.8, 0.2, 1];

export const modKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor-follow glow: card CSS reads --mx / --my.
export function spotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

// Buttons drift toward the pointer, spring back on leave. Mouse only.
export const magnetic = {
  onPointerMove(e) {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  },
  onPointerLeave(e) {
    e.currentTarget.style.transform = '';
  },
};

// 3D tilt + glare. CSS reads --rx / --ry (and --mx / --my for the glare).
export const tilt = {
  onPointerMove(e) {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 12).toFixed(2)}deg`);
    spotlight(e);
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  },
};

// Theme flip with a circular reveal from the click point (View Transitions), instant where unsupported.
export function toggleTheme(e) {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: theme just won't persist */
    }
  };
  if (!document.startViewTransition || reducedMotion()) {
    apply();
    return next;
  }
  // Keyboard-triggered clicks report 0,0, so reveal from the centre instead.
  const fromPointer = e && e.detail > 0;
  const x = fromPointer ? e.clientX : innerWidth / 2;
  const y = fromPointer ? e.clientY : innerHeight / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
  return next;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
