/* File: src/components/ThemeSwitcher.jsx
  This is the actual button component that toggles the theme.
*/
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-switcher" aria-label="Toggle theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeSwitcher;

// Add these styles to App.css
/*
.theme-switcher {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  margin-left: auto; // Pushes it to the right
}

.theme-switcher:hover {
  color: var(--accent-color);
  transform: rotate(15deg) scale(1.1);
}
*/
