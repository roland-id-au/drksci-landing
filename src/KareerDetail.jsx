import React from 'react';
import DetailLayout from './components/DetailLayout';

export default function KareerDetail() {
  return (
    <DetailLayout maxWidth="900px" backText="Back to Portfolio">
      
      {/* Key Challenge */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,152,0,0.05) 0%, rgba(233,30,99,0.05) 100%)',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#ff9800',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem'
          }}>
            The $500B Problem
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1rem',
            lineHeight: '1.3'
          }}>
            Your Entire Career Journey in One Place
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#bbb',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Stop juggling LinkedIn, Indeed, Google Docs, and spreadsheets. When career management becomes this fragmented, 
            opportunities slip through the cracks.
          </p>
        </div>
      </section>

      {/* Project Header */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#ff9800',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Career Intelligence Platform
          </span>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#e91e63',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              In Development
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#888',
              fontWeight: '300'
            }}>
              2024
            </div>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '1rem',
          lineHeight: '1.2',
          color: 'white'
        }}>
          Kareer
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#bbb',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          A unified career management platform that transforms how professionals track opportunities, 
          manage applications, and advance their careers through data-driven insights.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {['React', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Tailwind CSS', 'TypeScript'].map((tech, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              color: '#ff9800',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(255, 152, 0, 0.3)'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* What Makes Kareer Different */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
          What Makes Kareer Different
        </h2>
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '1rem' }}>
                🎯 Unified Dashboard
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                Connect all your job platforms in one place. Track applications from LinkedIn, Indeed, 
                AngelList, and company websites without switching tabs.
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '1rem' }}>
                🤖 AI-Powered Insights
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                Smart application tracking with automated status updates, salary benchmarking, 
                and personalized interview preparation based on company research.
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '1rem' }}>
                📊 Career Analytics
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                Visualize your career progression with data-driven insights. Identify skill gaps, 
                track market trends, and optimize your job search strategy.
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '1rem' }}>
                🔒 Privacy First
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                Your career data stays yours. No selling to recruiters, no public profiles. 
                Complete control over who sees what information.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Kareer Works */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
          How Kareer Works
        </h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #333'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>1</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '0.5rem' }}>
                  Connect Your Accounts
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                  Link your LinkedIn, Indeed, and other job platforms. Kareer syncs your applications 
                  and tracks status changes automatically.
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>2</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '0.5rem' }}>
                  AI-Enhanced Tracking
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                  Our AI analyzes job postings, company data, and market trends to provide insights 
                  on application timing, salary expectations, and interview preparation.
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>3</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff9800', marginBottom: '0.5rem' }}>
                  Career Intelligence
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                  Get personalized recommendations for skill development, networking opportunities, 
                  and career moves based on your goals and market data.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          Core Features
        </h2>
        <div style={{ 
          fontSize: '1rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          <strong style={{ color: '#ff9800' }}>Application Pipeline Management:</strong> Visual kanban boards 
          to track applications from initial application through offer negotiation. Never lose track of where 
          you stand with each opportunity.
          <br/><br/>
          
          <strong style={{ color: '#ff9800' }}>Smart Interview Prep:</strong> AI-generated practice questions 
          based on the specific company and role. Research briefs with company culture, recent news, and 
          interviewer backgrounds pulled from public sources.
          <br/><br/>
          
          <strong style={{ color: '#ff9800' }}>Salary Intelligence:</strong> Real-time market data for your 
          specific skills and location. Negotiation guidance with data-backed recommendations for salary, 
          equity, and benefits discussions.
          <br/><br/>
          
          <strong style={{ color: '#ff9800' }}>Network Effects:</strong> Anonymous insights from other 
          professionals who've interviewed at the same companies. Learn about interview processes, company 
          culture, and growth opportunities without compromising privacy.
        </div>
      </section>

      {/* Technical Innovation */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          Technical Innovation
        </h2>
        <div style={{ 
          fontSize: '1rem', 
          color: '#ccc', 
          lineHeight: '1.8'
        }}>
          Kareer leverages modern web technologies to deliver a seamless career management experience. 
          The React frontend provides real-time updates and intuitive data visualization, while the Node.js 
          backend handles secure integrations with major job platforms through their APIs.
          <br/><br/>
          
          The AI engine processes job descriptions, company data, and market trends using OpenAI's GPT models 
          to provide personalized insights and recommendations. PostgreSQL ensures reliable data storage with 
          full encryption for sensitive career information.
          <br/><br/>
          
          Built with privacy by design, Kareer implements zero-knowledge architecture where user data 
          remains encrypted and inaccessible to platform operators. Only you control who sees your 
          career information and application history.
        </div>
      </section>

      {/* Market Opportunity */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
          The Career Management Crisis
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #333'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#ff9800' }}>73%</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Use Spreadsheets</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e91e63' }}>89%</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Lose Track of Applications</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3f51b5' }}>$500B</div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>Annual Missed Opportunities</div>
            </div>
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#666',
            textAlign: 'center',
            fontFamily: 'monospace'
          }}>
            Source: Career Management Survey 2024 • Job Search Platform Analytics
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
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
          Ready to take control of your career?
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#bbb',
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.6'
        }}>
          Join the waitlist for early access to Kareer. Be among the first to experience 
          the future of career management.
        </p>
        <a 
          href="mailto:early-access@drksci.com?subject=Kareer Early Access"
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
          Get Early Access
        </a>
      </section>

    </DetailLayout>
  );
}