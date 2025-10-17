import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import mermaid from 'mermaid';

const ResearchRenderer = ({ docName }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#1f2937',
        primaryTextColor: '#d1d5db',
        primaryBorderColor: '#374151',
        lineColor: '#6b7280',
        secondaryColor: '#374151',
        tertiaryColor: '#111827',
        background: '#000000',
        mainBkg: '#1f2937',
        secondBkg: '#111827',
        labelBackground: '#000000',
        edgeLabelBackground: '#000000',
        labelColor: '#d1d5db',
        textColor: '#d1d5db',
        fontSize: '14px'
      }
    });
  }, []);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/research/${docName}.md`);
        if (!response.ok) {
          throw new Error(`Research document not found: ${docName}`);
        }
        const markdown = await response.text();

        // Convert markdown to HTML first
        let html = marked(markdown);

        // Then process mermaid code blocks in the HTML (after marked() has processed them)
        html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          // Decode HTML entities that marked() may have encoded
          const decodedCode = code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
          return `<div class="mermaid-container"><div class="mermaid" id="${id}">${decodedCode}</div></div>`;
        });

        // Enhance links with favicons and external link icons
        html = html.replace(/<a href="([^"]*)"([^>]*)>([^<]*)<\/a>/g, (match, url, attributes, text) => {
          // Wrap external links with tracking
          let finalUrl = url;
          if (url.startsWith('http') || url.startsWith('mailto:')) {
            const today = new Date().toISOString().split('T')[0];
            const encodedUrl = encodeURIComponent(url);
            const encodedFrom = encodeURIComponent(`drksci-research-${docName}.pdf`);
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

        // Render mermaid diagrams after content is set
        setTimeout(async () => {
          try {
            await mermaid.run({
              querySelector: '.mermaid'
            });
          } catch (mermaidError) {
            console.error('Mermaid rendering error:', mermaidError);
            // Don't fail the whole page if mermaid fails
          }
        }, 100);
      } catch (err) {
        console.error('Error loading research:', err);
        setError(err.message || String(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (docName) {
      loadResearch();
    }
  }, [docName]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center py-20">
        <div className="text-center text-gray-400">
          Loading research document...
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
      <section id="research" className="relative flex flex-col justify-start py-12 pb-32" style={{ backgroundColor: 'black' }} dir="ltr">
        <div className="max-w-4xl mx-auto" dir="ltr">
          <div
            className="research-content px-8 mb-24"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Footer logo */}
        <div className="absolute bottom-8 left-8 sm:left-12 right-8 sm:right-12">
          <div className="flex justify-start items-end">
            <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-auto">
              <defs>
                <linearGradient id="slash-vaporwave1-research-content" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="33%" stopColor="#FF00FF" />
                  <stop offset="33%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#00FFFF" />
                  <stop offset="66%" stopColor="#6400FF" />
                </linearGradient>
                <linearGradient id="trail1-vaporwave1-research-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail2-vaporwave1-research-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="trail3-vaporwave1-research-content" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6400FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6400FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <g transform="translate(-2, 0)">
                <g>
                  <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF"/>
                  <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF"/>
                  <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF"/>
                  <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-research-content)"/>
                  <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-research-content)"/>
                  <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-research-content)"/>
                </g>
                <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
                <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
                <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-research-content)" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .research-content {
          direction: ltr !important;
          unicode-bidi: normal !important;
        }
        .research-content h1 {
          font-size: 2rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          margin-top: 4rem;
          line-height: 1.2;
          direction: ltr !important;
        }
        .research-content h1:first-child {
          margin-top: 2rem;
        }
        .research-content h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.3;
          direction: ltr !important;
        }
        .research-content h3 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #e5e7eb;
          letter-spacing: 0em;
          line-height: 1.4;
          direction: ltr !important;
        }
        .research-content h4 {
          font-size: 1.125rem;
          font-weight: 500;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #d1d5db;
          letter-spacing: 0em;
          line-height: 1.4;
          direction: ltr !important;
        }
        .research-content p {
          font-size: 1.0625rem;
          line-height: 1.7;
          margin-bottom: 1rem;
          color: #d1d5db;
          font-family: 'Source Serif 4', serif;
          font-weight: 300;
          direction: ltr !important;
        }
        .research-content hr {
          border-top: 1px solid #374151;
          margin: 2rem 0;
        }
        .research-content table {
          margin: 1.5rem 0 2rem 0;
          direction: ltr !important;
        }
        .research-content table th,
        .research-content table td {
          padding: 1rem 1.5rem;
          direction: ltr !important;
        }
        .research-content a {
          color: white !important;
          text-decoration: none !important;
          transition: opacity 0.2s;
          white-space: nowrap !important;
          display: inline-block !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        }
        .research-content a:hover {
          opacity: 0.8;
        }
        .research-content a img {
          vertical-align: middle !important;
          display: inline !important;
          margin-right: 0.35em !important;
          width: 16px !important;
          height: 16px !important;
        }
        .research-content a svg {
          vertical-align: middle !important;
          display: inline !important;
        }
        .research-content ul, .research-content ol {
          margin-bottom: 1rem;
          margin-left: 1.5rem;
          color: #d1d5db;
          direction: ltr !important;
        }
        .research-content ul {
          list-style-type: disc;
        }
        .research-content li {
          margin-bottom: 0.35rem;
          padding-left: 0.5rem;
          direction: ltr !important;
        }
        .research-content strong {
          font-weight: 500;
          color: #e5e7eb;
          direction: ltr !important;
        }
        .research-content em {
          font-style: italic;
          direction: ltr !important;
        }
        .mermaid-container {
          margin: 2rem 0;
          background: #0a0a0a;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #374151;
          overflow-x: auto;
        }
        .mermaid {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
        .mermaid svg {
          max-width: 100%;
          height: auto;
        }
      `
      }} />
    </>
  );
};

export default ResearchRenderer;
