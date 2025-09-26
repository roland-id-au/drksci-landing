import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const CoverLetterRenderer = ({ letterName }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLetter = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/cover_letters/${letterName}.md`);
        if (!response.ok) {
          throw new Error(`Cover letter not found: ${letterName}`);
        }
        const markdown = await response.text();
        let html = marked(markdown);

        // Remove specific unwanted text
        html = html.replace(/A career built on a deep, hands-on understanding of how systems function and, more importantly, how they can be exploited\. My work has included:/g, '');

        // Replace closing text
        html = html.replace(/Thank you for your time and consideration\./g, 'I look forward to hearing from you.');

        // Replace role with domain
        html = html.replace(/intimately applicable to this role\./g, 'intimately applicable to this domain.');

        // Enhance links with favicons and external link icons
        html = html.replace(/<a href="([^"]*)"([^>]*)>([^<]*)<\/a>/g, (match, url, attributes, text) => {
          // Wrap external links with tracking
          let finalUrl = url;
          if (url.startsWith('http') || url.startsWith('mailto:')) {
            const today = new Date().toISOString().split('T')[0];
            const encodedUrl = encodeURIComponent(url);
            const encodedFrom = encodeURIComponent(`blake-carter-cover-${letterName}.pdf`);
            const encodedDate = encodeURIComponent(today);
            finalUrl = `/go?to=${encodedUrl}&from=${encodedFrom}&v=${encodedDate}`;
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

    if (letterName) {
      loadLetter();
    }
  }, [letterName]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center py-20">
        <div className="text-center text-gray-400">
          Loading cover letter...
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
    <section id="cover-letter" className="relative min-h-screen flex flex-col justify-center py-20" style={{ backgroundColor: 'black' }}>
      <div className="max-w-4xl">
        <div
          className="cover-letter-content px-4 sm:px-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Signature - moved inside cover-letter section */}
        <div className="px-4 sm:px-8 mt-12">
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
          <p className="text-sm leading-relaxed text-gray-400 text-center mt-6" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: '300' }}>
            Available for discussion at your convenience | References available upon request
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .cover-letter-content h1 {
          font-size: 1.5rem;
          font-weight: 400;
          color: #d1d5db;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .cover-letter-content h2 {
          font-size: 1rem;
          font-weight: 400;
          margin: 2.5rem 0 2rem 0;
          color: #9ca3af;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .cover-letter-content h3 {
          font-size: 1rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          color: #9ca3af;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .cover-letter-content p {
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          color: #d1d5db;
          font-family: 'Source Serif 4', serif;
          font-weight: 400;
        }
        .cover-letter-content p:first-of-type,
        .cover-letter-content p:last-of-type {
          text-align: justify;
        }
        .cover-letter-content hr {
          border-top: 1px solid #374151;
          margin: 2rem 0;
        }
        .cover-letter-content a {
          color: white !important;
          text-decoration: none !important;
          transition: opacity 0.2s;
          white-space: nowrap !important;
          display: inline-block !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        }
        .cover-letter-content a:hover {
          opacity: 0.8;
        }
        .cover-letter-content a img {
          vertical-align: middle !important;
          display: inline !important;
          margin-right: 0.35em !important;
          width: 16px !important;
          height: 16px !important;
        }
        .cover-letter-content a svg {
          vertical-align: middle !important;
          display: inline !important;
        }
        .cover-letter-content ul, .cover-letter-content ol {
          margin-bottom: 1.5rem;
          color: #d1d5db;
        }
        .cover-letter-content li {
          margin-bottom: 0.5rem;
        }
        .cover-letter-content strong {
          font-weight: 500;
          color: #e5e7eb;
        }
        .cover-letter-content em {
          font-style: italic;
        }
      `
      }} />
    </section>
  );
};

export default CoverLetterRenderer;