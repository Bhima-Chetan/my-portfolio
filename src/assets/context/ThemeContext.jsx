/* File: src/context/ThemeContext.jsx
  This file creates the context that will provide the theme state to your entire app.
*/
import React, { createContext, useState, useEffect, useMemo } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme. It defaults to the user's saved theme in localStorage,
  // or 'dark' if nothing is saved.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  // This effect runs whenever the theme changes.
  useEffect(() => {
    // It sets a 'data-theme' attribute on the body tag (e.g., <body data-theme="dark">)
    document.body.setAttribute('data-theme', theme);
    // It saves the user's choice to localStorage.
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Memoize the context value to prevent unnecessary re-renders of consuming components
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
