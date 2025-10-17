import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const ProposalRenderer = ({ proposalName }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProposal = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/proposals/${proposalName}.md`);
        if (!response.ok) {
          throw new Error(`Proposal not found: ${proposalName}`);
        }
        const markdown = await response.text();
        let html = marked(markdown);

        // Remove specific unwanted text
        html = html.replace(/A career built on a deep, hands-on understanding of how systems function and, more importantly, how they can be exploited\. My work has included:/g, '');

        // Replace closing text
        html = html.replace(/Thank you for your time and consideration\./g, 'I look forward to hearing from you.');

        // Replace role with domain
        html = html.replace(/intimately applicable to this role\./g, 'intimately applicable to this domain.');

        // Replace client placeholder with actual client name
        html = html.replace(/\[Client Company Name\]/g, 'Amin');

        // Enhance links with favicons and external link icons
        html = html.replace(/<a href="([^"]*)"([^>]*)>([^<]*)<\/a>/g, (match, url, attributes, text) => {
          // Wrap external links with tracking
          let finalUrl = url;
          if (url.startsWith('http') || url.startsWith('mailto:')) {
            const today = new Date().toISOString().split('T')[0];
            const encodedUrl = encodeURIComponent(url);
            const encodedFrom = encodeURIComponent(`blake-carter-cover-${proposalName}.pdf`);
            const encodedDate = encodeURIComponent(today);
            // Use production domain for PDF tracking URLs
            finalUrl = `https://drksci.com/go?to=${encodedUrl}&from=${encodedFrom}&v=${encodedDate}`;
          }
          // Check if text contains "(via xxx)" pattern
          const viaMatch = text.match(/^(.+?)(\s*\(via [^)]+\))$/);
          let linkText = text;
          let viaText = '';

          if (viaMatch) {
            linkText = viaMatch[1];
            viaText = viaMatch[2];
          }
          try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            const domain = urlObj.hostname;

            // Use drksci favicon for drksci URLs, Google Photos icon for Google Photos URLs, otherwise use Google's favicon service
            let faviconUrl;
            if (domain === 'drksci.com') {
              faviconUrl = '/assets/drksci-favicon.svg';
            } else if (domain === 'photos.google.com' || domain === 'photos.app.goo.gl') {
              // Use local Google Photos icon for both Google Photos domains
              faviconUrl = '/assets/google-photos-icon.svg';
            } else {
              faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
            }

            // Add target="_blank" and rel attributes for external links
            const externalAttrs = url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';

            // External link icon SVG with proper alignment
            const externalIcon = url.startsWith('http') ?
              '<svg class="external-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 0.9em; height: 0.9em; margin-left: 0.15em; opacity: 0.7; vertical-align: middle; display: inline;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>'
              : '';

            return `<a href="${finalUrl}"${attributes}${externalAttrs} style="display: inline; color: white; text-decoration: none;"><!--
              --><img src="${faviconUrl}" alt="" style="width: 16px; height: 16px; opacity: 1; vertical-align: middle; margin-right: 0.35em; display: inline;" /><!--
              -->${linkText}<!--
              -->${externalIcon}<!--
            --></a>${viaText ? `<span style="color: #9ca3af; text-decoration: none;">${viaText}</span>` : ''}`;
          } catch (e) {
            // If URL parsing fails, return original link with target="_blank" for http links
            const externalAttrs = url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `<a href="${finalUrl}"${attributes}${externalAttrs}>${text}</a>`;
          }
        });

        setContent(html);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (proposalName) {
      loadProposal();
    }
  }, [proposalName]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center py-20">
        <div className="text-center text-gray-400">
          Loading proposal...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center py-20">
        <div className="text-center text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Content Page */}
      <section id="proposal" className="relative flex flex-col justify-start py-12" style={{ backgroundColor: 'black' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="proposal-content px-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Signature */}
          <div className="px-8 mt-12 mb-8">
            <div className="mt-4">
              <img
                src="/assets/blake-signature.png"
                alt="Blake Carter Signature"
                className="h-20 opacity-100"
                style={{
                  filter: 'invert(1) brightness(1)',
                  mixBlendMode: 'normal'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer logo */}
        <div className="absolute bottom-12 left-8 sm:left-12 right-8 sm:right-12">
          <div className="flex justify-start items-end">
            <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-auto">
              <defs>
                <linearGradient id="slash-vaporwave1-proposal-content" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="33%" stopColor="#FF00FF" />
                  <stop offset="33%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#6400FF" />
                </linearGradient>
                <linearGradient id="trail1-vaporwave1-proposal-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail2-vaporwave1-proposal-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail3-vaporwave1-proposal-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <g transform="translate(-2, 0)">
                <g>
                  <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF"/>
                  <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF"/>
                  <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF"/>
                  <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-proposal-content)"/>
                  <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-proposal-content)"/>
                  <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-proposal-content)"/>
                </g>
                <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-proposal-content)" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .proposal-content h1 {
          font-size: 1.75rem;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
          margin-top: 0rem;
        }
        .proposal-content h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin: 2.5rem 0 1.5rem 0;
          color: #ffffff;
          letter-spacing: -0.01em;
        }
        .proposal-content h3 {
          font-size: 1.125rem;
          font-weight: 400;
          margin: 2rem 0 1.25rem 0;
          color: #e5e7eb;
          letter-spacing: 0.02em;
        }
        .proposal-content p {
          font-size: 1.0625rem;
          line-height: 1.7;
          margin-bottom: 1rem;
          color: #d1d5db;
          font-family: 'Source Serif 4', serif;
          font-weight: 300;
        }
        .proposal-content hr {
          border-top: 1px solid #374151;
          margin: 2rem 0;
        }
        .proposal-content table {
          margin: 1.5rem 0 2rem 0;
        }
        .proposal-content table th,
        .proposal-content table td {
          padding: 1rem 1.5rem;
        }
        .proposal-content a {
          color: white !important;
          text-decoration: none !important;
          transition: opacity 0.2s;
          white-space: nowrap !important;
          display: inline-block !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        }
        .proposal-content a:hover {
          opacity: 0.8;
        }
        .proposal-content a img {
          vertical-align: middle !important;
          display: inline !important;
          margin-right: 0.35em !important;
          width: 16px !important;
          height: 16px !important;
        }
        .proposal-content a svg {
          vertical-align: middle !important;
          display: inline !important;
        }
        .proposal-content ul, .proposal-content ol {
          margin-bottom: 1rem;
          margin-left: 1.5rem;
          color: #d1d5db;
        }
        .proposal-content ul {
          list-style-type: disc;
        }
        .proposal-content li {
          margin-bottom: 0.35rem;
          padding-left: 0.5rem;
        }
        .proposal-content strong {
          font-weight: 500;
          color: #e5e7eb;
        }
        .proposal-content em {
          font-style: italic;
        }
      `
      }} />
    </>
  );
};

export default ProposalRenderer;