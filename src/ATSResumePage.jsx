import React, { useEffect, useState } from 'react';
import ATSTemplate from './components/ATSTemplate';
import { generateYAMLResume } from './utils/yamlFragmentMapper';
import { blakeProfileData } from './data/blakeProfile';

const ATSResumePage = () => {
  const [yamlData, setYamlData] = useState(null);

  useEffect(() => {
    // Generate YAML data from Blake's profile
    const yamlResumeData = generateYAMLResume(blakeProfileData);
    setYamlData(yamlResumeData);

    // Store globally for PDF generation
    window.blakeATSResumeData = yamlResumeData;
  }, []);

  return (
    <div className="ats-resume-page" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {yamlData && <ATSTemplate yamlData={yamlData} />}
    </div>
  );
};

export default ATSResumePage;