// src/sections/Home.jsx

import React from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/images/profile-picture.png'; // Ensure this path is correct!
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <motion.div 
          className="text-content"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypeAnimation
            sequence={[
              'BHIMA CHETAN', 1000,
              'A Full Stack Developer', 1000,
              'A Mobile App Expert', 1000,
              'A Problem Solver', 1000,
            ]}
            wrapper="h1"
            speed={50}
            // FIX: Removed inline styles for font-size to allow CSS to handle responsiveness
            className="home-title" 
            repeat={Infinity}
          />
          <p>
            Welcome to my portfolio! I'm passionate about creating amazing web and mobile applications
            using the latest technologies. Let's build something incredible together.
          </p>
          <motion.div 
            className="cta-buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="image-content"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* --- FIX IS HERE --- */}
          {/* The className="profile-image" is now directly on the img tag */}
          <img 
            src={profilePic} 
            alt="Bhima Chetan" 
            className="profile-image" 
            onError={(e) => {
              console.error("Profile image failed to load. Check the path in src/sections/Home.jsx");
              e.target.style.display = 'none';
            }} 
          />
          {/* The wrapping div has been removed as it was interfering with the CSS */}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;