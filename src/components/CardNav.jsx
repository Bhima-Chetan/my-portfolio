import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

/** CardNav - Animated expandable navigation bar */
const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#ffffff',
  menuColor = '#000000',
  buttonBgColor = '#111',
  buttonTextColor = '#ffffff'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (!contentEl) return 260;
      const prev = { visibility: contentEl.style.visibility, pointerEvents: contentEl.style.pointerEvents, position: contentEl.style.position, height: contentEl.style.height };
      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';
      contentEl.offsetHeight; // reflow
      const topBar = 60; const padding = 16; const contentHeight = contentEl.scrollHeight;
      Object.assign(contentEl.style, prev);
      return topBar + contentHeight + padding;
    }
    return 260;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current; if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: prefersReducedMotion ? 0 : 50, opacity: prefersReducedMotion ? 1 : 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: prefersReducedMotion ? 0 : 0.45, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: prefersReducedMotion ? 0 : 0.45, ease, stagger: prefersReducedMotion ? 0 : 0.08 }, '-=0.15');
    return tl;
  }, [calculateHeight, ease, prefersReducedMotion]);

  useLayoutEffect(() => { if (prefersReducedMotion) return; const tl = createTimeline(); tlRef.current = tl; return () => { tl?.kill(); tlRef.current = null; }; }, [createTimeline, prefersReducedMotion]);

  useLayoutEffect(() => { const handleResize = () => { if (!tlRef.current) return; if (isExpanded) { const newHeight = calculateHeight(); gsap.set(navRef.current, { height: newHeight }); tlRef.current.kill(); const newTl = createTimeline(); if (newTl) { newTl.progress(1); tlRef.current = newTl; } } else { tlRef.current.kill(); const newTl = createTimeline(); if (newTl) tlRef.current = newTl; } }; window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, [isExpanded, calculateHeight, createTimeline]);

  const toggleMenu = () => { if (!tlRef.current && !prefersReducedMotion) return; if (!isExpanded) { setIsHamburgerOpen(true); setIsExpanded(true); prefersReducedMotion ? gsap.set(navRef.current, { height: calculateHeight() }) : tlRef.current.play(0); } else { setIsHamburgerOpen(false); if (prefersReducedMotion) { setIsExpanded(false); gsap.set(navRef.current, { height: 60 }); } else { tlRef.current.eventCallback('onReverseComplete', () => setIsExpanded(false)); tlRef.current.reverse(); } } };

  const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };

  // Close on ESC
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && isExpanded) { toggleMenu(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  // Focus trap when expanded
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  useEffect(() => {
    if (!isExpanded) return;
    const focusables = navRef.current?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
    if (focusables && focusables.length) {
      firstFocusableRef.current = focusables[0];
      lastFocusableRef.current = focusables[focusables.length - 1];
      firstFocusableRef.current.focus();
      const handler = e => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === firstFocusableRef.current) { e.preventDefault(); lastFocusableRef.current.focus(); }
        else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) { e.preventDefault(); firstFocusableRef.current.focus(); }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [isExpanded]);

  // Smooth scroll override for internal links
  const onNavClick = e => {
    const a = e.currentTarget;
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally close after navigation on mobile
      if (window.matchMedia('(max-width: 768px)').matches && isExpanded) toggleMenu();
    }
  };

  return (
    <div className={`card-nav-container ${className}`} role="banner">
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }} aria-label="Primary Navigation" aria-expanded={isExpanded}>
        <div className="card-nav-top">
          <button className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`} onClick={toggleMenu} aria-expanded={isExpanded} aria-label={isExpanded ? 'Close menu' : 'Open menu'} style={{ color: menuColor }} type="button">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
          {logo && <div className="logo-container"><img src={logo} alt={logoAlt} className="logo" loading="lazy" /></div>}
          <button type="button" className="card-nav-cta-button" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
        </div>
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="nav-card" ref={setCardRef(idx)} style={{ backgroundColor: item.bgColor, color: item.textColor }}>
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                    <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href || '#'} aria-label={lnk.ariaLabel || lnk.label} onClick={onNavClick}>
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
export default CardNav;