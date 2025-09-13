import React from 'react';
import { ExecutiveSummary, ProfessionalExperience, CoreCompetencies, Education } from '../ProfileComponents';

const ResumeSection = ({ blakeProfileData }) => {
  return (
    <section id="resume" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="mb-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-4 px-4 sm:px-8">RESUME</h2>
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
  );
};

export default ResumeSection;