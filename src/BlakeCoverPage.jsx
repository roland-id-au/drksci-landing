import React from 'react';
import { Helmet } from 'react-helmet';
import './styles/print.css';

const BlakeCoverPage = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Blake Carter - Cover Page - d/rksci</title>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* PDF Cover Page - Full Screen */}
        <div className="pdf-cover-page h-screen flex flex-col">
          <div className="cover-header flex-1 flex flex-col justify-center items-center">
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
      </div>
    </>
  );
};

export default BlakeCoverPage;