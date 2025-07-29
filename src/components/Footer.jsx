// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // IMPORTANT: Replace '#' with your actual profile URLs
  const socialLinks = {
    github: 'https://github.com/Bhima-Chetan',
    linkedin: 'https://www.linkedin.com/in/bhima-chetan-0b4b612b5/'
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="footer-content">
        <div className="footer-socials">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub className="footer-icon" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin className="footer-icon" />
          </a>
        </div>
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Bhima Chetan. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;