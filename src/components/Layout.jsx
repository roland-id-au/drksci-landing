import React from 'react';
import Header from './Header';

export default function Layout({ children, maxWidth = '1200px' }) {
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
        padding: '0 2rem' 
      }}>
        <Header />
        {children}
      </main>
    </div>
  );
}