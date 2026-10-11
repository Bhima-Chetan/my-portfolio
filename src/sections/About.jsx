import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import { SectionHead } from '../components/ui';
import { stats } from '../data';
import { spotlight } from '../lib';

const bio =
  "I'm a Computer Science graduate who spent six months shipping production code at Hindustan Aeronautics Limited, across an Angular front end, a .NET Web API and PostgreSQL. I'm comfortable in Python, Java, C# and SQL, and I like owning work end-to-end: from the data model, to the last pixel, to the Docker container it ships in.";

// Words brighten as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="scroll-text">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Stat({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    if (inView) animate(count, value, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1] });
  }, [inView, count, value]);
  return (
    <div ref={ref} className="card stat" onPointerMove={spotlight}>
      <motion.span className="stat-num">{rounded}</motion.span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-h">
      <SectionHead
        n="01"
        kicker="About"
        id="about-h"
        title={
          <>
            Engineer by training, <em>product-minded</em> by habit.
          </>
        }
      />
      <div className="about-grid">
        <ScrollText text={bio} />
        <div className="stats">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
          <div className="card edu" onPointerMove={spotlight}>
            <FiBookOpen aria-hidden="true" />
            <div>
              <strong>B.Tech, Computer Science &amp; Engineering</strong>
              <span>ICFAI Tech School · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
