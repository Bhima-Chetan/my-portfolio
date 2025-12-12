// src/sections/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  // IMPORTANT: Replace '#' with your actual profile URLs
  const socialLinks = {
    github: 'https://github.com/Bhima-Chetan',
    linkedin: 'https://www.linkedin.com/in/bhima-chetan-0b4b612b5/'
  };

  return (
    <section id="about" className="about-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="about-content"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="about-text"
        >
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={12}
            containerClassName="about-scroll-reveal"
            textClassName="about-reveal-text"
          >
            I'm a passionate Full Stack Developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
          </ScrollReveal>
          
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={10}
            containerClassName="about-scroll-reveal"
            textClassName="about-reveal-text"
          >
            My experience includes working with React, Node.js, JavaScript, TypeScript, and various other technologies. I'm always eager to learn new things and take on challenging projects. You can check out my projects below or connect with me on GitHub and LinkedIn.
          </ScrollReveal>
          
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={4}
            blurStrength={15}
            containerClassName="about-scroll-reveal quote-reveal"
            textClassName="about-reveal-text quote-text"
          >
            When does a developer truly succeed? When they write perfect code? No! When they use the latest framework? No! When they deploy without bugs? No! A developer succeeds when their work makes a lasting impact!
          </ScrollReveal>
        </motion.div>

        <motion.a 
          href="/new-updated-resume2.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="resume-button"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
          whileTap={{ scale: 0.95 }}
        >
          View My Resume
        </motion.a>

        <motion.div 
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub className="social-icon" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin className="social-icon" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;