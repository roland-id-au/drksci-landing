import React from 'react';

const CoverLetterSection = () => {
  return (
    <section id="cover-letter" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="mb-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-4 px-4 sm:px-8">COVER LETTER</h2>
      </div>
      <div className="max-w-4xl mt-8">
        
        {/* PRESERVED: Cover Letter section uses serif font (serif-cover-letter class) for body text */}
        {/* Source Serif 4 font preserved for formal letter content */}
        
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
          {/* HARMONIZED: Subsection label - preserving Executive Summary style */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase px-4 sm:px-8">Motivation</h3>
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
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase px-4 sm:px-8">Leadership</h3>
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
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase px-4 sm:px-8">Innovation</h3>
          <div className="px-4 sm:px-8">
            <p className="text-lg leading-relaxed text-gray-300 serif-cover-letter">
              Through founding <a href="https://drksci.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/drksci-favicon.svg" className="inline w-3 h-3 mr-1" alt="" />d/rksci</a> as an innovation laboratory, I've developed expertise in applying emerging technologies to complex challenges, including AI-powered terrain analysis and historical data preservation platforms. My technical architecture background provides the foundation needed to modernise spatial and analytical data systems while establishing operational frameworks that support sustained programme growth.
            </p>
          </div>
        </div>

        {/* Management */}
        <div id="management" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase px-4 sm:px-8">Management</h3>
          <div className="px-4 sm:px-8">
            <p className="text-lg leading-relaxed mb-4 text-gray-300 serif-cover-letter">
              My entrepreneurial experience has required extensive stakeholder management in complex regulatory environments. I'm particularly committed to fostering meaningful partnerships with Traditional Owners, local communities, and businesses, understanding that abandoned mines represent both safety challenges and historical assets requiring culturally sensitive approaches.
            </p>
            {/* Values Alignment - Simple Flow */}
            <div className="mt-6 mb-6 p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                {/* My Values */}
                <div className="flex-1 text-right pr-8">
                  <h4 className="text-gray-400 font-light mb-6 text-sm uppercase tracking-wider">My Values</h4>
                  <div className="space-y-4">
                    <div className="text-gray-200 font-light text-sm">Envision the Extraordinary</div>
                    <div className="text-gray-200 font-light text-sm">Collaborate with Charisma</div>
                    <div className="text-gray-200 font-light text-sm">Persevere to Achieve</div>
                  </div>
                </div>

                {/* Flow Arrow */}
                <div className="flex-shrink-0 px-4">
                  <svg width="60" height="40" className="opacity-70">
                    <path d="M 10 20 L 45 20" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                    <path d="M 40 15 L 50 20 L 40 25" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Queensland Values */}
                <div className="flex-1 text-left pl-8">
                  <h4 className="text-gray-400 font-light mb-6 text-sm uppercase tracking-wider">Queensland Values</h4>
                  <div className="space-y-3">
                    <div className="text-gray-100 font-light text-sm">Ideas into action</div>
                    <div className="text-gray-100 font-light text-sm">Empower people</div>
                    <div className="text-gray-100 font-light text-sm">Customers first</div>
                    <div className="text-gray-100 font-light text-sm">Be courageous</div>
                    <div className="text-gray-100 font-light text-sm">Unleash potential</div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-8 italic text-center font-light">
                Personal values flowing into Queensland Government principles
              </p>
            </div>
          </div>
        </div>

        {/* Value */}
        <div id="value" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase px-4 sm:px-8">Value</h3>
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
  );
};

export default CoverLetterSection;