import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ResearchRenderer from './components/ResearchRenderer';

const BlakeResearchPage = () => {
  const { docName } = useParams();
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
        <title>{docName ? `Blake Carter - Research: ${docName}` : 'Blake Carter - Research'} - d/rksci</title>
      </Helmet>
      <div className={`min-h-screen bg-black text-white ${isDarkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4">
          <ResearchRenderer docName={docName} />
        </div>
      </div>
    </>
  );
};

export default BlakeResearchPage;