// src/App.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import VantaNetBackground from './components/VantaNetBackground';
import './App.css';

// Lazy load components to reduce initial bundle size
const Home = lazy(() => import('./sections/Home.jsx'));
const About = lazy(() => import('./sections/About.jsx'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'));

function App() {
  return (
    <div className="App">
      {/* Vanta.js NET Background */}
      <VantaNetBackground />
      
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading-section">Loading...</div>}>
          <Home />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ScrollToTopButton />
      </Suspense>
    </div>
  );
}

export default App;