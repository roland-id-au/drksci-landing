import React from 'react';
import DetailLayout from './components/DetailLayout';

export default function PrinchesterDetail() {
  const industries = [
    { name: 'Architecture & Design', software: 'Revit, ArchiCAD', value: '$5.25M', vacancies: '350/year' },
    { name: 'Construction & Engineering', software: 'FrameCAD, Vertex BD', value: '$1.95M', vacancies: '118/year' },
    { name: 'Manufacturing', software: 'SolidWorks, Mastercam', value: '$2.08M', vacancies: '150/year' },
    { name: 'Finance & Risk', software: 'MG-ALFA, SAS Risk', value: '$2.4M', vacancies: '20/month' },
    { name: 'Legal Technology', software: 'Relativity, iManage', value: '$1.77M', vacancies: '20/month' },
    { name: 'Mining & Geology', software: 'Surpac, Datamine', value: '$1.09M', vacancies: '56/year' }
  ];
  
  const salaryData = [
    { role: 'Mining Specialist (Surpac/Datamine)', salary: 125000, color: '#FFD700' },
    { role: 'Risk Management (MG-ALFA/SAS)', salary: 125000, color: '#FF6B6B' },
    { role: 'Construction Tech (FrameCAD)', salary: 105000, color: '#4ECDC4' },
    { role: 'Legal Tech (Relativity)', salary: 100000, color: '#95E1D3' },
    { role: 'Architecture (Revit/ArchiCAD)', salary: 95000, color: '#6C5CE7' },
    { role: 'Manufacturing (Mastercam)', salary: 90000, color: '#A8E6CF' }
  ];

  const features = [
    {
      title: 'Privacy-First Architecture',
      description: 'Professionals maintain complete anonymity until they choose to engage',
      icon: '🔐'
    },
    {
      title: 'LinkedIn Intelligence',
      description: 'Leverages public professional data while respecting privacy boundaries',
      icon: '🔍'
    },
    {
      title: 'AI-Driven Matching',
      description: 'Sophisticated algorithms identify perfect skill-role alignments',
      icon: '🤖'
    },
    {
      title: 'Niche Expertise Focus',
      description: 'Specializes in hard-to-find software skills that drive industries',
      icon: '🎯'
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
          color: '#6400FF',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Labor Market Intelligence
        </span>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: '700',
          marginTop: '1rem',
          marginBottom: '2rem',
          lineHeight: '1.1'
        }}>
          Princhester Associates
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          color: '#ccc',
          lineHeight: '1.5',
          marginBottom: '2rem',
          fontWeight: '300'
        }}>
          Where Invisible Expertise Meets Inevitable Opportunity
        </p>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Every year, $15.2M worth of specialized software talent remains invisible to recruiters.
          We're building the infrastructure to surface this hidden expertise without compromising privacy.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6400FF' }}>$15.2M</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Annual Market</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#FF00FF' }}>847</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Hidden Professionals</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#00FFFF' }}>Zero</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Privacy Violations</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#00FF00' }}>3 Days</div>
            <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>Average Match Time</div>
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
          The Hidden Talent Crisis
        </h2>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Traditional recruitment operates on a flawed assumption: that the best talent is actively looking.
          In reality, 73% of specialized software professionals aren't on job boards. They're invisible.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(100,0,255,0.05)',
            border: '1px solid rgba(100,0,255,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#6400FF' }}>
              Invisible Expertise
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              Professionals with critical niche software skills remain hidden from recruiters, 
              lost in generic job boards and broad search terms.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255,0,255,0.05)',
            border: '1px solid rgba(255,0,255,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#FF00FF' }}>
              Privacy Concerns
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              Talented professionals avoid public job searching to protect their current positions, 
              creating a hidden market of passive candidates.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(0,255,255,0.05)',
            border: '1px solid rgba(0,255,255,0.2)',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#00FFFF' }}>
              Skill Mismatch
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#bbb', lineHeight: '1.6' }}>
              Traditional recruitment fails to identify specialized software proficiency, 
              leading to costly mis-hires and extended vacancy periods.
            </p>
          </div>
        </div>
      </section>

      {/* Market Data Visualization */}
      <section style={{ 
        padding: '4rem 0'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          The $15.2M Hidden Market
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#999',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Annual recruitment opportunities by specialized software expertise
        </p>
        
        {/* Software Market Breakdown */}
        <div style={{
          marginBottom: '4rem',
          padding: '2rem',
          background: 'rgba(100,0,255,0.02)',
          border: '1px solid rgba(100,0,255,0.1)',
          borderRadius: '12px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '2rem',
            color: '#6400FF'
          }}>
            Top Software Markets by Value
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { name: 'Revit', value: 3000000, width: 100 },
              { name: 'ArchiCAD', value: 2250000, width: 75 },
              { name: 'FrameCAD', value: 1782000, width: 59 },
              { name: 'SolidWorks', value: 1375000, width: 46 },
              { name: 'MG-ALFA/SAS Risk', value: 2400000, width: 80 },
              { name: 'Relativity', value: 930000, width: 31 }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ color: '#ccc' }}>{item.name}</span>
                  <span style={{ color: '#6400FF', fontWeight: '600' }}>
                    ${(item.value / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div style={{
                  height: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${item.width}%`,
                    background: `linear-gradient(90deg, #6400FF 0%, #FF00FF ${item.width}%)`,
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Salary Ranges Chart */}
        <div style={{
          padding: '2rem',
          background: 'rgba(255,0,255,0.02)',
          border: '1px solid rgba(255,0,255,0.1)',
          borderRadius: '12px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '2rem',
            color: '#FF00FF'
          }}>
            Average Salaries by Specialization
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {salaryData.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  flex: 1, 
                  fontSize: '0.8rem', 
                  color: '#bbb',
                  minWidth: '200px'
                }}>
                  {item.role}
                </div>
                <div style={{ 
                  flex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    height: '20px',
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(item.salary / 125000) * 100}%`,
                      background: item.color,
                      opacity: 0.8,
                      transition: 'width 1s ease'
                    }} />
                  </div>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: item.color,
                    minWidth: '70px',
                    textAlign: 'right'
                  }}>
                    ${(item.salary / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus */}
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
          Target Industries & Opportunities
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {industries.map((industry, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              alignItems: 'center',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(100,0,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(100,0,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {industry.name}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#888'
                }}>
                  {industry.software}
                </p>
              </div>
              <div style={{
                textAlign: 'right',
                marginRight: '2rem'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#6400FF'
                }}>
                  {industry.value}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#00FFFF',
                  marginTop: '0.25rem'
                }}>
                  {industry.vacancies}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Architecture */}
      <section style={{ 
        padding: '4rem 0'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          The Princhester Method
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '3rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '2rem',
              alignItems: 'start'
            }}>
              <div style={{
                fontSize: '3rem',
                textAlign: 'center',
                opacity: 0.8
              }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'white'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#999',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
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
          Field Test: Queensland Mining Sector
        </h2>
        
        <div style={{
          padding: '3rem',
          background: 'linear-gradient(135deg, rgba(100,0,255,0.05) 0%, rgba(0,255,255,0.05) 100%)',
          border: '1px solid rgba(100,0,255,0.2)',
          borderRadius: '12px',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#6400FF' }}>47</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Surpac specialists identified
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#FF00FF' }}>12</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Previously invisible to recruiters
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#00FFFF' }}>3</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Successful placements
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#00FF00' }}>$1.2M</div>
              <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '0.5rem' }}>
                Placement value
              </div>
            </div>
          </div>
          
          <blockquote style={{
            fontSize: '1.125rem',
            fontStyle: 'italic',
            color: '#ccc',
            borderLeft: '3px solid #6400FF',
            paddingLeft: '1.5rem',
            marginTop: '2rem'
          }}>
            "We'd been searching for a senior Surpac specialist for 8 months. Princhester found us three 
            qualified candidates in 72 hours - none of whom were actively job seeking. The successful hire 
            had 15 years experience we never would have found through traditional channels."
            <cite style={{
              display: 'block',
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#888',
              fontStyle: 'normal'
            }}>
              — Mining Operations Director, Queensland
            </cite>
          </blockquote>
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
          Ready to Access Hidden Talent?
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#999',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Partner with Princhester Associates to unlock the invisible talent pool 
          of specialized software professionals.
        </p>
        <a 
          href="mailto:talent@drksci.com"
          style={{
            fontSize: '1.125rem',
            color: 'white',
            textDecoration: 'none',
            padding: '1rem 2rem',
            border: '2px solid #6400FF',
            background: 'transparent',
            display: 'inline-block',
            transition: 'all 0.3s',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#6400FF';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Begin Talent Discovery
        </a>
      </section>

    </DetailLayout>
  );
}