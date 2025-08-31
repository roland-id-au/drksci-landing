import React from 'react';
import DetailLayout from './components/DetailLayout';

export default function RainedCloudDetail() {
  const features = [
    {
      title: 'Century-Long Records',
      description: 'Access to historical rainfall data spanning over 100 years, providing unprecedented insight into long-term climate patterns',
      icon: '📊'
    },
    {
      title: 'Location-Based Analysis',
      description: 'Users can search for any location to view detailed precipitation history and identify climate trends across generations',
      icon: '📍'
    },
    {
      title: 'Interactive Visualisations',
      description: 'Dynamic charts and graphs that make decades of weather data comprehensible to general audiences',
      icon: '📈'
    },
    {
      title: 'Historical Context',
      description: 'Long-term precipitation analysis to help users understand how rainfall patterns have evolved over the past century',
      icon: '🕰️'
    }
  ];

  return (
    <DetailLayout maxWidth="900px" backText="Back to Portfolio">
      
      {/* Hero Section */}
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '0.5rem'
        }}>
          Rained.cloud
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#2196f3',
          fontWeight: '300',
          marginBottom: '2rem'
        }}>
          Your Land's Rainfall Story
        </p>
      </section>

      {/* Project Overview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          Project Overview
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#ccc',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          Rained.cloud is an interactive data visualisation platform dedicated to preserving and presenting a century of historical rainfall records. 
          The application transforms archived meteorological data into accessible, location-specific rainfall narratives, ensuring that over 100 years 
          of precipitation history remains discoverable and usable for future generations.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {['React', 'Node.js', 'D3.js', 'Chart.js', 'PostgreSQL', 'Weather APIs', 'Historical Archives'].map((tech, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              color: '#2196f3',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(33, 150, 243, 0.3)'
            }}>
              {tech}
            </span>
          ))}
        </div>
        
        <div style={{
          fontSize: '0.875rem',
          color: '#4caf50',
          fontWeight: '600',
          marginBottom: '2rem'
        }}>
          <span style={{ marginRight: '2rem' }}>✓ Responsive Design</span>
          <span>Optimised for both desktop and mobile viewing experiences</span>
        </div>
      </section>

      {/* Data Preservation Mission */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          Data Preservation Mission
        </h2>
        <div style={{ 
          fontSize: '1.125rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          We recognised the critical need to digitise and preserve historical rainfall records that risk being lost to time. 
          The platform serves as a digital archive, safeguarding decades of meteorological observations while making this 
          invaluable climate data accessible to researchers, communities, and decision-makers.
        </div>
      </section>

      {/* Key Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
          Key Features
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: '#2196f3', 
                marginBottom: '0.75rem' 
              }}>
                {feature.title}
              </h3>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#ddd', 
                lineHeight: '1.6' 
              }}>
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Preservation & Integration */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          Data Preservation & Integration
        </h2>
        <div style={{ 
          fontSize: '1.125rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          The platform aggregates historical rainfall records from weather stations across Australia and beyond, 
          carefully digitising archived data to prevent loss of critical climate information. We implemented rigorous 
          data validation and quality control measures to maintain the integrity of these historical records whilst 
          ensuring accessibility.
        </div>
      </section>

      {/* User Experience */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          User Experience
        </h2>
        <div style={{ 
          fontSize: '1.125rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          The interface prioritises clarity and accessibility, allowing users with varying levels of technical expertise 
          to explore a century of rainfall data for their specific areas of interest. Interactive elements guide users 
          through decades of precipitation history whilst maintaining scientific accuracy and historical context.
        </div>
      </section>

      {/* Impact */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
          Impact
        </h2>
        <div style={{ 
          fontSize: '1.125rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          Rained.cloud serves as both a digital preservation tool and a practical resource for researchers, educators, 
          farmers, climate scientists, and communities seeking to understand long-term rainfall patterns. By saving and 
          presenting a century of historical data, we're helping preserve Australia's meteorological heritage whilst 
          enabling evidence-based decision-making for the future.
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #333',
          marginTop: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2196f3' }}>100+</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Years of Data</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#4caf50' }}>1000s</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Weather Stations</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#ff9800' }}>∞</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Preserved Forever</div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section style={{ 
        textAlign: 'center', 
        paddingBottom: '4rem',
        borderTop: '1px solid #333',
        paddingTop: '3rem',
        marginTop: '3rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '400',
          marginBottom: '1rem',
          color: 'white'
        }}>
          Explore Your Rainfall Story
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#bbb',
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.6'
        }}>
          Discover over a century of precipitation history for your location. 
          Access the platform to explore your land's unique rainfall narrative.
        </p>
        <a 
          href="https://app.rained.cloud"
          target="_blank"
          rel="noopener noreferrer"
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
          Visit app.rained.cloud
        </a>
      </section>

    </DetailLayout>
  );
}