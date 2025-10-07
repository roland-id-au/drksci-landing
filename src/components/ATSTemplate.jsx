import React from 'react';
import ATSAnalysis from './ATSAnalysis';
import './ATSFonts.css';

const ATSTemplate = ({ yamlData }) => {
  if (!yamlData || !yamlData.content) {
    return null;
  }

  const { content } = yamlData;

  // Function to wrap URLs with tracking
  const wrapWithTracking = (url) => {
    if (!url || (!url.startsWith('http') && !url.startsWith('mailto:'))) {
      return url;
    }

    const encodedUrl = encodeURIComponent(url);
    const encodedFrom = encodeURIComponent('blake-carter-resume-ats.pdf');
    const encodedDate = encodeURIComponent(new Date().toISOString().split('T')[0]);
    return `https://drksci.com/go?to=${encodedUrl}&from=${encodedFrom}&v=${encodedDate}`;
  };

  const styles = {
    container: {
      fontFamily: '"Courier Prime", "Courier New", Courier, monospace',
      fontSize: '10px',
      lineHeight: '1.2',
      color: '#000',
      backgroundColor: '#fffffe',
      padding: '0.5in',
      width: '8.5in',
      minHeight: '100vh',
      margin: '0 auto',
      whiteSpace: 'pre-wrap',
      textAlign: 'left',
      boxSizing: 'border-box'
    },
    header: {
      textAlign: 'left',
      paddingBottom: '5px',
      marginBottom: '10px',
      fontWeight: 'normal'
    },
    name: {
      fontSize: '11px',
      fontWeight: 'normal'
    },
    contact: {
      marginTop: '2px',
      fontSize: '9px',
      textAlign: 'left'
    },
    section: {
      marginBottom: '20px',
      pageBreakInside: 'avoid'
    },
    sectionTitle: {
      fontSize: '10px',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      paddingBottom: '3px',
      marginBottom: '8px',
      textAlign: 'left'
    },
    workEntry: {
      marginBottom: '12px',
      pageBreakInside: 'avoid',
      paddingBottom: '8px'
    },
    workHeader: {
      fontWeight: 'normal',
      marginBottom: '2px',
      textTransform: 'uppercase',
      fontSize: '9px'
    },
    workDetails: {
      fontSize: '9px',
      marginBottom: '2px',
      textAlign: 'left'
    },
    summary: {
      fontSize: '9px',
      lineHeight: '1.2',
      textAlign: 'left'
    },
    bullet: {
      marginLeft: '2px',
      marginBottom: '1px',
      fontSize: '9px'
    },
    skills: {
      fontSize: '9px',
      textAlign: 'left'
    },
    skillCategory: {
      fontWeight: 'normal',
      textTransform: 'uppercase'
    },
    summaryNoIndent: {
      fontSize: '9px',
      lineHeight: '1.2',
      textAlign: 'left'
    }
  };

  const formatSummary = (summary) => {
    if (!summary) return '';

    return summary
      .replace(/^\s*[•\-*]\s*/gm, '• ')
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
      .trim();
  };

  const formatSummaryWithLinks = (summary) => {
    if (!summary) return null;

    const formatted = formatSummary(summary);

    // Split by lines and process each line for links
    const lines = formatted.split('\n');

    return lines.map((line, lineIdx) => {
      // Handle empty lines by preserving them
      if (line.trim() === '') {
        return <div key={lineIdx}>&nbsp;</div>;
      }

      // Look for link pattern: [LINK:name:url]
      const linkPattern = /\[LINK:([^:]+):(https?:\/\/[^\]]+)\]/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkPattern.exec(line)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }

        // Add the clickable project name
        parts.push(
          <a key={`${lineIdx}-${match.index}`} href={wrapWithTracking(match[2])} style={{ color: '#000', textDecoration: 'underline' }}>
            {match[1]}
          </a>
        );

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      return parts.length > 1 ? (
        <div key={lineIdx}>{parts}</div>
      ) : (
        <div key={lineIdx}>{line}</div>
      );
    });
  };

  const renderWorkExperience = () => {
    if (!content.work || content.work.length === 0) return null;

    // Filter out Earlier Career for separate section
    const professionalWork = content.work.filter(work => work.position !== 'Earlier Career');

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- PROFESSIONAL EXPERIENCE --]</div>
        {professionalWork.map((work, index) => (
          <div key={index} style={styles.workEntry}>
            <div style={styles.workDetails}>
              Role: {work.position}
            </div>
            <div style={styles.workDetails}>
              Employer: {work.name}
            </div>
            <div style={styles.workDetails}>
              Dates: {work.startDate} - {work.endDate || 'Present'}
            </div>
            {work.summary && (
              <>
                <br />
                <div style={styles.summary}>
                  {formatSummaryWithLinks(work.summary)}
                </div>
                <br />
              </>
            )}
            {work.keywords && work.keywords.length > 0 && (
              <div style={styles.workDetails}>
                <br />
                Keywords: {work.keywords.join(', ')}
              </div>
            )}
            {index < professionalWork.length - 1 && (
              <div style={{...styles.workDetails, textAlign: 'left', marginTop: '8px'}}>
                {'-'.repeat(40)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEarlierCareer = () => {
    if (!content.work || content.work.length === 0) return null;

    const earlierCareer = content.work.find(work => work.position === 'Earlier Career');
    if (!earlierCareer) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- EARLIER CAREER --]</div>
        <div style={styles.workEntry}>
          <div style={styles.workDetails}>
            Dates: {earlierCareer.startDate} - {earlierCareer.endDate || 'Present'}
          </div>
          {earlierCareer.summary && (
            <>
              <br />
              <div style={styles.summaryNoIndent}>
                {formatSummary(earlierCareer.summary)}
              </div>
              <br />
            </>
          )}
          {earlierCareer.keywords && earlierCareer.keywords.length > 0 && (
            <div style={styles.workDetails}>
              <br />
              Keywords: {earlierCareer.keywords.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (!content.education || content.education.length === 0) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- EDUCATION --]</div>
        {content.education.map((edu, index) => (
          <div key={index} style={styles.workEntry}>
            <div style={styles.workDetails}>
              {edu.degree} in {edu.area}
            </div>
            <div style={styles.workDetails}>
              {edu.institution} • {edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ' - Present'}
            </div>
            {edu.summary && (
              <>
                <br />
                <div style={styles.summaryNoIndent}>
                  Self-directed learning approach with focus on practical application and reverse engineering methodology. Programming skills developed through continuous self-study since 2006.
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    if (!content.skills || content.skills.length === 0) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- SKILLS --]</div>
        <div style={styles.skills}>
          {content.skills.map((skill, index) => (
            <div key={index} style={{marginBottom: '12px'}}>
              <div style={styles.skillCategory}>{skill.name}:</div>
              {skill.keywords ? (
                <div style={{marginLeft: '10px', marginTop: '2px'}}>
                  {skill.keywords.map((keyword, idx) => (
                    <div key={idx} style={{marginBottom: '1px'}}>• {keyword}</div>
                  ))}
                </div>
              ) : (
                <div style={{marginLeft: '10px', marginTop: '2px'}}>• {skill.level}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (!content.projects || content.projects.length === 0) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- KEY PROJECTS --]</div>
        <div>{'.' + '.'.repeat(78) + '.'}</div>
        {content.projects.map((project, index) => (
          <div key={index} style={styles.workEntry}>
            <div style={styles.workHeader}>
              {project.name}
            </div>
            <div style={styles.workDetails}>
              {project.startDate} - {project.endDate || 'Present'}
            </div>
            {project.summary && (
              <div style={styles.summary}>
                {formatSummary(project.summary)}
              </div>
            )}
            {project.url && (
              <div style={styles.workDetails}>
                URL: {project.url}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderProfessionalPhilosophy = () => {
    if (!content.interests || content.interests.length === 0) return null;

    const philosophy = content.interests.find(interest => interest.name === "Professional Philosophy");
    if (!philosophy) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- PROFESSIONAL PHILOSOPHY --]</div>
        <div style={styles.workEntry}>
          {philosophy.keywords && philosophy.keywords.length > 0 && (
            <div style={styles.skills}>
              {philosophy.keywords.map((keyword, idx) => (
                <div key={idx} style={styles.workDetails}>
                  {keyword}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPersonalInsights = () => {
    if (!content.interests || content.interests.length === 0) return null;

    const insights = content.interests.find(interest => interest.name === "Personal Insights");
    if (!insights) return null;

    return (
      <div style={styles.section}>
        <div style={styles.sectionTitle}>[-- PERSONAL INSIGHTS --]</div>
        <div style={styles.workEntry}>
          {insights.keywords && insights.keywords.length > 0 && (
            <div style={styles.skills}>
              {insights.keywords.map((keyword, idx) => (
                <div key={idx} style={styles.workDetails}>
                  {keyword}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container} className="ats-template">
      {/* ATS Header */}
      <div style={{ marginBottom: '15px', fontSize: '9px' }}>
        <div>GENERATING ATS TRANSCRIPT...</div>
        <div>{'='.repeat(80)}</div>
        <div>APPLICANT TRACKING SYSTEM DATA EXPORT</div>
        <div>DATE: {new Date().toISOString().split('T')[0]} | TIME: {new Date().toTimeString().split(' ')[0]}</div>
        <div>FORMAT: STRUCTURED TEXT ANALYSIS COMPATIBLE</div>
        <div>{'='.repeat(80)}</div>
      </div>

      {/* Candidate Information */}
      <div style={styles.header}>
        <div style={styles.contact}>
          NAME: {content.basics?.name || 'Blake Carter'}
        </div>
        {content.basics?.headline && (
          <div style={styles.contact}>
            TITLE: {content.basics.headline}
          </div>
        )}
        <div style={styles.contact}>
          {content.basics?.email && `EMAIL: ${content.basics.email}`}
        </div>
        <div style={styles.contact}>
          {content.basics?.phone && `PHONE: ${content.basics.phone}`}
        </div>
        <div style={styles.contact}>
          {content.location && `LOCATION: ${content.location.city}, ${content.location.region}, ${content.location.country}`}
        </div>
        {content.basics?.url && (
          <div style={styles.contact}>
            PORTFOLIO: <a href={wrapWithTracking(content.basics.url)} style={{ color: '#000', textDecoration: 'underline' }}>{content.basics.url}</a>
          </div>
        )}
        {content.profiles && content.profiles.length > 0 && (
          <div style={styles.contact}>
            {content.profiles.map((profile, idx) => (
              <div key={idx}>
                {profile.network.toUpperCase()}: <a href={wrapWithTracking(profile.url)} style={{ color: '#000', textDecoration: 'underline' }}>{profile.url}</a>
              </div>
            ))}
          </div>
        )}
        <div>{'-'.repeat(80)}</div>
      </div>

      {/* Summary */}
      {content.basics?.summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>[-- PROFESSIONAL SUMMARY --]</div>
          <div style={styles.summaryNoIndent}>
            {formatSummary(content.basics.summary)}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {renderWorkExperience()}

      {/* Earlier Career */}
      {renderEarlierCareer()}

      {/* Skills */}
      {renderSkills()}

      {/* Education */}
      {renderEducation()}

      {/* Professional Philosophy */}
      {renderProfessionalPhilosophy()}

      {/* Personal Insights */}
      {renderPersonalInsights()}

      <br />
      <br />

      {/* ATS Compatibility Analysis */}
      <ATSAnalysis yamlData={yamlData} />

      {/* ATS Footer */}
      <div style={{...styles.section, marginTop: '15px', fontSize: '8px', textAlign: 'left', color: '#000'}}>
        <div>{'='.repeat(80)}</div>
        <div>END OF TRANSCRIPT</div>
        <div>DOCUMENT STATUS: COMPLETE | PARSING STATUS: READY FOR ATS PROCESSING</div>
        <div>ENCODING: UTF-8 COMPATIBLE | GENERATED: {new Date().toISOString()}</div>
        <div>{'='.repeat(80)}</div>
      </div>
    </div>
  );
};

export default ATSTemplate;