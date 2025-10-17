import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProposalRenderer from './components/ProposalRenderer';

const BlakeProposalPage = () => {
  const { proposalName } = useParams();
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
        <title>{proposalName ? `Blake Carter - Cover Letter: ${proposalName}` : 'Blake Carter - Cover Letter'} - d/rksci</title>
        <style>
          {`
            .serif-cover-letter {
              font-family: 'Source Serif 4', serif;
              font-weight: 300;
            }
            .company-badge {
              display: inline-flex;
              align-items: center;
              padding: 2px 6px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
              text-decoration: none;
              transition: background-color 0.2s ease;
            }
            .company-badge:hover {
              background: rgba(255, 255, 255, 0.2);
            }
            @media print {
              body * {
                visibility: hidden;
              }
              #cover-letter, #cover-letter * {
                visibility: visible;
              }
              #cover-letter {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
            }
          `}
        </style>
      </Helmet>
      <div className={`min-h-screen bg-black text-white ${isDarkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4">
          <ProposalRenderer proposalName={proposalName} />
        </div>
      </div>
    </>
  );
};

export default BlakeProposalPage;