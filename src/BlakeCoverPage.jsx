import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const BlakeCoverPage = () => {
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
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Blake Carter - Cover Page - d/rksci</title>
        <style>
          {`
            .cover-warming {
              filter: sepia(0.02) saturate(1.05) hue-rotate(10deg);
            }
            @media print {
              .pdf-cover-page * {
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                margin: inherit !important;
                padding: inherit !important;
              }
            }
          `}
        </style>
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white cover-warming ${isDarkMode ? 'dark' : ''}`}>
        {/* PDF Cover Page - Full width layout */}
        <div className="pdf-cover-page h-screen flex flex-col justify-between relative">
          {/* LinkedIn Badge - Top right position */}
          <div className="absolute top-8 sm:top-12 right-8 sm:right-12 z-10">
            <a href="https://www.linkedin.com/in/blake-carter-5995ab5a/"
               className="linkedin-badge text-gray-400 hover:text-white transition-colors duration-300 relative">
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {/* PDF clickable overlay */}
              <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
            </a>
          </div>

          {/* Cover Header - Full width with consistent margins */}
          <div className="cover-header flex-1 flex flex-col justify-start px-12 sm:px-18 pt-64">
            <div className="mb-20">
              {/* Main Title - Using exact same style as BlakeCollaborator */}
              <h1 className="blake-title text-4xl sm:text-5xl md:text-7xl tracking-tight mb-8 text-white" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500}}>
                Blake Carter
              </h1>

              {/* Subtitle - Using exact same style as BlakeCollaborator */}
              <div className="blake-subtitle mb-10 font-light space-y-3 uppercase">
                <div className="text-lg sm:text-xl md:text-2xl text-gray-450 tracking-[0.15em]">Technical Executive</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 tracking-[0.12em]">Innovation & Rapid Prototyping</div>
              </div>
            </div>
          </div>

          {/* Contact Links - Above footer */}
          <div className="cover-contact flex justify-center gap-8 px-12 sm:px-18 mb-8">
            <a href="mailto:blake@drksci.com"
               className="email-link text-sm text-gray-300 hover:text-white transition-colors duration-300 font-light tracking-wide relative">
              <span>blake@drksci.com</span>
              {/* PDF clickable overlay */}
              <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
            </a>
            <a href="https://calendly.com/blake-roland/30min"
               className="booking-link text-sm text-gray-300 hover:text-white transition-colors duration-300 font-light tracking-wide relative">
              <span>Book a Meeting</span>
              {/* PDF clickable overlay */}
              <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
            </a>
          </div>

          {/* Cover Footer - Full width with same margins as content */}
          <div className="cover-footer flex justify-between items-end px-12 sm:px-18 py-8 sm:py-12">
            {/* Logo */}
            <div className="cover-logo-container">
              <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" className="cover-logo h-4 sm:h-5 w-auto">
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
                    <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF"/>
                    <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF"/>
                    <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF"/>
                    <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-cover)"/>
                    <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-cover)"/>
                    <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-cover)"/>
                  </g>
                  <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                  <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                  <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-cover)" />
                </g>
              </svg>
            </div>

            {/* Cover Links - Styled like navigation */}
            <div className="cover-links flex flex-col sm:flex-row gap-4 sm:gap-8 text-right">
              <a href="https://drksci.com/c/blake"
                 className="cover-link text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light tracking-wide relative">
                <span className="text-gray-400">drksci.com/c/</span><span className="text-white">blake</span>
                {/* PDF clickable overlay */}
                <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
              </a>
              <a href="https://drksci.com/projects"
                 className="cover-link text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light tracking-wide relative">
                <span className="text-gray-400">drksci.com/</span><span className="text-white">projects</span>
                {/* PDF clickable overlay */}
                <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
              </a>
              <a href="https://drksci.com/research"
                 className="cover-link text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light tracking-wide relative">
                <span className="text-gray-400">drksci.com/</span><span className="text-white">research</span>
                {/* PDF clickable overlay */}
                <div className="absolute inset-0 bg-transparent z-10" style={{content: '""'}}></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlakeCoverPage;