import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { validateMagicLink } from './utils/validateMagicLink';
import { blakeProfileData } from './data/blakeProfile';
import { ExecutiveSummary, ProfessionalExperience, CoreCompetencies, Education } from './components/ProfileComponents';
import PdfVersion from './components/PdfVersion';
import CoverLetterSection from './components/sections/CoverLetterSection';
import VisionStatementSection from './components/sections/VisionStatementSection';
import VisionStorytellingSection from './components/sections/VisionStorytellingSection';
import CanaryAppSection from './components/sections/CanaryAppSection';
import ResumeSection from './components/sections/ResumeSection';
import ReflectionSection from './components/sections/ReflectionSection';
import mermaid from 'mermaid';
import './styles/pageflow.css';

// Candidate Presentation Page - For Hiring Managers/Recruiters
// URL Structure: /collaborator/[collaborator-name]/job/[job-id]
// Example: /collaborator/blake/job/qld-655778-25
// This page presents the candidate's application in a professional format for review
const CandidateApplication = () => {
  const { collaborator, shortId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Extract job ID from different URL formats
  let jobId = '';
  if (shortId) {
    // Direct shortId route like /j/qld-655778-25
    jobId = shortId;
  } else if (location.pathname.includes('/collaborator/')) {
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
    'vision-storytelling': 'Storytelling',
    'three-pillars': 'Three Pillars',
    'case-study': 'Case Study',
    'digital-innovation': 'Digital Innovation',
    'canary-app': 'Canary App',
    'user-stories': 'User Stories',
    'workflow': 'Workflow',
    'dashboard': 'Dashboard',
    'executive-summary': 'Summary',
    'experience': 'Experience',
    'competencies': 'Competencies',
    'education': 'Education'
  };
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isHoveringRef, setIsHoveringRef] = useState(false);
  const [copied, setCopied] = useState(false);
  const mermaidRef = useRef(null);

  // Disable mermaid for now - causing runtime errors

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
        'canary-app',
        'vision-storytelling',
        'resume',
        'reflection'
      ];
      
      // Include subsections
      const subsections = [
        'background-vision',
        'strategic-pillars',
        'vision-areas',
        'three-pillars',
        'case-study', 
        'digital-innovation',
        'user-stories',
        'mobile-app-screens',
        'amlp-staff-dashboard',
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
      } else if (currentSection === 'canary-app') {
        relevantSubsections = ['user-stories', 'mobile-app-screens', 'amlp-staff-dashboard'];
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
          {/* HARMONIZED: Error heading */}
          <h2 className="text-xl font-light mb-4 text-white">Link Expired</h2>
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
          {/* HARMONIZED: Error heading */}
          <h2 className="text-xl font-light mb-4 text-white">Authentication Required</h2>
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
                  {/* HARMONIZED: Label text */}
                  <div className="px-3 text-xs text-gray-400 uppercase tracking-wider font-normal" style={{ width: '45px' }}>REF</div>
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
                {/* HARMONIZED: Field label */}
                <div className="text-xs text-gray-300 uppercase tracking-wider mb-2 font-normal">Applicant</div>
                {/* HARMONIZED: Field value */}
                <div className="text-sm font-normal text-white flex items-center justify-between">
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
                {/* HARMONIZED: Field label */}
                <div className="text-xs text-gray-300 uppercase tracking-wider mb-2 font-normal">Position</div>
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
                      activeSection === 'cover-letter' ? 'text-white font-normal' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Cover Letter
                  </button>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'vision-statement' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('vision-statement').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'vision-statement' ? 'text-white font-normal' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Vision: Statement
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
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'canary-app' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('canary-app').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'canary-app' ? 'text-white font-normal' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Vision: Canary App
                  </button>
                  <div className="space-y-1 pb-2">
                    <button
                      onClick={() => document.getElementById('user-stories').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'user-stories' ? 'text-gray-100' : (activeSection === 'canary-app' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      User Stories
                    </button>
                    <button
                      onClick={() => document.getElementById('workflow').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'workflow' ? 'text-gray-100' : (activeSection === 'canary-app' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Workflow
                    </button>
                    <button
                      onClick={() => document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'dashboard' ? 'text-gray-100' : (activeSection === 'canary-app' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Dashboard
                    </button>
                  </div>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'vision-storytelling' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('vision-storytelling').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'vision-storytelling' ? 'text-white font-normal' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Vision: Storytelling
                  </button>
                  <div className="space-y-1 pb-2">
                    <button
                      onClick={() => document.getElementById('three-pillars').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'three-pillars' ? 'text-gray-100' : (activeSection === 'vision-storytelling' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Three Pillars
                    </button>
                    <button
                      onClick={() => document.getElementById('case-study').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'case-study' ? 'text-gray-100' : (activeSection === 'vision-storytelling' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Case Study
                    </button>
                    <button
                      onClick={() => document.getElementById('digital-innovation').scrollIntoView({ behavior: 'smooth' })}
                      className={`block w-full text-left text-xs transition-colors pl-4 ${
                        activeSubsection === 'digital-innovation' ? 'text-gray-100' : (activeSection === 'vision-storytelling' ? 'text-gray-400' : 'text-gray-500 hover:text-gray-300')
                      }`}
                    >
                      Digital Innovation
                    </button>
                  </div>
                </div>
                <div className={`rounded transition-all py-1 px-2 ${activeSection === 'resume' ? 'bg-gray-700/30 border-l-2 border-white' : 'bg-transparent'}`}>
                  <button
                    onClick={() => document.getElementById('resume').scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full text-left text-sm py-2 px-2 transition-all ${
                      activeSection === 'resume' ? 'text-white font-normal' : 'text-gray-300 hover:text-white'
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
                      activeSection === 'reflection' ? 'text-white font-normal bg-gray-700/30 border-l-2 border-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/20'
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
            lightFilename={`blake-carter-${jobId || 'resume'}-light.pdf`}
            className="ml-2"
            variant="linkedin"
          />
        </div>

        {/* Initial Sticky Header - only visible when scrolled */}
        {showStickyHeader && (
          <div className="fixed left-72 right-0 z-10 bg-black flex items-center" style={{ top: '0px', height: '80px', borderBottom: '1px dotted rgba(107, 114, 128, 0.3)', paddingTop: '25px', paddingBottom: '25px' }}>
            <div className="px-4 sm:px-8">
              {/* HARMONIZED: Section header */}
              <h2 className="text-2xl font-light text-gray-400 tracking-wider animate-fade-in">
                {activeSection === 'cover-letter' && (
                  <>
                    COVER LETTER
                  </>
                )}
                {activeSection === 'vision-exploration' && (
                  <>
                    VISION EXPLORATION
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-xl text-gray-500 ml-3 font-light tracking-wider"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'vision-statement' && (
                  <>
                    VISION STATEMENT
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-xl text-gray-500 ml-3 font-light tracking-wider"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'vision-storytelling' && (
                  <>
                    VISION: STORYTELLING
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-xl text-gray-500 ml-3 font-light tracking-wider"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
                    )}
                  </>
                )}
                {activeSection === 'resume' && (
                  <>
                    RESUME
                    {activeSubsection && subsectionLabels[activeSubsection] && (
                      <span className="text-xl text-gray-500 ml-3 font-light tracking-wider"> / {subsectionLabels[activeSubsection].toUpperCase()}</span>
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
          <CoverLetterSection />

          {/* Vision Statement Section */}
          <VisionStatementSection />

          {/* Canary App Section */}
          <CanaryAppSection />

          {/* Vision: Storytelling Section */}
          <VisionStorytellingSection />

          {/* Resume Section */}
          <ResumeSection blakeProfileData={blakeProfileData} />

          {/* Reflection Section */}
          <ReflectionSection setFullscreenImage={setFullscreenImage} />

          
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