import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { validateMagicLink } from './utils/validateMagicLink';
import { blakeProfileData } from './data/blakeProfile';
import { ExecutiveSummary, ProfessionalExperience, CoreCompetencies, Education } from './components/ProfileComponents';
import PdfVersion from './components/PdfVersion';
import mermaid from 'mermaid';
import './styles/pageflow.css';

// Candidate Presentation Page - For Hiring Managers/Recruiters
// URL Structure: /collaborator/[collaborator-name]/job/[job-id]
// Example: /collaborator/blake/job/qld-655778-25
// This page presents the candidate's application in a professional format for review
const CandidateApplication = () => {
  const { collaborator } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Extract job ID from different URL formats
  let jobId = '';
  if (location.pathname.includes('/collaborator/')) {
    jobId = location.pathname.split(`/collaborator/${collaborator}/job/`)[1] || '';
  } else if (location.pathname.includes('/c/')) {
    jobId = location.pathname.split(`/c/${collaborator}/j/`)[1] || '';
  }
  
  // Authentication state
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking', 'valid', 'expired', 'invalid'
  const [authError, setAuthError] = useState('');
  const [hoursRemaining, setHoursRemaining] = useState(0);
  
  // Application state
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('cover-letter');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [activeSubsection, setActiveSubsection] = useState('');
  
  // Subsection labels mapping
  const subsectionLabels = {
    'motivation': 'Motivation',
    'leadership': 'Leadership',
    'innovation': 'Innovation',
    'management': 'Management',
    'value': 'Value',
    'background-vision': 'Introduction',
    'strategic-pillars': 'Pillars',
    'vision-areas': 'Scope',
    'vision-context': 'Context',
    'program-evolution': 'Program Evolution',
    'canary-app': 'Canary App',
    'executive-summary': 'Summary',
    'experience': 'Experience',
    'competencies': 'Competencies',
    'education': 'Education'
  };
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isHoveringRef, setIsHoveringRef] = useState(false);
  const [copied, setCopied] = useState(false);
  const mermaidRef = useRef(null);

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#1e3a5f',
        primaryTextColor: '#fff',
        primaryBorderColor: '#4a90e2',
        lineColor: '#4a90e2',
        secondaryColor: '#2d5016',
        tertiaryColor: '#5a2c17',
        background: '#000',
        mainBkg: '#1a1a1a',
        secondBkg: '#2a2a2a',
        tertiaryBkg: '#3a3a3a',
        darkMode: true,
        fontFamily: 'Manrope, monospace',
        fontSize: '14px',
        clusterBkg: '#1a1a1a',
        clusterBorder: '#4a90e2'
      }
    });
  }, []);

  // Render mermaid diagram when component mounts or updates
  useEffect(() => {
    if (mermaidRef.current && authStatus === 'valid') {
      mermaid.contentLoaded();
    }
  }, [authStatus, activeSection]);

  // Validate authentication token
  useEffect(() => {
    // Support both long and short parameter names
    const token = searchParams.get('token') || searchParams.get('t');
    const data = searchParams.get('data') || searchParams.get('d');
    
    if (!token || !data) {
      setAuthStatus('invalid');
      setAuthError('No authentication token provided');
      setLoading(false);
      return;
    }
    
    const validation = validateMagicLink(token, data);
    
    if (!validation.valid) {
      setAuthStatus(validation.expired ? 'expired' : 'invalid');
      setAuthError(validation.error);
      setLoading(false);
      return;
    }
    
    // Token is valid
    setAuthStatus('valid');
    setHoursRemaining(validation.hoursRemaining);
    
    // Load application data
    setTimeout(() => {
      setApplicationData({
        job: {
          id: jobId,
          title: 'Director, Innovation and Planning',
          company: 'Department of Natural Resources, Mines, Manufacturing, and Regional Development',
          location: 'Queensland',
          type: 'Full-time',
          salary: '$155,753 - $168,605',
          reference: 'QLD/655778/25',
          posted: '2025-01-25',
          description: `Strategic Operations - Technical Services
          
          Lead the Innovation and Planning team within Technical Services to deliver strategic transformation of Queensland's Abandoned Mine Lands Program. This role requires direct and functional leadership in delivery of key aspects of the Technical Services business, managing complex, technically challenging, high-risk projects and programs.
          
          Key Responsibilities:
          • Lead the development of business policy, innovation and research matters
          • Manage the Abandoned Mine Lands Program including risk assessment and prioritisation
          • Drive repurposing and re-commercialisation of mined land for future appropriate use
          • Develop and maintain effective working relationships with internal and external stakeholders
          • Lead the Technical Services Asset Management transformation project
          • Manage enterprise and project risk registers
          • Represent the department at industry, community and government led forums`,
          requirements: [
            'Extensive experience in policy development and project management in the resources sector',
            'Project/Asset Management qualifications or demonstrated experience',
            'Proven ability to collaborate across government, industry, and research sectors',
            'Technical field background with operational experience',
            'Experience in GRC (Governance, Risk and Compliance) frameworks',
            'Strategic leadership and transformation experience',
            'Strong stakeholder management and communication skills'
          ]
        },
        candidate: {
          name: 'Blake Carter',
          email: 'blake@drksci.com',
          phone: 'Available on request',
          location: 'Brisbane, QLD',
          linkedIn: 'https://www.linkedin.com/in/blake-carter-5995ab5a/',
          github: null,
          portfolio: 'https://drksci.com',
          appliedDate: '2025-01-25',
          availability: 'Immediate',
          summary: 'Hands-on technical leader with CEO experience and 20+ years exploring abandoned mine systems through spelunking. Proven strategic leadership, innovation expertise, and genuine domain understanding that directly addresses the complex challenges of the Abandoned Mine Lands Program.',
          skills: [
            'Strategic Leadership', 'GRC (ISO27001/9001)', 'Innovation & R&D', 
            'Platform Architecture', 'Legacy Modernisation', 'Risk Management',
            'Stakeholder Management', 'Team Leadership', 'Abandoned Mine Systems',
            'GIS & Spatial Data', 'AI/ML Applications', 'DevOps & CI/CD'
          ],
          experience: [
            {
              title: 'Founder',
              company: <a href="https://drksci.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/drksci-favicon.svg" className="inline w-3 h-3 mr-1" alt="" />d/rksci</a>,
              period: 'Aug 2024 - Present',
              description: 'Innovation laboratory exploring AI, data science, and practical business applications. Created MapGyver (AI-powered lost person modelling), rained.cloud (100+ years weather data preservation)'
            },
            {
              title: 'Chief Executive Officer',
              company: <><a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a> (<a href="https://omegro.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/omegro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />Omegro</a>, an operating group of <a href="https://www.csisoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/constellation-favicon.ico" className="inline w-3 h-3 mr-1" alt="" />Constellation Software</a>)</>,
              period: 'Jan 2022 - Aug 2024',
              description: 'Led strategic transformation and platform modernisation. Achieved eNPS 8.5-9.5, maintained SaaS rule of 40, replatformed 450k+ LOC core product in under 12 months'
            },
            {
              title: 'Operations Manager',
              company: <><a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a> (<a href="https://omegro.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/omegro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />Omegro</a>)</>,
              period: 'Jan 2017 - Jan 2022',
              description: 'Managed development teams and ran comprehensive GRC program. Maintained ISO27001/9001 certification with zero audit findings for 5+ years'
            },
            {
              title: 'Senior Software Architect',
              company: <><a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a> (<a href="https://omegro.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/omegro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />Omegro</a>)</>,
              period: 'Apr 2016 - Jan 2017',
              description: 'Spearheaded platform modernisation, established CI/CD pipelines, managed 100:2 consolidation of divergent codebases'
            }
          ],
          education: [
            {
              degree: 'Self-directed technical learning',
              institution: 'Continuous professional development',
              year: '2006 - Present'
            },
            {
              degree: '20+ years spelunking experience',
              institution: 'Abandoned mine exploration',
              year: '2000 - Present'
            }
          ]
        },
        coverLetter: `Director, Innovation and Planning, Strategic Operations
Department of Natural Resources, Mines, Manufacturing, and Regional Development
Job Reference: QLD/655778/25

Dear Selection Panel,

I am writing to express my strong interest in the Director, Innovation and Planning position within Technical Services. As a hands-on technical leader with CEO experience and 20+ years exploring abandoned mine systems through spelunking, I bring proven strategic leadership, innovation expertise, and genuine domain understanding that directly addresses the complex challenges of making abandoned mines safe, secure, durable and, where possible, productive through the Abandoned Mine Lands Program.

## Motivation

The opportunity to apply my strategic transformation experience to Queensland's Abandoned Mine Lands Program represents the intersection of my professional expertise and lifelong passion. Having personally explored hundreds of abandoned mine systems through 20+ years of spelunking, I understand the safety, environmental, and structural complexities these sites present. This experience has driven me to develop extensive knowledge of abandoned mine lands, including personal experience developing digital and spatial inventories of these sites.

I deeply value the historical aspects of Queensland's mining legacies and am motivated to preserve their historical value for future generations while balancing critical public safety outcomes. This nuanced understanding—that abandoned mines are not just hazards to be remediated but historical assets to be thoughtfully managed—enables me to approach repurposing and re-commercialisation opportunities with both safety rigor and heritage sensitivity.

This role represents an opportunity to provide direct and functional leadership in delivery of key aspects of the Technical Services business, utilising my unique combination of hands-on domain knowledge, digital inventory expertise, and executive leadership experience to minimise risks to community health and safety and the environment. The chance to transform my personal passion into meaningful public service that achieves key program deliverables safely, on time, within budget while ensuring risk is adequately managed, and potentially creates productive community assets that preserve our mining heritage, aligns perfectly with my commitment to meaningful work that creates lasting community benefit.

## Leadership

My progression from Senior Software Architect to Operations Manager to CEO at ValuePRO Software demonstrates the strategic and operational leadership capabilities essential for this director-level role. As Operations Manager for over five years, I led multidisciplinary development teams while running the business's comprehensive Governance, Risk and Compliance program across ISO27001 and 9001 certifications. This experience included implementing SIEM and EDR security solutions across enterprise infrastructure, managing professional services delivery, and running the complete GRC program including risk assessments, compliance monitoring, audit management, and regulatory reporting.

The results speak to operational excellence: zero audit findings across 5+ years of ISO certification maintenance while successfully managing teams delivering complex technical outcomes. This GRC expertise directly translates to implementing the Risk and Prioritisation Framework for Abandoned Mines management and remediation, managing enterprise and project risk registers, and leading reporting of program risks and resolution actions to the department's Risk and Compliance Committee.

When promoted to CEO following the acquisition, I applied these operational foundations to strategic transformation. I successfully revitalised a complex portfolio of 40+ highly customised software forks while maintaining operational continuity, achieving an eNPS of 8.5–9.5 while delivering SaaS 'rule of 40' performance throughout significant organisational restructuring. Most notably, I replatformed and launched an alpha successor to a legacy 450k+ line-of-code core product in under one year—transformation outcomes delivered safely, on time, and within budget while ensuring risk was adequately managed.

## Technical Transformation

Through founding d/rksci as an innovation laboratory, I've developed expertise in exploring novel applications of emerging technologies to complex real-world challenges. Projects like MapGyver (AI-powered lost person modelling using terrain analysis) and rained.cloud (100+ years historical weather data preservation) demonstrate my ability to identify and implement innovative approaches to technical challenges. This innovation mindset positions me to lead the development of business policy, innovation and research matters including repurposing and re-commercialisation of mined land for future appropriate use.

My technical architecture background provides the foundation needed to lead the Technical Services Asset Management transformation project. At ValuePRO, I spearheaded platform modernisation establishing foundational systems including source control and DevOps practices across 150+ legacy codebases. I implemented CI/CD pipelines, managed a 100:2 consolidation of divergent internal dependency systems, and established the operational framework that supported years of sustained growth. This experience directly prepares me to deliver systems and tools to uplift asset management across the business unit.

## Stakeholder Collaboration

My entrepreneurial journey across multiple ventures has required extensive stakeholder management in complex technical, regulatory, and commercial environments. From Bitcoin exchange platforms to distributed advertising networks, I've successfully built strategic partnerships while navigating regulatory requirements and delivering results for diverse stakeholder groups. This experience prepares me to develop and maintain effective working relationships, collaborating with internal and external stakeholders, using strategic partnerships to deliver innovative and agile solutions to resolve complex issues associated with the Abandoned Mine Lands Program.

I'm particularly committed to fostering meaningful partnerships with Traditional Owners and preserving cultural heritage. My understanding that abandoned mines represent both safety challenges and historical assets enables me to approach stakeholder engagement with appropriate sensitivity to cultural protocols and community aspirations. The successful Wolfram Camp pilot program, which includes consultation with the Djungan People, provides an excellent foundation for expanding these partnership approaches across the program.

## Team Excellence

My leadership philosophy—Envision the Extraordinary, Collaborate with Charisma, Persevere to Achieve—has consistently delivered results through people-focused transformation. At ValuePRO, I transformed team culture while maintaining exceptional performance standards, creating an environment oriented toward trust, open communication, and creative thinking. Teams delivered complex technical outcomes safely, on time, and within budget while maintaining ISO certification standards.

These leadership values align directly with Queensland Government's core competencies: Envision the Extraordinary encompasses leading strategically and making insightful decisions; Collaborate with Charisma naturally builds enduring relationships while developing and mobilising talent; and Persevere to Achieve drives accountability and outcomes through sound governance. This philosophical alignment demonstrates authentic cultural fit for leading the Technical Services team effectively.

## Domain Expertise

My 20+ years of spelunking provides unique hands-on understanding of abandoned mine challenges, positioning me to lead the management and maintenance of abandoned mines spatial and analytical data systems while implementing comprehensive risk assessment, prioritisation and planning functions. This practical knowledge, combined with GIS consulting experience and data analysis background, enables me to understand firsthand the safety, environmental, and structural factors that must be considered in remediation planning.

The combination of field experience with digital systems expertise allows me to identify opportunities for repurposing and re-commercialisation that others without direct experience might miss. I understand both the physical realities of these sites and the digital infrastructure needed to manage them systematically across Queensland's portfolio.

## Meeting Requirements

My experience directly addresses your key requirements: five years of Operations Manager experience managing complex technical programs plus CEO strategic transformation leadership provides extensive policy development and project management expertise in technical sectors. My GIS consulting background combined with 20+ years of practical mine systems knowledge through spelunking delivers the resources sector experience you're seeking. My progression through technical architecture, operations management, and strategic leadership demonstrates proven project and asset management capabilities across multiple organisations and certification standards.

Most importantly, my genuine passion for abandoned mine environments, developed through decades of personal exploration, ensures I bring not just professional competency but authentic commitment to advancing the AMLP's mission.

## Conclusion

My unique combination of CEO-level strategic leadership, comprehensive GRC expertise, and genuine passion for abandoned mine environments positions me to provide direct and functional leadership in delivery of key aspects of the Technical Services business while driving innovation and strategic transformation. I am committed to advancing the AMLP's mission of making abandoned mines safe, secure, durable and, where possible, productive, while exploring new opportunities that achieve key program deliverables and deliver lasting community benefits.

I welcome the opportunity to discuss how my experience and vision can contribute to the department's objectives.

Sincerely,
Blake Carter`,
        documents: [
          {
            name: 'Resume_Blake_Carter.pdf',
            type: 'resume',
            url: '/documents/resume-sarah-johnson.pdf',
            uploaded: '2025-01-25'
          },
          {
            name: 'Executive_Summary.pdf',
            type: 'executive-summary',
            url: '/documents/executive-summary-blake.pdf',
            uploaded: '2025-01-25'
          },
          {
            name: 'Selection_Criteria_Response.pdf',
            type: 'selection-criteria',
            url: '/documents/selection-criteria-blake.pdf',
            uploaded: '2025-01-25'
          }
        ],
        notes: [
          {
            author: collaborator || 'blake',
            date: '2025-01-21',
            content: 'Strong technical background, excellent match for our tech stack. Recommend moving to technical interview.'
          }
        ]
      });
      setLoading(false);
    }, 500);
  }, [searchParams, jobId, collaborator]);

  // Scroll tracking for TOC and fade animations
  useEffect(() => {
    const handleScroll = () => {
      // Include all main sections
      const sections = [
        'cover-letter',
        'vision-statement',
        'resume',
        'reflection'
      ];
      
      // Include subsections
      const subsections = [
        'background-vision',
        'strategic-pillars',
        'vision-areas',
        'vision-context',
        'program-evolution',
        'canary-app',
        'executive-summary',
        'experience',
        'competencies',
        'education'
      ];
      
      const scrollPosition = window.scrollY + 100; // Reduced offset for more accurate detection
      
      // Find the current section
      let currentSection = 'cover-letter';
      let currentSubsection = '';
      let shouldShowStickyHeader = false;
      
      // Check main sections
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            // Show sticky header when we scroll past the main section header
            const sectionHeader = element.querySelector('h2');
            if (sectionHeader && scrollPosition > offsetTop + sectionHeader.offsetHeight + 60) {
              shouldShowStickyHeader = true;
            }
          }
        }
      }
      
      // Check subsections within current section only
      let relevantSubsections = [];
      if (currentSection === 'vision-statement') {
        relevantSubsections = ['background-vision', 'strategic-pillars', 'vision-areas'];
      } else if (currentSection === 'vision-statement') {
        relevantSubsections = ['vision-context', 'program-evolution', 'canary-app'];
      } else if (currentSection === 'resume') {
        relevantSubsections = ['executive-summary', 'experience', 'competencies', 'education'];
      }
      
      // Reset subsection when not in a relevant section
      if (relevantSubsections.length === 0) {
        currentSubsection = '';
      } else {
        // Check subsections and find which one we're currently in
        // Reset to empty first
        currentSubsection = '';
        
        // Check each subsection to find the current one
        for (let i = 0; i < relevantSubsections.length; i++) {
          const subsection = relevantSubsections[i];
          const element = document.getElementById(subsection);
          if (element) {
            const rect = element.getBoundingClientRect();
            const nextElement = i < relevantSubsections.length - 1 ? 
              document.getElementById(relevantSubsections[i + 1]) : null;
            const nextTop = nextElement ? nextElement.getBoundingClientRect().top : Infinity;
            
            // Check if we're in this subsection's range
            if (rect.top <= 150 && nextTop > 150) {
              currentSubsection = subsection;
              break;
            }
            // If we haven't reached any subsection yet, use the first one if close enough
            if (rect.top > 0 && rect.top <= 300 && currentSubsection === '') {
              currentSubsection = subsection;
              break;
            }
          }
        }
        
        // If still no subsection and we're in the section, default to first
        if (currentSubsection === '' && relevantSubsections.length > 0) {
          const firstElement = document.getElementById(relevantSubsections[0]);
          if (firstElement && firstElement.getBoundingClientRect().top <= window.innerHeight) {
            currentSubsection = relevantSubsections[0];
          }
        }
      }
      
      setActiveSection(currentSection);
      setActiveSubsection(currentSubsection);
      setShowStickyHeader(shouldShowStickyHeader);
    };

    // Intersection observer for fade animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all fade-on-scroll elements
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Authentication and loading states
  if (authStatus === 'checking' || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">Verifying access...</div>
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (authStatus === 'expired') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-thin mb-4">Link Expired</h2>
          <p className="text-gray-400 mb-6">This application link has expired. Please contact the candidate for a new link.</p>
          <a href="mailto:blake@drksci.com" className="inline-block px-6 py-3 bg-cyan-400 text-black hover:bg-cyan-300 transition-colors">
            Request New Link
          </a>
        </div>
      </div>
    );
  }
  
  if (authStatus === 'invalid') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <h2 className="text-2xl font-thin mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-2">{authError}</p>
          <p className="text-gray-500 text-sm">Please use the secure link provided by the candidate to access this application.</p>
        </div>
      </div>
    );
  }
  
  if (!applicationData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Application data not available</div>
      </div>
    );
  }

  const { job, candidate, coverLetter, documents, notes } = applicationData;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{candidate.name} - {job.title} - {job.company}</title>
        <meta name="description" content={`${candidate.name} - Application for ${job.title} at ${job.company}`} />
      </Helmet>
      
      {/* Film grain effect overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 2px,
              transparent 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 2px,
              transparent 4px
            ),
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 2px
            )
          `,
          mixBlendMode: 'overlay'
        }}
      />
      
      <div className="min-h-screen bg-black text-white flex">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-72 bg-black/95 backdrop-blur-sm border-r border-gray-800 overflow-y-auto z-10">
          <div className="p-8">
            {/* REF Component at top */}
            <div className="w-full mb-8 flex items-center" style={{ height: '80px', paddingTop: '25px', paddingBottom: '25px', marginTop: '-32px', marginBottom: '0px' }}>
              <div 
                className="w-full rounded bg-gray-700/30 cursor-pointer transition-all hover:bg-gray-700/40" 
                style={{ 
                  border: '1px solid rgba(64, 64, 64, 0.2)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={() => setIsHoveringRef(true)}
                onMouseLeave={() => setIsHoveringRef(false)}
                onClick={() => {
                  navigator.clipboard.writeText(job.reference);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <div className="flex items-center w-full" style={{ height: '28px' }}>
                  <div className="px-3 text-xs text-gray-400 uppercase tracking-wider font-medium" style={{ width: '45px' }}>REF</div>
                  <div className="h-6 w-px bg-gray-800"></div>
                  <div className="flex-1 px-3 text-center flex items-center justify-center">
                    <div className="text-xs font-normal tracking-wider font-mono text-gray-200">
                      {job.reference}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-5 mb-10">
              <div>
                <div className="text-xs text-gray-300 uppercase tracking-wider mb-2 font-medium">Applicant</div>
                <div className="text-base font-light text-white flex items-center justify-between">
                  {blakeProfileData.personal.name}
                  <a 
                    href="https://www.linkedin.com/in/blake-carter-5995ab5a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors opacity-60 hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300 uppercase tracking-wider mb-2 font-medium">Position</div>
                <div className="text-sm text-gray-100 mb-1">{job.title}</div>
                <div className="text-xs text-gray-300">Technical Services, Natural Resources</div>
                <div className="text-xs text-gray-400" style={{ fontSize: '10px' }}>Department of Natural Resources, Mines, Manufacturing, and Regional Development</div>
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <nav className="space-y-0">
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'cover-letter' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('cover-letter').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'cover-letter' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Cover Letter
                  </button>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'vision-statement' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('vision-statement').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'vision-statement' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Vision Statement
                  </button>
                  <div className="space-y-1 pb-2">
                  <button
                    onClick={() => document.getElementById('background-vision').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'background-vision' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Introduction
                  </button>
                  <button
                    onClick={() => document.getElementById('strategic-pillars').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'strategic-pillars' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Pillars
                  </button>
                  <button
                    onClick={() => document.getElementById('vision-areas').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'vision-areas' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Scope
                  </button>
                  </div>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'vision-statement' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('vision-statement').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'vision-statement' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Vision Statement
                  </button>
                  <div className="space-y-1 pb-2">
                    <button
                      onClick={() => document.getElementById('vision-context').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'vision-context' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Context
                    </button>
                    <button
                      onClick={() => document.getElementById('program-evolution').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'program-evolution' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Program Evolution
                    </button>
                    <button
                      onClick={() => document.getElementById('canary-app').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'canary-app' ? 'text-gray-100' : (activeSection === 'vision-statement' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Canary App
                    </button>
                  </div>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'resume' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('resume').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'resume' ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Resume
                  </button>
                  <div className="space-y-1 pb-2">
                  <button
                    onClick={() => document.getElementById('executive-summary').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'executive-summary' ? 'text-gray-100' : (activeSection === 'resume' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'experience' ? 'text-gray-100' : (activeSection === 'resume' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => document.getElementById('competencies').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'competencies' ? 'text-gray-100' : (activeSection === 'resume' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Competencies
                  </button>
                  <button
                    onClick={() => document.getElementById('education').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-xs transition-colors pl-4 ${
                      activeSubsection === 'education' ? 'text-gray-100' : (activeSection === 'resume' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                    }`}
                  >
                    Education
                  </button>
                  </div>
                </div>
                <div className="py-1 px-2 bg-transparent">
                  <button
                    onClick={() => document.getElementById('reflection').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 rounded transition-all ${
                      activeSection === 'reflection' ? 'text-white font-medium bg-gray-700/30 border-l-2 border-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/20'
                    }`}
                  >
                    Reflection
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
        </aside>

        {/* Sticky badges - top right */}
        <div className="fixed right-4 z-20 flex items-center space-x-4" style={{ top: '0px', height: '80px', paddingTop: '25px', paddingBottom: '25px' }}>
          {/* Link Status Badge with Share */}
          <div className="flex items-center space-x-3 px-4 rounded-full bg-gray-800/30 border border-gray-800 backdrop-blur-sm" style={{ height: '28px' }}>
            {hoursRemaining > 0 ? (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">
                  Link valid for {hoursRemaining > 168 ? `${Math.floor(hoursRemaining / 168)} weeks` : hoursRemaining > 24 ? `${Math.floor(hoursRemaining / 24)} days` : `${hoursRemaining} hours`}
                </span>
                <div className="h-4 w-px bg-gray-700"></div>
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent('Blake Carter - Director, Innovation and Planning Application');
                    const body = encodeURIComponent(`Hi,\n\nI'd like to share Blake Carter's application for the Director, Innovation and Planning position (QLD/655778/25) with you:\n\n${window.location.href}\n\nBest regards`);
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  }}
                  className="text-green-400 hover:text-green-300 transition-colors"
                  aria-label="Share via email"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </button>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-xs text-red-400">Link Expired</span>
              </>
            )}
          </div>
          
          {/* PDF Download - matching LinkedIn badge style */}
          <PdfVersion 
            filename={`blake-carter-${jobId || 'resume'}.pdf`}
            className="ml-2"
          />
        </div>

        {/* Initial Sticky Header - only visible when scrolled */}
        {showStickyHeader && (
          <div className="fixed left-72 right-0 z-10 bg-black flex items-center" style={{ top: '0px', height: '80px', borderBottom: '1px dotted rgba(107, 114, 128, 0.3)', paddingTop: '25px', paddingBottom: '25px' }}>
            <div className="px-4 sm:px-8">
              <h2 className="text-2xl font-light text-gray-400 tracking-widest animate-fade-in">
                {activeSection === 'cover-letter' && (
                  <>
                    COVER LETTER
                  </>
                )}
                {activeSection === 'vision-exploration' && (
                  <>
                    VISION EXPLORATION
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-2xl text-gray-500 ml-3 font-light tracking-widest"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'vision-statement' && (
                  <>
                    VISION STATEMENT
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-2xl text-gray-500 ml-3 font-light tracking-widest"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'resume' && (
                  <>
                    RESUME
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-2xl text-gray-500 ml-3 font-light tracking-widest"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'reflection' && 'REFLECTION'}
              </h2>
            </div>
          </div>
        )}

        {/* Main Content - offset for sidebar */}
        <div className="ml-72 flex-1">
          <div className="max-w-5xl px-4 sm:px-8 py-16">

          {/* Cover Letter Section */}
          <section id="cover-letter" className="relative min-h-screen flex flex-col justify-center py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-400 tracking-widest mb-4 px-4 sm:px-8">COVER LETTER</h2>
            </div>
            <div className="max-w-4xl mt-8">
              
              {/* Addressee */}
              <div className="mb-12 px-4 sm:px-8">
                <div className="mb-8 font-mono text-sm text-white leading-relaxed font-light">
                  <div className="mb-1">Attention: Rod Kent,</div>
                  <div className="mb-4">Director Projects and Asset Management</div>
                  <div className="mb-1">Re: Director, Innovation and Planning Role</div>
                </div>
                <div className="border-t border-gray-800 my-8"></div>
                
                <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                  Dear Rod,
                </p>
                <p className="text-lg leading-relaxed mb-8 text-gray-300 serif-cover-letter">
                  I am writing to express my strong interest in the Director, Innovation and Planning position. As a hands-on technical leader with CEO experience and 20+ years of spelunking and historical mine exploration, I bring proven strategic leadership, innovation expertise, and genuine domain understanding that directly addresses the complex challenges of making abandoned mines safe, secure, durable and, where possible, productive.
                </p>
              </div>

              {/* Motivation */}
              <div id="motivation" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase px-4 sm:px-8">Motivation</h3>
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed mb-6 text-gray-300 serif-cover-letter">
                    This position represents a convergence of my professional expertise in strategic transformation with specialised domain knowledge developed through two decades documenting hundreds of abandoned mine sites. This hands-on experience positions me to advance Queensland's transition from reactive hazard management toward strategic asset optimisation.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
                    My approach recognises that abandoned mines are not merely remediation challenges but historical artefacts and brownfield opportunities for productive reuse that balance public safety imperatives with cultural heritage preservation.
                  </p>
                </div>
              </div>

              {/* Leadership */}
              <div id="leadership" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase px-4 sm:px-8">Leadership</h3>
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                    My progression from Senior Software Architect to Operations Manager to CEO at <a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a> demonstrates the capabilities essential for this role. As Operations Manager, I led multidisciplinary teams while running comprehensive GRC programs across the Secure Controls Framework, Essential Eight, IRAP assessments, and ISO27001/9001 certifications, achieving zero audit findings across 5+ years.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
                    As CEO, I successfully revitalised complex software portfolios during organisational restructuring, achieving exceptional performance metrics including eNPS of 8.5–9.5. This GRC expertise and transformation experience directly translates to implementing the Risk and Prioritisation Framework for Abandoned Mines and leading the Asset Management transformation project.
                  </p>
                </div>
              </div>

              {/* Innovation */}
              <div id="innovation" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase px-4 sm:px-8">Innovation</h3>
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
                    Through founding <a href="https://drksci.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/drksci-favicon.svg" className="inline w-3 h-3 mr-1" alt="" />d/rksci</a> as an innovation laboratory, I've developed expertise in applying emerging technologies to complex challenges, including AI-powered terrain analysis and historical data preservation platforms. My technical architecture background provides the foundation needed to modernise spatial and analytical data systems while establishing operational frameworks that support sustained programme growth.
                  </p>
                </div>
              </div>

              {/* Management */}
              <div id="management" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase px-4 sm:px-8">Management</h3>
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                    My entrepreneurial experience has required extensive stakeholder management in complex regulatory environments. I'm particularly committed to fostering meaningful partnerships with Traditional Owners, local communities, and businesses, understanding that abandoned mines represent both safety challenges and historical assets requiring culturally sensitive approaches.
                  </p>
                  <div className="mt-6 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left text-xs font-normal text-gray-400 pb-2 pr-4">My Values</th>
                          <th className="text-left text-xs font-normal text-gray-400 pb-2 pl-4">QLD Government</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-t border-gray-800">
                          <td className="py-2 pr-4">Envision the Extraordinary</td>
                          <td className="py-2 pl-4">Ideas into action</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                          <td className="py-2 pr-4">Collaborate with Charisma</td>
                          <td className="py-2 pl-4">Empower people</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                          <td className="py-2 pr-4">Persevere to Achieve</td>
                          <td className="py-2 pl-4">Customers first</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                          <td className="py-2 pr-4"></td>
                          <td className="py-2 pl-4">Be courageous</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                          <td className="py-2 pr-4"></td>
                          <td className="py-2 pl-4">Unleash potential</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Value */}
              <div id="value" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase px-4 sm:px-8">Value</h3>
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
                    The convergence of comprehensive GRC programme management, strategic transformation achievements, and 20+ years of hands-on abandoned mine documentation creates a unique qualification profile that positions me to drive programme evolution from reactive management toward proactive asset optimisation while maintaining rigorous safety and compliance standards.
                  </p>
                </div>
              </div>


              {/* Closing */}
              <div id="closing-remarks" className="mb-12">
                <div className="px-4 sm:px-8">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300 serif-cover-letter">
                    I welcome the opportunity to discuss how my experience and vision can contribute to the department's objectives.
                  </p>
                  <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                    Sincerely,
                  </p>
                  <p className="text-lg leading-relaxed mb-8 text-gray-300 serif-cover-letter">
                    Blake Carter
                  </p>
                  <div className="mt-4">
                    <img 
                      src="/assets/personnel/blake-signature.png" 
                      alt="Blake Carter Signature"
                      className="h-20 opacity-90"
                      style={{ 
                        filter: 'invert(1) brightness(0.7)',
                        mixBlendMode: 'lighten'
                      }}
                    />
                  </div>
                  <div className="border-t border-gray-800 my-8"></div>
                  <p className="text-sm leading-relaxed text-gray-400 italic text-center" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: '300' }}>
                    Available for discussion at your convenience | References available upon request
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Vision Statement Section */}
          <section id="vision-statement" className="relative min-h-screen flex flex-col justify-center py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-400 tracking-widest mb-4 px-4 sm:px-8">VISION STATEMENT</h2>
            </div>
            <div className="max-w-4xl px-4 sm:px-8 mt-8">
              {/* Introduction */}
              <div id="background-vision" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase">Introduction</h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                  Twenty years ago, I descended into my first abandoned mine shaft. What began as adventure became passion, then discipline, and now—opportunity to serve. Hundreds of sites later, I've witnessed firsthand both the hidden dangers and untapped potential beneath Queensland's surface.
                </p>
                <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
                  As CEO of <a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a>, I learned to transform complex legacy systems into productive assets. But it's underground, navigating forgotten workings and documenting forgotten histories, where I discovered my true calling: turning liabilities into legacies.
                </p>
                <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
                  Queensland's abandoned mines aren't just safety challenges—they're sleeping assets waiting for the right vision. My external perspective, unencumbered by "how we've always done it," combined with deep technical leadership and genuine domain passion, positions me to evolve the AMLP from reactive hazard management toward proactive transformation that balances safety, heritage, and opportunity.
                </p>
              </div>

              {/* Strategic Pillars */}
              <div id="strategic-pillars" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase">Pillars</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300 serif-cover-letter">
                  My conceptual approach to Queensland's Abandoned Mine Lands Program is grounded in four core tenets developed through 20+ years of hands-on exploration and executive leadership experience:
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">1. Awareness</h4>
                    <p className="text-base leading-relaxed text-gray-300 serif-cover-letter">
                      The idiom "You can't manage what you can't see" represents both a key challenge and opportunity in abandoned mine management. Situational awareness requires a confluence of information to make data-driven decisions, yet is difficult to scale across thousands of sites in inventory. Humans can only maintain so many sites in inventory and corresponding registers at once, making it vital to adopt a systemised approach that automates integration—including gaps in data—and delivers meaningful insights to drive the right decisions and prioritise resources effectively.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">2. Insights</h4>
                    <p className="text-base leading-relaxed text-gray-300 serif-cover-letter">
                      Data-driven decision making that reveals patterns and possibilities others miss
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">3. Integration</h4>
                    <p className="text-base leading-relaxed text-gray-300 serif-cover-letter">
                      Bringing together systems, stakeholders, and solutions into cohesive transformation
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">4. Engagement</h4>
                    <p className="text-base leading-relaxed text-gray-300 serif-cover-letter">
                      Meaningful collaboration that brings all voices into the solution
                    </p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed mt-6 text-gray-300">
                  These tenets guide my approach to transforming Queensland's abandoned mine management from reactive hazard response to proactive asset transformation, balancing safety imperatives with heritage preservation while creating lasting community value.
                </p>
              </div>

              {/* Strategic Leadership & Transformation - Key Areas */}
              <div id="vision-areas" className="mb-12">
                <h3 className="text-base font-light mb-12 text-white tracking-[0.3em] uppercase">Scope</h3>
                
                <div className="space-y-8">
                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">1. Abandoned Mine Lands Program Evolution</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Transform AMLP from reactive hazard management to proactive asset transformation ecosystem, expanding beyond the current 120 complex sites to systematically address Queensland's full inventory while balancing safety, heritage, and productivity opportunities.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">2. Risk & Prioritisation Framework Innovation</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Enhance the 2021 framework with predictive modeling, AI-driven risk assessment, and dynamic prioritisation that adapts to changing conditions, optimising safety outcomes while accelerating identification of viable re-commercialisation opportunities.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">3. Repurposing & Re-commercialisation Innovation</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Expand the Wolfram Camp pilot success into a systematic program identifying renewable energy, critical minerals, tourism, and alternative land use opportunities, creating jobs in regional communities while reducing government liability.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">4. Digital & Spatial Systems Transformation</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Implement next-generation spatial and analytical data systems combining LiDAR scanning, drone surveillance, IoT monitoring, and AI analytics for comprehensive site monitoring and predictive modeling.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">5. Indigenous Partnership & Cultural Heritage</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Integrate Traditional Owner knowledge, cultural protocols, and community aspirations into all aspects of abandoned mine management, strengthening cultural preservation while improving reconciliation outcomes.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/30 pl-6">
                    <h4 className="text-lg font-medium text-gray-200 mb-3">6. Financial & Partnership Innovation</h4>
                    <p className="text-base text-gray-300 mb-2">
                      Develop diversified funding portfolio combining government investment with private partnerships, carbon credit monetisation, and revenue-generating repurposing initiatives to enhance program sustainability.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Vision Statement Section */}
          <section id="vision-statement" className="relative min-h-screen flex flex-col justify-center py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-400 tracking-widest mb-4 px-4 sm:px-8">VISION STATEMENT</h2>
            </div>
            
            <div className="max-w-6xl px-4 sm:px-8">
              <div id="vision-context" className="mb-12">
                <h3 className="text-2xl font-light text-gray-400 tracking-wider mb-6">Context</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300 serif-cover-letter">
                  I've handpicked three sites that range from safe, concerning, through dangerous (in my opinion), to demonstrate this vision.
                </p>
                
                {/* Info Badge */}
                <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg flex">
                  <div className="bg-blue-500/20 p-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-300 font-semibold p-4 flex-1">
                    These examples are an intentionally cherry-picked cross-section of legacy site severities.
                  </p>
                </div>
                
                {/* Three Column Site Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Tower Hill */}
                  <div className="group">
                    <div 
                      className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-3 relative cursor-pointer"
                      onClick={() => setFullscreenImage({ 
                        full: '/assets/vision-statement/tower-hill.jpg', 
                        name: 'Tower Hill, Leyburn, QLD' 
                      })}
                    >
                      <img 
                        src="/assets/vision-statement/tower-hill-optimized.jpg" 
                        alt="Tower Hill mine site"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ filter: 'sepia(0.6) hue-rotate(60deg) saturate(2.4)' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 backdrop-blur-sm text-black text-sm font-black py-2 px-2 text-center">
                        SAFE
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-200 mb-1">Tower Hill</h4>
                    <p className="text-xs text-gray-400 mb-2">Leyburn, QLD</p>
                    <p className="text-sm text-gray-300 pl-2 border-l-2 border-green-500/50">"Exemplary site management. All shafts and adits across the extensive field are properly secured with clear signage."</p>
                  </div>
                  
                  {/* Dittmer / Duffer Workings */}
                  <div className="group">
                    <div 
                      className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-3 relative cursor-pointer"
                      onClick={() => setFullscreenImage({ 
                        full: '/assets/vision-statement/dittmer-workings.jpg', 
                        name: 'Dittmer / Duffer Lode, Proserpine, FNQ' 
                      })}
                    >
                      <img 
                        src="/assets/vision-statement/dittmer-workings-optimized.jpg" 
                        alt="Dittmer / Duffer Workings mine site"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ filter: 'sepia(0.5) hue-rotate(15deg) saturate(2.5) brightness(1.1)' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-yellow-400/90 backdrop-blur-sm text-black text-sm font-black py-2 px-2 text-center">
                        CONCERNING
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-200 mb-1">Dittmer / Duffer Lode</h4>
                    <p className="text-xs text-gray-400 mb-2">Proserpine, FNQ</p>
                    <p className="text-sm text-gray-300 pl-2 border-l-2 border-yellow-400/50">"A forgotten site still attracting fossickers for its high-grade deposits. The mountain switchbacks lead to exposed stopes at the upper workings—significant fall hazards remain unsealed."</p>
                  </div>
                  
                  {/* Governor Norman */}
                  <div className="group">
                    <div 
                      className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-3 relative cursor-pointer"
                      onClick={() => setFullscreenImage({ 
                        full: '/assets/vision-statement/governor-norman.jpg', 
                        name: 'Governor Norman c/o Jumna Mill, FNQ' 
                      })}
                    >
                      <img 
                        src="/assets/vision-statement/governor-norman-optimized.jpg" 
                        alt="Governor Norman mine site"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ filter: 'sepia(0.8) hue-rotate(-30deg) saturate(3.6) contrast(1.2)' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-red-500/90 backdrop-blur-sm text-black text-sm font-black py-2 px-2 text-center">
                        DANGER
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-200 mb-1">Governor Norman</h4>
                    <p className="text-xs text-gray-400 mb-2">C/O Jumna Mill, FNQ</p>
                    <p className="text-sm text-gray-300 pl-2 border-l-2 border-red-500/50">"Worst of the entire local area; adits open near 4WD tracks; dangerous workings; ostensibly higher risk than the 'Great Southern', which is saying something. Boom sticks included."</p>
                  </div>
                </div>
              </div>
              
              {/* Program Evolution Section */}
              <div id="program-evolution" className="mt-16">
                <h3 className="text-2xl font-light text-gray-400 tracking-wider mb-6">Program Evolution</h3>
                
                {/* Mermaid Diagram */}
                <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800 overflow-x-auto">
                  <div className="mermaid" ref={mermaidRef}>
{`graph TB
    subgraph AW["SAFETY & COMPLIANCE"]
        direction LR
        MERLIN[MERLIN Database]
        FD[Field Assessments]
        TR[Mining Titles]
        ENV[Environmental Data]
    end
    
    subgraph IN["RISK ASSESSMENT"]
        direction LR
        RA[Risk Model]
        AI[AI Model]
        CURR[Current Risk]
        PROJ[Future Risk]
        PRIOR[Priority Ranking]
    end
    
    subgraph PL["PLANNING & BUDGET"]
        direction LR
        PLAN[Action Planning]
        BUD[Budget Forecast]
        Y1[Year 1]
        Y3[Year 3]
        Y5[Year 5]
    end
    
    subgraph AC["REMEDIATION"]
        direction LR
        REM[Site Remediation]
        KPI[Actual vs Forecast KPIs]
    end
    
    subgraph EN["STAKEHOLDER ENGAGEMENT"]
        direction LR
        COMM[Community Engagement]
        GOV[Government Agencies]
        LC[Local Communities]
        TO[Traditional Owners]
        PROC[Procurement]
        CONT[Local Contractors]
    end
    
    %% Vertical connections between phases
    MERLIN --> RA
    FD --> RA
    TR --> RA
    ENV --> RA
    
    RA --> AI
    AI --> CURR
    AI --> PROJ
    CURR --> PRIOR
    PROJ --> PRIOR
    
    PRIOR --> PLAN
    PLAN --> BUD
    BUD --> Y1
    BUD --> Y3
    BUD --> Y5
    
    BUD --> REM
    BUD --> KPI
    
    REM --> COMM
    KPI --> COMM
    COMM --> GOV
    COMM --> LC
    COMM --> TO
    COMM --> PROC
    PROC --> CONT
    
    %% Styling
    classDef inputBox fill:#1e3a5f,stroke:#4a90e2,stroke-width:2px,color:#fff
    classDef processBox fill:#2d5016,stroke:#5cb85c,stroke-width:2px,color:#fff
    classDef aiBox fill:#4a1e5f,stroke:#9a4ae2,stroke-width:3px,color:#fff
    classDef outputBox fill:#5a2c17,stroke:#d9534f,stroke-width:2px,color:#fff
    classDef peopleBox fill:#5f1e3a,stroke:#e24a90,stroke-width:2px,color:#fff
    classDef swimlane fill:#0a0a0a,stroke:#333,stroke-width:2px,color:#fff
    
    class MERLIN,FD,TR,ENV inputBox
    class RA,CURR,PROJ,PRIOR,PLAN,BUD,Y1,Y3,Y5 processBox
    class AI aiBox
    class REM,KPI outputBox
    class COMM,GOV,LC,TO,PROC,CONT peopleBox
    class AW,IN,PL,AC,EN swimlane`}
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-4 italic text-center">
                  Queensland Abandoned Mine Lands Program - Data Flow & Decision Framework
                </p>
              </div>
            </div>
              
              {/* Canary App Subsection */}
              <div id="canary-app" className="mt-16">
                <h3 className="text-2xl font-light text-gray-400 tracking-wider mb-6">Canary App</h3>
                
                <div className="mb-8">
                  <h4 className="text-4xl text-white font-extralight mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Digital hazard intelligence for Queensland's abandoned mine program</h4>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-4xl">
                  What if every abandoned mine hazard was managed through the proper risk framework? Industry operators and staff identify hazards with GPS precision, AMLP staff assess priority levels with photo evidence, and control measures are implemented with full regulatory compliance—all starting with a field report.
                </p>
              </div>

              {/* Three Key Features */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Industry Partnership */}
                <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-6">
                  <h4 className="text-lg text-gray-400 font-extralight mb-3">Industry Partnership</h4>
                  <p className="text-sm text-gray-500 font-extralight mb-4">Collaborative approach leveraging private sector expertise</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Cross-industry knowledge sharing</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Streamlined contractor workflows</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Integrated remediation planning</div>
                    </div>
                  </div>
                </div>

                {/* Data Driven Decisions */}
                <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-6">
                  <h4 className="text-lg text-gray-400 font-extralight mb-3">Data Driven Decisions</h4>
                  <p className="text-sm text-gray-500 font-extralight mb-4">Accurate reports and forecasting for informed stakeholder decisions</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Evidence-based site prioritization</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Real-time hazard trends</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Cost-impact analysis</div>
                    </div>
                  </div>
                </div>

                {/* Public Safety First */}
                <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-6">
                  <h4 className="text-lg text-gray-400 font-extralight mb-3">Public Safety First</h4>
                  <p className="text-sm text-gray-500 font-extralight mb-4">Proactive community protection and rapid response systems</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Immediate threat assessment</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Automated community notifications</div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <div className="text-gray-600 font-extralight">Coordinated emergency protocols</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Stories */}
              <div className="mb-12">
                <h4 className="text-2xl text-white font-extralight mb-6">User Stories</h4>
                <p className="text-gray-300 text-base mb-6">How different professionals use Canary for hazard reporting in the field</p>
                
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  {/* Exploration Driller */}
                  <div className="bg-gradient-to-br from-cyan-900/20 via-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.43 1.76.43 1.76s-.04-1.01.43-1.76c.96-1.54 2.21-2.86 3.16-4.4C14.5 12.37 15 10.74 15 9c0-3.87-3.13-7-7-7zm0 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-cyan-300 font-medium text-sm">Exploration Driller</h5>
                        <p className="text-gray-400 text-xs">Remote operations</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">"I photograph old shafts and unstable ground to keep my crew safe. The app works offline in remote areas."</p>
                  </div>
                  
                  {/* Environmental Scientist */}
                  <div className="bg-gradient-to-br from-green-900/20 via-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-green-500/20 hover:border-green-400/30 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                          <path d="M8 12c-2.76 0-5 2.24-5 5 0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-2.76-2.24-5-5-5H8z" opacity="0.7"/>
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-green-300 font-medium text-sm">Environmental Scientist</h5>
                        <p className="text-gray-400 text-xs">Site assessment</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">"I collect standardized reports with precise GPS data and photos for regulatory compliance assessments."</p>
                  </div>
                  
                  {/* Park Ranger */}
                  <div className="bg-gradient-to-br from-yellow-900/20 via-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l-1.09 8.26C10.73 11.17 10 12 10 13c0 1.1.9 2 2 2s2-.9 2-2c0-1-.73-1.83-.91-2.74L12 2z"/>
                          <path d="M4 10c0 1.1.9 2 2 2h2v6c0 2.21 1.79 4 4 4s4-1.79 4-4v-6h2c1.1 0 2-.9 2-2 0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2z" fill="none"/>
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-yellow-300 font-medium text-sm">Park Ranger</h5>
                        <p className="text-gray-400 text-xs">Public safety</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">"I guide visitors to safely report hazards from a distance, coordinating area closures and emergency responses."</p>
                  </div>
                </div>
              </div>

              {/* App Screens */}
              <div className="mb-12">
                <h4 className="text-2xl text-white font-extralight mb-6">Mobile App Screens</h4>
                <p className="text-gray-300 text-base mb-8">Field reporting application for hazard identification and risk assessment</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1: Check Screen */}
                  <div className="text-center">
                    <div className="border-l-2 border-cyan-400/30 pl-4 mb-6">
                      <h5 className="text-lg font-medium text-gray-200 mb-2">Check</h5>
                      <p className="text-base text-gray-300">Instant hazard detection and safety status</p>
                    </div>
                    
                    {/* Phone Mockup */}
                    <div className="relative mx-auto" style={{ width: '200px', height: '400px' }}>
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-slate-800/50 rounded-[2rem] border-4 border-slate-700/40 shadow-xl backdrop-blur-sm">
                        {/* Camera */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-600/50 rounded-full"></div>
                        
                        {/* Screen */}
                        <div className="absolute top-8 left-3 right-3 bottom-3 bg-emerald-500/90 rounded-[1.5rem] overflow-hidden border border-emerald-400/20">
                          <div className="flex flex-col items-center justify-center px-4 py-6 h-full relative z-10">
                            <div className="text-center space-y-4">
                              {/* Status Icon */}
                              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                              </div>
                              
                              {/* Status Message */}
                              <div className="space-y-2">
                                <h6 className="text-sm font-light text-white">No known hazards nearby</h6>
                                <div className="space-y-1">
                                  <p className="text-white/80 text-xs">Checked 500m ±20m</p>
                                  <p className="text-white/80 text-xs">2 hours ago</p>
                                </div>
                              </div>
                              
                              {/* Action Button */}
                              <div className="pt-3">
                                <div className="bg-black/80 text-white py-2 px-3 rounded-md text-xs font-medium">
                                  Report a Hazard
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2: Capture Screen */}
                  <div className="text-center">
                    <div className="border-l-2 border-cyan-400/30 pl-4 mb-6">
                      <h5 className="text-lg font-medium text-gray-200 mb-2">Capture</h5>
                      <p className="text-base text-gray-300">GPS-tagged photo evidence collection</p>
                    </div>
                    
                    {/* Phone Mockup */}
                    <div className="relative mx-auto" style={{ width: '200px', height: '400px' }}>
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-slate-800/50 rounded-[2rem] border-4 border-slate-700/40 shadow-xl backdrop-blur-sm">
                        {/* Camera */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-600/50 rounded-full"></div>
                        
                        {/* Screen */}
                        <div className="absolute top-8 left-3 right-3 bottom-3 bg-gray-900/90 rounded-[1.5rem] overflow-hidden relative border border-gray-700/20">
                          {/* Camera Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-gray-800 to-gray-900"></div>
                          
                          {/* Safety Warning */}
                          <div className="absolute top-2 left-2 right-2 z-20">
                            <div className="bg-black/80 px-2 py-1 rounded-full">
                              <div className="text-yellow-300 text-xs font-bold text-center">
                                ⚠️ STAY OUT, STAY ALIVE ⚠️
                              </div>
                            </div>
                          </div>
                          
                          {/* Camera Crosshair */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 border border-white/50 rounded-lg">
                              <div className="absolute top-0 left-1/2 w-px h-2 bg-white/50 transform -translate-x-1/2"></div>
                              <div className="absolute bottom-0 left-1/2 w-px h-2 bg-white/50 transform -translate-x-1/2"></div>
                              <div className="absolute top-1/2 left-0 w-2 h-px bg-white/50 transform -translate-y-1/2"></div>
                              <div className="absolute top-1/2 right-0 w-2 h-px bg-white/50 transform -translate-y-1/2"></div>
                            </div>
                          </div>
                          
                          {/* Capture Button */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3: Submit Screen */}
                  <div className="text-center">
                    <div className="border-l-2 border-cyan-400/30 pl-4 mb-6">
                      <h5 className="text-lg font-medium text-gray-200 mb-2">Submit</h5>
                      <p className="text-base text-gray-300">Automated priority assessment and routing</p>
                    </div>
                    
                    {/* Phone Mockup */}
                    <div className="relative mx-auto" style={{ width: '200px', height: '400px' }}>
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-slate-800/50 rounded-[2rem] border-4 border-slate-700/40 shadow-xl backdrop-blur-sm">
                        {/* Camera */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-600/50 rounded-full"></div>
                        
                        {/* Screen */}
                        <div className="absolute top-8 left-3 right-3 bottom-3 bg-slate-800/90 rounded-[1.5rem] overflow-hidden border border-slate-700/20">
                          <div className="p-4 h-full flex flex-col">
                            {/* Header */}
                            <div className="text-center mb-3">
                              <h6 className="text-white text-xs font-medium mb-1">Risk Assessment</h6>
                              <p className="text-gray-400 text-xs">How dangerous is this hazard?</p>
                            </div>
                            
                            {/* Risk Levels */}
                            <div className="flex-1 space-y-2">
                              <div className="bg-green-700/20 border border-green-500/30 rounded-md p-2">
                                <div className="text-center">
                                  <div className="text-xs mb-1">🟢</div>
                                  <div className="text-green-300 text-xs font-semibold">Low Risk</div>
                                  <div className="text-gray-400 text-xs">Minor hazard</div>
                                </div>
                              </div>
                              <div className="bg-yellow-700/20 border border-yellow-500/30 rounded-md p-2">
                                <div className="text-center">
                                  <div className="text-xs mb-1">🟡</div>
                                  <div className="text-yellow-300 text-xs font-semibold">Medium Risk</div>
                                  <div className="text-gray-400 text-xs">Potential injury</div>
                                </div>
                              </div>
                              <div className="bg-red-700/20 border border-red-500/30 rounded-md p-2">
                                <div className="text-center">
                                  <div className="text-xs mb-1">🔴</div>
                                  <div className="text-red-300 text-xs font-semibold">High Risk</div>
                                  <div className="text-gray-400 text-xs">Immediate danger</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-2">
                              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2 rounded-md text-xs font-semibold text-center">
                                Submit Report
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Section */}
              <div className="mb-12">
                <h4 className="text-2xl text-white font-extralight mb-6">AMLP Staff Dashboard</h4>
                <p className="text-gray-300 text-base mb-8">Real-time hazard monitoring and regulatory oversight for Queensland's abandoned mine program staff</p>
                
                {/* Browser Mockup */}
                <div className="w-full bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden shadow-xl" style={{ height: '450px' }}>
                  {/* Browser Header */}
                  <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/30 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-slate-700/50 rounded px-3 py-1 text-gray-300 text-xs font-light">
                        dashboard.amlpcanary.qld.gov.au
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="bg-slate-900/20 p-4 h-full">
                    <div className="grid grid-cols-12 gap-3 h-full">
                      
                      {/* Left Side - Stats & Event List */}
                      <div className="col-span-5 space-y-3">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-800/30 rounded-md p-2 text-center border border-slate-700/20">
                            <div className="text-red-400 text-lg font-light">12</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Critical</div>
                          </div>
                          <div className="bg-slate-800/30 rounded-md p-2 text-center border border-slate-700/20">
                            <div className="text-amber-400 text-lg font-light">24</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Pending</div>
                          </div>
                          <div className="bg-slate-800/30 rounded-md p-2 text-center border border-slate-700/20">
                            <div className="text-emerald-400 text-lg font-light">143</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Controlled</div>
                          </div>
                        </div>
                        
                        {/* Active Events Header */}
                        <div className="flex items-center justify-between">
                          <h5 className="text-white text-sm font-medium">Active Events</h5>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-400 text-xs">Live Feed</span>
                          </div>
                        </div>
                        
                        {/* Event List */}
                        <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '240px' }}>
                          {/* Priority Event */}
                          <div className="bg-red-900/20 border border-red-600/30 rounded-md p-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2">
                                <div className="px-1 py-0.5 bg-red-500/80 text-white text-xs font-bold rounded">P1</div>
                                <div>
                                  <div className="text-white text-xs font-medium">#AML-2024-0847</div>
                                  <div className="text-red-300 text-xs">Acid Mine Drainage</div>
                                  <div className="text-gray-400 text-xs">Mount Morgan • 2 min ago</div>
                                </div>
                              </div>
                              <div className="text-red-400 text-xs">LIVE</div>
                            </div>
                          </div>
                          
                          {/* Other Events */}
                          <div className="bg-slate-800/20 border border-slate-700/30 rounded-md p-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2">
                                <div className="px-1 py-0.5 bg-red-500/80 text-white text-xs font-bold rounded">P1</div>
                                <div>
                                  <div className="text-white text-xs">#AML-2024-0846</div>
                                  <div className="text-orange-300 text-xs">Shaft Collapse</div>
                                  <div className="text-gray-400 text-xs">Irvinebank • 8 min ago</div>
                                </div>
                              </div>
                              <div className="text-orange-400 text-xs">ACTIVE</div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-800/20 border border-slate-700/30 rounded-md p-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2">
                                <div className="px-1 py-0.5 bg-orange-500/80 text-white text-xs font-bold rounded">P2</div>
                                <div>
                                  <div className="text-white text-xs">#AML-2024-0845</div>
                                  <div className="text-yellow-300 text-xs">Water Contamination</div>
                                  <div className="text-gray-400 text-xs">Drake • 15 min ago</div>
                                </div>
                              </div>
                              <div className="text-yellow-400 text-xs">PENDING</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Side - Map View */}
                      <div className="col-span-7">
                        <div className="bg-slate-800/20 border border-slate-700/20 rounded-md h-full relative overflow-hidden">
                          {/* Map Header */}
                          <div className="absolute top-3 left-3 right-3 z-10">
                            <div className="flex items-center justify-between">
                              <h5 className="text-white text-sm font-medium">Queensland Hazard Map</h5>
                              <div className="bg-slate-800/50 px-2 py-1 rounded text-gray-300 text-xs backdrop-blur-sm">
                                Live: 179 sites monitored
                              </div>
                            </div>
                          </div>
                          
                          {/* Map Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-slate-800/50 to-slate-900/60">
                            {/* Simulated map with hazard markers */}
                            <div className="absolute inset-3 rounded">
                              {/* Priority markers */}
                              <div className="absolute top-12 left-20 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white/50"></div>
                              <div className="absolute top-24 right-16 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white/50"></div>
                              <div className="absolute bottom-20 left-12 w-2 h-2 bg-orange-500 rounded-full border border-white/50"></div>
                              <div className="absolute bottom-32 right-24 w-2 h-2 bg-yellow-500 rounded-full border border-white/50"></div>
                              <div className="absolute top-16 right-32 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <div className="absolute bottom-16 left-32 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              
                              {/* Legend */}
                              <div className="absolute bottom-3 right-3 bg-slate-800/60 rounded p-2 backdrop-blur-sm">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Critical (P1)</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                    <span className="text-gray-300 text-xs">High (P2)</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Medium (P3)</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Controlled</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-blue-300 mb-2">Proof of Concept</h5>
                    <p className="text-sm text-blue-200">
                      This mobile application concept demonstrates how digital tools can transform abandoned mine hazard reporting from reactive incident response to proactive risk management, enabling systematic documentation and evidence-based prioritization across Queensland's extensive inventory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" className="relative min-h-screen flex flex-col justify-center py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-400 tracking-widest mb-4 px-4 sm:px-8">RESUME</h2>
            </div>
            
            {/* Executive Summary - Now part of resume */}
            <div className="px-4 sm:px-8 mt-8">
              <ExecutiveSummary 
                summary={blakeProfileData.summary} 
                focusAreas={blakeProfileData.focusAreas} 
              />

              {/* Professional Experience */}
              <ProfessionalExperience experiences={blakeProfileData.experience} />

              {/* Core Competencies */}
              <CoreCompetencies skills={blakeProfileData.skills} />

              {/* Education */}
              <Education education={blakeProfileData.education} />
            </div>
          </section>

          {/* Reflection Section */}
          <section id="reflection" className="relative min-h-screen flex flex-col justify-center py-20">
            <div className="w-full px-4 sm:px-8 mt-8">
              <h2 className="text-3xl font-light text-gray-400 tracking-widest mb-12">REFLECTION</h2>
              {/* Abandoned Places Reflection - Now at the top */}
              <div className="mb-8 max-w-4xl">
                <p className="text-lg leading-relaxed font-light text-gray-300">
                  I owe much of my professional development to these abandoned places that first fascinated me as a child. Their industrial histories and human stories have been a constant source of learning throughout my career, providing unique insights that continue to inform my approach to complex transformation challenges.
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-12">
                {[
                  { thumb: '/assets/personnel/application-gallery/thumbs/calgoa-qld.jpg', full: '/assets/personnel/application-gallery/calgoa-qld.jpg', name: 'Calgoa, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-1.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-1.jpg', name: 'Carbonate Hill, NM' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-2.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-2.jpg', name: 'Carbonate Hill, NM' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-3.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-3.jpg', name: 'Carbonate Hill, NM' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/carbonate-hill-nm-4.jpg', full: '/assets/personnel/application-gallery/carbonate-hill-nm-4.jpg', name: 'Carbonate Hill, NM' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/drake-nsw-1.jpg', full: '/assets/personnel/application-gallery/drake-nsw-1.jpg', name: 'Drake, NSW' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/drake-nsw-2.jpg', full: '/assets/personnel/application-gallery/drake-nsw-2.jpg', name: 'Drake, NSW' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/irvinebank-qld-1.jpg', full: '/assets/personnel/application-gallery/irvinebank-qld-1.jpg', name: 'Irvinebank, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/irvinebank-qld-2.jpg', full: '/assets/personnel/application-gallery/irvinebank-qld-2.jpg', name: 'Irvinebank, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/leadville-co-1.jpg', full: '/assets/personnel/application-gallery/leadville-co-1.jpg', name: 'Leadville, CO' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/leadville-co-2.jpg', full: '/assets/personnel/application-gallery/leadville-co-2.jpg', name: 'Leadville, CO' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/luina-tas.jpg', full: '/assets/personnel/application-gallery/luina-tas.jpg', name: 'Luina, TAS' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-1.jpg', full: '/assets/personnel/application-gallery/nunya-qld-1.jpg', name: 'Nunya, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-2.jpg', full: '/assets/personnel/application-gallery/nunya-qld-2.jpg', name: 'Nunya, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/nunya-qld-3.jpg', full: '/assets/personnel/application-gallery/nunya-qld-3.jpg', name: 'Nunya, QLD' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/rosarden-tas-1.jpg', full: '/assets/personnel/application-gallery/rosarden-tas-1.jpg', name: 'Rosarden, TAS' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/rosarden-tas-2.jpg', full: '/assets/personnel/application-gallery/rosarden-tas-2.jpg', name: 'Rosarden, TAS' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/svalbard-dk.jpg', full: '/assets/personnel/application-gallery/svalbard-dk.jpg', name: 'Svalbard, DK' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/tombstone-az-1.jpg', full: '/assets/personnel/application-gallery/tombstone-az-1.jpg', name: 'Tombstone, AZ' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/tombstone-az-2.jpg', full: '/assets/personnel/application-gallery/tombstone-az-2.jpg', name: 'Tombstone, AZ' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/virginia-city-nv-1.jpg', full: '/assets/personnel/application-gallery/virginia-city-nv-1.jpg', name: 'Virginia City, NV' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/virginia-city-nv-2.jpg', full: '/assets/personnel/application-gallery/virginia-city-nv-2.jpg', name: 'Virginia City, NV' },
                ].map((image, idx) => (
                  <div key={idx} className="text-center">
                    <div 
                      className="relative mb-0 overflow-hidden rounded-lg cursor-pointer transition-all"
                      style={{ width: '50%', aspectRatio: '1', margin: '0 auto' }}
                      onClick={() => setFullscreenImage(image)}
                    >
                      <img 
                        src={image.thumb}
                        alt={`${image.name} abandoned mine site`}
                        className="absolute inset-0 w-full h-full object-cover kodachrome-filter"
                        style={{ 
                          objectPosition: 'center'
                        }}
                        ref={(el) => {
                          if (el) {
                            const observer = new IntersectionObserver(
                              ([entry]) => {
                                if (entry.isIntersecting) {
                                  el.style.filter = 'sepia(0.2) saturate(0.8) hue-rotate(10deg) contrast(1.1) brightness(0.95)';
                                } else {
                                  el.style.filter = 'sepia(0.4) saturate(0.9) hue-rotate(15deg) contrast(1.2) brightness(0.3)';
                                }
                              },
                              { threshold: 0.3 }
                            );
                            observer.observe(el);
                          }
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-300 font-light text-center font-sans mt-1">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Inspiration */}
              <div className="mt-16 max-w-4xl">
                <p className="text-base leading-relaxed font-light text-gray-400">
                  Inspired in no small part by my grandfathers.
                </p>
              </div>
              
              {/* Grandfathers Photos */}
              <div className="flex gap-4 mt-8 justify-start flex-wrap">
                {[
                  { thumb: '/assets/personnel/application-gallery/thumbs/oliver.jpg?v=2', full: '/assets/personnel/application-gallery/oliver.jpg?v=2', name: 'Oliver Carter, Searching for Lasseter\'s Reef c.a. 1970s' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/oliver-tanami.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-tanami.jpg?v=1', name: 'Oliver Carter, Tanami Desert' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/oliver-heap-leach.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-heap-leach.jpg?v=1', name: 'Oliver Carter, Heap Leaching Operation' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/oliver-cyaniding-for-gold.jpg?v=1', full: '/assets/personnel/application-gallery/oliver-cyaniding-for-gold.jpg?v=1', name: 'Oliver Carter, Gold Cyanidation Process' },
                  { thumb: '/assets/personnel/application-gallery/thumbs/keith.jpg?v=2', full: '/assets/personnel/application-gallery/keith.jpg?v=2', name: 'Keith Hughes, Exploration Geologist, Northern Territory' },
                ].map((image, idx) => (
                  <div key={idx} className="text-center" style={{ width: '120px' }}>
                    <div 
                      className="relative mb-0 overflow-hidden rounded-lg cursor-pointer transition-all"
                      style={{ width: '120px', height: '120px' }}
                      onClick={() => setFullscreenImage(image)}
                    >
                      <img 
                        src={image.thumb}
                        alt={`${image.name}`}
                        className="absolute inset-0 w-full h-full object-cover kodachrome-filter"
                        style={{ 
                          objectPosition: 'center',
                          filter: 'sepia(0.2) saturate(0.8) hue-rotate(10deg) contrast(1.1) brightness(0.95)'
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-300 font-light text-center font-sans mt-1">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Fullscreen Image Modal */}
          {fullscreenImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setFullscreenImage(null)}
            >
              <img 
                src={fullscreenImage.full}
                alt={fullscreenImage.name}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg kodachrome-filter"
                style={{
                  filter: fullscreenImage.full?.includes('tower-hill') ? 'sepia(0.6) hue-rotate(60deg) saturate(2.4)' :
                          fullscreenImage.full?.includes('dittmer') ? 'sepia(0.5) hue-rotate(15deg) saturate(2.5) brightness(1.1)' :
                          fullscreenImage.full?.includes('governor-norman') ? 'sepia(0.8) hue-rotate(-30deg) saturate(3.6) contrast(1.2)' :
                          'sepia(0.2) saturate(0.8) hue-rotate(10deg) contrast(1.1) brightness(0.95)'
                }}
              />
              <button 
                className="absolute top-8 right-8 text-white hover:text-cyan-400 transition-colors"
                onClick={() => setFullscreenImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          )}

          </div>
        </div>
      </div>
      {/* Build hash */}
      <div className="fixed bottom-2 right-2 text-xs text-gray-600 font-mono opacity-30 hover:opacity-60 transition-opacity">
        build {Date.now().toString(36).slice(-6)}
      </div>
    </>
  );
};

export default CandidateApplication;