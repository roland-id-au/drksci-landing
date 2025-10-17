import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const ProposalCoverPage = () => {
  const { proposalName } = useParams();

  // Define proposal-specific metadata
  const proposalMetadata = {
    'amin-business-development': {
      title: 'Business Development',
      subtitle: 'Consulting Proposal',
      preparedFor: 'Amin'
    },
    'vows-social': {
      title: 'The Vows Social',
      subtitle: 'Proposal',
      preparedFor: '/r/mpersonally'
    },
    'vows-social-enhanced': {
      title: 'The Vows Social',
      subtitle: 'Business Proposal',
      preparedFor: '/r/mpersonally'
    },
    'vows-social-technical-appendix': {
      title: 'The Vows Social',
      subtitle: 'Technical Appendix',
      preparedFor: '/r/mpersonally'
    },
    'getsmart-managing-cofounder': {
      title: 'Managing Cofounder',
      subtitle: 'GetSmart',
      preparedFor: 'Qualified Candidates'
    }
  };

  const metadata = proposalMetadata[proposalName] || {
    title: 'Business Development',
    subtitle: 'Consulting Proposal',
    preparedFor: '[Client Name]'
  };
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
        <title>Proposal Cover - {proposalName} - d/rksci</title>
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 bg-black text-white ${isDarkMode ? 'dark' : ''}`}>
        {/* PDF Cover Page - Full width layout */}
        <div className="pdf-cover-page h-screen flex flex-col justify-between relative">

          {/* Cover Header */}
          <div className="cover-header flex-1 flex flex-col justify-start px-12 sm:px-18 pt-64">
            <div className="mb-20">
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-8 text-white font-light" style={{fontFamily: 'Manrope, system-ui, sans-serif'}}>
                {metadata.title}
                <br />
                {metadata.subtitle}
              </h1>

              {/* Subtitle */}
              <div className="mb-10 font-light space-y-3 uppercase text-gray-400" style={{fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '0.875rem', letterSpacing: '0.1em'}}>
                <p>Prepared for: {metadata.preparedFor}</p>
                <p>Prepared by d/rksci</p>
                <p>7 October 2025</p>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalCoverPage;
