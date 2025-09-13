import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';

// Real portfolio projects
const portfolioProjects = [
  {
    id: 'rained-cloud',
    title: 'rained.cloud',
    category: 'Data Infrastructure',
    description: 'Digitizing 40+ years of handwritten rainfall records across 8 synchronized platforms. Real-time data for farmers when every drop counts.',
    tech: ['FastAPI', 'Next.js', 'Flutter', 'PostgreSQL', 'Azure', 'Supabase'],
    status: 'Live at app.rained.cloud',
    metrics: {
      today: '12.5mm',
      week: '44.9mm',
      location: 'Bonnie Doon, VIC',
      stations: '3 Active'
    },
    year: '2024'
  },
  {
    id: 'kareer',
    title: 'Kareer',
    category: 'Career Platform',
    description: 'The command center for your career. Visual resume builder, job tracking, and intelligent career development in one platform.',
    tech: ['Vite', 'Tailwind CSS', 'Material Design 3', 'JavaScript', 'Cloudflare Pages'],
    status: 'In Development',
    metrics: {
      location: 'Career Management',
      feature: 'Live Editor',
      apps: 'Job Tracking',
      users: 'Beta Testing'
    },
    year: '2025'
  }
];

function ProjectCard({ project, index }) {
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
      to={`/portfolio/${project.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        ref={cardRef}
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'opacity 0.8s ease',
          cursor: 'pointer',
          height: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Project Image with Metrics Overlay */}
        <div style={{
          height: '200px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img 
            src={project.id === 'rained-cloud' ? "/assets/portfolio/rain-register.jpg" : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY5ODAwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2U5MWU2MztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnPjxyZWN0IHg9IjUwIiB5PSI0MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjkiLz48cmVjdCB4PSI3MCIgeT0iNjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iODAiIGZpbGw9IiNmOWY5ZjkiLz48cmVjdCB4PSI3MCIgeT0iNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmOTgwMCIvPjxyZWN0IHg9IjcwIiB5PSI5MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2VlZSIvPjxyZWN0IHg9IjcwIiB5PSIxMTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIGZpbGw9IiNlZWUiLz48cmVjdCB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlIi8+PC9nPjx0ZXh0IHg9IjIwMCIgeT0iMTkwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC44Ij5DYXJlZXIgTWFuYWdlbWVudCBQbGF0Zm9ybTwvdGV4dD48L3N2Zz4="} 
            alt={project.id === 'rained-cloud' ? "Historical rain register book that inspired the digital transformation" : "Career management platform with visual resume builder"}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {project.metrics && (
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.9)',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              fontSize: '0.75rem'
            }}>
              {project.id === 'rained-cloud' ? (
                <>
                  <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>{project.metrics.location}</div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div>
                      <div style={{ color: '#666' }}>Today</div>
                      <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>{project.metrics.today}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666' }}>Week</div>
                      <div style={{ color: '#FF00FF', fontWeight: 'bold' }}>{project.metrics.week}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: '#ff9800', marginBottom: '0.25rem' }}>{project.metrics.location}</div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div>
                      <div style={{ color: '#666' }}>Features</div>
                      <div style={{ color: '#ff9800', fontWeight: 'bold' }}>{project.metrics.feature}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666' }}>Status</div>
                      <div style={{ color: '#e91e63', fontWeight: 'bold' }}>{project.metrics.users}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#00FFFF',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {project.category}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: '#888',
              fontWeight: '300'
            }}>
              {project.year}
            </span>
          </div>

          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.75rem',
            lineHeight: '1.3'
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '0.875rem',
            color: '#bbb',
            lineHeight: '1.6',
            marginBottom: '1rem',
            flex: 1
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} style={{
                fontSize: '0.75rem',
                background: '#333',
                color: '#ccc',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}>
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span style={{
                fontSize: '0.75rem',
                color: '#888'
              }}>
                +{project.tech.length - 3} more
              </span>
            )}
          </div>

          <div style={{
            fontSize: '0.75rem',
            color: '#FF00FF',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {project.status}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Portfolio() {


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
            Portfolio
          </h1>
        </section>


        {/* Projects Grid */}
        <section style={{ paddingBottom: '6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {portfolioProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ 
          textAlign: 'center', 
          paddingBottom: '6rem',
          borderTop: '1px solid #333',
          paddingTop: '4rem'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Ready to pioneer the next breakthrough?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#bbb',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            Connect with our team to explore how experimental R&D can accelerate your organization's most ambitious goals.
          </p>
          <a 
            href="mailto:contact@drksci.com"
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
            Start the Conversation
          </a>
        </section>

    </Layout>
  );
}