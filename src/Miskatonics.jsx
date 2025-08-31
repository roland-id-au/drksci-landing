import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';

// Research projects data
const researchProjects = [
  {
    id: 'mapgyver-lost-person-modeling',
    title: 'MapGyver: LLM-Based Lost Person Behavior Modeling',
    category: 'Computational Rescue',
    description: 'Teaching machines to think like the lost. Using large language models to simulate human decision-making under extreme cognitive load, transforming search and rescue from guesswork into computational probability.',
    status: 'Field Tested',
    published: '2024',
    authors: ['Blake'],
    tags: ['LLM Applications', 'Search & Rescue', 'Behavioral Simulation', 'Emergency Response'],
    abstract: 'A novel application of large language models to predict lost person behavior through persona-driven simulation, validated during real search operations in Tasmania.',
    metrics: {
      status: 'Known (GPS)',
      elapsed: '3 Weeks',
      location: 'Tasmania Field Test',
      simulations: '847 Paths'
    }
  },
  {
    id: 'prophet-experiment',
    title: 'The Prophet Experiment',
    category: 'Urban Prediction',
    description: 'Identifying development parcels at scale in future scenarios. ConvLSTM models process 20 years of Queensland data to predict which land will transform from rural to urban.',
    status: 'Research Phase',
    published: '2025',
    authors: ['Blake'],
    tags: ['ConvLSTM', 'Urban Development', 'Land Use Prediction', 'Queensland Planning'],
    abstract: 'Machine learning system that predicts large-scale urban development patterns by analyzing historical parcel transformations and identifying future development probability across Queensland growth corridors.'
  },
  {
    id: 'princhester-associates',
    title: 'Princhester Associates: Agentic Talent Pool Curation',
    category: 'Labor Market Intelligence',
    description: 'Privacy-preserving talent matching for niche software expertise. Using LinkedIn insights and AI-driven engagement to address critical skill shortages in specialized industries without compromising professional anonymity.',
    status: 'Pilot Phase',
    published: '2024',
    authors: ['Blake'],
    tags: ['Talent Intelligence', 'Privacy Tech', 'LinkedIn Analysis', 'Specialized Recruitment'],
    abstract: 'A candidate-centric platform that enables professionals with niche software skills in Construction, Mining, Architecture, Manufacturing, Finance, and Legal sectors to anonymously receive job opportunities while maintaining complete privacy control.',
    metrics: {
      market: '$15.2M Annual',
      sectors: '6 Industries',
      skills: 'FrameCAD, Surpac, Revit, Mastercam, Relativity',
      model: 'Privacy-First'
    }
  }
];

function ResearchCard({ research, index }) {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsInView(true), index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <Link 
      to={`/research/${research.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        ref={cardRef}
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'opacity 0.8s ease',
          padding: '2rem',
          cursor: 'pointer',
          borderBottom: '1px solid #333',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#6400FF',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {research.category}
          </span>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '0.75rem',
              color: '#FF00FF',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {research.status}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#888',
              fontWeight: '300'
            }}>
              {research.published}
            </div>
          </div>
        </div>

        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          lineHeight: '1.3'
        }}>
          {research.title}
        </h3>

        <p style={{
          fontSize: '0.875rem',
          color: '#bbb',
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          {research.description}
        </p>

        <p style={{
          fontSize: '0.8rem',
          color: '#999',
          lineHeight: '1.5',
          marginBottom: '1.5rem',
          fontStyle: 'italic',
          flex: 1
        }}>
          "{research.abstract}"
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            color: '#666',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Authors
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {research.authors.map((author, i) => (
              <span key={i} style={{
                fontSize: '0.75rem',
                background: '#333',
                color: '#ccc',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}>
                {author}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {research.tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              color: '#6400FF',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(100, 0, 255, 0.3)'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Miskatonics() {


  return (
    <Layout>

        {/* Page Title */}
        <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Research
          </h1>
        </section>

        {/* Research Grid */}
        <section style={{ paddingBottom: '6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {researchProjects.map((research, index) => (
              <ResearchCard key={research.id} research={research} index={index} />
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section style={{
          textAlign: 'center',
          padding: '4rem 0',
          borderTop: '1px solid #333',
          borderBottom: '1px solid #333',
          marginBottom: '4rem'
        }}>
          <blockquote style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: '#ccc',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            "The most fruitful ideas emerge at the intersection of seemingly unrelated domains, where conventional wisdom dissolves and experimental thinking takes root."
          </blockquote>
          <cite style={{
            display: 'block',
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#888'
          }}>
            — d/rksci Research Philosophy
          </cite>
        </section>

        {/* Contact CTA */}
        <section style={{ 
          textAlign: 'center', 
          paddingBottom: '6rem'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Ready to explore the unknown?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#bbb',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            Partner with researchers who thrive at the intersection of impossibility and innovation. Let's investigate what others fear to question.
          </p>
          <a 
            href="mailto:research@drksci.com"
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem 2rem',
              border: '1px solid #333',
              background: 'transparent',
              display: 'inline-block'
            }}
          >
            Begin the Investigation
          </a>
        </section>

    </Layout>
  );
}