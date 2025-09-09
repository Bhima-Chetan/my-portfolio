// src/App.jsx
import React, { Suspense, lazy } from 'react';
// import Navbar from './components/Navbar';
import CardNav from './components/CardNav';
import logo from './assets/react.svg';
import LiquidEther from './components/LiquidEther';
import './App.css';

// Lazy load components to reduce initial bundle size
const Home = lazy(() => import('./sections/Home.jsx'));
const About = lazy(() => import('./sections/About.jsx'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'));

const navItems = [
	{
		label: 'About',
		bgColor: '#0D0716',
		textColor: '#fff',
		links: [
			{ label: 'Overview', ariaLabel: 'About Overview', href: '#about' },
			{ label: 'Story', ariaLabel: 'About Story', href: '#about' }
		]
	},
	{
		label: 'Projects',
		bgColor: '#170D27',
		textColor: '#fff',
		links: [
			{ label: 'Featured', ariaLabel: 'Featured Projects', href: '#projects' },
			{ label: 'Latest', ariaLabel: 'Latest Projects', href: '#projects' }
		]
	},
	{
		label: 'Contact',
		bgColor: '#271E37',
		textColor: '#fff',
		links: [
			{ label: 'Email', ariaLabel: 'Email', href: '#contact' },
			{ label: 'Social', ariaLabel: 'Social Links', href: '#contact' }
		]
	}
];

function App() {
	return (
		<div className="App">
			{/* Replaced Vanta background with optimized LiquidEther shader background */}
			<LiquidEther fullScreen />

			<CardNav
				logo={logo}
				items={navItems.map(i => ({...i, bgColor: 'rgba(0,0,0,0.55)', textColor: '#E0E1DD'}))}
				baseColor="rgba(0,0,0,0.55)"
				menuColor="#E0E1DD"
				buttonBgColor="var(--accent-color)"
				buttonTextColor="#0D1B2A"
			/>
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