// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <nav className="navbar">
      <div className="nav-logo">MyPortfolio</div>
      <ul className="nav-links">
        <li>
          <Link 
            to="home" 
            smooth={true} 
            duration={500}
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="about" 
            smooth={true} 
            duration={500}
            className={activeSection === 'about' ? 'active' : ''}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="projects" 
            smooth={true} 
            duration={500}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            to="skills" 
            smooth={true} 
            duration={500}
            className={activeSection === 'skills' ? 'active' : ''}
          >
            Skills
          </Link>
        </li>
        <li>
          <Link 
            to="contact" 
            smooth={true} 
            duration={500}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </li>
      </ul>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;