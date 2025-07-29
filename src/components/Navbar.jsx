// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const navLinks = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  return (
    <nav className="navbar">
      <div className="nav-logo">MyPortfolio</div>
      <ul className="nav-links">
        {navLinks.map(link => (
          <li key={link}>
            <Link
              to={link.toLowerCase()}
              spy={true} // Makes the link selected when scroll is at its target's position
              smooth={true} // Animates scrolling
              offset={-70} // Scrolls to an offset (to account for the fixed nav)
              duration={500} // Animation duration
              activeClass="active" // Class to apply when the link is active
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;