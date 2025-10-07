import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { wrapWithTracking } from './utils/linkTracker';

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
  const [activeSection] = useState('profile'); // eslint-disable-line no-unused-vars
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const headerRef = useRef(null);

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
    // Skip scroll on initial load
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // Smooth scroll to section when navigation changes
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behaviour: 'smooth', block: 'start' });
    }
  }, [activeSection, isInitialLoad]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (headerRef.current) {
        if (currentScrollY <= 50) {
          // At top of page - show header
          headerRef.current.style.transform = 'translateY(0)';
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide header
          headerRef.current.style.transform = 'translateY(-100%)';
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          headerRef.current.style.transform = 'translateY(0)';
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && modalImage) {
        setModalImage(null);
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when modal open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalImage]);

  const generatePDF = () => {
    // Use the complete ATS PDF with cover + resume + ATS transcript + diagnostics
    const link = document.createElement('a');
    link.href = '/pdfs/blake-carter-complete-ats.pdf';
    link.download = 'Blake_Carter_Complete_Resume.pdf';
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
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
            position: relative;
            filter: contrast(2000%);
            overflow: hidden;
          }
          .halftone-poster::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            bottom: -50%;
            right: -50%;
            background: radial-gradient(circle at center, #333, #fff);
            background-size: 0.25em 0.25em;
            transform: rotate(20deg);
          }
          .halftone-poster img {
            mix-blend-mode: hard-light;
            filter: grayscale(1) brightness(80%) contrast(150%) blur(2px);
          }
          .table-content {
            color: #000000 !important;
          }
          html.dark .table-content {
            color: #ffffff !important;
          }
          .leadership-values-text {
            font-weight: 400 !important;
          }
          .philosophy-grid .leadership-values-text {
            font-weight: 400 !important;
          }
          .philosophy-grid h3.leadership-values-text {
            font-weight: 400 !important;
          }
          .subtle-noise {
            position: relative;
            background-image:
              radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.015) 1px, transparent 1px);
            background-size: 6px 6px, 8px 8px;
            background-position: 0 0, 3px 3px;
          }
          .material-symbols-outlined {
            font-variation-settings:
              'FILL' 0,
              'wght' 100,
              'GRAD' 0,
              'opsz' 48;
            font-weight: 100 !important;
          }
          /* Ensure leadership values headings maintain their font weight */
          .philosophy-grid h3 {
            font-weight: 500 !important;
            font-size: 0.875rem !important;
          }
          @media (min-width: 640px) {
            .philosophy-grid h3 {
              font-size: 1rem !important;
            }
          }
          .text-2xs {
            font-size: 0.65rem !important;
          }
          .cooling-filter {
            filter: hue-rotate(-10deg) saturate(0.95) contrast(1.05);
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

          /* Remove link underlines for web and print */
          a, a:link, a:visited, a:hover {
            text-decoration: none !important;
            border-bottom: none !important;
          }
          @media print {
            a, a:link, a:visited, a:hover {
              color: inherit !important;
            }
          }
        `}</style>
      </Helmet>
      
      <div className={`min-h-screen transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white ${isDarkMode ? 'dark' : ''}`}>
        {/* Header with Navigation */}
        <header className="fixed top-0 w-full z-20 backdrop-blur-sm print-hide transition-all duration-300 bg-white/95 dark:bg-black/95 transform transition-transform" ref={headerRef}>
          <div className="max-w-5xl mx-auto pl-12 pr-8 sm:pl-18 sm:pr-12 lg:pr-20">
            <div className="flex justify-between items-center py-3 sm:py-5">
              {/* Logo */}
              <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
                <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '85px', height: 'auto' }} className="sm:max-w-[100px]">
                  <defs>

                    {/* Light mode gradients */}
                    <linearGradient id="slash-vaporwave1-light" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="33%" stopColor="#FF00FF" />
                      <stop offset="33%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#6400FF" />
                    </linearGradient>
                    <linearGradient id="trail1-vaporwave1-light" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail2-vaporwave1-light" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail3-vaporwave1-light" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                    </linearGradient>

                    {/* Dark mode gradients */}
                    <linearGradient id="slash-vaporwave1-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="33%" stopColor="#FF00FF" />
                      <stop offset="33%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#00FFFF" />
                      <stop offset="66%" stopColor="#6400FF" />
                    </linearGradient>
                    <linearGradient id="trail1-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail2-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="trail3-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(-2, 0)">
                    {/* Light mode logo (hidden in dark mode) */}
                    <g className="dark:hidden">
                      <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.7"/>
                      <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.7"/>
                      <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.7"/>
                      <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-light)"/>
                      <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-light)"/>
                      <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-light)"/>
                      <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#050505">d</text>
                      <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#050505">rksci</text>
                      <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-light)" />
                    </g>

                    {/* Dark mode logo (hidden in light mode) */}
                    <g className="hidden dark:block">
                      <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.6"/>
                      <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.6"/>
                      <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.6"/>
                      <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-dark)"/>
                      <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-dark)"/>
                      <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-dark)"/>
                      <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                      <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                      <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-dark)" />
                    </g>
                  </g>
                </svg>
              </Link>
              
              {/* Navigation and LinkedIn/PDF */}
              <div className="flex items-center space-x-4 sm:space-x-8">
                
                <div className="flex items-center space-x-2">
                  {/* LinkedIn Button */}
                  <a
                    href={wrapWithTracking("https://www.linkedin.com/in/blake-carter-5995ab5a/")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors text-black hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* PDF Download Button */}
                  <button
                    onClick={generatePDF}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors text-black hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    aria-label="Download Resume PDF"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2v20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6H4c-1.1 0-2 .9-2 2z"/>
                      <path d="M14 2v6h6"/>
                      <text x="12" y="16" fontSize="7" textAnchor="middle" fill={isDarkMode ? "#000000" : "#ffffff"} fontFamily="sans-serif" fontWeight="900">PDF</text>
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
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-all group"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? (
                      // Gray circle with black icon for dark mode (matches gray-300 color)
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all group-hover:bg-white" style={{backgroundColor: '#d1d5db'}}>
                        <span className="material-symbols-outlined text-black" style={{fontSize: '16px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 16"}}>light_mode</span>
                      </div>
                    ) : (
                      // Black circle with white icon for light mode
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all group-hover:bg-gray-800" style={{backgroundColor: '#000000'}}>
                        <span className="material-symbols-outlined text-white" style={{fontSize: '16px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 16"}}>dark_mode</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>


        <div className="max-w-5xl mx-auto px-12 sm:px-18 py-20 pt-32">
          {/* Profile Section */}
          <section id="profile" className="mb-40">
            {/* Profile Header - HARMONIZED: Using consistent display typography */}
            <div className="mb-20">
              <h1 id="blake-carter" className="blake-title text-4xl sm:text-5xl md:text-7xl tracking-tight mb-8 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Blake Carter</h1>
            </div>

            {/* Executive Summary */}
            <div className="mb-20">
              {/* HARMONIZED: Executive Summary style - preserved as subsection label */}
              <h2 className="text-sm font-light mb-8 tracking-[0.3em] uppercase text-black dark:text-white">Executive Summary</h2>
              <div className="max-w-4xl">
                {/* HARMONIZED: Body text with consistent styling */}
                <p className="text-lg font-light leading-relaxed mb-8 text-gray-800 dark:text-gray-300">
                  Hands-on technical leader with experience in product development, operations, and strategic transformation. I'm passionate about tackling complex challenges that require a deep understanding and versatile execution.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                  I'm currently exploring opportunities to apply my tenacity and hands-on skills to new domains. For me, the ability to make a direct impact is my key motivator, which I value over a role's level of seniority as the primary source of my professional growth.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-12 tracking-[0.3em] uppercase text-black dark:text-white">Leadership Values</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-16 philosophy-grid">
                <div className="text-center">
                  <div className="w-28 h-20 sm:w-32 sm:h-24 mx-auto mb-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '6rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>globe_book</span>
                  </div>
                  {/* HARMONIZED: Content heading */}
                  <h3 className="leadership-values-text text-sm sm:text-base mb-0 tracking-wide text-black dark:text-white">dream</h3>
                  <p className="font-light text-xs sm:text-sm text-gray-800 dark:text-gray-300">big</p>
                </div>
                <div className="text-center">
                  <div className="w-28 h-20 sm:w-32 sm:h-24 mx-auto mb-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '6rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>conversation</span>
                  </div>
                  <h3 className="leadership-values-text text-sm sm:text-base mb-0 tracking-wide text-black dark:text-white">collaborate</h3>
                  <p className="font-light text-xs sm:text-sm text-gray-800 dark:text-gray-300">with charisma</p>
                </div>
                <div className="text-center">
                  <div className="w-28 h-20 sm:w-32 sm:h-24 mx-auto mb-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '6rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>mountain_flag</span>
                  </div>
                  <h3 className="leadership-values-text text-sm sm:text-base mb-0 tracking-wide text-black dark:text-white">persevere</h3>
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
                    Pursues meaningful work with a passion for ground-up understanding
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    Thrives on novel challenges, hands-on learning, jumping in the deep end
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    Values genuine stakeholder relationships, dependability, and rapport
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    Ready to die-on-the-hill and principle that UI/UX is worth doing well
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="mr-6 font-light flex-shrink-0 text-gray-800 dark:text-gray-300">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                    Driven by ideas, backed by data-driven acumen
                  </p>
                </div>
              </div>
            </div>

            {/* Working Genius */}
            <div className="mb-20">
              <div className="mb-8">
                <h2 className="text-sm font-light tracking-[0.3em] uppercase text-black dark:text-white inline-flex items-center gap-2">
                  Working Genius
                  <a href={wrapWithTracking("https://www.workinggenius.com/")} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize: '16px', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 16"}}>open_in_new</span>
                  </a>
                </h2>
              </div>
              <div className="grid grid-cols-6 gap-4 max-w-4xl">
                {/* Wonder - Genius */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>heart_smile</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Wonder</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Genius</div>
                </div>

                {/* Invention - Genius */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>heart_smile</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Invention</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Genius</div>
                </div>

                {/* Discernment - Competency */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>sentiment_satisfied</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Enablement</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Competency</div>
                </div>

                {/* Tenacity - Competency */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>sentiment_satisfied</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Tenacity</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Competency</div>
                </div>

                {/* Galvanising - Frustration */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>sentiment_neutral</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Galvanising</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Frustration</div>
                </div>

                {/* Enablement - Frustration */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-300" style={{fontSize: '3rem', fontVariationSettings: "'FILL' 0, 'wght' 50, 'GRAD' 0, 'opsz' 48"}}>sentiment_neutral</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">Discernment</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Frustration</div>
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
                  <span className="font-light text-black dark:text-gray-400">First Car</span>
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

              {/* Right to Work and Police Check - Single Row Layout */}
              <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-12 max-w-4xl text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 font-light whitespace-nowrap">
                    Right to Work / Australian Citizen
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 font-light whitespace-nowrap">National Police Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 font-light whitespace-nowrap">
                    <a href={wrapWithTracking("https://whiteribbon.org.au")}>
                      Advocate: White Ribbon Australia / Stop Violence Against Women
                    </a>
                  </span>
                </div>
              </div>
            </div>

          </section>

          {/* Resume Section */}
          <section id="resume" className="mb-40">
            {/* HARMONIZED: Section heading */}
            <h2 id="professional-experience" className="text-4xl md:text-5xl tracking-tight mb-20 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Professional Experience</h2>
            
            {/* Drksci */}
            <div className="mb-20   experience-item">
              <div className="mb-8 experience-header">
                {/* HARMONIZED: Job title */}
                <h3 id="founder" className="text-2xl mb-3 tracking-wide text-black dark:text-white experience-title" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Founder</h3>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider uppercase">
                  Innovation Lab • AI Integration • Data Visualisation • Rapid Prototyping
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                As Founder of d/rksci, I lead an innovation lab focused on the practical application of AI and data science for business. My work involves hands-on <strong>AI Integration</strong>, <strong>Data Visualisation</strong>, and <strong>Rapid Prototyping</strong> to transform complex concepts into tangible solutions for market testing.
              </p>
              <div className="space-y-10">
                <div>
                  {/* HARMONIZED: Subsection label */}
                  <h4 id="key-projects-research" className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Key Projects & Research</h4>
                  <div className="space-y-2 max-w-4xl">
                    <div className="flex items-baseline">
                      <span className="text-purple-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-sm font-light text-gray-800 dark:text-gray-300">
                        <a href={wrapWithTracking("https://kareer.app")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors">
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
                        <a href={wrapWithTracking("https://drksci.com/research/mapgyver-lost-person-modeling")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-green-300 transition-colors">
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
                        <a href={wrapWithTracking("https://princhester.pages.dev/")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-pink-300 transition-colors">
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
                        <a href={wrapWithTracking("https://drksci.com/research/prophet-experiment")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-orange-300 transition-colors">
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
                        <a href={wrapWithTracking("https://rained.cloud")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors">
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
                <h3 id="ceo" className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Chief Executive Officer</h3>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider uppercase">
                  Constellation Software Portfolio • PropTech • Platform Modernisation
                </p>
              </div>
              <div className="max-w-4xl space-y-6">
                <p className="text-lg leading-relaxed font-light text-gray-800 dark:text-gray-200">
                  Following my promotion to CEO, I was responsible for the company's overall strategy, financial performance, and team culture. I led a large-scale replatforming of 36 core products while maintaining a consistent 40-50% EBITA margin and a team eNPS of 8.5-9.5. My role included rebuilding the R&D and Professional Services functions to improve performance and align with industry standards.
                </p>
              </div>
              <div className="mt-8">
                <h4 id="ceo-accomplishments" className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-2 max-w-4xl">
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Directed strategic replatforming of 36 core products (~250k LOC each).</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Rebuilt R&D and Professional Services functions with significant automation.</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-800 dark:text-gray-300 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-sm font-light text-gray-800 dark:text-gray-300">Consistently delivered 40-50% EBITA margin and team eNPS of 8.5-9.5/10.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="mb-20  ">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 id="operations-manager" className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Operations Manager</h3>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider uppercase">
                  Team Leadership • Compliance • Security • Professional Services
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                Directed company-wide technical operations, focusing on security, compliance, and professional services. I led technical teams, managed critical infrastructure, and ensured the company consistently met ISO 27001/9001 certification standards.
              </p>
              <div className="mt-8">
                <h4 id="operations-accomplishments" className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
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
                <h3 id="senior-developer" className="text-2xl mb-3 tracking-wide text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 700}}>Senior Developer / Software Architect</h3>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider uppercase">
                  Legacy Modernisation • DevOps • Source Control • Platform Architecture
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-800 dark:text-gray-200 max-w-4xl">
                Led hands-on development for projects on .NET and Objective-C stacks while providing technical leadership. I introduced modern DevOps practices to the company and also managed the Customer Support function, using direct client feedback to improve the development process and product quality.
              </p>
              <div className="mt-8">
                <h4 id="developer-accomplishments" className="text-sm font-light text-black dark:text-white mb-4 tracking-[0.3em] uppercase">Key Accomplishments</h4>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider uppercase">
                  Entrepreneurial Ventures • Technology Innovation • Platform Development
                </p>
              </div>
              <div className="space-y-3 max-w-4xl text-sm">
                <div className="flex items-baseline">
                  <span className="text-gray-800 dark:text-gray-300 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-800 dark:text-gray-200">Lead Software Engineer, Jetval (2018-19) — Neolending and property valuation platform</p>
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
              <hr className="border-gray-300 dark:border-gray-600 mb-8" />
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Core Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">LEADERSHIP</span>
                    <span className="table-content font-light">P&L • Strategy • Talent</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">TECHNICAL</span>
                    <span className="table-content font-light">DevOps • Cloud • Security</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">OPERATIONS</span>
                    <span className="table-content font-light">Process • Compliance • Scale</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">INNOVATION</span>
                    <span className="table-content font-light">AI • Research • Prototyping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Competencies */}
            <div className="mb-16">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Technical Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">LANGUAGES</span>
                    <span className="table-content font-light">Python • C# • JavaScript • TypeScript • SQL</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">FRAMEWORKS</span>
                    <span className="table-content font-light">React • Next.js • FastAPI • Flutter • Express</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">DATABASES</span>
                    <span className="table-content font-light">PostgreSQL • MSSQL • SQLite</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">CLOUD & INFRASTRUCTURE</span>
                    <span className="table-content font-light">Azure • Private Cloud</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">DEVOPS</span>
                    <span className="table-content font-light">Atlassian Suite • GitHub • GitLab</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">MACHINE LEARNING</span>
                    <span className="table-content font-light">PyTorch • LangChain • MCP • Prompt Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-16">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Education</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">APPROACH</span>
                    <span className="table-content font-light">Self-directed • Reverse engineering</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">METHODOLOGY</span>
                    <span className="table-content font-light">Scaling Up • Peer learning</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">FORMAL</span>
                    <span className="table-content font-light">B.A. / B.IT. - UQ (incomplete)</span>
                  </div>
                  <div className="py-1 ">
                    <span className="text-gray-600 dark:text-gray-400 font-light block mb-1">PROGRAMMING</span>
                    <span className="table-content font-light">Self-taught (2006 - present)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-40 -mt-8">
            <h2 id="phone-lines-are-open" className="text-4xl md:text-5xl tracking-tight mb-10 text-black dark:text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Phone lines are open</h2>

            <div className="max-w-4xl mb-12">
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                In my experience, you learn more from a quick yarn than you do from a pile of resumes. If you feel the same way, just email or book a time for an open-book conversation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl">
              {/* Email Button */}
              <div className="relative bg-transparent border-[0.25px] border-black dark:border-white rounded-lg p-4 hover:bg-black hover:dark:bg-white transition-colors group">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-black dark:text-white group-hover:text-white group-hover:dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                  <span className="text-lg font-medium text-black dark:text-white group-hover:text-white group-hover:dark:text-black">blake@drksci.com</span>
                </div>
                {/* Transparent overlay link */}
                <a
                  href={wrapWithTracking("mailto:blake@drksci.com")}
                  className="absolute inset-0 z-0"
                  aria-label="Email blake@drksci.com"
                ></a>
              </div>

              {/* Meeting Button */}
              <div className="relative bg-transparent border-[0.25px] border-black dark:border-white rounded-lg p-4 hover:bg-black hover:dark:bg-white transition-colors group">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-black dark:text-white group-hover:text-white group-hover:dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5" />
                  </svg>
                  <span className="text-lg font-medium text-black dark:text-white group-hover:text-white group-hover:dark:text-black">Book a meeting</span>
                </div>
                {/* Transparent overlay link */}
                <a
                  href={wrapWithTracking("https://calendly.com/blake-roland/30min")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0"
                  aria-label="Book a meeting on Calendly"
                ></a>
              </div>
            </div>

          </section>

          {/* Biography Section */}
          <section className="mb-20">
            <h2 id="biography" className="text-4xl md:text-5xl tracking-tight mb-20 text-black dark:text-white mt-48" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>Bio</h2>

            <div className="max-w-4xl mb-16">
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300 mb-6">
                I've always been driven by an intense curiosity for what makes things tick. This has led me down some strange and wonderful paths, from being hundreds of meters underground exploring tunnels untouched for a century, to having my head under the hood of a car. I'm fascinated by intricate challenges—whether it's a geological puzzle in a remote landscape or deconstructing an incredible feat of early industrial engineering.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                In my professional life, I channel this same energy into building software. More recently, I've become captivated by leveraging AI-assistive workflows to strip away the grind and accelerate the journey from a raw idea to a real invention. It's an incredible time to be a creator.
              </p>
            </div>

            <h2 className="text-sm font-light mb-10 text-black dark:text-white tracking-[0.3em] uppercase mt-16">Mantra</h2>

            <div className="max-w-4xl mb-6">
              <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-300">
                <em>I want to believe</em>&nbsp; that we all have the ability to achieve extraordinary things.
              </p>
            </div>

            <div className="relative w-full h-80 mb-20 rounded-lg overflow-hidden no-filter halftone-poster">
              <img
                src="/assets/contact-bg.jpg"
                alt="Contact background"
                className="w-full h-full object-cover cinematic-bw"
                style={{objectPosition: 'center 25%', transform: 'scale(1.1)'}}
              />
            </div>

          </section>

          {/* Hobbies Gallery */}
          <section className="mb-20">
            <div className="mb-20">
              <h2 className="text-sm font-light mb-8 text-black dark:text-white tracking-[0.3em] uppercase">Seeing is believing</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
                <div className="rounded-2xl p-2 subtle-noise" style={{backgroundColor: isDarkMode ? 'transparent' : '#faf9f7'}}>
                  <div
                    className="aspect-square rounded-lg overflow-hidden mb-2 cursor-pointer"
                    onClick={() => setModalImage({
                      src: "/assets/hobbies/hobby-1.jpg",
                      alt: "Pyramiden Outpost",
                      caption: {
                        title: "Pyramiden Outpost",
                        description: "Existential polar bear hazard",
                        location: "🇷🇺 Pyramiden, RU"
                      }
                    })}
                  >
                    <img
                      src="/assets/hobbies/hobby-1.jpg"
                      alt="Pyramiden Outpost"
                      className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-300 cooling-filter"
                    />
                  </div>
                  <div className="px-3 pt-2 pb-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-tight text-left">
                      <div className="text-sm mb-1">Pyramiden Outpost</div>
                      Existential polar bear hazard<br/>
                      <span className="text-2xs font-light mt-1 block">🇷🇺 Pyramiden, RU</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl p-2 subtle-noise" style={{backgroundColor: isDarkMode ? 'transparent' : '#faf9f7'}}>
                  <div
                    className="aspect-square rounded-lg overflow-hidden mb-2 cursor-pointer"
                    onClick={() => setModalImage({
                      src: "/assets/hobbies/hobby-3.jpg",
                      alt: "Comstock Lode",
                      caption: {
                        title: "Comstock Lode",
                        description: "Search for the Sutro Tunnel",
                        location: "🇺🇸 Virginia City, NV"
                      }
                    })}
                  >
                    <img
                      src="/assets/hobbies/hobby-3.jpg"
                      alt="Comstock Lode"
                      className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-300 cooling-filter"
                    />
                  </div>
                  <div className="px-3 pt-2 pb-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-tight text-left">
                      <div className="text-sm mb-1">Comstock Lode</div>
                      Search for the Sutro Tunnel<br/>
                      <span className="text-2xs font-light mt-1 block">🇺🇸 Virginia City, NV</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl p-2 subtle-noise" style={{backgroundColor: isDarkMode ? 'transparent' : '#faf9f7'}}>
                  <div
                    className="aspect-square rounded-lg overflow-hidden mb-2 cursor-pointer"
                    onClick={() => setModalImage({
                      src: "/assets/hobbies/hobby-4.jpg",
                      alt: "Cold War",
                      caption: {
                        title: "Cold War",
                        description: "Abandoned ICBM Silo",
                        location: "🇺🇸 Roswell, NM"
                      }
                    })}
                  >
                    <img
                      src="/assets/hobbies/hobby-4.jpg"
                      alt="Cold War"
                      className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-300 cooling-filter"
                    />
                  </div>
                  <div className="px-3 pt-2 pb-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-tight text-left">
                      <div className="text-sm mb-1">Cold War</div>
                      Abandoned ICBM Silo<br/>
                      <span className="text-2xs font-light mt-1 block">🇺🇸 Roswell, NM</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl p-2 subtle-noise" style={{backgroundColor: isDarkMode ? 'transparent' : '#faf9f7'}}>
                  <div
                    className="aspect-square rounded-lg overflow-hidden mb-2 cursor-pointer"
                    onClick={() => setModalImage({
                      src: "/assets/hobbies/hobby-2.jpg",
                      alt: "Wifetime",
                      caption: {
                        title: "Wifetime",
                        description: "Chateau Marmont",
                        location: "🇺🇸 Hollywood Hills, CA"
                      }
                    })}
                  >
                    <img
                      src="/assets/hobbies/hobby-2.jpg"
                      alt="Wifetime"
                      className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-300 cooling-filter"
                    />
                  </div>
                  <div className="px-3 pt-2 pb-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-tight text-left">
                      <div className="text-sm mb-1">Wifetime</div>
                      Chateau Marmont<br/>
                      <span className="text-2xs font-light mt-1 block">🇺🇸 Hollywood Hills, CA</span>
                    </div>
                  </div>
                </div>

                {/* Additional hobbies 5-21 */}
                {[5,6,7,8,9,10,11,12,14,15,16,17,18,19,21,20].map(num => {
                  const captions = {
                    5: { title: "Waukaringa", description: "Desert Ghost Town", location: "🇦🇺 South Australia" },
                    6: { title: "Aerial Tramway", description: "Elevated bear danger", location: "🇺🇸 Telluride, CO" },
                    7: { title: "Wifetime", description: "Griffith Observatory", location: "🇺🇸 Hollywood Hills" },
                    8: { title: "Gravity Observatory", description: "Lost Underground Lab", location: "🇦🇺 New South Wales" },
                    9: { title: "YacDonalds", description: "Top 10 Dangerous Roads", location: "🇳🇵 Nepal" },
                    10: { title: "Shrine over Annapurna", description: "Top 10 Dangerous Roads", location: "🇳🇵 Nepal" },
                    11: { title: "Wifetime", description: "Stardust Motel", location: "🇺🇸 Wallace, ID" },
                    12: { title: "Ghost Town", description: "Nevada Border", location: "🇺🇸 Bodie, CA" },
                    14: { title: "Ballroom Stope", description: "Hollow Mountain", location: "🇦🇺 Tasmania" },
                    15: { title: "Concerning Ladder", description: "Underground Manway", location: "🇨🇦 British Columbia" },
                    16: { title: "Terrifying Ladder", description: "Wolfram Mine", location: "🇦🇺 Tasmania" },
                    17: { title: "1900s Copper Mine", description: "Untouched", location: "🇦🇺 Queensland" },
                    18: { title: "Ghost Car", description: "Ghost Town", location: "🇺🇸 Carbonate Hill, NM" },
                    19: { title: "Giant Ore Hopper", description: "3,096m Elevation", location: "🇺🇸 Leadville, CO" },
                    20: { title: "Gulliver's Kingdom", description: "Abandoned Theme Park", location: "🇯🇵 Mt. Fuji" },
                    21: { title: "Midnight Sun", description: "Abandoned Coal Mine", location: "🇳🇴 Svalbard, Norway" }
                  };
                  const caption = captions[num] || { title: `Hobby ${num}`, description: "", location: "" };
                  return (
                    <div key={num} className="rounded-2xl p-2 subtle-noise" style={{backgroundColor: isDarkMode ? 'transparent' : '#faf9f7'}}>
                      <div className="aspect-square rounded-lg overflow-hidden mb-2 cursor-pointer" onClick={() => {
                        // Swap modal images for Wifetime galleries
                        let modalSrc = `/assets/hobbies/hobby-${num}.jpg`;
                        if (num === 7) modalSrc = `/assets/hobbies/hobby-8.jpg`;
                        if (num === 8) modalSrc = `/assets/hobbies/hobby-7.jpg`;
                        if (num === 11) modalSrc = `/assets/hobbies/hobby-14.jpg`;
                        if (num === 14) modalSrc = `/assets/hobbies/hobby-11.jpg`;
                        setModalImage({
                          src: modalSrc,
                          alt: caption.title,
                          caption: caption
                        });
                      }}>
                        <img src={`/assets/hobbies/thumbs/hobby-${num}-thumb.jpg`} alt={caption.title} className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-300 cooling-filter" />
                      </div>
                      <div className="px-3 pt-2 pb-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-tight text-left">
                          <div className="text-sm mb-1">{caption.title}</div>
                          {caption.description && <>{caption.description}<br/></>}
                          {caption.location && <span className="text-2xs font-light mt-1 block">{caption.location}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </section>

          {/* Attribution Text with Tech Stack */}
          <div className="mb-20 text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono text-center">
              <span>Web and print media authored by and copyright of Blake Carter, {new Date().getFullYear()}</span>
            </div>

            {/* Tech Stack Icons */}
            <div className="flex justify-center flex-wrap items-center gap-5 grayscale opacity-60">
              {/* React */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" title="React">
                <path fill="currentColor" d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.139s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zM16.795 22.677c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 0 0 2.421-2.968l.135-.193.234-.02a23.63 23.63 0 0 0 3.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 0 1-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .504-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 0 1-3.234.501 24.674 24.674 0 0 1-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 0 0-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 0 0-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.823 6.855l-.133.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0 1 14.75 7.24zM7.206 22.677A2.38 2.38 0 0 1 6 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.296 2.478.496 3.787.609l.234.02.134.193a23.596 23.596 0 0 0 2.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.988.571 2.845-.309 4.8-2.208a24.998 24.998 0 0 1-2.052-2.545 24.976 24.976 0 0 1-3.233-.501zM12 16.878c-.823 0-1.669-.036-2.516-.106l-.235-.02-.135-.193a30.388 30.388 0 0 1-1.35-2.122 30.354 30.354 0 0 1-1.166-2.228l-.1-.213.1-.213a30.3 30.3 0 0 1 1.166-2.228c.414-.716.869-1.43 1.35-2.122l.135-.193.235-.02a30.701 30.701 0 0 1 5.033 0l.234.02.134.193a30.006 30.006 0 0 1 2.517 4.35l.101.213-.101.213a29.6 29.6 0 0 1-2.517 4.35l-.134.193-.234.02c-.847.07-1.694.106-2.517.106zm-2.197-1.084c1.48.111 2.914.111 4.395 0a29.006 29.006 0 0 0 2.196-3.798 28.585 28.585 0 0 0-2.197-3.798 29.031 29.031 0 0 0-4.394 0 28.477 28.477 0 0 0-2.197 3.798 29.114 29.114 0 0 0 2.197 3.798z"/>
              </svg>

              {/* Tailwind CSS */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" title="Tailwind CSS">
                <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>

              {/* Node.js */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" title="Node.js">
                <path fill="currentColor" d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.078c0.557-0.315,1.296-0.315,1.848,0l8.794,5.078c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.276-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
              </svg>

              {/* Puppeteer */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" title="Puppeteer">
                <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8" cy="12" r="2" fill="currentColor"/>
                <path d="M14 12l6-3-6-3v6z" fill="currentColor"/>
              </svg>

              {/* Claude Code */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" title="Claude Code">
                <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 8l-2 4 2 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8l2 4-2 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v2M12 16v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>

              {/* YouTube */}
              <a href={wrapWithTracking("https://www.youtube.com/@qldabandonedmines")} target="_blank" rel="noopener noreferrer" title="YouTube Channel">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-12"
          onClick={() => setModalImage(null)}
        >
          {/* Simple Caption Line */}
          {modalImage.caption && (
            <div className="mb-8 text-center">
              <div className="text-white text-sm font-light tracking-wide">
                {modalImage.caption.title} &nbsp;&nbsp;•&nbsp;&nbsp; {modalImage.caption.description} &nbsp;&nbsp;•&nbsp;&nbsp; {modalImage.caption.location}
              </div>
            </div>
          )}

          {/* Full Screen Image */}
          <div className="max-w-7xl max-h-full">
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlakeCollaborator;