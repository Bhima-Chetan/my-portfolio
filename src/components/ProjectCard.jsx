// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      className="project-card" 
      onClick={onClick}
      layout
    >
      <div className="project-category">{project.category}</div>
      <img 
        src={project.image} 
        alt={project.title} 
        className="project-image" 
        loading="lazy"
        width="600" // Added width
        height="400" // Added height
      />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description.substring(0, 100)}...</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;