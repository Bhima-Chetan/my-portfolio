// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import ThemeSwitcher from './ThemeSwitcher';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">MyPortfolio</div>
      
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link 
            to="home" 
            smooth={true} 
            duration={500}
            className={activeSection === 'home' ? 'active' : ''}
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
         {/* The ThemeSwitcher might be better placed outside the collapsible menu 
             or styled differently for mobile. For now, it stays for simplicity. */}
        <li className="desktop-only-switcher">
          <ThemeSwitcher />
        </li>
      </ul>
      <div className="mobile-switcher">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;