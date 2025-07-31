// src/sections/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiVite, SiTailwindcss, SiTypescript, SiPostgresql, SiNextdotjs } from 'react-icons/si';

const skills = [
  { name: 'React', icon: <FaReact size={50} />, level: 90 },
  { name: 'Node.js', icon: <FaNodeJs size={50} />, level: 85 },
  { name: 'TypeScript', icon: <SiTypescript size={50} />, level: 85 },
  { name: 'JavaScript', icon: <FaJsSquare size={50} />, level: 88 },
  { name: 'HTML5', icon: <FaHtml5 size={50} />, level: 95 },
  { name: 'CSS3', icon: <FaCss3Alt size={50} />, level: 90 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={50} />, level: 88 },
  { name: 'Next.js', icon: <SiNextdotjs size={50} />, level: 80 },
  { name: 'Express.js', icon: <SiExpress size={50} />, level: 82 },
  { name: 'MongoDB', icon: <SiMongodb size={50} />, level: 80 },
  { name: 'PostgreSQL', icon: <SiPostgresql size={50} />, level: 78 },
  { name: 'Git', icon: <FaGitAlt size={50} />, level: 85 },
  { name: 'Docker', icon: <FaDocker size={50} />, level: 70 },
  { name: 'Vite', icon: <SiVite size={50} />, level: 75 },
  { name: 'AWS', icon: <FaAws size={50} />, level: 65 },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <motion.div 
        className="skills-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5}}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </motion.h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="skill-card-enhanced"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <p className="skill-name">{skill.name}</p>
              
              {/* Circular Progress Bar */}
              <div className="skill-progress-circle">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring-background"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="4"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                  <motion.circle
                    className="progress-ring-progress"
                    stroke="var(--accent-color)"
                    strokeWidth="4"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "226 226", strokeDashoffset: 226 }}
                    whileInView={{ 
                      strokeDashoffset: 226 - (226 * skill.level) / 100 
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 * index }}
                  />
                </svg>
                <div className="skill-percentage">{skill.level}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
