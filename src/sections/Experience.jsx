import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { SectionHead, Tags } from '../components/ui';
import { experience } from '../data';
import { ease } from '../lib';

export default function Experience() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] });
  const [open, setOpen] = useState(experience[0].id);

  return (
    <section id="experience" className="section container" aria-labelledby="exp-h">
      <SectionHead
        n="02"
        kicker="Experience"
        id="exp-h"
        title={
          <>
            Where I&apos;ve <em>shipped</em>.
          </>
        }
      />

      <ol className="timeline" ref={list}>
        <motion.span className="timeline-fill" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
        {experience.map((job, i) => {
          const isOpen = open === job.id;
          return (
            <motion.li
              key={job.id}
              className={`job${isOpen ? ' open' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <span className="job-dot" aria-hidden="true" />
              <h3>
                <button
                  type="button"
                  className="job-head"
                  aria-expanded={isOpen}
                  aria-controls={`job-${job.id}`}
                  onClick={() => setOpen(isOpen ? null : job.id)}
                >
                  <span className="job-period">{job.period}</span>
                  <span className="job-title">
                    <strong>{job.role}</strong>
                    <span>
                      {job.company} · {job.place}
                    </span>
                  </span>
                  <FiPlus className="job-toggle" aria-hidden="true" />
                </button>
              </h3>
              <div className="job-body" id={`job-${job.id}`} inert={!isOpen}>
                <div>
                  <p>{job.summary}</p>
                  <ul className="job-points">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Tags items={job.stack} />
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
