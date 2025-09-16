import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Google Fonts: Already loaded in public/index.html
// Manrope: Used for team section headers and global styling
// Exo 2: Used for logo text
// Source Serif 4: Used for cover letter content

// Team Avatar Component - Harmonized Typography
function TeamAvatar({ name, video, still, onEmilyClick, onBlakeClick }) {
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
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            if (videoRef.current && isLoaded) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  console.log("Video play interrupted");
                });
              }
            }
          } else if (!entry.isIntersecting && isInView) {
            setIsInView(false);
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      return () => {
        containerRef.current && observer.unobserve(containerRef.current);
      };
    }
  }, [isInView, isLoaded]);

  return (
    <div className="animated-item flex flex-col items-center">
      <div 
        ref={containerRef}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => {
          if (name === 'Blake' && onBlakeClick) onBlakeClick();
          if (name === 'Emily' && onEmilyClick) onEmilyClick();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {video ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/webm" />
          </video>
        ) : (
          <img
            src={still || "/media/team/team-emily_still-black.png"}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* HARMONIZED: Using standardized typography */}
      <p className="text-sm font-normal text-gray-400 uppercase tracking-wide mt-4 text-center transition-colors duration-300 hover:text-white">
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
        {/* PRESERVED: Original Exo 2 font for logo text */}
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
          } else if (entry.target === teamRef.current) {
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

    if (teamRef.current) {
      sectionsObserver.observe(teamRef.current);
    }

    return () => {
      sectionsObserver.disconnect();
    };
  }, []);

  return (
    <div className="landing-page-container bg-black text-white min-h-screen">

      <main id="main-content" className="container mx-auto px-4 sm:px-8">
        
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col">
          {/* Header with Logo and Navigation */}
          <div className="flex justify-between items-center pt-12 pb-8">
            <FullLogo />
            
            {/* HARMONIZED: Standardized navigation typography */}
            <div className="desktop-nav hidden md:flex gap-8">
              <Link 
                to="/portfolio" 
                className="text-sm font-normal tracking-wide text-gray-400 hover:text-white transition-colors duration-300 no-underline"
              >
                Portfolio
              </Link>
              <Link 
                to="/research" 
                className="text-sm font-normal tracking-wide text-gray-400 hover:text-white transition-colors duration-300 no-underline"
              >
                Research
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <div className="mobile-nav md:hidden flex gap-4">
              <Link 
                to="/portfolio" 
                className="text-sm font-normal text-gray-400 hover:text-white transition-colors no-underline"
              >
                Portfolio
              </Link>
              <Link 
                to="/research" 
                className="text-sm font-normal text-gray-400 hover:text-white transition-colors no-underline"
              >
                Research
              </Link>
            </div>
          </div>
          
          {/* Hero Text Container - centered in remaining space */}
          <div className="flex-1 flex items-center justify-center min-h-[80vh]">
            {/* HARMONIZED: Display heading using our typography system */}
            <h1 className="hero-title animated-item text-4xl md:text-6xl font-thin tracking-tight text-white text-center leading-tight">
              Progress waits for no one.
            </h1>
          </div>
          
          {/* "WE ARE" section with expanded content */}
          <div id="about" ref={weAreRef} className="w-full pb-12">
            <div className="animated-item mb-12">
              {/* HARMONIZED: Subsection label using Executive Summary style */}
              <h2 className="text-base font-light tracking-[0.3em] uppercase text-white text-center transition-colors duration-500">
                WE ARE
              </h2>
            </div>
            
            <div className="about-grid animated-item grid grid-cols-1 md:grid-cols-3 gap-16">
              <div>
                {/* HARMONIZED: Content heading */}
                <h3 className="text-xl font-medium text-white mb-3 transition-colors duration-500">
                  Inquisitive
                </h3>
                {/* HARMONIZED: Body text with consistent styling */}
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  Our best ideas are born from cross-pollination. We thrive on conversations with interesting people to connect disparate concepts and uncover novel solutions that others might miss.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-3 transition-colors duration-500">
                  Inventive
                </h3>
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  Driven by a passion for invention, we excel at transforming ambitious, high-concept ideas into tangible, market-ready realities through creative problem-solving.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-3 transition-colors duration-500">
                  Experimental
                </h3>
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  As tireless experimenters, we embrace a culture of rapid prototyping and iterative development to find the most effective path forward for every challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="services-section py-16">
          <div className="mb-12">
            <div className="animated-item">
              {/* HARMONIZED: Subsection label */}
              <h2 className="text-base font-light tracking-[0.3em] uppercase text-white text-center transition-colors duration-500">
                OUR APPROACH
              </h2>
            </div>
          </div>
          
          <div className="space-y-12">
            {/* Listen */}
            <div className="project-link animated-item py-6 cursor-pointer group">
              <div>
                {/* HARMONIZED: Section heading */}
                <h3 className="text-3xl font-light text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  Listen
                </h3>
                
                {/* HARMONIZED: Tags with consistent styling */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    DISCOVERY
                  </span>
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    STRATEGY
                  </span>
                </div>
                
                {/* HARMONIZED: Body text */}
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  Every challenge is unique. We begin by listening, drawing insights from cross-pollination and deep conversation to understand the nuanced context of your specific problem.
                </p>
              </div>
            </div>

            {/* Ideate */}
            <div className="project-link animated-item py-6 cursor-pointer group">
              <div>
                <h3 className="text-3xl font-light text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  Ideate
                </h3>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    INNOVATION
                  </span>
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    DESIGN
                  </span>
                </div>
                
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  Our expertise lies in seeing the hidden variables. We ideate novel, lateral solutions that connect disparate concepts to create a clear, strategic path forward.
                </p>
              </div>
            </div>

            {/* Prototype */}
            <div className="project-link animated-item py-6 cursor-pointer group">
              <div>
                <h3 className="text-3xl font-light text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  Prototype
                </h3>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    DEVELOPMENT
                  </span>
                  <span className="text-xs font-normal tracking-wide text-gray-400 bg-gray-800 px-3 py-1 rounded-md">
                    TESTING
                  </span>
                </div>
                
                <p className="text-lg font-light leading-relaxed text-gray-300 transition-colors duration-500">
                  Ideas are validated through action. We rapidly build functional prototypes and interactive demos, transforming abstract concepts into tangible assets you can see, touch, and test.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section with bios */}
        <section id="team" ref={teamRef} className="py-16">
          <div className="animated-item mb-12 text-center">
            {/* PRESERVED: Original Manrope font for team section header */}
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
          
          <div className="team-section max-w-4xl mx-auto">
            <div className="team-grid flex justify-center items-center gap-24 flex-wrap">
              {/* Blake */}
              <TeamAvatar
                name="Blake"
                still="/media/team/team-blake_still-black.png"
                onBlakeClick={() => navigate('/c/blake')}
              />

              {/* Giselle */}
              <TeamAvatar
                name="Giselle"
                still="/media/team/team-gen_still-black.png"
              />

              {/* Emily */}
              <TeamAvatar
                name="Emily"
                still="/media/team/team-emily_still-black.png"
                onEmilyClick={() => setShowEmilyModal(true)}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="animated-item text-center">
            {/* HARMONIZED: Large display text with consistent styling */}
            <a 
              href="mailto:contact@drksci.com" 
              className="text-3xl md:text-4xl font-light text-white hover:text-cyan-400 transition-colors duration-300 no-underline hover:underline underline-offset-8"
            >
              contact@drksci.com
            </a>
          </div>
        </section>

      </main>
      
      {/* Emily Modal for Mobile - Using harmonized typography */}
      {showEmilyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <img 
                src="/media/team/team-emily_still.png" 
                alt="Emily"
                className="w-32 h-32 rounded-full mx-auto mb-6"
              />
              
              {/* HARMONIZED: Content heading */}
              <h3 className="text-xl font-medium text-white mb-4">Emily</h3>
              
              {/* HARMONIZED: Body text */}
              <p className="text-lg font-light leading-relaxed text-gray-300 mb-6">
                Emily is currently taking a well-deserved break from the digital world. 
                She'll be back soon with fresh perspectives and renewed energy.
              </p>
              
              {/* HARMONIZED: Button with consistent styling */}
              <button 
                onClick={() => setShowEmilyModal(false)}
                className="text-sm font-normal tracking-wide text-cyan-400 hover:text-white transition-colors bg-transparent border border-cyan-400 hover:border-white px-6 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}