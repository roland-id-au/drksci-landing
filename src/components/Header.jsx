import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FullLogo from './FullLogo';

export default function Header() {
  const location = useLocation();
  
  // Determine which nav item should be active based on current path
  const isPortfolio = location.pathname.includes('/portfolio');
  const isMiskatonics = location.pathname.includes('/miskatonics') || location.pathname.includes('/research');
  
  return (
    <header className="portfolio-header" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingTop: '3rem', 
      paddingBottom: '2rem' 
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <FullLogo />
      </Link>
      <nav className="portfolio-nav" style={{ display: 'flex', gap: '2rem', fontSize: '1rem', letterSpacing: '0.05em' }}>
        <Link to="/portfolio" style={{ 
          color: isPortfolio ? 'white' : '#6b7280', 
          textDecoration: 'none',
          transition: 'color 0.3s',
          fontWeight: isPortfolio ? '600' : '400'
        }}
        onMouseEnter={(e) => !isPortfolio && (e.target.style.color = 'white')}
        onMouseLeave={(e) => !isPortfolio && (e.target.style.color = '#6b7280')}>
          Portfolio
        </Link>
        <Link to="/research" style={{ 
          color: isMiskatonics ? 'white' : '#6b7280', 
          textDecoration: 'none',
          transition: 'color 0.3s',
          fontWeight: isMiskatonics ? '600' : '400'
        }}
        onMouseEnter={(e) => !isMiskatonics && (e.target.style.color = 'white')}
        onMouseLeave={(e) => !isMiskatonics && (e.target.style.color = '#6b7280')}>
          Research
        </Link>
      </nav>
    </header>
  );
}