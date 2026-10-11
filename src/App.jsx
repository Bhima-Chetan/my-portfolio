import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import {
  FiArrowUp, FiBriefcase, FiCopy, FiDownload, FiGithub, FiGrid, FiHome, FiLayers, FiLinkedin, FiMail, FiMoon, FiUser, FiExternalLink,
} from 'react-icons/fi';
import Nav from './components/Nav';
import CommandPalette from './components/CommandPalette';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { profile, skillGroups } from './data';
import { copyText, toggleTheme } from './lib';

const marquee = skillGroups.flatMap((g) => g.skills);

const isTyping = (el) => el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
const go = (id) => () => document.getElementById(id)?.scrollIntoView();
const open = (url) => () => window.open(url, '_blank', 'noopener');

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  }, []);

  const flipTheme = useCallback((e) => setTheme(toggleTheme(e)), []);

  const copyEmail = useCallback(async () => {
    notify((await copyText(profile.email)) ? 'Email copied to clipboard' : profile.email);
  }, [notify]);

  // Ctrl/⌘+K anywhere, or "/" when not typing, toggles the command menu.
  useEffect(() => {
    const onKey = (e) => {
      const combo = e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey);
      if (combo || (e.key === '/' && !isTyping(e.target))) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands = [
    { id: 'home', group: 'Navigate', label: 'Home', icon: FiHome, run: go('top'), keywords: 'top hero start' },
    { id: 'about', group: 'Navigate', label: 'About', icon: FiUser, run: go('about'), keywords: 'bio me' },
    { id: 'experience', group: 'Navigate', label: 'Experience', icon: FiBriefcase, run: go('experience'), keywords: 'work jobs hal internship' },
    { id: 'projects', group: 'Navigate', label: 'Projects', icon: FiGrid, run: go('projects'), keywords: 'work portfolio festly' },
    { id: 'skills', group: 'Navigate', label: 'Skills', icon: FiLayers, run: go('skills'), keywords: 'stack tech tools' },
    { id: 'contact', group: 'Navigate', label: 'Contact', icon: FiMail, run: go('contact'), keywords: 'hire email message' },
    { id: 'copy', group: 'Actions', label: 'Copy email address', icon: FiCopy, run: copyEmail, keywords: 'mail contact' },
    { id: 'resume', group: 'Actions', label: 'Download résumé', icon: FiDownload, run: open(profile.resume), keywords: 'resume cv pdf' },
    { id: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, icon: FiMoon, run: () => setTheme(toggleTheme()), keywords: 'dark light mode appearance' },
    { id: 'github', group: 'Links', label: 'GitHub', icon: FiGithub, run: open(profile.github), keywords: 'code repos' },
    { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: FiLinkedin, run: open(profile.linkedin), keywords: 'social' },
    { id: 'festly', group: 'Links', label: 'Festly (live site)', icon: FiExternalLink, run: open('https://festly.co.in'), keywords: 'project booking' },
    { id: 'unfiltered', group: 'Links', label: 'Unfiltered blog (live site)', icon: FiExternalLink, run: open('https://bhuvanasrija-blogs.xyz/'), keywords: 'project blog cms' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />

      <Nav theme={theme} onTheme={flipTheme} onPalette={() => setPaletteOpen(true)} />

      <main id="main">
        <Hero onPalette={() => setPaletteOpen(true)} />

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i}>{t}<i>✦</i></span>
            ))}
          </div>
        </div>

        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact onCopy={copyEmail} />
      </main>

      <footer className="footer container">
        <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built from scratch.</p>
        <nav aria-label="Footer" className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          <a href="#top" className="to-top">Back to top <FiArrowUp aria-hidden="true" /></a>
        </nav>
      </footer>

      {paletteOpen && <CommandPalette commands={commands} onClose={() => setPaletteOpen(false)} />}

      <div className="toast-region" role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
