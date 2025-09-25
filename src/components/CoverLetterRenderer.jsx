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
        const html = marked(markdown);
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
          <p className="text-sm leading-relaxed text-gray-400 italic text-center mt-6" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: '300' }}>
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
        .cover-letter-content hr {
          border-top: 1px solid #374151;
          margin: 2rem 0;
        }
        .cover-letter-content a {
          color: #e5e7eb;
          transition: color 0.2s;
        }
        .cover-letter-content a:hover {
          color: white;
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