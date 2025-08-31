import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Google Fonts: Add to public/index.html
// <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;700&family=Exo+2:wght@400;700&display=swap" rel="stylesheet">

// Team Avatar Component
function TeamAvatar({ name, video, onEmilyClick, onBlakeClick }) {
  const videoRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef();

  // Hover effects for Blake
  const handleMouseEnter = () => {
    if (name === 'Blake') {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (name === 'Blake') {
      setIsHovering(false);
    }
  };

  // Preload video and set initial frame
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.currentTime = 0;
      
      const handleLoadedData = () => {
        setIsLoaded(true);
        videoRef.current.currentTime = 0;
      };
      
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        videoRef.current?.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  // Intersection observer for mobile animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Auto-play only Emily on mobile when in view
            if (window.innerWidth <= 768 && videoRef.current && isLoaded && name === 'Emily') {
              // Small delay to ensure video is ready
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(err => {
                    console.log('Video play failed:', err);
                  });
                  videoRef.current.playbackRate = 1.15;
                  
                  // Stop after 3 seconds
                  setTimeout(() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                  }, 3000);
                }
              }, 100);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLoaded, name]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        textAlign: 'center', 
        width: '100%', 
        maxWidth: '250px',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          paddingBottom: '100%', // 1:1 aspect ratio
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#000',
          cursor: 'pointer',
          marginBottom: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (name === 'Blake' && onBlakeClick) {
            onBlakeClick();
          } else if (name === 'Emily' && window.innerWidth <= 768 && onEmilyClick) {
            onEmilyClick();
          }
        }}
      >
        <video
          ref={videoRef}
          src={video}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          muted
          playsInline
          preload="auto"
        />
      </div>
      <p 
        style={{ 
          color: 'white', 
          fontSize: '1.25rem', 
          fontWeight: '300',
          marginTop: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          width: '100%',
          textAlign: 'center',
          margin: '1rem 0 0 0',
          cursor: name === 'Blake' ? 'pointer' : 'default',
          textDecoration: name === 'Blake' && isHovering ? 'underline' : 'none',
          textUnderlineOffset: '4px',
          transition: 'text-decoration 0.2s'
        }}
        onClick={() => name === 'Blake' && onBlakeClick && onBlakeClick()}
        onMouseEnter={() => name === 'Blake' && setIsHovering(true)}
        onMouseLeave={() => name === 'Blake' && setIsHovering(false)}
      >
        {name}
      </p>
    </div>
  );
}

// Full Logo Component with Vapourwave 1 colors
function FullLogo() {
  return (
    <svg viewBox="0 0 98 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} className="logo-display">
      <defs>
        <linearGradient id="slash-vaporwave1-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="33%" stopColor="#FF00FF" /><stop offset="33%" stopColor="#00FFFF" />
          <stop offset="66%" stopColor="#00FFFF" /><stop offset="66%" stopColor="#6400FF" />
        </linearGradient>
        <linearGradient id="trail1-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.2" /><stop offset="100%" stopColor="#FF00FF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="trail2-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.2" /><stop offset="100%" stopColor="#00FFFF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="trail3-vaporwave1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6400FF" stopOpacity="0.2" /><stop offset="100%" stopColor="#6400FF" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(-2, 0)">
        <g className="color-trail-group">
          <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="#FF00FF" opacity="0.3"/>
          <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="#00FFFF" opacity="0.3"/>
          <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="#6400FF" opacity="0.3"/>
          <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="url(#trail1-vaporwave1-dark)"/>
          <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="url(#trail2-vaporwave1-dark)"/>
          <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="url(#trail3-vaporwave1-dark)"/>
        </g>
        <text x="2" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">d</text>
        <text x="32" y="25" fontFamily="'Exo 2', sans-serif" fontSize="28" fontWeight="700" fill="#EAEAEA">rksci</text>
        <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="url(#slash-vaporwave1-dark)" />
      </g>
    </svg>
  );
}

export default function LandingPage({ showEmilyModal: initialShowModal = false }) {
  const navigate = useNavigate();
  const [isWeAreInView, setIsWeAreInView] = useState(false);
  const [isServicesInView, setIsServicesInView] = useState(false);
  const weAreRef = useRef();
  const servicesRef = useRef();
  const [isTeamInView, setIsTeamInView] = useState(false);
  const teamRef = useRef();
  const [showEmilyModal, setShowEmilyModal] = useState(initialShowModal);


  useEffect(() => {
    // Section Reveal Animation
    const animatedItems = document.querySelectorAll('.animated-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedItems.forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === weAreRef.current) {
            setIsWeAreInView(entry.isIntersecting);
          } else if (entry.target === servicesRef.current) {
            setIsServicesInView(entry.isIntersecting);
          } else if (entry.target === teamRef.current) { // Add teamRef to observer
            setIsTeamInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (weAreRef.current) {
      sectionsObserver.observe(weAreRef.current);
    }

    if (servicesRef.current) {
      sectionsObserver.observe(servicesRef.current);
    }

    // Observe teamRef here as well
    if (teamRef.current) {
      sectionsObserver.observe(teamRef.current);
    }

    return () => {
      sectionsObserver.disconnect();
    };
  }, []);


  return (
    <div className="landing-page-container">

      <main id="main-content" className="container">
        
        {/* Hero Section */}
        <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Header with Logo and Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '3rem', paddingBottom: '2rem', position: 'relative' }}>
            <FullLogo />
            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', fontSize: '1rem', fontWeight: 'normal', letterSpacing: '0.05em' }}>
              <Link to="/portfolio" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }} 
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}>
                Portfolio
              </Link>
              <Link to="/research" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}>
                Research
              </Link>
            </div>
            {/* Mobile Navigation */}
            <div className="mobile-nav" style={{ display: 'none' }}>
              <Link to="/portfolio" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem', marginRight: '1rem' }}>
                Portfolio
              </Link>
              <Link to="/research" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>
                Research
              </Link>
            </div>
          </div>
          
          {/* Hero Text Container - centered in remaining space */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            minHeight: '80vh' 
          }}>
            <h1 className="hero-title animated-item" style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              lineHeight: '1.1', 
              textAlign: 'center'
            }}>
              Progress waits for no one.
            </h1>
          </div>
          
          {/* "WE ARE" section with expanded content */}
          <div id="about" ref={weAreRef} style={{ width: '100%', paddingBottom: '3rem' }}>
            <div className="animated-item" style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                color: isWeAreInView ? 'white' : '#9ca3af', 
                letterSpacing: '0.1em', 
                fontWeight: 'normal',
                transition: 'color 0.5s ease'
              }}>WE ARE</h2>
            </div>
            <div className="about-grid animated-item" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isWeAreInView ? 'white' : '#6b7280', transition: 'color 0.5s' }}>Inquisitive</h3>
                <p style={{ color: isWeAreInView ? 'white' : '#6b7280', marginTop: '0.5rem', fontSize: '0.875rem', lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.05em', wordSpacing: '0.1em', hyphens: 'auto', transition: 'color 0.5s' }}>
                  Our best ideas are born from cross-pollination. We thrive on conversations with interesting people to connect disparate concepts and uncover novel solutions that others might miss.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isWeAreInView ? 'white' : '#6b7280', transition: 'color 0.5s' }}>Inventive</h3>
                <p style={{ color: isWeAreInView ? 'white' : '#6b7280', marginTop: '0.5rem', fontSize: '0.875rem', lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.05em', wordSpacing: '0.1em', hyphens: 'auto', transition: 'color 0.5s' }}>
                  Driven by a passion for invention, we excel at transforming ambitious, high-concept ideas into tangible, market-ready realities through creative problem-solving.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isWeAreInView ? 'white' : '#6b7280', transition: 'color 0.5s' }}>Experimental</h3>
                <p style={{ color: isWeAreInView ? 'white' : '#6b7280', marginTop: '0.5rem', fontSize: '0.875rem', lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.05em', wordSpacing: '0.1em', hyphens: 'auto', transition: 'color 0.5s' }}>
                  As tireless experimenters, we embrace a culture of rapid prototyping and iterative development to find the most effective path forward for every challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="services-section" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div className="animated-item" style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                color: isServicesInView ? 'white' : '#9ca3af', 
                letterSpacing: '0.1em', 
                fontWeight: 'normal',
                transition: 'color 0.5s ease'
              }}>OUR APPROACH</h2>
            </div>
          </div>
          
          <div style={{ paddingTop: '1rem' }}>
            <div 
              className="project-link animated-item" 
              style={{ 
                paddingTop: '1.5rem', 
                paddingBottom: '1.5rem', 
                color: '#9ca3af', 
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
            >
              <div>
                <h3 className="service-title" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isServicesInView ? 'white' : '#9ca3af', transition: 'color 0.5s' }}>Listen</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem',
                    marginRight: '0.5rem'
                  }}>
                    DISCOVERY
                  </span>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem'
                  }}>
                    STRATEGY
                  </span>
                </div>
                <p style={{ color: isServicesInView ? 'white' : '#9ca3af', marginTop: '0.5rem', transition: 'color 0.5s' }}>
                  Every challenge is unique. We begin by listening, drawing insights from cross-pollination and deep conversation to understand the nuanced context of your specific problem.
                </p>
              </div>
            </div>

            <div 
              className="project-link animated-item" 
              style={{ 
                paddingTop: '1.5rem', 
                paddingBottom: '1.5rem', 
                color: '#9ca3af', 
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
            >
              <div>
                <h3 className="service-title" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isServicesInView ? 'white' : '#9ca3af', transition: 'color 0.5s' }}>Ideate</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem',
                    marginRight: '0.5rem'
                  }}>
                    INNOVATION
                  </span>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem'
                  }}>
                    DESIGN
                  </span>
                </div>
                <p style={{ color: isServicesInView ? 'white' : '#9ca3af', marginTop: '0.5rem', transition: 'color 0.5s' }}>
                  Our expertise lies in seeing the hidden variables. We ideate novel, lateral solutions that connect disparate concepts to create a clear, strategic path forward.
                </p>
              </div>
            </div>

            <div 
              className="project-link animated-item" 
              style={{ 
                paddingTop: '1.5rem', 
                paddingBottom: '1.5rem', 
                color: '#9ca3af', 
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
            >
              <div>
                <h3 className="service-title" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isServicesInView ? 'white' : '#9ca3af', transition: 'color 0.5s' }}>Prototype</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem',
                    marginRight: '0.5rem'
                  }}>
                    DEVELOPMENT
                  </span>
                  <span style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    letterSpacing: '0.1em', 
                    fontWeight: 'normal', 
                    color: '#6b7280',
                    backgroundColor: '#1f2937',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.375rem'
                  }}>
                    TESTING
                  </span>
                </div>
                <p style={{ color: isServicesInView ? 'white' : '#9ca3af', marginTop: '0.5rem', transition: 'color 0.5s' }}>
                  Ideas are validated through action. We rapidly build functional prototypes and interactive demos, transforming abstract concepts into tangible assets you can see, touch, and test.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section with bios */}
        <section id="team" ref={teamRef} style={{ paddingTop: '4rem', paddingBottom: '6rem', position: 'relative' }}>
          <div className="animated-item" style={{ marginBottom: '3rem', textAlign: 'center', width: '100%' }}>
            <h2 style={{ 
              color: isTeamInView ? 'white' : '#9ca3af', 
              letterSpacing: '0.1em', 
              fontWeight: '300',
              fontSize: '1.5rem',
              transition: 'color 0.5s',
              margin: '0 auto',
              fontFamily: "'Manrope', sans-serif",
              width: '100%'
            }}>
              We don't bite
            </h2>
          </div>
          <div className="team-section" style={{ margin: '4rem auto', maxWidth: '1200px' }}>
            <div className="team-grid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6rem', flexWrap: 'wrap' }}>
              {/* Blake */}
              <TeamAvatar
                name="Blake"
                video="/team-blake_gray.webm"
                onBlakeClick={() => navigate('/c/blake')}
              />
              
              {/* Giselle */}
              <TeamAvatar
                name="Giselle"
                video="/team-gen_gray.webm"
              />
              
              {/* Emily */}
              <TeamAvatar
                name="Emily"
                still="/team-emily_still-black.png"
                onEmilyClick={() => setShowEmilyModal(true)}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
          <div className="animated-item" style={{ textAlign: 'center', width: '100%' }}>
            <a 
              href="mailto:contact@drksci.com" 
              className="contact-title"
              style={{
                fontSize: '2.25rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                textDecorationThickness: '4px',
                textUnderlineOffset: '8px',
                display: 'block',
                width: '100%'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              contact@drksci.com
            </a>
          </div>
        </section>

      </main>
      
      {/* Emily Modal for Mobile */}
      {showEmilyModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowEmilyModal(false)}
        >
          {/* Close Button */}
          <button
            className="mobile-modal-close"
            onClick={() => setShowEmilyModal(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #333',
              color: 'white',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '1.25rem'
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
          
          <div style={{ 
            width: '80%', 
            maxWidth: '350px',
            margin: '0 auto'
          }}>
            <div 
              style={{
                width: '100%',
                paddingBottom: '100%',
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                boxShadow: '0 20px 60px rgba(255, 0, 255, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/team-emily_still-black.png"
                alt="Emily"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  filter: 'none'
                }}
              />
            </div>
            <p style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '300',
              marginTop: '2rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              Emily
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

 