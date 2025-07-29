// src/sections/Projects.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';

import smartPresenceAiImage from '../assets/images/smart-presence-ai.jpg';
import bakeryEcommerceImage from '../assets/images/bakery-ecommerce.jpg';

// EXPANDED PROJECT DATA with category property
const allProjects = [
  { 
    id: 1, 
    title: 'SMART PRESENCE AI', 
    description: 'Engineered facial recognition attendance system with 98% accuracy using Python and TensorFlow. Developed intuitive dashboard for attendance reporting and analytics.', 
    image: smartPresenceAiImage, 
    category: 'AI',
    tech: ['Python', 'TensorFlow', 'React.js', 'Node.js', 'MongoDB', 'AWS'],
    liveDemo: '',
    sourceCode: 'https://github.com/chetan-github12/smart_presense_ai'
  },
  { 
    id: 2, 
    title: 'Bakery E-commerce', 
    description: 'Developed a full-featured e-commerce application for a bakery using Vue and Firebase. Implemented user authentication, product management, and real-time order tracking.', 
    image: bakeryEcommerceImage, 
    category: 'Web App',
    tech: ['Vue', 'Firebase'],
    liveDemo: '',
    sourceCode: 'https://github.com/Bhima-Chetan/bakery-e-commerce'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Modern responsive portfolio website built with React and Framer Motion. Features 3D animations, theme switching, and interactive components.',
    image: 'https://placehold.co/600x400/1B263B/E0E1DD?text=Portfolio',
    category: 'Web App',
    tech: ['React', 'Framer Motion', 'Three.js', 'CSS3'],
    liveDemo: '',
    sourceCode: 'https://github.com/your-username/portfolio'
  },
  {
    id: 4,
    title: 'Task Manager Mobile App',
    description: 'Cross-platform mobile application for task management with real-time synchronization and offline support.',
    image: 'https://placehold.co/600x400/20C997/0D1B2A?text=Task+Manager',
    category: 'Mobile App',
    tech: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
    liveDemo: '',
    sourceCode: 'https://github.com/your-username/task-manager'
  },
  {
    id: 5,
    title: 'Weather Prediction AI',
    description: 'Machine learning model for weather prediction using historical data and real-time APIs with 85% accuracy.',
    image: 'https://placehold.co/600x400/415A77/E0E1DD?text=Weather+AI',
    category: 'AI',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'API Integration'],
    liveDemo: '',
    sourceCode: 'https://github.com/your-username/weather-ai'
  },
  {
    id: 6,
    title: 'Fitness Tracker App',
    description: 'Native mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
    image: 'https://placehold.co/600x400/007BFF/F8F9FA?text=Fitness+App',
    category: 'Mobile App',
    tech: ['Flutter', 'Dart', 'SQLite', 'Health Kit'],
    liveDemo: '',
    sourceCode: 'https://github.com/your-username/fitness-tracker'
  }
];

const filterCategories = ['All', 'Web App', 'Mobile App', 'AI'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // useMemo ensures this logic only re-runs when the activeFilter changes
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return allProjects;
    }
    return allProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="projects-section">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.h2>

      {/* Filter Buttons */}
      <motion.div 
        className="filter-buttons"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filterCategories.map((category, index) => (
          <motion.button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Animated Project Gallery */}
      <motion.div layout className="project-gallery">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              whileHover={{ y: -10 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;