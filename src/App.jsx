// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About.jsx';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Scene3D from './components/Scene3D';
import './App.css';

function App() {
  return (
    <div className="App">
      <Preloader />
      <CustomCursor />
      
      {/* Replace the CSS particles with 3D scene */}
      <Scene3D />
      
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;