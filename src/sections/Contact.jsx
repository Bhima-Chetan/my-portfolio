import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiMapPin, FiSend } from 'react-icons/fi';
import { SectionHead } from '../components/ui';
import { profile } from '../data';
import { magnetic, spotlight } from '../lib';

// EmailJS public identifiers (safe to ship; the template restricts what can be sent).
const EMAILJS = { service: 'service_kjgstfs', template: 'template_nag94kb', publicKey: 'UCRBAgp37vG9hpOez' };

function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <time>
      {now.toLocaleTimeString('en-IN', { timeZone: profile.timeZone, hour: '2-digit', minute: '2-digit' })} IST
    </time>
  );
}

const label = { idle: 'Send message', sending: 'Sending…', sent: 'Message sent', error: 'Failed. Try again' };

export default function Contact({ onCopy }) {
  const form = useRef(null);
  const [state, setState] = useState('idle');

  const send = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, { publicKey: EMAILJS.publicKey });
      setState('sent');
      form.current.reset();
    } catch {
      setState('error');
    }
  };

  return (
    <section id="contact" className="section container contact" aria-labelledby="contact-h">
      <div className="contact-copy">
        <SectionHead
          n="05"
          kicker="Contact"
          id="contact-h"
          title={
            <>
              Let&apos;s build something <em>together</em>.
            </>
          }
        />
        <p className="muted contact-lede">
          Hiring for a developer role, or have a project in mind? My inbox is open, and I usually reply within a day.
        </p>

        <div className="email-row">
          <a className="email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className="icon-btn" onClick={onCopy} aria-label="Copy email address" {...magnetic}>
            <FiCopy />
          </button>
        </div>

        <div className="contact-meta">
          <span>
            <FiMapPin aria-hidden="true" /> {profile.location} · <LocalTime />
          </span>
          <span className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" {...magnetic}>
              <FiGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" {...magnetic}>
              <FiLinkedin />
            </a>
          </span>
        </div>
      </div>

      <form ref={form} onSubmit={send} className="card contact-form" onPointerMove={spotlight}>
        <div className="field-row">
          <div className="field">
            <input id="f-name" name="name" required autoComplete="name" placeholder=" " />
            <label htmlFor="f-name">Your name</label>
          </div>
          <div className="field">
            <input id="f-email" name="email" type="email" required autoComplete="email" placeholder=" " />
            <label htmlFor="f-email">Email</label>
          </div>
        </div>
        <div className="field">
          <textarea id="f-msg" name="message" required rows="5" placeholder=" " />
          <label htmlFor="f-msg">What are you working on?</label>
        </div>
        <button type="submit" className={`btn btn-primary btn-block state-${state}`} disabled={state === 'sending'}>
          {state === 'sent' ? <FiCheck aria-hidden="true" /> : <FiSend aria-hidden="true" />}
          {label[state]}
        </button>
        <p className="sr-only" role="status">
          {state === 'sent' ? 'Your message was sent.' : state === 'error' ? 'Sending failed, please try again.' : ''}
        </p>
      </form>
    </section>
  );
}
