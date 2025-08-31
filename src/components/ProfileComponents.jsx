import React from 'react';

// Company favicons mapping
const companyFavicons = {
  'd/rksci': 'https://drksci.com/favicon.ico',
  'ValuePRO Software (Constellation Software)': 'https://www.csisoftware.com/favicon.ico',
  'ValuePRO Software': 'https://www.valueprosoftware.com/favicon.ico',
  'Constellation Software': 'https://www.csisoftware.com/favicon.ico'
};

const getFavicon = (company) => {
  // Try exact match first
  if (companyFavicons[company]) return companyFavicons[company];
  
  // Try partial matches
  for (const [key, value] of Object.entries(companyFavicons)) {
    if (company.includes(key) || key.includes(company)) {
      return value;
    }
  }
  
  return null;
};

// Executive Summary Component
export const ExecutiveSummary = ({ summary, focusAreas }) => (
  <div id="executive-summary" className="mb-20">
    <h2 className="text-sm font-medium mb-12 text-gray-500 tracking-wider uppercase">Summary</h2>
    <div className="max-w-4xl">
      <p className="text-xl leading-relaxed mb-8 font-light text-gray-300">
        {summary}
      </p>
      {focusAreas && (
        <p className="text-xl leading-relaxed font-light text-gray-300">
          {focusAreas}
        </p>
      )}
    </div>
  </div>
);

// Professional Experience Component
export const ProfessionalExperience = ({ experiences }) => (
  <div id="experience" className="mb-20">
    <h2 className="text-sm font-medium mb-12 text-gray-500 tracking-wider uppercase">Experience</h2>
    
    {experiences.map((exp, idx) => {
      // Special condensed styling for "Earlier Career" section
      const isEarlierCareer = exp.title === "Earlier Career";
      
      return (
        <div key={idx} className="mb-20 pb-20 border-b border-gray-800 experience-item">
          <div className={isEarlierCareer ? "mb-6" : "mb-8 experience-header"}>
            <h3 className={isEarlierCareer ? "text-sm font-medium mb-3 text-gray-500 tracking-wider uppercase" : "text-2xl font-light mb-3 tracking-wide experience-title text-gray-200"}>{exp.title}</h3>
            {!isEarlierCareer && (
              <>
                <div className="flex items-center space-x-2 mb-3">
                  {getFavicon(exp.company) && (
                    <img 
                      src={getFavicon(exp.company)} 
                      alt={`${exp.company} logo`}
                      className="w-4 h-4 opacity-60"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <p className="text-gray-400 font-light text-lg tracking-wide experience-company">
                    {exp.company} • {exp.period}
                  </p>
                </div>
                {exp.tags && (
                  <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                    {exp.tags}
                  </p>
                )}
              </>
            )}
          </div>
          
          {exp.description && (
            <p className="text-xl leading-relaxed mb-8 font-light text-gray-300 max-w-4xl">
              {exp.description}
            </p>
          )}
          
          {exp.accomplishments && (
            <div className={isEarlierCareer ? "" : "mt-8"}>
              {!isEarlierCareer && (
                <h4 className="text-xs font-light text-gray-400 mb-6 tracking-[0.3em] uppercase">
                  Key Accomplishments
                </h4>
              )}
              <div className={isEarlierCareer ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs" : "space-y-4 max-w-4xl"}>
                {exp.accomplishments.map((item, itemIdx) => (
                  isEarlierCareer ? (
                    <div key={itemIdx} className="py-3 border-b border-gray-800">
                      <span className="text-gray-300 font-light">{item}</span>
                    </div>
                  ) : (
                    <div key={itemIdx} className="flex items-baseline">
                      <span className="text-gray-400 mr-4 font-light flex-shrink-0">/</span>
                      <p className="text-lg font-light text-gray-300">{item}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          
          {exp.projects && (
          <div className="mt-10">
            <h4 className="text-xs font-light text-gray-400 mb-6 tracking-[0.3em] uppercase">Projects</h4>
            <div className="space-y-4 max-w-4xl">
              {exp.projects.map((project, projectIdx) => (
                <div key={projectIdx} className="flex items-baseline">
                  <span className={`text-${project.color}-400 mr-4 font-light flex-shrink-0`}>/</span>
                  <div className="text-lg font-light text-gray-300">
                    <a href={project.url} className={`text-${project.color}-400 hover:text-${project.color}-300 transition-colors border-b border-transparent hover:border-${project.color}-300 font-medium inline-flex items-center gap-1`}>
                      {project.name}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                    <span> - {project.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {exp.research && (
          <div className="mt-10">
            <h4 className="text-xs font-light text-gray-400 mb-6 tracking-[0.3em] uppercase">Research</h4>
            <div className="space-y-4 max-w-4xl">
              {exp.research.map((item, researchIdx) => (
                <div key={researchIdx} className="flex items-baseline">
                  <span className={`text-${item.color}-400 mr-4 font-light flex-shrink-0`}>/</span>
                  <div className="text-lg font-light text-gray-300">
                    <a href={item.url} className={`text-${item.color}-400 hover:text-${item.color}-300 transition-colors border-b border-transparent hover:border-${item.color}-300 font-medium inline-block`}>
                      {item.name}
                    </a>
                    <span> - {item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      );
    })}
  </div>
);

// Core Competencies Component
export const CoreCompetencies = ({ skills }) => (
  <div id="competencies" className="mb-20">
    <h2 className="text-sm font-medium mb-12 text-gray-500 tracking-wider uppercase">Competencies</h2>
    <div className="max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs">
        {Object.entries(skills).map(([category, skillList], idx) => (
          <div key={idx} className="py-3 border-b border-gray-800">
            <span className="text-gray-500 font-light block mb-1">{category}</span>
            <span className="text-gray-300 font-light">{skillList}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Education Component
export const Education = ({ education }) => (
  <div id="education" className="mb-20">
    <h2 className="text-sm font-medium mb-12 text-gray-500 tracking-wider uppercase">Education</h2>
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
        {Object.entries(education).map(([category, detail], idx) => (
          <div key={idx} className="py-3 border-b border-gray-800">
            <span className="text-gray-500 font-light block mb-1">{category}</span>
            <span className="text-gray-300 font-light">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);