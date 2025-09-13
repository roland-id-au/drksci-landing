import React from 'react';

const VisionStatementSection = () => {
  return (
    <section id="vision-statement" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="mb-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-4 px-4 sm:px-8">VISION: STATEMENT</h2>
      </div>
      <div className="max-w-4xl px-4 sm:px-8 mt-8">
        {/* Note: Vision Statement uses sans-serif font (like Resume/Reflection sections) - only Cover Letter uses serif */}
        {/* Introduction */}
        <div id="background-vision" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Introduction</h3>
          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            Twenty years ago, I descended into my first abandoned mine shaft. What began as adventure became passion, then discipline, and now—opportunity to serve. Hundreds of sites later, I've witnessed firsthand both the hidden dangers and untapped potential beneath Queensland's surface.
          </p>
          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            As CEO of <a href="https://www.valueprosoftware.com" target="_blank" rel="noopener noreferrer" className="company-badge"><img src="/assets/brand/valuepro-favicon.png" className="inline w-3 h-3 mr-1" alt="" />ValuePRO Software</a>, I learned to transform complex legacy systems into productive assets. But it's underground, navigating forgotten workings and documenting forgotten histories, where I discovered my true calling: turning liabilities into legacies.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Queensland's abandoned mines aren't just safety challenges—they're sleeping assets waiting for the right vision. My external perspective, unencumbered by "how we've always done it," combined with deep technical leadership and genuine domain passion, positions me to evolve the AMLP from reactive hazard management toward proactive transformation that balances safety, heritage, and opportunity.
          </p>
        </div>

        {/* Strategic Pillars */}
        <div id="strategic-pillars" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Pillars</h3>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            My conceptual approach to Queensland's Abandoned Mine Lands Program is grounded in four core tenets developed through 20+ years of hands-on exploration and executive leadership experience:
          </p>
          <div className="space-y-6">
            <div>
              {/* HARMONIZED: Numbered item heading */}
              <h4 className="text-sm font-normal text-gray-400 mb-2">1. Awareness</h4>
              <p className="text-base leading-relaxed text-gray-300">
                The idiom "You can't manage what you can't see" represents both a key challenge and opportunity in abandoned mine management. Situational awareness requires a confluence of information to make data-driven decisions, yet is difficult to scale across thousands of sites in inventory. Humans can only maintain so many sites in inventory and corresponding registers at once, making it vital to adopt a systemised approach that automates integration—including gaps in data—and delivers meaningful insights to drive the right decisions and prioritise resources effectively.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-normal text-gray-400 mb-2">2. Insights</h4>
              <p className="text-base leading-relaxed text-gray-300">
                Data-driven decision making that reveals patterns and possibilities others miss
              </p>
            </div>
            <div>
              <h4 className="text-sm font-normal text-gray-400 mb-2">3. Integration</h4>
              <p className="text-base leading-relaxed text-gray-300">
                Bringing together systems, stakeholders, and solutions into cohesive transformation
              </p>
            </div>
            <div>
              <h4 className="text-sm font-normal text-gray-400 mb-2">4. Engagement</h4>
              <p className="text-base leading-relaxed text-gray-300">
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
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Scope</h3>
          
          <div className="space-y-8">
            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">1. Abandoned Mine Lands Program Evolution</h4>
              <p className="text-base text-gray-300 mb-2">
                Transform AMLP from reactive hazard management to proactive asset transformation ecosystem, expanding beyond the current 120 complex sites to systematically address Queensland's full inventory while balancing safety, heritage, and productivity opportunities.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">2. Risk & Prioritisation Framework Innovation</h4>
              <p className="text-base text-gray-300 mb-2">
                Enhance the 2021 framework with predictive modeling, AI-driven risk assessment, and dynamic prioritisation that adapts to changing conditions, optimising safety outcomes while accelerating identification of viable re-commercialisation opportunities.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">3. Repurposing & Re-commercialisation Innovation</h4>
              <p className="text-base text-gray-300 mb-2">
                Expand the Wolfram Camp pilot success into a systematic program identifying renewable energy, critical minerals, tourism, and alternative land use opportunities, creating jobs in regional communities while reducing government liability.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">4. Digital & Spatial Systems Transformation</h4>
              <p className="text-base text-gray-300 mb-2">
                Implement next-generation spatial and analytical data systems combining LiDAR scanning, drone surveillance, IoT monitoring, and AI analytics for comprehensive site monitoring and predictive modeling.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">5. Indigenous Partnership & Cultural Heritage</h4>
              <p className="text-base text-gray-300 mb-2">
                Integrate Traditional Owner knowledge, cultural protocols, and community aspirations into all aspects of abandoned mine management, strengthening cultural preservation while improving reconciliation outcomes.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-6">
              {/* HARMONIZED: Content heading */}\n              <h4 className="text-lg font-normal text-white mb-3">6. Financial & Partnership Innovation</h4>
              <p className="text-base text-gray-300 mb-2">
                Develop diversified funding portfolio combining government investment with private partnerships, carbon credit monetisation, and revenue-generating repurposing initiatives to enhance program sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionStatementSection;