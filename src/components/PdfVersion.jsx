import React, { useEffect, useState } from 'react';

// Default print styles for beautiful PDF output
const defaultPrintStyles = `
@media print {
  /* Page setup */
  @page {
    size: A4;
    margin: 10mm;
  }
  
  /* Reset and base styles */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #000;
    background: white;
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    break-after: avoid;
    font-weight: 600;
    margin-top: 0;
  }
  
  h1 {
    font-size: 24pt;
    margin-bottom: 12pt;
    color: #1a1a1a;
  }
  
  h2 {
    font-size: 18pt;
    margin: 18pt 0 10pt 0;
    color: #2a2a2a;
    border-bottom: 1pt solid #e0e0e0;
    padding-bottom: 4pt;
  }
  
  h3 {
    font-size: 14pt;
    margin: 14pt 0 8pt 0;
    color: #3a3a3a;
  }
  
  h4 {
    font-size: 12pt;
    margin: 12pt 0 6pt 0;
    color: #4a4a4a;
  }
  
  p {
    margin: 0 0 10pt 0;
    orphans: 3;
    widows: 3;
  }
  
  /* Links - clean for print */
  a {
    color: #000 !important;
    text-decoration: none !important;
    font-weight: inherit !important;
  }
  
  a[href]:after {
    content: none !important;
  }
  
  a[href^="http"]:after,
  a[href^="https"]:after {
    content: none !important;
  }
  
  /* Lists */
  ul, ol {
    margin: 0 0 10pt 0;
    padding-left: 20pt;
  }
  
  li {
    margin: 0 0 4pt 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  th, td {
    padding: 6pt;
    border: 0.5pt solid #d0d0d0;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
  
  /* Code blocks */
  pre, code {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
    font-size: 9pt;
    background-color: #f8f8f8;
    border: 0.5pt solid #e0e0e0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  pre {
    padding: 8pt;
    margin: 10pt 0;
    overflow-x: auto;
  }
  
  code {
    padding: 2pt 4pt;
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  /* Hide non-print elements */
  .no-print,
  nav,
  header nav,
  footer,
  button,
  .pdf-button,
  .pdf-version-button,
  .social-links,
  .navigation,
  [role="navigation"],
  [aria-label*="PDF"],
  [aria-label*="Download"],
  [aria-label*="Share"],
  [aria-label*="Print"] {
    display: none !important;
  }
  
  /* Page breaks */
  .page-break {
    page-break-after: always;
    break-after: always;
  }
  
  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  /* Section spacing */
  section {
    page-break-inside: avoid;
    margin-bottom: 18pt;
  }
  
  /* Remove backgrounds and shadows */
  * {
    box-shadow: none !important;
    text-shadow: none !important;
  }
  
  /* Ensure black text on white background */
  body * {
    color: #000 !important;
    background: transparent !important;
  }
  
  /* Keep important colors for syntax highlighting, charts, etc */
  .highlight,
  .syntax-highlight,
  [class*="language-"] {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
`;

const PdfVersion = ({
  pdfPath,
  filename = 'document.pdf',
  lightFilename, // Optional separate filename for light mode
  className = '',
  style = {},
  children,
  showIcon = true,
  variant = 'default', // 'default' or 'linkedin'
  printStyles = null, // Allow custom print styles to be passed
  autoDetectMode = true // Enable automatic light/dark mode detection
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detect current page mode for automatic PDF selection
  useEffect(() => {
    if (!autoDetectMode) return;

    const detectMode = () => {
      // Check URL hash first
      const isLightMode = window.location.hash === '#light';
      if (isLightMode !== undefined) {
        setIsDarkMode(!isLightMode);
        return;
      }

      // Fall back to checking document class
      const hasLightMode = document.documentElement.classList.contains('light');
      const hasDarkMode = document.documentElement.classList.contains('dark');

      if (hasLightMode) {
        setIsDarkMode(false);
      } else if (hasDarkMode) {
        setIsDarkMode(true);
      } else {
        // Default to dark mode if neither is explicitly set
        setIsDarkMode(true);
      }
    };

    // Initial detection
    detectMode();

    // Listen for hash changes (light/dark mode switching)
    const handleHashChange = () => detectMode();
    window.addEventListener('hashchange', handleHashChange);

    // Listen for class changes on document element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          detectMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [autoDetectMode]);

  // Determine the appropriate filename based on mode
  const getFilename = () => {
    if (!autoDetectMode || !lightFilename) {
      return filename;
    }

    return isDarkMode ? filename : lightFilename;
  };

  // Construct the PDF URL based on the path and mode
  // PDFs should be pre-generated in public/pdfs/
  const pdfUrl = pdfPath || `/pdfs/${getFilename()}`;
  
  // Inject print styles when component mounts
  useEffect(() => {
    const styleId = 'pdf-version-print-styles';
    
    // Check if styles already exist
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = printStyles || defaultPrintStyles;
      document.head.appendChild(styleElement);
    }
    
    // Cleanup on unmount
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle && !document.querySelector('.pdf-version-component')) {
        existingStyle.remove();
      }
    };
  }, [printStyles]);
  
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // LinkedIn-style badge
  const linkedinStyleBadge = (
    <button
      onClick={handleDownload}
      className={`pdf-version-component inline-flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-sm text-white transition-colors ${className}`}
      style={style}
      aria-label="Download PDF version"
      title="Download PDF version"
    >
      <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
        <path d="M14,2H8c-1.1,0-2,0.9-2,2v16c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V8L14,2z M14,3.5L18.5,8H14V3.5z"/>
        <text x="12" y="16" fontSize="6" textAnchor="middle" fill="#000" fontFamily="sans-serif" fontWeight="900" stroke="#000" strokeWidth="0.2">PDF</text>
      </svg>
      PDF
    </button>
  );

  // Default button with PDF icon matching LinkedIn style
  const defaultButton = (
    <button
      onClick={handleDownload}
      className={`pdf-version-component inline-flex items-center text-gray-300 hover:text-white transition-colors opacity-60 hover:opacity-100 ${className}`}
      style={style}
      aria-label="Download PDF version"
      title="Download PDF version"
    >
      {showIcon && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H8c-1.1,0-2,0.9-2,2v16c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V8L14,2z M14,3.5L18.5,8H14V3.5z"/>
        </svg>
      )}
      {children && <span className="ml-2">{children}</span>}
    </button>
  );
  
  // If custom children are provided without icon requirement
  if (children && !showIcon) {
    return (
      <a
        href={pdfUrl}
        download={filename}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ cursor: 'pointer', ...style }}
      >
        {children}
      </a>
    );
  }

  // Return LinkedIn-style badge if requested
  if (variant === 'linkedin') {
    return linkedinStyleBadge;
  }

  return defaultButton;
};

// Component to mark a page as needing PDF generation during build
export const PdfPage = ({ children, pageId }) => {
  // This is a marker component that the build script will detect
  // It renders children normally but marks the page for PDF generation
  return (
    <div data-pdf-page={pageId}>
      {children}
    </div>
  );
};

export default PdfVersion;