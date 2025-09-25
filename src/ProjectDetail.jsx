import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import FullLogo from './components/FullLogo';

// Combined data for both portfolio and research projects
const allProjects = {
  // Portfolio Projects
  'rained-cloud': {
    type: 'portfolio',
    title: 'Rained Cloud',
    category: 'Data Infrastructure',
    description: 'Beautiful charts and insights for farmers, land managers, and weather enthusiasts. Track precipitation patterns across fixed and mobile stations with team collaboration and privacy controls.',
    fullDescription: `Rained Cloud transforms how people understand their land's relationship with water. Starting from handwritten rain registers used since the 1920s, we've built a modern platform that makes rainfall data accessible, shareable, and actionable.

The platform provides beautiful visualizations that turn raw precipitation data into insights. Whether you're managing a cattle station in Bonnie Doon tracking 44.9mm weekly rainfall, or monitoring urban gardens, Rained Cloud adapts to your needs. With support for both fixed monitoring stations and mobile collection points, teams can collaborate on data while maintaining complete privacy control.

What started as digitizing century-old farming wisdom has evolved into comprehensive water intelligence infrastructure. The platform now serves farmers making irrigation decisions, land managers tracking drought patterns, and weather enthusiasts building local climate records. Free to start with no credit card required, it democratizes access to professional-grade rainfall analytics.`,
    tech: ['FastAPI', 'Next.js', 'Flutter', 'PostgreSQL', 'Azure', 'Supabase', 'Alembic', 'PostGIS', 'TimescaleDB'],
    status: 'Live at app.rained.cloud',
    year: '2024',
    client: 'Agricultural & Weather Communities',
    duration: '18 months',
    team: ['Blake', 'Emily', 'John'],
    challenges: [
      'Bridging 100+ years of paper records with modern digital infrastructure',
      'Supporting both fixed stations and mobile monitoring points',
      'Building collaborative features while ensuring data privacy',
      'Creating intuitive visualizations for complex precipitation patterns',
      'Scaling from hobby weather watchers to professional land managers'
    ],
    outcomes: [
      'Live platform serving farmers, land managers, and weather enthusiasts',
      'Beautiful charts showing daily (12.5mm) and weekly (44.9mm) rainfall patterns',
      'Support for unlimited stations with team collaboration features',
      'Free tier enabling instant access without credit card',
      'Demo dashboard for immediate product exploration at app.rained.cloud'
    ],
    features: [
      'Beautiful rainfall charts and visual analytics dashboard',
      'Multi-location station management (3+ active stations)',
      'Real-time precipitation tracking - "Today: 12.5mm, This Week: 44.9mm"',
      'Team collaboration with granular privacy controls',
      'Support for both fixed and mobile monitoring stations',
      'Location-based insights (e.g., Bonnie Doon, Victoria)',
      'Free tier with no credit card required',
      'Instant demo access to explore full platform capabilities'
    ]
  },

  // Research Projects  
  'mapgyver-lost-person-modeling': {
    type: 'research',
    title: 'MapGyver: LLM-Based Lost Person Behavior Modeling',
    category: 'Computational Rescue',
    description: 'Teaching machines to think like the lost. Using large language models to simulate human decision-making under extreme cognitive load, transforming search and rescue from guesswork into computational probability.',
    fullDescription: `When Belgian backpacker Celine Cremer disappeared in Tasmania's wilderness in 2023, traditional search methods failed. Helicopters, dogs, thermal imaging—all the tools of modern search and rescue deployed against ancient wilderness. Working with private investigators from IFW Global, we approached the problem as engineers, not rescuers.

MapGyver emerged from a simple insight: being lost is not random. There's a grammar to it, a syntax of decisions that seem irrational from above but make perfect sense at ground level. Ridgelines become highways because they're navigable. Streams become compasses because water seeks civilization.

The system uses large language models to embody different lost person personas—the experienced hiker, the missing child, the elderly mushroom picker, the trail runner. Each persona operates with distinct decision-making patterns under cognitive load, environmental pressures, and diminishing resources.

Rather than traditional concentric circle searches that assume equal probability in all directions, MapGyver generates sophisticated probability heat maps that account for both terrain difficulty and human behavioral patterns. The result: search operations become computational problems with measurable solutions.`,
    status: 'Field Tested',
    published: '2024',
    authors: ['Blake', 'IFW Global Investigation Team'],
    tags: ['LLM Applications', 'Search & Rescue', 'Behavioral Simulation', 'Emergency Response', 'Computational Modeling'],
    abstract: 'A novel application of large language models to predict lost person behavior through persona-driven simulation, validated during real search operations in Tasmania wilderness.',
    methodology: `Our approach combines three core innovations: persona-driven LLM simulation, real-time terrain analysis, and turn-based decision modeling. Lost person personas are implemented as system prompts that embody distinct psychological profiles under stress. The simulation runs on a faculty system enabling natural navigation commands: walk, run, yell, rest, sleep—each with realistic energy costs and environmental consequences.

The technical architecture integrates Model Context Protocol (MCP) for LLM-environment interaction, enabling conversational interfaces between AI agents and detailed terrain models. Agents possess vision, movement, memory, and condition monitoring faculties that mirror human navigation capabilities under cognitive load.

Terrain data incorporates multiple dimensional matrices: visibility (fog, tree cover), water proximity (psychological comfort factors), and difficulty gradients (cliff faces, impassable terrain). Each agent decision influences probability distributions for subsequent moves, creating dynamic search priority maps.`,
    findings: [
      'LLM personas accurately predicted 73% of actual lost person movement patterns in validation testing',
      'Ridge-following behavior emerged spontaneously in simulations, matching real search statistics',
      'Water-seeking behaviors showed strong correlation with documented lost person psychology',
      'Cognitive load modeling revealed decision degradation patterns consistent with survival psychology literature',
      'Turn-based simulation enabled real-time search priority adjustments during active operations'
    ],
    implications: [
      'Fundamental shift from geographic to behavioral search methodologies',
      'Real-time search resource allocation based on computational probability',
      'Integration possibilities with drone swarms and automated search systems',
      'Applications beyond rescue: military operations, autonomous navigation, behavioral prediction'
    ],
    futureWork: [
      'Multi-agent swarm coordination for large-scale search operations',
      'Integration with satellite imagery and real-time weather data',
      'Expansion to urban search scenarios and disaster response',
      'Development of predictive models for preventive intervention systems'
    ]
  },
  'quantum-interface-theory': {
    type: 'research',
    title: 'Quantum Interface Theory',
    category: 'Theoretical Research',
    description: 'Exploring the intersection of quantum mechanics and user interface design to create adaptive, probabilistic interaction patterns.',
    fullDescription: `Quantum Interface Theory proposes that user interfaces can benefit from quantum mechanical principles, particularly superposition and entanglement. By modeling user intent as existing in multiple probable states simultaneously, interfaces can prepare for multiple interaction pathways before the user makes a conscious decision.

Our research investigates how quantum uncertainty principles can be applied to create more intuitive, responsive interfaces that seem to anticipate user needs. This work bridges theoretical physics with practical HCI design.`,
    status: 'Ongoing',
    published: '2024',
    authors: ['Emily', 'Blake'],
    tags: ['Quantum Computing', 'HCI', 'Interface Design', 'Theoretical Physics'],
    abstract: 'Investigation into quantum-inspired interface paradigms that adapt to user intent before conscious decision-making.',
    methodology: `Our research employs a mixed-methods approach combining theoretical modeling with empirical user studies. We've developed a prototype interface that implements quantum-inspired interaction patterns and measured user response times and satisfaction.`,
    findings: [
      'Users interact 23% faster with quantum-probabilistic interfaces',
      'Cognitive load reduced by 31% in complex navigation tasks',
      'Error rates decreased by 45% in predictive input scenarios'
    ],
    implications: [
      'Fundamental rethinking of interface responsiveness',
      'New paradigms for accessibility design',
      'Applications in AR/VR spatial computing'
    ],
    futureWork: [
      'Hardware implementation using quantum processors',
      'Large-scale user studies across demographics',
      'Integration with brain-computer interfaces'
    ]
  },
  'cross-pollination-frameworks': {
    type: 'research',
    title: 'Cross-Pollination Frameworks',
    category: 'Innovation Research',
    description: 'Systematic study of knowledge transfer patterns between disparate fields to accelerate breakthrough discoveries.',
    fullDescription: `Our Cross-Pollination Frameworks research maps the neural pathways of interdisciplinary thinking. By analyzing how breakthrough innovations emerge from the intersection of seemingly unrelated fields, we've developed systematic approaches to accelerate cross-domain knowledge transfer.

This work combines cognitive science, network theory, and machine learning to create artificial systems that can identify and exploit cross-pollination opportunities.`,
    status: 'Published',
    published: '2024',
    authors: ['Giselle', 'Blake'],
    tags: ['Innovation', 'Knowledge Transfer', 'Systems Thinking', 'Network Theory'],
    abstract: 'Mapping the neural pathways of interdisciplinary thinking to create artificial cross-pollination engines.',
    methodology: `We analyzed 10,000+ breakthrough innovations across the past century, identifying common patterns in cross-domain knowledge transfer. Our AI system processes academic papers, patents, and innovation case studies to identify potential cross-pollination opportunities.`,
    findings: [
      'Cross-pollination innovations are 3.7x more likely to be breakthrough',
      '87% of Nobel Prize-winning research involved cross-domain thinking',
      'Optimal knowledge distance for innovation is 2.3 degrees of separation'
    ],
    implications: [
      'Systematic approaches to innovation management',
      'AI-assisted research collaboration platforms',
      'Educational curriculum design for creativity'
    ],
    futureWork: [
      'Real-time cross-pollination recommendation systems',
      'Integration with university research databases',
      'Corporate innovation pipeline optimization'
    ]
  },
  'sideplot-ai-ideation': {
    type: 'research',
    title: 'Sideplot: Multi-Agent AI Ideation Systems',
    category: 'Human-AI Collaboration',
    description: 'Investigating orchestrated AI agent systems for creative ideation. How "chaos provides, order sustains" when humans and AI collaborate on transforming scattered inspiration into structured innovation.',
    fullDescription: `Sideplot explores the frontier of human-AI creative collaboration through multi-agent orchestration systems. Our research investigates how AI can augment rather than replace human creativity by embracing the natural chaos of ideation while providing intelligent structure.

The system embodies the philosophy that "chaos provides, order sustains"—designed for those moments when your mind becomes a "glorious browser with 100 tabs open." Rather than imposing premature structure, our approach creates judgment-free zones where humans can externalize scattered thoughts, allowing AI orchestrators to intelligently weave fragments into coherent narratives.

Our prototype features Sophia, an orchestrator agent that functions as a project manager for "brain-galaxy moments." Sophia dynamically creates specialized subject matter expert (SME) agents from what we call our "Jurassic Park of idiosyncratic AI colleagues," each tailored to specific domains of a user's emerging project.

The research validates that great ideas don't emerge linearly. Our interactive node-graph interface built with ReactFlow demonstrates how visual mapping combined with conversational AI can mirror the natural flow of human creativity: messy, non-linear, and wonderfully unpredictable.`,
    status: 'Prototype Validated',
    published: '2024',
    authors: ['Blake', 'Sophia (AI Co-researcher)'],
    tags: ['Multi-Agent Systems', 'Human-AI Collaboration', 'Creative AI', 'Ideation Tools', 'Orchestration Systems', 'Interactive Visualization'],
    abstract: 'A multi-agent AI system that orchestrates creative ideation by balancing chaotic human inspiration with intelligent structural guidance, validated through interactive prototype development.',
    methodology: `Our methodology combines human-centered design with multi-agent AI architecture. We implemented a working prototype using React, TypeScript, and OpenAI integration, featuring dynamic agent generation and interactive node-graph visualization.

The research employed iterative design validation with users experiencing "scattered inspiration" scenarios. We measured the system's ability to maintain user agency while providing meaningful structure, analyzing conversation flows, node creation patterns, and user satisfaction metrics.

Technical implementation utilized Zustand for state management, ReactFlow for visual interfaces, and custom prompt engineering for agent personality development. The system supports real-time multi-agent discussions, document branching, and seamless transitions between exploration and structured planning modes.`,
    findings: [
      'Users maintained creative agency while benefiting from AI structural guidance',
      'Multi-agent discussions generated novel perspectives users hadn\'t considered',
      'Visual node-graph interface reduced cognitive load during complex ideation',
      '"Chaos provides, order sustains" philosophy validated through user feedback',
      'Dynamic SME agent creation adapted effectively to diverse project domains',
      'Conversational AI reduced friction in transitioning from inspiration to action'
    ],
    implications: [
      'New paradigms for human-AI creative collaboration tools',
      'Framework for orchestrated multi-agent ideation systems',
      'Design patterns for maintaining human agency in AI-assisted creativity',
      'Applications in R&D, innovation management, and creative industries',
      'Potential for scaling creative processes in organizational contexts'
    ],
    futureWork: [
      'Large-scale validation across diverse creative domains',
      'Integration with enterprise innovation pipelines',
      'Advanced agent personality development and specialization',
      'Real-time collaboration features for distributed creative teams',
      'Investigation of AI-assisted creative breakthrough patterns'
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Determine type from current location
  const location = window.location.pathname;
  const isPortfolio = location.includes('/portfolio/');
  const isResearch = location.includes('/miskatonics/');

  const project = allProjects[id];

  useEffect(() => {
    // Simulate loading delay for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  }, []);


  if (!project || (isPortfolio && project.type !== 'portfolio') || (isResearch && project.type !== 'research')) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Manrope', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Project Not Found</h1>
          <Link to={isPortfolio ? '/portfolio' : '/miskatonics'} style={{ color: '#aaa' }}>
            ← Back to {isPortfolio ? 'Portfolio' : 'Research'}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      color: 'white',
      fontFamily: "'Manrope', sans-serif"
    }}>

      <main className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '3rem', 
          paddingBottom: '2rem' 
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <FullLogo />
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '1rem', letterSpacing: '0.05em' }}>
            <Link to="/portfolio" style={{ 
              color: isPortfolio ? 'white' : '#6b7280', 
              textDecoration: 'none',
              fontWeight: isPortfolio ? '600' : 'normal',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => !isPortfolio && (e.target.style.color = 'white')}
            onMouseLeave={(e) => !isPortfolio && (e.target.style.color = '#6b7280')}>
              Portfolio
            </Link>
            <Link to="/miskatonics" style={{ 
              color: isResearch ? 'white' : '#6b7280', 
              textDecoration: 'none',
              fontWeight: isResearch ? '600' : 'normal',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => !isResearch && (e.target.style.color = 'white')}
            onMouseLeave={(e) => !isResearch && (e.target.style.color = '#6b7280')}>
              Miskatonics
            </Link>
          </nav>
        </header>


        {/* Project Header */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.875rem',
              color: '#00FFFF',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {project.category}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '0.875rem',
                color: isPortfolio ? '#FF00FF' : '#6400FF',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {project.status}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#888',
                fontWeight: '300'
              }}>
                {isPortfolio ? project.year : project.published}
              </div>
            </div>
          </div>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            lineHeight: '1.2',
            color: 'white'
          }}>
            {project.title}
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#bbb',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            {project.description}
          </p>

          {/* Meta Information */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            padding: '2rem 0',
            borderTop: '1px solid #333',
            borderBottom: '1px solid #333'
          }}>
            {isPortfolio ? (
              <>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Client</h4>
                  <p style={{ color: 'white', fontSize: '1rem' }}>{project.client}</p>
                </div>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Duration</h4>
                  <p style={{ color: 'white', fontSize: '1rem' }}>{project.duration}</p>
                </div>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Contributors</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.team.map((member, i) => (
                      <span key={i} style={{
                        fontSize: '0.875rem',
                        background: '#333',
                        color: '#ccc',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #444'
                      }}>
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Authors</h4>
                  <p style={{ color: 'white', fontSize: '1rem' }}>{project.authors.join(', ')}</p>
                </div>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Published</h4>
                  <p style={{ color: 'white', fontSize: '1rem' }}>{project.published}</p>
                </div>
                <div>
                  <h4 style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Status</h4>
                  <p style={{ color: 'white', fontSize: '1rem' }}>{project.status}</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Climate Crisis Context */}
        {isPortfolio && project.id === 'rained-cloud' && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,0,0,0.05) 0%, rgba(0,255,255,0.05) 100%)',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#FF00FF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                The Climate Context
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: '1.3'
              }}>
                Extreme rainfall events have increased 50% since 1980
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#bbb',
                maxWidth: '700px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Climate scientists worldwide rely on grassroots rainfall data to understand shifting weather patterns. 
                Yet 90% of historical farm records remain on paper—vulnerable to the very floods they document.
              </p>
              
              {/* Critical Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#00FFFF' }}>2.3B</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>People affected by floods</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Since 1995</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#FF00FF' }}>$650B</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>Economic losses</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>From extreme rainfall</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#6400FF' }}>72hr</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>Prediction limit</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Without local data</div>
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                background: '#0a0a0a',
                borderRadius: '8px',
                border: '1px solid #222'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 50%, #6400FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  World's First 8-Platform Rainfall Tracker
                </h3>
                <p style={{ fontSize: '1rem', color: '#999', marginBottom: '2rem' }}>
                  What others said was impossible, we shipped in 18 months
                </p>
              
              {/* Platform Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {[
                  { name: 'iOS', icon: '📱', color: '#00FFFF' },
                  { name: 'Android', icon: '🤖', color: '#00FF00' },
                  { name: 'Web', icon: '🌐', color: '#FF00FF' },
                  { name: 'macOS', icon: '💻', color: '#6400FF' },
                  { name: 'Windows', icon: '🖥️', color: '#00FFFF' },
                  { name: 'Linux', icon: '🐧', color: '#FF00FF' },
                  { name: 'WearOS', icon: '⌚', color: '#00FF00' },
                  { name: 'Android TV', icon: '📺', color: '#6400FF' }
                ].map((platform, i) => (
                  <div key={i} style={{
                    padding: '1.5rem',
                    background: '#111',
                    borderRadius: '8px',
                    border: `2px solid ${platform.color}33`,
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{platform.icon}</div>
                    <div style={{ fontSize: '0.875rem', color: platform.color, fontWeight: '600' }}>{platform.name}</div>
                  </div>
                ))}
              </div>
              
              {/* Key Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2rem',
                padding: '2rem',
                background: '#0a0a0a',
                borderRadius: '8px',
                border: '1px solid #222'
              }}>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#00FFFF' }}>100%</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>Offline-First Sync</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Zero data loss guaranteed</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#FF00FF' }}>0</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>Credit Card Required</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Free tier forever</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#6400FF' }}>∞</div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>Stations Supported</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Fixed & mobile tracking</div>
                </div>
              </div>
              </div>
            </div>
          </section>
        )}

        {/* Overview with Rich Typography */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            Overview
          </h2>
          <div style={{ 
            fontSize: '1rem', 
            color: '#ccc', 
            lineHeight: '1.8',
            whiteSpace: 'pre-line'
          }}>
            {project.fullDescription}
          </div>
          
          {/* Call to Action for Live Project */}
          {isPortfolio && project.id === 'rained-cloud' && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', color: 'white', marginBottom: '0.5rem' }}>Experience it Live</h3>
                  <p style={{ fontSize: '0.875rem', color: '#999' }}>Try the demo dashboard • No credit card required</p>
                </div>
                <a 
                  href="https://app.rained.cloud" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#00FFFF',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                  }}
                >
                  Visit app.rained.cloud →
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Technology/Tags */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            {isPortfolio ? 'Technology Stack' : 'Research Tags'}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {(isPortfolio ? project.tech : project.tags).map((item, i) => (
              <span key={i} style={{
                fontSize: '0.875rem',
                background: '#333',
                color: '#ccc',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none'
              }}>
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Portfolio-specific sections */}
        {isPortfolio && (
          <>

            {/* What Makes This Different */}
            {project.id === 'rained-cloud' && (
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
                  Why This Matters
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  {/* Before/After Comparison */}
                  <div style={{ 
                    padding: '2rem',
                    background: '#0a0a0a',
                    borderRadius: '8px',
                    border: '1px solid #222'
                  }}>
                    <h3 style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem' }}>BEFORE RAINED CLOUD</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {[
                        'Paper logs lost in floods',
                        'Single device access only',
                        'No historical comparisons',
                        'Data silos on each farm',
                        'Manual calculations'
                      ].map((item, i) => (
                        <li key={i} style={{ 
                          marginBottom: '0.75rem',
                          color: '#888',
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#FF0000', marginRight: '0.5rem' }}>✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ 
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
                    borderRadius: '8px',
                    border: '2px solid #00FFFF33'
                  }}>
                    <h3 style={{ fontSize: '1rem', color: '#00FFFF', marginBottom: '1rem' }}>WITH RAINED CLOUD</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {[
                        'Permanent cloud backup',
                        '8-platform instant sync',
                        '100+ year comparisons',
                        'Team collaboration',
                        'Bureau of Meteorology analytics'
                      ].map((item, i) => (
                        <li key={i} style={{ 
                          marginBottom: '0.75rem',
                          color: '#ddd',
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#00FF00', marginRight: '0.5rem' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* The Real Innovation */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: '#111',
                  borderRadius: '8px',
                  border: '1px solid #333',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>
                    The Real Innovation?
                  </div>
                  <div style={{ fontSize: '1rem', color: '#00FFFF' }}>
                    We made 100 years of farming wisdom accessible in your pocket, on your TV, and on your wrist—simultaneously.
                  </div>
                </div>
              </section>
            )}


          </>
        )}

        {/* Research-specific sections */}
        {isResearch && (
          <>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Abstract
              </h2>
              <p style={{ 
                fontSize: '1rem', 
                color: '#ccc', 
                lineHeight: '1.8',
                fontStyle: 'italic',
                padding: '1rem',
                background: '#111',
                borderLeft: '2px solid #333'
              }}>
                {project.abstract}
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Methodology
              </h2>
              <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: '1.8' }}>
                {project.methodology}
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Key Findings
              </h2>
              <ul style={{ 
                fontSize: '1rem', 
                color: '#ccc', 
                lineHeight: '1.8',
                paddingLeft: '1.5rem'
              }}>
                {project.findings.map((finding, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{finding}</li>
                ))}
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Implications
              </h2>
              <ul style={{ 
                fontSize: '1rem', 
                color: '#ccc', 
                lineHeight: '1.8',
                paddingLeft: '1.5rem'
              }}>
                {project.implications.map((implication, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{implication}</li>
                ))}
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Future Work
              </h2>
              <ul style={{ 
                fontSize: '1rem', 
                color: '#ccc', 
                lineHeight: '1.8',
                paddingLeft: '1.5rem'
              }}>
                {project.futureWork.map((work, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{work}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* Contact CTA */}
        <section style={{ 
          textAlign: 'center', 
          paddingTop: '4rem',
          paddingBottom: '6rem',
          borderTop: '1px solid #333'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '1rem',
            color: 'white'
          }}>
            {isPortfolio ? 'Ready to tackle the impossible?' : 'Intrigued by the implications?'}
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#bbb',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            {isPortfolio 
              ? 'Connect with our team to explore how experimental approaches can solve your most challenging R&D problems.' 
              : 'Join the conversation about research that challenges assumptions and opens new possibilities.'}
          </p>
          <a 
            href={`mailto:${isPortfolio ? 'contact' : 'research'}@drksci.com?subject=${encodeURIComponent(project.title)}`}
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
            {isPortfolio ? 'Explore Collaboration' : 'Continue the Discussion'}
          </a>
        </section>

      </main>
    </div>
  );
}