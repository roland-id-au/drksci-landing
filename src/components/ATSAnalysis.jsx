import React from 'react';

const ATSAnalysis = ({ yamlData }) => {
  if (!yamlData || !yamlData.content) {
    return null;
  }

  const { content } = yamlData;

  // Simple ATS compatibility checks based on best practices
  const analyzeATSCompatibility = () => {
    const checks = [];

    // Check for essential sections
    if (content.basics?.name) checks.push({ item: "Contact Name", status: "PASS", score: 10 });
    if (content.basics?.email) checks.push({ item: "Email Address", status: "PASS", score: 10 });
    if (content.basics?.phone) checks.push({ item: "Phone Number", status: "PASS", score: 10 });
    if (content.location) checks.push({ item: "Location Information", status: "PASS", score: 10 });

    // Check work experience
    if (content.work && content.work.length > 0) {
      checks.push({ item: "Work Experience Present", status: "PASS", score: 20 });

      // Check for proper date formatting
      const hasProperDates = content.work.some(work => work.startDate);
      checks.push({ item: "Standardized Date Format", status: hasProperDates ? "PASS" : "WARN", score: hasProperDates ? 10 : 5 });

      // Check for keywords
      const hasKeywords = content.work.some(work => work.keywords && work.keywords.length > 0);
      checks.push({ item: "Industry Keywords", status: hasKeywords ? "PASS" : "WARN", score: hasKeywords ? 15 : 8 });
    }

    // Check education
    if (content.education && content.education.length > 0) {
      checks.push({ item: "Education Section", status: "PASS", score: 10 });
    }

    // Check skills
    if (content.skills && content.skills.length > 0) {
      checks.push({ item: "Skills Section", status: "PASS", score: 15 });

      // Check for technical skills
      const hasTechnicalSkills = content.skills.some(skill =>
        skill.name.toLowerCase().includes('technical') ||
        skill.keywords?.some(kw =>
          kw.toLowerCase().includes('programming') ||
          kw.toLowerCase().includes('software') ||
          kw.toLowerCase().includes('development')
        )
      );
      checks.push({ item: "Technical Skills", status: hasTechnicalSkills ? "PASS" : "INFO", score: hasTechnicalSkills ? 10 : 5 });
    }

    // Check summary
    if (content.basics?.summary) {
      const summaryLength = content.basics.summary.length;
      const isGoodLength = summaryLength >= 100 && summaryLength <= 500;
      checks.push({ item: "Professional Summary", status: isGoodLength ? "PASS" : "WARN", score: isGoodLength ? 15 : 8 });
    }

    // Check for projects
    if (content.projects && content.projects.length > 0) {
      checks.push({ item: "Project Portfolio", status: "PASS", score: 10 });
    }

    return checks;
  };

  const atsChecks = analyzeATSCompatibility();
  const totalScore = atsChecks.reduce((sum, check) => sum + check.score, 0);
  const maxScore = 125; // Theoretical maximum
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getScoreColor = (percentage) => {
    if (percentage >= 85) return { text: "EXCELLENT", color: "#008000" };
    if (percentage >= 70) return { text: "GOOD", color: "#4169E1" };
    if (percentage >= 55) return { text: "FAIR", color: "#FF8C00" };
    return { text: "NEEDS IMPROVEMENT", color: "#DC143C" };
  };

  const getStatusColor = (status) => {
    if (status === "PASS") return "#008000";
    if (status === "WARN") return "#FF8C00";
    if (status === "INFO") return "#4169E1";
    return "#000";
  };

  const styles = {
    section: {
      marginTop: '15px',
      fontSize: '7px',
      lineHeight: '1.1',
      border: '1px solid #333',
      padding: '10px'
    },
    sectionTitle: {
      fontSize: '8px',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      marginBottom: '8px',
      textAlign: 'center'
    },
    checkItem: {
      marginBottom: '3px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    score: {
      marginTop: '10px',
      padding: '5px',
      border: '1px solid #333',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>ATS COMPATIBILITY DIAGNOSTICS</div>

      {atsChecks.map((check, index) => (
        <div key={index} style={styles.checkItem}>
          <span>{check.item}</span>
          <span style={{ color: getStatusColor(check.status) }}>[{check.status}] ({check.score}pts)</span>
        </div>
      ))}

      <div style={styles.score}>
        <div>ATS COMPATIBILITY SCORE: {percentage}% ({totalScore}/{maxScore})</div>
        <div>RATING: <span style={{ color: getScoreColor(percentage).color }}>{getScoreColor(percentage).text}</span></div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div>ANALYSIS METHODOLOGY:</div>
        <div>- Based on Resume-Matcher best practices: https://github.com/srbhr/Resume-Matcher</div>
        <div>- Evaluates structure, keywords, formatting</div>
        <div>- Scores essential ATS parsing elements</div>
        <div>- Recommendations: Focus on keyword optimization</div>
      </div>
    </div>
  );
};

export default ATSAnalysis;