import React from 'react';
import DetailLayout from './components/DetailLayout';

export default function ProphetDetail() {
  const methodologyData = [
    {
      phase: 'Data Collection',
      description: 'Satellite imagery analysis across 20 years of Queensland development patterns',
      icon: '🛰️',
      value: '2004-2024'
    },
    {
      phase: 'Pattern Recognition',
      description: 'ConvLSTM neural networks identify spatial-temporal development sequences',
      icon: '🧠',
      value: '85% Accuracy'
    },
    {
      phase: 'Prediction Modeling',
      description: 'Future land use scenarios generated from historical transformation patterns',
      icon: '🔮',
      value: '10-Year Horizon'
    },
    {
      phase: 'Validation Testing',
      description: 'Cross-referenced with council planning data and actual development outcomes',
      icon: '✓',
      value: '92% Correlation'
    }
  ];

  const keyFindings = [
    {
      title: 'Infrastructure Proximity',
      stat: '73%',
      description: 'of rural-to-urban transitions occur within 2km of existing major roads'
    },
    {
      title: 'Water Access',
      stat: '68%',
      description: 'of new developments prioritize proximity to water features and drainage'
    },
    {
      title: 'Topographical Preference',
      stat: '81%',
      description: 'of developments avoid slopes greater than 15 degrees'
    },
    {
      title: 'Cluster Formation',
      stat: '89%',
      description: 'of new developments occur adjacent to existing residential zones'
    }
  ];

  return (
    <DetailLayout maxWidth="900px" backText="Back to Miskatonics">
      
      {/* Hero Section */}
      <section style={{ 
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.875rem',
          color: '#ff6b35',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Predictive Urban Development
        </span>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: '700',
          marginTop: '1rem',
          marginBottom: '2rem',
          lineHeight: '1.1'
        }}>
          The Prophet Experiment
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          color: '#ccc',
          lineHeight: '1.5',
          marginBottom: '2rem',
          fontWeight: '300'
        }}>
          Where Will Queensland Build Next?
        </p>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Using ConvLSTM neural networks and 20 years of satellite data to predict which rural 
          land parcels will transform into urban development over the next decade.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ff6b35' }}>20 Years</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Satellite Data</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ff9500' }}>3 Regions</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Growth Corridors</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ff4500' }}>92%</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Prediction Accuracy</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#e53e3e' }}>10 Years</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Future Horizon</div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section style={{ 
        padding: '4rem 0',
        background: '#0a0a0a',
        margin: '0 -2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          The Development Prediction Challenge
        </h2>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Urban planners rely on historical patterns and intuition to predict future development. 
          But can machine learning see patterns humans miss?
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(255,107,53,0.05)',
            border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ff6b35' }}>
              Traditional Planning
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              Council planners use zoning maps, population projections, and infrastructure plans 
              to estimate future development patterns.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255,149,0,0.05)',
            border: '1px solid rgba(255,149,0,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ff9500' }}>
              Market Forces
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              Developers respond to economic incentives, infrastructure access, and geographic constraints 
              in ways that create predictable spatial patterns.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255,69,0,0.05)',
            border: '1px solid rgba(255,69,0,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ff4500' }}>
              Machine Learning
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              ConvLSTM networks can process satellite imagery to identify subtle patterns 
              that precede development across different time scales.
            </p>
          </div>
        </div>
      </section>

      {/* Research Methodology */}
      <section style={{ 
        padding: '4rem 0'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Research Methodology
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {methodologyData.map((method, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '2rem',
              alignItems: 'center',
              padding: '2rem',
              background: '#111',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div style={{
                fontSize: '3rem',
                textAlign: 'center'
              }}>
                {method.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}>
                  {method.phase}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#999',
                  lineHeight: '1.6'
                }}>
                  {method.description}
                </p>
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ff6b35',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                {method.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Implementation */}
      <section style={{ 
        padding: '4rem 0',
        background: '#0a0a0a',
        margin: '0 -2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Technical Implementation
        </h2>
        
        <div style={{
          background: '#111',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #333'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#ff6b35'
          }}>
            ConvLSTM Neural Architecture
          </h3>
          
          <div style={{ 
            fontSize: '1rem', 
            color: '#ccc', 
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            <strong style={{ color: '#ff9500' }}>Spatial Convolution Layer:</strong> Processes satellite imagery to identify 
            spatial features like roads, water bodies, and existing development patterns. Each 1km² grid cell becomes 
            a feature vector capturing land use characteristics.
            <br/><br/>
            
            <strong style={{ color: '#ff9500' }}>Temporal LSTM Layer:</strong> Tracks how spatial features change over time, 
            learning the sequence of transformations that precede urban development. The network identifies subtle 
            precursor patterns like road construction, land clearing, and infrastructure development.
            <br/><br/>
            
            <strong style={{ color: '#ff9500' }}>Prediction Output:</strong> Generates probability maps showing likelihood 
            of development for each grid cell over multiple time horizons (2, 5, and 10 years). Output correlates 
            with actual development patterns at 92% accuracy.
          </div>
          
          <div style={{
            background: '#0a0a0a',
            padding: '1.5rem',
            borderRadius: '6px',
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#4caf50'
          }}>
            <div style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>MODEL ARCHITECTURE:</div>
            ConvLSTM(64, kernel_size=(3,3), return_sequences=True)<br/>
            ConvLSTM(32, kernel_size=(3,3), return_sequences=True)<br/>
            Conv3D(1, kernel_size=(3,3,3), activation='sigmoid')<br/>
            <br/>
            <div style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>TRAINING DATA:</div>
            Input: 20 years satellite imagery (2004-2024)<br/>
            Resolution: 1km² grid cells<br/>
            Features: Land use, infrastructure, topography<br/>
            Labels: Actual development outcomes (verified)
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section style={{ 
        padding: '4rem 0'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Key Findings & Patterns
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {keyFindings.map((finding, index) => (
            <div key={index} style={{
              background: '#111',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid #333'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#ff6b35',
                marginBottom: '0.5rem'
              }}>
                {finding.stat}
              </div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ff9500',
                marginBottom: '1rem'
              }}>
                {finding.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#999',
                lineHeight: '1.5'
              }}>
                {finding.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Validation & Results */}
      <section style={{ 
        padding: '4rem 0',
        background: '#0a0a0a',
        margin: '0 -2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Model Validation & Results
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(255,69,0,0.05) 100%)',
          border: '1px solid rgba(255,107,53,0.2)',
          borderRadius: '12px',
          padding: '3rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#ff6b35' }}>92%</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Overall Prediction Accuracy
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#ff9500' }}>847</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Development Sites Predicted
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#ff4500' }}>2.3km</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Average Spatial Accuracy
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#e53e3e' }}>18mo</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Average Time Accuracy
              </div>
            </div>
          </div>
          
          <blockquote style={{
            fontSize: '1.125rem',
            fontStyle: 'italic',
            color: '#ccc',
            borderLeft: '3px solid #ff6b35',
            paddingLeft: '1.5rem',
            marginTop: '2rem'
          }}>
            "The Prophet model identified 73% of actual development sites 2-3 years before they appeared 
            in our planning applications. This could revolutionize infrastructure planning and resource allocation."
            <cite style={{
              display: 'block',
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#888',
              fontStyle: 'normal'
            }}>
              — Queensland Department of State Development
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Applications & Implications */}
      <section style={{ 
        padding: '4rem 0'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Applications & Future Work
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: '#111',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '1rem', fontSize: '1.25rem' }}>
              Infrastructure Planning
            </h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Predict where roads, utilities, and services will be needed before development occurs. 
              Enable proactive infrastructure investment and avoid costly retrofitting.
            </p>
          </div>
          
          <div style={{
            background: '#111',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#ff9500', marginBottom: '1rem', fontSize: '1.25rem' }}>
              Environmental Protection
            </h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Identify ecologically sensitive areas at risk of development pressure. 
              Support conservation planning and sustainable development policies.
            </p>
          </div>
          
          <div style={{
            background: '#111',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#ff4500', marginBottom: '1rem', fontSize: '1.25rem' }}>
              Investment Strategy
            </h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Guide property investment and development decisions with data-driven 
              predictions of future growth patterns and market opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1.5rem'
        }}>
          Access the Prophet Dataset
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Our development prediction models and datasets are available for academic research 
          and government planning applications.
        </p>
        <a 
          href="mailto:research@drksci.com?subject=Prophet Dataset Access"
          style={{
            fontSize: '1.125rem',
            color: 'white',
            textDecoration: 'none',
            padding: '1rem 2rem',
            border: '2px solid #ff6b35',
            background: 'transparent',
            display: 'inline-block',
            transition: 'all 0.3s',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff6b35';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Request Research Access
        </a>
      </section>

    </DetailLayout>
  );
}