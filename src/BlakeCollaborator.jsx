import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles/print.css';

// Company favicons mapping
const companyFavicons = {
  'd/rksci': '/assets/drksci-favicon.svg',
  'Drksci': '/assets/drksci-favicon.svg',
  'ValuePRO Software': '/assets/valuepro-favicon.png',
  'ValuePRO Software (Constellation Software)': '/assets/valuepro-favicon.png',
  'Constellation Software': '/assets/constellation-favicon.ico',
  'Omegro': '/assets/omegro-favicon.png'
};

const getFavicon = (company) => {
  // Try exact match first
  if (companyFavicons[company]) return companyFavicons[company];

  // Try partial matches
  for (const [key, value] of Object.entries(companyFavicons)) {
    if (company.includes(key) || key.includes(company)) {
      return value;
    }
  }

  return null;
};

const BlakeCollaborator = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check URL hash for light mode
    const checkLightMode = () => {
      const isLightMode = window.location.hash === '#light';
      setIsDarkMode(!isLightMode);

      // Apply dark mode class to html element
      if (isLightMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    };

    // Check on mount
    checkLightMode();

    // Listen for hash changes
    window.addEventListener('hashchange', checkLightMode);

    return () => {
      window.removeEventListener('hashchange', checkLightMode);
    };
  }, []);

  useEffect(() => {
    // Smooth scroll to section when navigation changes
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behaviour: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  const generatePDF = () => {
    // Use the pre-generated static PDF
    const link = document.createElement('a');
    link.href = '/pdfs/blake-carter-resume.pdf';
    link.download = 'Blake_Carter_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Blake Carter - d/rksci</title>
        <style>{`
          .dark {
            filter: sepia(0.02) saturate(1.05) hue-rotate(10deg);
          }
          .no-filter {
            filter: none !important;
          }
          .cinematic-bw {
            filter: grayscale(100%) contrast(1.2) brightness(0.9) !important;
          }

          /* Light mode version - brighter and softer */
          html:not(.dark) .cinematic-bw {
            filter: grayscale(100%) contrast(0.8) brightness(1.3) !important;
          }
          .poster-dots::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle, rgba(0,0,0,0.15) 0.5px, transparent 0.5px);
            background-size: 3px 3px;
            pointer-events: none;
            mix-blend-mode: multiply;
          }
          .halftone-poster {
            filter: contrast(1.4) brightness(1.05) saturate(0.8) !important;
          }
          .halftone-poster::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
              radial-gradient(circle at 25% 25%, rgba(0,0,0,0.3) 1.5px, transparent 1.5px),
              radial-gradient(circle at 75% 25%, rgba(0,0,0,0.25) 1.2px, transparent 1.2px),
              radial-gradient(circle at 25% 75%, rgba(0,0,0,0.35) 1.8px, transparent 1.8px),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.28) 1.3px, transparent 1.3px),
              radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 1px, transparent 1px);
            background-size:
              8px 8px, 6px 6px, 10px 10px, 7px 7px, 4px 4px;
            opacity: 0.8;
            pointer-events: none;
            mix-blend-mode: multiply;
            opacity: 1;
          }
          .film-grain {
            filter: sepia(0.15) saturate(1.1) contrast(1.05) brightness(0.98);
          }
          .film-grain::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
              radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px),
              radial-gradient(circle, rgba(0,0,0,0.08) 0.3px, transparent 0.3px);
            background-size:
              4px 4px,
              2px 2px;
            background-position:
              0 0,
              1px 1px;
            pointer-events: none;
            mix-blend-mode: overlay;
            opacity: 0.6;
          }

          /* Dark mode body background fix */
          html.dark {
            background-color: #000000 !important;
          }
          body {
            background-color: white;
            transition: background-color 0.3s ease;
          }
          html.dark body {
            background-color: #000000 !important;
          }
        `}</style>
      </Helmet>
      
      <div className={`min-h-screen transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white ${isDarkMode ? 'dark' : ''}`}>
        {/* Header with Navigation */}
        <header className="sticky top-0 z-10 backdrop-blur-sm print-hide transition-colors duration-300 bg-white/95 border-b border-gray-200 dark:bg-black/95 dark:border-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center py-4 sm:py-8">
              {/* Logo */}
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '120px', height: 'auto' }} className="sm:max-w-[160px]">
                  <defs>

                    {/* Dark mode gradients */}
                    <linearGradient id="slash-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="33%" stopColor="#FF00FF" />
                      <stop offset="33%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#6400FF" />
                    </linearGradient>
                    <linearGradient id="trail1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail2-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail3-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(-2, 0)">
                    {/* Light mode logo (hidden in dark mode) - Simple stroke version */}
                    <g className="dark:hidden">
                      <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#111827">d</text>
                      <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#111827">rksci</text>
                      <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" stroke="#111827" strokeWidth="2" fill="none" />
                    </g>

                    {/* Dark mode logo (hidden in light mode) */}
                    <g className="hidden dark:block">
                      <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.6"/>
                      <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.6"/>
                      <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.6"/>
                      <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-dark)"/>
                      <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-dark)"/>
                      <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-dark)"/>
                      <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                      <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                      <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-dark)" />
                    </g>
                  </g>
                </svg>
              </Link>
              
              {/* Navigation and LinkedIn/PDF */}
              <div className="flex items-center space-x-4 sm:space-x-8">
                <nav className="flex items-center">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setActiveSection('profile')}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-light tracking-wider transition-colors ${
                        activeSection === 'profile'
                          ? 'text-black border-b border-black dark:text-white dark:border-white'
                          : 'text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200'
                      }`}
                    >
                      PROFILE
                    </button>
                    <button
                      onClick={() => setActiveSection('resume')}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-light tracking-wider transition-colors ${
                        activeSection === 'resume'
                          ? 'text-black border-b border-black dark:text-white dark:border-white'
                          : 'text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200'
                      }`}
                    >
                      EXPERIENCE
                    </button>
                  </div>
                </nav>
                
                <div className="flex items-center space-x-2">
                  {/* LinkedIn Button */}
                  <a 
                    href="https://www.linkedin.com/in/blake-carter-5995ab5a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* PDF Download Button */}
                  <button
                    onClick={generatePDF}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    aria-label="Download Resume PDF"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2v20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6H4c-1.1 0-2 .9-2 2z"/>
                      <path d="M14 2v6h6"/>
                      <text x="12" y="16" fontSize="7" textAnchor="middle" fill="#000" fontFamily="sans-serif" fontWeight="900" stroke="#000" strokeWidth="0.5">PDF</text>
                    </svg>
                  </button>

                  {/* Dark/Light Mode Toggle */}
                  <button
                    onClick={() => {
                      const isCurrentlyLight = window.location.hash === '#light';
                      if (isCurrentlyLight) {
                        window.location.hash = '';
                      } else {
                        window.location.hash = '#light';
                      }
                    }}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? (
                      // Sun icon for light mode
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      // Moon icon for dark mode
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>


        <div className="max-w-5xl mx-auto px-12 sm:px-18 py-20">
          {/* Profile Section */}
          <section id="profile" className="mb-40">
            {/* Profile Header - HARMONIZED: Using consistent display typography */}
            <div className="mb-20">
              <h1 className="blake-title text-4xl sm:text-5xl md:text-7xl tracking-tight mb-8 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Blake Carter</h1>
            </div>

            {/* Executive Summary */}
            <div className="mb-20">
              {/* HARMONIZED: Executive Summary style - preserved as subsection label */}
              <h2 className="text-sm font-light mb-8 tracking-[0.3em] uppercase text-black dark:text-white">Executive Summary</h2>
              <div className="max-w-4xl">
                {/* HARMONIZED: Body text with consistent styling */}
                <p className="text-lg font-light leading-relaxed mb-8 text-gray-800 dark:text-gray-300">
                  Hands-on technical leader with organic experience spanning product development, operational excellence,
                  and strategic transformation. Passionate about tackling complex challenges that require deep understanding
                  and versatile execution.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                  Focused on opportunities with natural fit to experience, tenacity, and disposition to look beyond
                  the status-quo. Thrives on novel challenges, hands-on learning, and doing the hard yards.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-8 tracking-[0.3em] uppercase text-black dark:text-white">Leadership Values</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-16 philosophy-grid">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-0 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  {/* HARMONIZED: Content heading */}
                  <h3 className="text-lg sm:text-xl font-medium mb-0 tracking-wide text-black dark:text-white">Envision</h3>
                  <p className="font-light text-xs sm:text-sm text-gray-800 dark:text-gray-300">the extraordinary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-0 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <circle cx="6" cy="12" r="3" strokeWidth={0.5} />
                      <circle cx="18" cy="12" r="3" strokeWidth={0.5} />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h0" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12h0" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-0 tracking-wide text-black dark:text-white">Collaborate</h3>
                  <p className="font-light text-xs sm:text-sm text-gray-800 dark:text-gray-300">with charisma</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-0 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.58-5.84a14.98 14.98 0 012.58 5.84M9.75 7.5l3 3m0 0l3-3M12 10.5V21" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-0 tracking-wide text-black dark:text-white">Persevere</h3>
                  <p className="font-light text-xs sm:text-sm text-gray-800 dark:text-gray-300">to achieve</p>
                </div>
              </div>
            </div>

            {/* Character Profile */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-8 tracking-[0.3em] uppercase text-black dark:text-white">Character Profile</h2>
              <div className="space-y-4 max-w-4xl">
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  {/* HARMONIZED: Body text */}
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    I pursue meaningful work with a passion for ground-up understanding
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    I thrive on novel challenges, hands-on learning, hard yards, and jumping in the deep end
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    I rely on trusted stakeholder relationships and dependability as essential foundations
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Insights */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-8 tracking-[0.3em] uppercase text-black dark:text-white">Personal Insights</h2>
              <div className="blake-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-2 max-w-4xl text-xs">
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Location</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Brisbane</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Travel / Relocate</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Yes</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Married</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Las Vegas</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Hobby</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Spelunking</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">First car</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">'91 Prelude</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">First PC</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Osbourne 1</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Holidays</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Waratah, TAS</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-light text-black dark:text-gray-400">Weakness</span>
                  <span className="text-gray-700 mx-1 flex-1 border-b border-dotted border-gray-200 text-2xs" style={{backgroundImage: 'radial-gradient(circle, rgb(156, 163, 175) 0.5px, transparent 0.5px)', backgroundSize: '3px 1px', backgroundPosition: 'bottom', backgroundRepeat: 'repeat-x', height: '1em', borderBottom: 'none', alignSelf: 'flex-end', marginBottom: '2px'}}></span>
                  <span className="font-light text-black dark:text-gray-200">Challenges</span>
                </div>
              </div>

              {/* Right to Work and Police Check */}
              <div className="flex items-center gap-8 mt-8 max-w-4xl text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 font-light">Right to work (Australian Citizen)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 font-light">National Police Check</span>
                </div>
              </div>
            </div>

          </section>

          {/* Resume Section */}
          <section id="resume" className="mb-40">
            {/* HARMONIZED: Section heading */}
            <h2 className="text-4xl md:text-5xl tracking-tight mb-20 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Professional Experience</h2>
            
            {/* Drksci */}
            <div className="mb-20   experience-item">
              <div className="mb-8 experience-header">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl mb-3 tracking-wide text-black dark:text-white experience-title" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Founder</h3>
                <div className="flex items-center gap-3 mb-2">
                  {getFavicon('d/rksci') && (
                    <img
                      src={getFavicon('d/rksci')}
                      alt="d/rksci logo"
                      className="w-4 h-4 opacity-80"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <p className="text-black dark:text-white font-light text-sm tracking-wider experience-company"><strong>d/rksci</strong> • Aug 2024 - Present (1 yr 2 mos)</p>
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-400 font-light tracking-wider uppercase">
                  Innovation Lab • AI Integration • Data Visualisation • Rapid Prototyping
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                As Founder of d/rksci, I lead an innovation lab focused on the practical application of AI and data science for business. My work involves hands-on <strong>AI Integration</strong>, <strong>Data Visualisation</strong>, and <strong>Rapid Prototyping</strong> to transform complex concepts into tangible solutions for market testing. This work focuses on impact over commerciality.
              </p>
              <div className="space-y-10">
                <div>
                  {/* HARMONIZED: Subsection label */}
                  <h4 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Key Projects & Research</h4>
                  <div className="space-y-2 max-w-4xl">
                    <div className="flex items-baseline">
                      <span className="text-purple-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href="https://kareer.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors">
                          <strong>Kareer.app</strong>
                          <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>: AI-agent operating system for personalised career development.
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-green-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href="https://mapgyver.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-green-300 transition-colors">
                          <strong>MapGyver</strong>
                          <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>: AI-powered lost person modelling with terrain analysis and behavioural prediction.
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-pink-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href="https://princhester.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-pink-300 transition-colors">
                          <strong>Princhester Associates</strong>
                          <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>: AI-driven consulting platform for automated strategic advisory services.
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-orange-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href="https://prophet.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-orange-300 transition-colors">
                          <strong>Prophet</strong>
                          <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>: AI urban development model with scenario backtesting for land development opportunities.
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-cyan-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href="https://rained.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors">
                          <strong>rained.cloud</strong>
                          <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>: Data preservation platform for historical Australian rainfall analysis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ValuePRO CEO */}
            <div className="mb-20  ">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Chief Executive Officer</h3>
                <div className="flex items-center gap-3 mb-2">
                  {getFavicon('ValuePRO Software') && (
                    <img
                      src={getFavicon('ValuePRO Software')}
                      alt="ValuePRO Software logo"
                      className="w-4 h-4 opacity-80"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <p className="font-light text-sm tracking-wider text-gray-800 dark:text-white">ValuePRO Software • Jan 2022 - Aug 2024 (2 yrs 8 mos)</p>
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-400 font-light tracking-wider uppercase">
                  Constellation Software Portfolio • PropTech • Platform Modernisation
                </p>
              </div>
              <div className="max-w-4xl space-y-6">
                <p className="text-lg leading-relaxed font-light text-gray-800 dark:text-gray-200">
                  Following my promotion to CEO, I was responsible for the company's overall strategy, financial performance, and team culture. I led a large-scale replatforming of 36 core products while maintaining a consistent 40-50% EBITA margin and a team eNPS of 8.5-9.5. My role included rebuilding the R&D and Professional Services functions to improve performance and align with industry standards.
                </p>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-2 max-w-4xl">
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Directed strategic replatforming of 36 core products (~250k LOC each).</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Maintained 40-50% EBITA margin with team eNPS of 8.5-9.5 during restructuring.</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Rebuilt R&D and Professional Services functions with improved structures.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="mb-20  ">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Operations Manager</h3>
                <div className="flex items-center gap-3 mb-2">
                  {getFavicon('ValuePRO Software') && (
                    <img
                      src={getFavicon('ValuePRO Software')}
                      alt="ValuePRO Software logo"
                      className="w-4 h-4 opacity-80"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <p className="font-light text-sm tracking-wider text-gray-800 dark:text-white">ValuePRO Software • Jan 2017 - Jan 2022 (5 yrs 1 mo)</p>
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-400 font-light tracking-wider uppercase">
                  Team Leadership • Compliance • Security • Professional Services
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                Directed company-wide technical operations, focusing on security, compliance, and professional services. I led technical teams, managed critical infrastructure, and ensured the company consistently met ISO 27001/9001 certification standards.
              </p>
              <div className="mt-8">
                <h4 className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-2 max-w-4xl">
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Managed GRC function including Secure Controls Framework, Essential Eight, and ISO 27001/9001.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Implemented Change Management policies, SDLC procedures, and security frameworks.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Deployed and managed SIEM and EDR solutions across corporate and cloud infrastructure.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Ensured 24/7 stability of Private Cloud and large-scale OLTP database.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Led design and delivery of high-security integrations for Government and enterprise clients.</p>
                </div>
                </div>
              </div>
            </div>

            {/* Senior Software Architect */}
            <div className="mb-20  ">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Senior Developer / Software Architect</h3>
                <div className="flex items-center gap-3 mb-2">
                  {getFavicon('ValuePRO Software') && (
                    <img
                      src={getFavicon('ValuePRO Software')}
                      alt="ValuePRO Software logo"
                      className="w-4 h-4 opacity-80"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <p className="font-light text-sm tracking-wider text-gray-800 dark:text-white">ValuePRO Software • Apr 2016 - Jan 2017 (10 mos)</p>
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-400 font-light tracking-wider uppercase">
                  Legacy Modernisation • DevOps • Source Control • Platform Architecture
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                Led hands-on development for projects on .NET and Objective-C stacks while providing technical leadership. I introduced modern DevOps practices to the company and also managed the Customer Support function, using direct client feedback to improve the development process and product quality.
              </p>
              <div className="mt-8">
                <h4 className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-2 max-w-4xl">
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Executed 100:2 codebase consolidation into two stable, unified master codebases.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Implemented CI/CD pipelines and source control across 150+ codebases.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                  <p className="text-sm font-light text-gray-800 dark:text-gray-300">Directed end-to-end customer solutions while leading development and support teams.</p>
                </div>
                </div>
              </div>
            </div>

            {/* Earlier Career */}
            <div className="mb-20  ">
              <div className="mb-8">
                <h3 className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Earlier Career</h3>
                <p className="text-black dark:text-white mb-1 font-light text-sm tracking-wider">2003 - 2019</p>
                <p className="text-xs text-gray-800 dark:text-gray-400 font-light tracking-wider uppercase">
                  Entrepreneurial Ventures • Technology Innovation • Platform Development
                </p>
              </div>
              <div className="space-y-3 max-w-4xl text-sm">
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Lead Software Engineer, Jetval (2018-19) — Azure SaaS architecture</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">GIS Consultant, Proprietor (2016) — AgTech data analysis</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Co-Founder, Hashfund Limited (2013-15) — Bitcoin exchange platform</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Director, Maintainable Pty Ltd (2011-12) — Property services integration</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Operations Manager, P2P Advertising Network (2008-11) — Distributed advertising</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Co-Founder, Alpha BHO (2008-09) — Browser advertising network</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Co-Founder, Auxhosting (2006-07) — VPS hosting provider</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Software Engineer, Proprietor (2003-05) — Freelance development</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Core Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">LEADERSHIP</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">P&L • Strategy • Talent</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">TECHNICAL</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">DevOps • Cloud • Security</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">OPERATIONS</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Process • Compliance • Scale</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">INNOVATION</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">AI • Research • Prototyping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Competencies */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Technical Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">LANGUAGES</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Python • C# • JavaScript • TypeScript • SQL</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">FRAMEWORKS</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">React • Next.js • FastAPI • Flutter • Express</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">DATABASES</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">PostgreSQL • MSSQL • SQLite</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">CLOUD & INFRASTRUCTURE</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Azure • Private Cloud</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">DEVOPS</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Atlassian Suite • GitHub • GitLab</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">MACHINE LEARNING</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">PyTorch • LangChain • MCP • Prompt Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Education</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">APPROACH</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Self-directed • Reverse engineering</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">METHODOLOGY</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Scaling Up • Peer learning</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">FORMAL</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">B.A. / B.IT. - UQ (incomplete)</span>
                  </div>
                  <div className="py-3 ">
                    <span className="text-gray-800 dark:text-gray-400 font-light block mb-1">PROGRAMMING</span>
                    <span className="text-gray-900 dark:text-gray-200 font-light">Self-taught (2006 - present)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-40">
            <h2 className="text-4xl md:text-5xl tracking-tight mb-10 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Let's chat...</h2>

            <div className="max-w-4xl mb-12">
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                In my experience, you learn more from a quick yarn than you do from a pile of resumes. If you feel the same way, just email or book a time for an open-book conversation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl">
              {/* Email Button */}
              <div className="relative bg-gray-100/80 border border-gray-300 dark:bg-gray-900/50 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-200/80 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className="text-lg font-light text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-200">Email</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText('blake@drksci.com');
                    }}
                    className="screen-only px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white text-sm rounded transition-colors z-10 relative"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-gray-800 dark:text-gray-300 font-light">blake@drksci.com</div>
                {/* Transparent overlay link */}
                <a
                  href="mailto:blake@drksci.com"
                  className="absolute inset-0 z-0"
                  aria-label="Email blake@drksci.com"
                ></a>
              </div>

              {/* Meeting Button */}
              <div className="relative bg-gray-100/80 border border-gray-300 dark:bg-gray-900/50 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-200/80 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5" />
                  </svg>
                  <span className="text-lg font-light text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-200">Book a meeting</span>
                </div>
                <div className="text-gray-800 dark:text-gray-300 font-light">30 min open conversation</div>
                {/* Transparent overlay link */}
                <a
                  href="https://calendly.com/blake-roland/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0"
                  aria-label="Book a meeting on Calendly"
                ></a>
              </div>
            </div>

            <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">My Personal Core Value —</h2>

            <div className="max-w-4xl mb-6">
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                I want to believe in the people around me and prove what's possible — and to show others they can do it too.
              </p>
            </div>

            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden no-filter halftone-poster">
              <img
                src="/assets/contact-bg.jpg"
                alt="Contact background"
                className="w-full h-full object-cover cinematic-bw"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlakeCollaborator;