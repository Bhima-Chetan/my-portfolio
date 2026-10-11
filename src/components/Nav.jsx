import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCommand, FiMoon, FiSun } from 'react-icons/fi';
import { magnetic, modKey } from '../lib';

const links = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Work'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

export default function Nav({ theme, onTheme, onPalette }) {
  const [active, setActive] = useState('');

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <a href="#top" className="nav-logo" aria-label="Bhima Chetan, back to top">
        bc<span>.</span>
      </a>

      <nav aria-label="Primary" className="nav-links">
        <ul>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                {active === id && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={onTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          {...magnetic}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <button type="button" className="menu-btn" onClick={onPalette} aria-label="Open command menu" aria-haspopup="dialog">
          {modKey === '⌘' ? <FiCommand aria-hidden="true" /> : <span className="hide-sm">Ctrl</span>}
          <span className="hide-sm">K</span>
          <span className="show-sm">Menu</span>
        </button>
      </div>
    </header>
  );
}
