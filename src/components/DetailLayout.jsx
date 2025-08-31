import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function DetailLayout({ children, maxWidth = '900px', backText = 'Back' }) {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      color: 'white',
      fontFamily: "'Manrope', sans-serif"
    }}>
      <main className="container" style={{ 
        maxWidth: maxWidth, 
        margin: '0 auto', 
        padding: '0 1rem',
        '@media (min-width: 768px)': {
          padding: '0 2rem'
        }
      }}>
        <Header />
        
        {children}
      </main>
    </div>
  );
}