import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { SectionHead } from '../components/ui';
import { skillGroups, skillNotes, usedIn } from '../data';
import { ease, spotlight } from '../lib';

export default function Skills() {
  const [skill, setSkill] = useState('Angular');
  const uses = usedIn(skill);

  return (
    <section id="skills" className="section container" aria-labelledby="skills-h">
      <SectionHead
        n="04"
        kicker="Skills"
        id="skills-h"
        title={
          <>
            The toolkit, and <em>where</em> I&apos;ve used it.
          </>
        }
      />

      <div className="skills-grid">
        <div className="skill-groups">
          <p className="skills-hint">Pick a skill to see the roles and projects behind it →</p>
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.name}
              className="skill-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: gi * 0.06, ease }}
            >
              <h3>{g.name}</h3>
              <div className="chips" role="group" aria-label={g.name}>
                {g.skills.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chip-btn"
                    aria-pressed={s === skill}
                    aria-controls="skill-panel"
                    onClick={() => setSkill(s)}
                  >
                    {s}
                    {usedIn(s).length > 0 && <sup>{usedIn(s).length}</sup>}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <aside id="skill-panel" className="card skill-panel" aria-live="polite" onPointerMove={spotlight}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease }}
            >
              <p className="kicker">Used in</p>
              <h3>{skill}</h3>
              {uses.length ? (
                <ul className="uses">
                  {uses.map((u) => (
                    <li key={u.title}>
                      <a href={u.href}>
                        <span className="use-type">{u.type}</span>
                        <span className="use-text">
                          <strong>{u.title}</strong>
                          <small>{u.sub}</small>
                        </span>
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">
                  {skillNotes[skill] ?? 'Not showcased in a project here yet. Happy to talk through how I use it.'}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}
