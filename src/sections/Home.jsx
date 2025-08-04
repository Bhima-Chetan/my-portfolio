// src/sections/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import profileImage from '../assets/profile-picture.webp';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1>
            Hi, I'm <span className="highlight">Bhima Chetan</span>
            <br />
            Full Stack Developer
          </h1>
          <p>
            I build beautiful, functional, and user-friendly web applications.
          </p>
        </motion.div>
        <motion.div 
          className="image-content"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 120 }}
        >
          <ProfileCard
            name="Bhima Chetan"
            title="Full Stack Developer"
            handle="bhima-chetan"
            status="Available for work"
            contactText="Contact Me"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            avatarUrl={profileImage}
            onContactClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
