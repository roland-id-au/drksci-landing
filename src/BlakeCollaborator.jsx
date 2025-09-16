import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles/print.css';

const BlakeCollaborator = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    // Smooth scroll to section when navigation changes
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behaviour: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  useEffect(() => {
    // Check for #print in URL hash
    const checkPrintMode = () => {
      setIsPrintMode(window.location.hash === '#print');
    };

    // Check on mount
    checkPrintMode();

    // Listen for hash changes
    window.addEventListener('hashchange', checkPrintMode);

    return () => {
      window.removeEventListener('hashchange', checkPrintMode);
    };
  }, []);

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
      </Helmet>
      
      <div className="min-h-screen bg-black text-white collaborator-page">
        {/* Header with Navigation */}
        <header className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm print-hide">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center py-4 sm:py-8">
              {/* Logo */}
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '120px', height: 'auto' }} className="sm:max-w-[160px]">
                  <defs>
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
                    <g>
                      <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.6"/>
                      <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.6"/>
                      <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.6"/>
                      <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-dark)"/>
                      <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-dark)"/>
                      <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-dark)"/>
                    </g>
                    <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                    <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                    <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-dark)" />
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
                          ? 'text-white border-b border-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      PROFILE
                    </button>
                    <button
                      onClick={() => setActiveSection('resume')}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-light tracking-wider transition-colors ${
                        activeSection === 'resume'
                          ? 'text-white border-b border-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      EXPERIENCE
                    </button>
                  </div>
                </nav>
                
                <div className="flex items-center space-x-1">
                  {/* LinkedIn Button */}
                  <a 
                    href="https://www.linkedin.com/in/blake-carter-5995ab5a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-400 hover:text-white transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* PDF Download Button */}
                  <button 
                    onClick={generatePDF}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-400 hover:text-white transition-colors"
                    aria-label="Download Resume PDF"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
                      <text x="12" y="16" fontSize="6" textAnchor="middle" fill="#000" fontFamily="sans-serif" fontWeight="900" stroke="#000" strokeWidth="0.2">PDF</text>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PDF Cover Page - visible in print mode or when #print hash is present */}
        <div className={`pdf-cover-page ${isPrintMode ? 'print-mode-visible' : ''}`}>
          <div className="cover-header">
            <h1 className="cover-name">Blake Carter</h1>
            <p className="cover-title">Technical Leader & Innovation Executive</p>
            <a href="https://www.linkedin.com/in/blake-carter-5995ab5a/" className="linkedin-badge">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <div className="cover-footer">
            <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" className="cover-logo">
              <defs>
                <linearGradient id="slash-vaporwave1-cover" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="33%" stopColor="#FF00FF" />
                  <stop offset="33%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#6400FF" />
                </linearGradient>
                <linearGradient id="trail1-vaporwave1-cover" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail2-vaporwave1-cover" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail3-vaporwave1-cover" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <g transform="translate(-2, 0)">
                <g>
                  <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.6"/>
                  <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.6"/>
                  <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.6"/>
                  <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-cover)"/>
                  <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-cover)"/>
                  <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-cover)"/>
                </g>
                <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-cover)" />
              </g>
            </svg>
            <div className="cover-links">
              <a href="https://drksci.com/c/blake" className="cover-link">
                <span className="cover-link-domain">drksci.com/c/</span><span className="cover-link-path">blake</span>
              </a>
              <a href="https://drksci.com/portfolio" className="cover-link">
                <span className="cover-link-domain">drksci.com/</span><span className="cover-link-path">portfolio</span>
              </a>
              <a href="https://drksci.com/projects" className="cover-link">
                <span className="cover-link-domain">drksci.com/</span><span className="cover-link-path">projects</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 lg:px-12 py-20">
          {/* Profile Section */}
          <section id="profile" className="mb-40">
            {/* Profile Header - HARMONIZED: Using consistent display typography */}
            <div className="mb-20">
              <h1 className="blake-title text-4xl sm:text-5xl md:text-7xl font-thin tracking-tight mb-2 text-white">Blake Carter</h1>
              <p className="blake-subtitle text-xl sm:text-2xl md:text-3xl text-gray-400 mb-8 font-light tracking-wide">Technical Leader</p>
              
            </div>

            {/* Executive Summary */}
            <div className="mb-20">
              {/* HARMONIZED: Executive Summary style - preserved as subsection label */}
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Executive Summary</h2>
              <div className="max-w-4xl">
                {/* HARMONIZED: Body text with consistent styling */}
                <p className="text-lg font-light leading-relaxed mb-8 text-gray-300">
                  Hands-on technical leader with organic experience spanning product development, operational excellence, 
                  and strategic transformation. Passionate about tackling complex challenges that require deep understanding 
                  and versatile execution.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Focused on opportunities with natural fit to experience, tenacity, and disposition to look beyond 
                  the status-quo. Thrives on novel challenges, hands-on learning, and doing the hard yards.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Leadership Philosophy</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-16 philosophy-grid">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-8 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  {/* HARMONIZED: Content heading */}
                  <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-3 tracking-wide text-white">Envision</h3>
                  <p className="text-gray-400 font-light text-xs sm:text-sm">the extraordinary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-8 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <circle cx="6" cy="12" r="3" strokeWidth={0.5} />
                      <circle cx="18" cy="12" r="3" strokeWidth={0.5} />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h0" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12h0" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-3 tracking-wide text-white">Collaborate</h3>
                  <p className="text-gray-400 font-light text-xs sm:text-sm">with charisma</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-8 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.58-5.84a14.98 14.98 0 012.58 5.84M9.75 7.5l3 3m0 0l3-3M12 10.5V21" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-3 tracking-wide text-white">Persevere</h3>
                  <p className="text-gray-400 font-light text-xs sm:text-sm">to achieve</p>
                </div>
              </div>
            </div>

            {/* Character Profile */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Character Profile</h2>
              <div className="space-y-8 max-w-4xl">
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-6 font-light flex-shrink-0">/</span>
                  {/* HARMONIZED: Body text */}
                  <p className="text-lg font-light leading-relaxed text-gray-300">
                    Thrives on novel challenges, hands-on learning opportunities, and doing the hard yards – jumping into the deep end
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-6 font-light flex-shrink-0">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-300">
                    Pursues meaningful work with passion for ground-up understanding, rather than position descriptions
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-6 font-light flex-shrink-0">/</span>
                  <p className="text-lg font-light leading-relaxed text-gray-300">
                    Values meaningful stakeholder relationships and dependability as essential foundations
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Insights */}
            <div className="mb-20">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Personal Insights</h2>
              <div className="blake-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 max-w-4xl text-sm">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Location</span>
                  <span className="font-light text-gray-300">Brisbane</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Travel</span>
                  <span className="font-light text-gray-300">Willing</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Married</span>
                  <span className="font-light text-gray-300">Las Vegas</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Hobby</span>
                  <span className="font-light text-gray-300">Spelunking</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">First car</span>
                  <span className="font-light text-gray-300">'91 Prelude</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">First PC</span>
                  <span className="font-light text-gray-300">Osbourne 1</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Holiday</span>
                  <span className="font-light text-gray-300">Waratah, TAS</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-500 font-light">Weakness</span>
                  <span className="font-light text-gray-300">Challenges</span>
                </div>
              </div>
            </div>

          </section>

          {/* Resume Section */}
          <section id="resume" className="mb-40">
            {/* HARMONIZED: Section heading */}
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-white">Professional Experience</h2>
            
            {/* Drksci */}
            <div className="mb-20 pb-20 border-b border-gray-800 experience-item">
              <div className="mb-8 experience-header">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl font-light mb-3 tracking-wide text-white experience-title">Founder</h3>
                <p className="text-gray-400 mb-3 font-light text-lg tracking-wide experience-company">Drksci • Aug 2024 - Present</p>
                <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                  Innovation Lab • AI Integration • Data Visualisation • Rapid Prototyping
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-300 max-w-4xl">
                Founded d/rksci as an innovation laboratory exploring the intersection of AI, data science, 
                and practical business applications. Specialised in rapidly prototyping novel solutions and 
                transforming ambitious concepts into market-ready realities.
              </p>
              <div className="space-y-10">
                <div>
                  {/* HARMONIZED: Subsection label */}
                  <h4 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                  <div className="space-y-4 max-w-4xl">
                    <div className="flex items-baseline">
                      <span className="text-cyan-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-lg font-light text-gray-300">
                        <a href="/portfolio/rained-cloud" className="text-cyan-400 hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-300 font-medium inline-flex items-center gap-1">rained.cloud <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>
                        <span> - Historical rainfall data preservation platform (100+ years of weather data)</span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-purple-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-lg font-light text-gray-300">
                        <a href="/portfolio/kareer" className="text-purple-400 hover:text-purple-300 transition-colors border-b border-transparent hover:border-purple-300 font-medium inline-flex items-center gap-1">Kareer.app <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>
                        <span> - Career development platform with AI-driven insights and personalised guidance</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* HARMONIZED: Subsection label */}
                  <h4 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                  <div className="space-y-4 max-w-4xl">
                    <div className="flex items-baseline">
                      <span className="text-green-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-lg font-light text-gray-300">
                        <a href="/research/mapgyver-lost-person-modeling" className="text-green-400 hover:text-green-300 transition-colors border-b border-transparent hover:border-green-300 font-medium inline-block">MapGyver</a>
                        <span> - AI-powered lost person modelling using terrain analysis and behavioural prediction</span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-orange-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-lg font-light text-gray-300">
                        <a href="/research/prophet-experiment" className="text-orange-400 hover:text-orange-300 transition-colors border-b border-transparent hover:border-orange-300 font-medium inline-block">Prophet</a>
                        <span> - Experimental AI consciousness exploration and pattern recognition</span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-pink-400 mr-4 font-light flex-shrink-0">/</span>
                      <div className="text-lg font-light text-gray-300">
                        <a href="/research/princhester-associates" className="text-pink-400 hover:text-pink-300 transition-colors border-b border-transparent hover:border-pink-300 font-medium inline-block">Princhester Associates</a>
                        <span> - AI-powered consulting and strategic advisory platform</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ValuePRO CEO */}
            <div className="mb-20 pb-20 border-b border-gray-800">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl font-light mb-3 tracking-wide text-white">Chief Executive Officer</h3>
                <p className="text-gray-400 mb-3 font-light text-lg tracking-wide">ValuePRO Software • Jan 2022 - Aug 2024 (2 yrs 8 mos)</p>
                <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                  Constellation Software Portfolio • PropTech • Platform Modernisation
                </p>
              </div>
              <div className="max-w-4xl space-y-6">
                <p className="text-lg leading-relaxed font-light text-gray-300">
                  Revitalised ValuePRO's product portfolio and positioned the company as the premier PropTech solutions 
                  partner for the valuation industry following acquisition by Constellation Software.
                </p>
                <p className="text-lg leading-relaxed font-light text-gray-300">
                  Led modernisation of highly customised product portfolio including 40+ customised (250k+ LOC) forks 
                  of mission-critical software in complex private cloud environment.
                </p>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-light text-gray-400 mb-6 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Replatformed and launched alpha successor to legacy (450k+ LOC) core product in under 1 year</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Achieved eNPS of 8.5–9.5 by shifting team culture to embrace meaningful impacts</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Delivered SaaS 'rule of 40' throughout significant organisational restructuring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="mb-20 pb-20 border-b border-gray-800">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl font-light mb-3 tracking-wide text-white">Operations Manager</h3>
                <p className="text-gray-400 mb-3 font-light text-lg tracking-wide">ValuePRO Software • Jan 2017 - Jan 2022 (5 yrs 1 mo)</p>
                <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                  Team Leadership • Compliance • Security • Professional Services
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-300 max-w-4xl">
                Led development teams in building scalable web applications while maintaining corporate
                governance and compliance standards across ISO27001 and 9001 certifications.
              </p>
              <div>
                {/* HARMONIZED: Subsection label */}
                <h4 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Maintained ISO27001 & 9001 certification with zero audit findings</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Implemented SIEM and EDR security solutions across enterprise infrastructure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Senior Software Architect */}
            <div className="mb-20 pb-20 border-b border-gray-800">
              <div className="mb-8">
                {/* HARMONIZED: Job title */}
                <h3 className="text-2xl font-light mb-3 tracking-wide text-white">Senior Software Architect</h3>
                <p className="text-gray-400 mb-3 font-light text-lg tracking-wide">ValuePRO Software • Apr 2016 - Jan 2017 (10 mos)</p>
                <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                  Legacy Modernisation • DevOps • Source Control • Platform Architecture
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-300 max-w-4xl">
                Joined ValuePRO to spearhead platform modernisation and establish foundational systems including CRM, SOPs, source control, and DevOps practices.
                Evolved role to encompass BAU operations, systems management, offshore team leadership, and key account stewardship.
              </p>
              <div>
                {/* HARMONIZED: Subsection label */}
                <h4 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Key Accomplishments</h4>
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Implemented CI/CD pipelines and change management procedures</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Managed 100:2 consolidation of divergent internal dependency codebases</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                    <p className="text-lg font-light text-gray-300">Introduced source control for 150+ legacy codebases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earlier Career */}
            <div className="mb-20 pb-20 border-b border-gray-800">
              <div className="mb-8">
                <h3 className="text-3xl font-thin mb-3 tracking-wide">Earlier Career</h3>
                <p className="text-gray-400 mb-3 font-light text-lg tracking-wide">2003 - 2019</p>
                <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                  Entrepreneurial Ventures • Technology Innovation • Platform Development
                </p>
              </div>
              <div className="space-y-3 max-w-4xl text-sm">
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Lead Software Engineer, Jetval (2018-19) — Azure SaaS architecture</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">GIS Consultant, Proprietor (2016) — AgTech data analysis</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Co-Founder, Hashfund Limited (2013-15) — Bitcoin exchange platform</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Director, Maintainable Pty Ltd (2011-12) — Property services integration</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Operations Manager, P2P Advertising Network (2008-11) — Distributed advertising</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Co-Founder, Alpha BHO (2008-09) — Browser advertising network</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Co-Founder, Auxhosting (2006-07) — VPS hosting provider</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-gray-400 mr-3 font-light flex-shrink-0">/</span>
                  <p className="font-light text-gray-300">Software Engineer, Proprietor (2003-05) — Freelance development</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Core Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">LEADERSHIP</span>
                    <span className="text-gray-300 font-light">P&L • Strategy • Talent</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">TECHNICAL</span>
                    <span className="text-gray-300 font-light">DevOps • Cloud • Security</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">OPERATIONS</span>
                    <span className="text-gray-300 font-light">Process • Compliance • Scale</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">INNOVATION</span>
                    <span className="text-gray-300 font-light">AI • Research • Prototyping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Competencies */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Technical Competencies</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">LANGUAGES</span>
                    <span className="text-gray-300 font-light">Python • JavaScript • TypeScript • Dart • SQL</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">FRAMEWORKS</span>
                    <span className="text-gray-300 font-light">React • Next.js • FastAPI • Flutter • Express</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">DATABASES</span>
                    <span className="text-gray-300 font-light">PostgreSQL • SQLite • Redis • TimescaleDB</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">CLOUD & DEVOPS</span>
                    <span className="text-gray-300 font-light">Azure • AWS • Docker • Terraform</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">CI/CD & AUTOMATION</span>
                    <span className="text-gray-300 font-light">GitHub Actions • GitLab CI</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">MACHINE LEARNING</span>
                    <span className="text-gray-300 font-light">TensorFlow • PyTorch • Neural Networks • GIS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-20">
              <h2 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Education</h2>
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">APPROACH</span>
                    <span className="text-gray-300 font-light">Self-directed • Reverse engineering</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">METHODOLOGY</span>
                    <span className="text-gray-300 font-light">Scaling Up • Peer learning</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">FORMAL</span>
                    <span className="text-gray-300 font-light">B.A. / B.IT. - UQ (incomplete)</span>
                  </div>
                  <div className="py-3 border-b border-gray-800">
                    <span className="text-gray-500 font-light block mb-1">PROGRAMMING</span>
                    <span className="text-gray-300 font-light">Self-taught (2006 - present)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlakeCollaborator;