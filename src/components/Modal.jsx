// src/components/Modal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          layoutId={`card-container-${project.id}`}
        >
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="modal-image"
            layoutId={`project-image-${project.id}`}
          />
          <div className="modal-info">
            <motion.h2 layoutId={`project-title-${project.id}`}>{project.title}</motion.h2>
            <p>{project.description}</p>
            <div className="modal-tech">
              <strong>Technologies:</strong>
              <div className="tech-tags">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="modal-links">
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="modal-link">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.sourceCode && (
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="modal-link">
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
            <motion.button 
              className="close-button" 
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &times;
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;