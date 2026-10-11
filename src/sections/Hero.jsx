import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowDownRight, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import FieldCanvas from '../components/FieldCanvas';
import photo from '../assets/profile-picture.webp';
import { profile, roles } from '../data';
import { ease, magnetic, modKey, tilt } from '../lib';

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <span className="sr-only">{roles.join(', ')}</span>
      <span className="rotator" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

// Each letter animates in on load and lifts on hover (CSS `translate`, so it doesn't fight the intro `transform`).
function Kinetic({ word, offset, className }) {
  return (
    <span className={`word ${className ?? ''}`} aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={i} className="char" style={{ '--i': offset + i }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero({ onPalette }) {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <FieldCanvas />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.p className="status" {...fadeUp(0.05)}>
            <span className="pulse" aria-hidden="true" /> Open to full-time roles · {profile.location}
          </motion.p>

          <h1 className="hero-title">
            <span className="sr-only">{profile.name}</span>
            <Kinetic word="Bhima" offset={0} />
            <Kinetic word="Chetan" offset={5} className="serif" />
          </h1>

          <motion.p className="hero-sub" {...fadeUp(0.55)}>
            Software developer building <RoleRotator />
          </motion.p>

          <motion.p className="hero-lede" {...fadeUp(0.65)}>
            Recently shipped production features at <strong>Hindustan Aeronautics Limited</strong> across an Angular
            front end, a .NET Web API and PostgreSQL. B.Tech CSE, class of 2026.
          </motion.p>

          <motion.div className="hero-cta" {...fadeUp(0.75)}>
            <a className="btn btn-primary" href="#projects" {...magnetic}>
              See my work <FiArrowDownRight aria-hidden="true" />
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer" {...magnetic}>
              <FiDownload aria-hidden="true" /> Résumé
            </a>
          </motion.div>

          <motion.button type="button" className="hint" onClick={onPalette} {...fadeUp(0.9)}>
            Press <kbd>{modKey}</kbd>
            <kbd>K</kbd> to jump anywhere
          </motion.button>
        </div>

        <motion.div
          className="portrait"
          {...tilt}
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
        >
          <div className="portrait-frame">
            <img src={photo} alt="Portrait of Bhima Chetan" width="1280" height="1280" fetchPriority="high" />
            <a className="portrait-meta" href="https://festly.co.in" target="_blank" rel="noreferrer">
              <span>Currently building</span>
              <strong>
                Festly <FiArrowUpRight aria-hidden="true" />
              </strong>
            </a>
          </div>
          <span className="float-chip c1" aria-hidden="true">Angular</span>
          <span className="float-chip c2" aria-hidden="true">.NET Web API</span>
          <span className="float-chip c3" aria-hidden="true">PostgreSQL</span>
          <span className="float-chip c4" aria-hidden="true">Next.js</span>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
