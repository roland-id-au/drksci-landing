import React from 'react';

const VisionStorytellingSection = () => {
  return (
    <section id="vision-storytelling" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="mb-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-4 px-4 sm:px-8">VISION: STORYTELLING</h2>
      </div>
      <div className="max-w-4xl mt-8">
        
        {/* Opening Vision Statement */}
        <div className="mb-16 px-4 sm:px-8">
          <div className="mb-8">
            <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Environmental Communication Framework</h3>
            <p className="text-lg leading-relaxed mb-6 text-gray-300 font-light">
              Queensland's Abandoned Mines Program addresses environmental challenges left by historical mining operations. The work involves complex science and engineering applied to landscapes affected by decades or centuries of industrial activity.
            </p>
            <div className="border-l-2 border-blue-500/30 pl-6 my-8">
              <p className="text-xl font-light italic text-blue-300 mb-4">
                "Environmental restoration requires both technical expertise and clear communication about its purpose and outcomes."
              </p>
            </div>
            <p className="text-lg leading-relaxed text-gray-300 font-light">
              Effective communication about this work goes beyond technical reports. It involves explaining the environmental, social, and economic context of restoration projects and their outcomes for local communities.
            </p>
          </div>
        </div>

        {/* Three Pillars Framework */}
        <div id="three-pillars" className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Three Pillars of Impact</h3>
          <p className="text-lg font-light leading-relaxed mb-12 text-gray-300">
            Every story we tell follows this framework—ensuring our communication is as precise and effective as our environmental solutions.
          </p>

          <div className="space-y-12">
            {/* Pillar 1: Human Stories */}
            <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
              <div className="flex items-start mb-6">
                <span className="text-blue-400 mr-4 font-light text-xl flex-shrink-0">01</span>
                <div>
                  <h4 className="text-xl font-light text-white mb-4 tracking-wide">Human Stories</h4>
                  <p className="text-lg font-light leading-relaxed mb-4 text-gray-300">
                    Environmental restoration projects involve multiple stakeholders, including Traditional Owners with deep knowledge of Country, local contractors, and communities affected by both historical mining and current remediation work.
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    This approach provides context for the work and its broader significance.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Visual Evidence */}
            <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
              <div className="flex items-start mb-6">
                <span className="text-green-400 mr-4 font-light text-xl flex-shrink-0">02</span>
                <div>
                  <h4 className="text-xl font-light text-white mb-4 tracking-wide">Visual Evidence</h4>
                  <p className="text-lg font-light leading-relaxed mb-4 text-gray-300">
                    Documentation includes before-and-after imagery and accessible explanations of technical processes involved in environmental restoration.
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    Visual documentation helps communicate complex technical work to diverse audiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Lasting Impact */}
            <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
              <div className="flex items-start mb-6">
                <span className="text-purple-400 mr-4 font-light text-xl flex-shrink-0">03</span>
                <div>
                  <h4 className="text-xl font-light text-white mb-4 tracking-wide">Lasting Impact</h4>
                  <p className="text-lg font-light leading-relaxed mb-4 text-gray-300">
                    Project documentation connects specific outcomes to broader environmental and community objectives.
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    This helps demonstrate how individual projects contribute to larger environmental management goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Introduction */}
        <div id="case-study" className="mb-16 px-4 sm:px-8">
          <div className="text-center mb-12">
            <h3 className="text-sm font-light mb-8 text-gray-400 tracking-[0.3em] uppercase">Case Study</h3>
            <h4 className="text-2xl font-light text-white mb-6 tracking-wide">Environmental restoration at Mount Bischoff</h4>
            <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto">
              How technical excellence becomes compelling narrative
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-16 px-4 sm:px-8">
          <div className="relative">
            <img 
              src="/assets/storytelling/mount-bischoff/hero-tasmania-mountains.jpg" 
              alt="Mount Bischoff landscape" 
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-sm text-gray-200 italic">
                Mount Bischoff, Tasmania — Where 150 years of mining history meets modern environmental restoration
              </p>
            </div>
          </div>
        </div>

        {/* Traditional Knowledge */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Traditional Knowledge</h3>
          <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/20">
            <p className="text-lg font-light leading-relaxed mb-4 text-gray-300 italic">
              "For over 35,000 years, the Palawa people walked these lands, including the bands of the Peternidic (Pieman River) region. Their sophisticated understanding of Country included small-scale mining of ochre, flints, and other resources—evidence that this landscape has always been known for its mineral wealth."
            </p>
            <p className="text-sm text-gray-400">
              — Traditional knowledge honoring Tasmania's First Peoples
            </p>
          </div>
        </div>

        {/* Historical Context */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Historical Discovery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img 
                src="/assets/storytelling/bischoff-historic/philosophersmithorig.jpg" 
                alt="James 'Philosopher' Smith" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                James "Philosopher" Smith, 1871
              </p>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg font-light leading-relaxed text-gray-300">
                In 1871, James "Philosopher" Smith discovered tin deposits at Mount Bischoff. The subsequent mining operation operated for over 70 years, extracting approximately 62,000 tonnes of tin and becoming one of Tasmania's most significant mineral resources.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-300">
                Mining operations ceased in the mid-20th century, leaving behind typical challenges associated with abandoned mine sites: acid mine drainage affecting local waterways. This environmental legacy required specialized remediation approaches.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src="/assets/storytelling/bischoff-historic/waratahfrombischoff.jpg" 
              alt="Historic Waratah township" 
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-400 text-center mt-4">
              Waratah township from Mt. Bischoff, c. 1890
            </p>
          </div>
        </div>

        {/* Industrial Legacy */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Industrial Legacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <p className="text-lg font-light leading-relaxed text-gray-300">
                The Mount Bischoff operation involved significant landscape modification, including open-pit mining, processing facilities, and transportation infrastructure connecting the remote site to regional markets.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-300">
                Historical mining techniques and the scale of operations created environmental challenges that required modern remediation approaches to address.
              </p>
            </div>
            <div>
              <img 
                src="/assets/storytelling/bischoff-historic/Orekarts1895.jpg" 
                alt="1895 mining operations" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                Mining operations, 1895
              </p>
            </div>
          </div>

          {/* Historical Infrastructure */}
          <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/20 mb-8">
            <p className="text-lg font-light leading-relaxed mb-6 text-gray-300 italic">
              Historical records show Mount Bischoff was an early adopter of hydroelectric power in Australia, installing generators in 1883 to power mining operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src="/assets/storytelling/bischoff-historic/cablebuckets.jpg" 
                  alt="Cable transport system" 
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-sm text-gray-400 text-center">Cable transport system</p>
              </div>
              <div>
                <img 
                  src="/assets/storytelling/bischoff-historic/trainonbridge2.jpg" 
                  alt="Historic railway bridge" 
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-sm text-gray-400 text-center">Railway infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Challenge */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">The Environmental Challenge</h3>
          <div className="mb-8">
            <img 
              src="/assets/storytelling/bischoff-modern/_4160440.JPG" 
              alt="Mount Bischoff open pit showing acid mine drainage staining" 
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-400 text-center mt-4">
              Mount Bischoff open pit showing evidence of acid mine drainage
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-lg font-light leading-relaxed text-gray-300">
              The primary environmental challenge at Mount Bischoff was acid mine drainage - a common issue at abandoned mine sites where sulfide minerals in exposed rock react with water and oxygen to produce acidic runoff.
            </p>
            <p className="text-lg font-light leading-relaxed text-gray-300">
              This process can continue for decades after mining operations cease, affecting water quality in surrounding areas and requiring ongoing management.
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">The Solution</h3>
          <div className="space-y-6 mb-8">
            <p className="text-lg font-light leading-relaxed text-gray-300">
              The remediation approach involved designing treatment systems that use natural processes - combining geological and biological methods to address contaminated drainage from the former mine site.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="/assets/storytelling/bischoff-modern/_6100128.JPG" 
                alt="Remediation equipment in winter" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                Remediation equipment during winter conditions
              </p>
            </div>
            <div>
              <img 
                src="/assets/storytelling/bischoff-modern/_6100127.JPG" 
                alt="Treatment pond in winter" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                Treatment pond system
              </p>
            </div>
          </div>
        </div>

        {/* Results: Environmental Restoration */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Results: Environmental Restoration</h3>
          <p className="text-lg font-light leading-relaxed text-gray-300 mb-8">
            Treatment systems have resulted in improved water quality in affected waterways.
          </p>
          
          <div className="mb-8">
            <img 
              src="/assets/storytelling/bischoff-modern/_6100134.JPG" 
              alt="Mount Bischoff restoration overview" 
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-400 text-center mt-4">
              Aerial view of Mount Bischoff remediation site
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src="/assets/storytelling/mount-bischoff/clean-wetlands-after.jpg" 
                alt="Clean wetlands restoration" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                Wetland treatment area
              </p>
            </div>
            <div>
              <img 
                src="/assets/storytelling/bischoff-modern/_6100137.JPG" 
                alt="Modern site infrastructure" 
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm text-gray-400 text-center">
                Site infrastructure
              </p>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <p className="text-lg font-light leading-relaxed text-gray-300">
              Remediation work at the site has improved environmental conditions and created potential opportunities for heritage tourism, including a proposed interpretive trail highlighting both the area's mining history and environmental restoration.
            </p>
            <p className="text-lg font-light leading-relaxed text-gray-300">
              The project demonstrates how environmental restoration can address historical mining impacts while acknowledging Traditional Owner knowledge and involving local communities in the process.
            </p>
          </div>

          {/* Environmental Recovery */}
          <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/20">
            <p className="text-lg font-light leading-relaxed mb-4 text-gray-300">
              Environmental monitoring indicates the return of native fauna to the area, including platypus, echidnas, and various bird species native to Tasmania.
            </p>
            <p className="text-lg font-light leading-relaxed text-gray-300">
              Native vegetation has begun reestablishing in treated areas, including species typical of the region such as button grass, tea trees, and eucalyptus. Tasmania supports approximately 2,000 native plant species, with about 300 endemic to the island.
            </p>
          </div>
        </div>

        {/* Communication Philosophy */}
        <div className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Communication Philosophy</h3>
          <div className="border-l-4 border-blue-500/30 pl-8">
            <p className="text-xl font-light leading-relaxed text-blue-200 mb-6">
              Transform complex environmental restoration into accessible narratives that honor both scientific rigor and community understanding.
            </p>
            <p className="text-lg font-light leading-relaxed text-gray-300">
              By connecting technical achievements to human stories and lasting environmental benefits, we create communication that serves both accountability and engagement objectives—essential for sustained public support of restoration programs.
            </p>
          </div>
        </div>

        {/* Digital Innovation */}
        <div id="digital-innovation" className="mb-16 px-4 sm:px-8">
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Digital Innovation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-light text-white tracking-wide">AMLP Field App</h4>
              <p className="text-base font-light leading-relaxed text-gray-300">
                A mobile application enabling instant hazard reporting from field sites, transforming data collection from hours to minutes while maintaining rigorous documentation standards.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Offline Capable</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">GPS Integration</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Risk Framework</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-light text-white tracking-wide">Stakeholder Engagement</h4>
              <p className="text-base font-light leading-relaxed text-gray-300">
                Digital platforms that connect technical restoration work to community outcomes, creating transparency and supporting meaningful consultation with Traditional Owners and local communities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Real-time Updates</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Visual Documentation</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Community Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Vision Statement */}
        <div className="mb-16 px-4 sm:px-8">
          <div className="text-center border-t border-gray-800 pt-16">
            <h3 className="text-2xl font-light text-white mb-6 tracking-wide">Environmental restoration in practice</h3>
            <p className="text-lg font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Addressing historical mining impacts through science-based approaches that consider environmental, cultural, and community contexts—transforming complex technical work into accessible narratives that build understanding and support for restoration programs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionStorytellingSection;