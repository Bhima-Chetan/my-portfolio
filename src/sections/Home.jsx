// src/sections/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import profilePicture from '../assets/profile-picture.webp'; // Changed to .webp

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
          <img 
            src={profilePicture} 
            alt="Bhima Chetan" 
            className="profile-image" 
            width="300" // Added width
            height="300" // Added height
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
