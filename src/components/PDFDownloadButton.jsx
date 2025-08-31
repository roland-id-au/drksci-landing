import React, { useState } from 'react';

const PDFDownloadButton = ({ 
  url = window.location.href, 
  filename = 'document.pdf',
  className = '',
  style = {},
  children
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Always use print dialog for now
      // (Browser Rendering API requires a full Workers setup, not available in Pages)
      window.print();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Please use your browser\'s print function (Ctrl+P or Cmd+P)');
    } finally {
      setIsGenerating(false);
    }
  };

  // Default button with PDF icon matching LinkedIn style
  const defaultButton = (
    <button 
      onClick={generatePDF}
      disabled={isGenerating}
      className={`inline-flex items-center text-gray-300 hover:text-white transition-colors opacity-60 hover:opacity-100 ${className}`}
      style={style}
      aria-label="Download as PDF"
    >
      {isGenerating ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M14,3.5L18.5,8H14V3.5z M7,19v-2h10v2H7z M7,16v-2h10v2H7z M7,13v-2h5v2H7z"/>
        </svg>
      )}
    </button>
  );

  // If children are provided, wrap them with onClick handler
  if (children) {
    return (
      <div onClick={generatePDF} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    );
  }

  return defaultButton;
};

export default PDFDownloadButton;