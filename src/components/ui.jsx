import { motion } from 'framer-motion';
import { ease } from '../lib';

export function SectionHead({ n, kicker, title, id }) {
  return (
    <motion.header
      className="section-head"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease }}
    >
      <p className="kicker">
        <span>{n}</span> {kicker}
      </p>
      <h2 id={id}>{title}</h2>
    </motion.header>
  );
}

export function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
