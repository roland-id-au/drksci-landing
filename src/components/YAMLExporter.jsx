import React, { useEffect, useState } from 'react';
import { generateYAMLResume } from '../utils/yamlFragmentMapper';
import yaml from 'js-yaml';

const YAMLExporter = ({ profileData, onYAMLGenerated }) => {
  const [yamlData, setYamlData] = useState(null);
  const [yamlString, setYamlString] = useState('');

  useEffect(() => {
    if (profileData) {
      const yamlResumeData = generateYAMLResume(profileData);
      setYamlData(yamlResumeData);

      // Convert to YAML string
      const yamlStr = yaml.dump(yamlResumeData, {
        indent: 2,
        lineWidth: -1, // No line wrapping
        noRefs: true,
        quotingType: '"'
      });
      setYamlString(yamlStr);

      // Notify parent component
      if (onYAMLGenerated) {
        onYAMLGenerated(yamlResumeData, yamlStr);
      }
    }
  }, [profileData, onYAMLGenerated]);

  const downloadYAML = () => {
    const blob = new Blob([yamlString], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blake-carter-resume.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="yaml-exporter hidden">
      {/* Hidden component that generates YAML in background */}
      {yamlString && (
        <div className="yaml-output">
          <button
            onClick={downloadYAML}
            className="download-yaml-btn"
            style={{ display: 'none' }}
          >
            Download YAML Resume
          </button>
          <pre className="yaml-content" style={{ display: 'none' }}>
            {yamlString}
          </pre>
        </div>
      )}
    </div>
  );
};

export default YAMLExporter;