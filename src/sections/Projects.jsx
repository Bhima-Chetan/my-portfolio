import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiGithub, FiHeart, FiUser } from 'react-icons/fi';
import { SectionHead, Tags } from '../components/ui';
import { projects } from '../data';
import { ease, spotlight } from '../lib';

const filters = ['All', ...new Set(projects.map((p) => p.kind))];

// Tiny CSS illustrations of what each product does: no stock images to maintain.
const art = {
  festly: (
    <div className="mock-booking">
      <div className="mb-row">
        <span>Sat · 6:00 PM</span>
        <span className="mb-live">● Open</span>
      </div>
      <strong>Badminton · Doubles</strong>
      <div className="mb-spots">
        {[1, 1, 1, 1, 0, 0].map((f, i) => (
          <i key={i} className={f ? 'on' : ''} />
        ))}
        <span>2 spots left</span>
      </div>
      <span className="mb-btn">Book spot</span>
      <span className="mb-pill">0% commission</span>
    </div>
  ),
  unfiltered: (
    <div className="mock-editor">
      <div className="me-bar">
        <b>B</b>
        <i>I</i>
        <u>U</u>
        <span>H2</span>
        <span>“ ”</span>
      </div>
      <strong>An unfiltered week</strong>
      <span className="me-line" />
      <span className="me-line" />
      <span className="me-line short" />
      <div className="me-react">
        <span>
          <FiHeart /> Like
        </span>
        <span>✦ Subscribe</span>
      </div>
    </div>
  ),
  'smart-presence': (
    <div className="mock-scan">
      <FiUser className="ms-face" />
      <span className="ms-line" />
      <span className="ms-tag">
        <FiCheck /> Marked present
      </span>
    </div>
  ),
  chat: (
    <div className="mock-chat">
      <span className="bubble in">Still on for 7?</span>
      <span className="bubble out">
        On my way <small>✓✓</small>
      </span>
      <span className="bubble in typing">
        <i />
        <i />
        <i />
      </span>
    </div>
  ),
  expense: (
    <div className="mock-bars">
      {[38, 62, 45, 80, 54, 70, 30].map((h, i) => (
        <i key={i} style={{ '--h': `${h}%`, '--d': `${i * 50}ms` }} />
      ))}
    </div>
  ),
  todo: (
    <ul className="mock-todo">
      <li className="done">
        <i>
          <FiCheck />
        </i>
        Ship portfolio
      </li>
      <li className="done">
        <i>
          <FiCheck />
        </i>
        Review PR
      </li>
      <li className="tick">
        <i>
          <FiCheck />
        </i>
        Book a court
      </li>
    </ul>
  ),
};

function ProjectCard({ p, ref }) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease }}
      className={`card project${p.featured ? ' featured' : ''}`}
      onPointerMove={spotlight}
    >
      <div className={`project-art art-${p.id}`} aria-hidden="true">
        {art[p.id]}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{p.kind}</span>
          {p.status && <span className="badge">{p.status}</span>}
        </div>
        <h3>{p.title}</h3>
        <p>{p.tagline}</p>
        {p.points && (
          <ul className="project-points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}
        <Tags items={p.stack} />
        <div className="project-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="link-arrow">
              Live site <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only">for {p.title}</span>
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" className="link-arrow">
              <FiGithub aria-hidden="true" /> Source
              <span className="sr-only">code for {p.title}</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.kind === filter);

  return (
    <section id="projects" className="section container" aria-labelledby="projects-h">
      <div className="projects-head">
        <SectionHead
          n="03"
          kicker="Selected work"
          id="projects-h"
          title={
            <>
              Things I&apos;ve <em>built</em>.
            </>
          }
        />
        <div className="tabs" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {filter === f && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span>
                {f} <small>{f === 'All' ? projects.length : projects.filter((p) => p.kind === f).length}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
