// Utility for mapping Blake's profile data to YAML Resume schema fragments

export const mapToBasics = (profileData) => {
  // Combine summary with focus areas and character for comprehensive overview
  let fullSummary = profileData.summary;
  if (profileData.focusAreas) {
    fullSummary += '\n\n' + profileData.focusAreas;
  }
  if (profileData.character && profileData.character.length > 0) {
    fullSummary += '\n\nCore Characteristics:\n';
    fullSummary += profileData.character.map(trait => `• ${trait}`).join('\n');
  }

  return {
    name: profileData.personal.name,
    headline: profileData.personal.title,
    email: profileData.personal.email,
    phone: profileData.personal.phone,
    summary: fullSummary,
    url: profileData.personal.portfolio
  };
};

export const mapToLocation = (profileData) => {
  return {
    city: "Brisbane",
    region: "Queensland",
    country: "Australia",
    postalCode: null
  };
};

export const mapToProfiles = (profileData) => {
  return [
    {
      network: "LinkedIn",
      username: "blake-carter-5995ab5a",
      url: profileData.personal.linkedIn
    }
  ];
};

export const mapToWork = (profileData) => {
  // Include ALL work experience including "Earlier Career"
  return profileData.experience.map(exp => ({
    name: exp.company || "Various Organizations",
    position: exp.title,
    startDate: parseDatePeriod(exp.period).start,
    endDate: parseDatePeriod(exp.period).end,
    summary: formatWorkSummary(exp),
    keywords: exp.tags ? exp.tags.split(' • ') : []
  }));
};

export const mapToProjects = (profileData) => {
  const allProjects = [];

  // Add projects from experience
  profileData.experience.forEach(exp => {
    if (exp.projects) {
      exp.projects.forEach(project => {
        allProjects.push({
          name: project.name,
          startDate: parseDatePeriod(exp.period).start,
          endDate: parseDatePeriod(exp.period).end,
          summary: project.description,
          url: `https://drksci.com${project.url}`,
          keywords: exp.tags ? exp.tags.split(' • ') : []
        });
      });
    }

    // Add research projects
    if (exp.research) {
      exp.research.forEach(research => {
        allProjects.push({
          name: research.name,
          startDate: parseDatePeriod(exp.period).start,
          endDate: parseDatePeriod(exp.period).end,
          summary: `Research Project: ${research.description}`,
          url: `https://drksci.com${research.url}`,
          keywords: exp.tags ? exp.tags.split(' • ') : []
        });
      });
    }
  });

  return allProjects;
};

export const mapToSkills = (profileData) => {
  return Object.entries(profileData.skills).map(([category, skills]) => ({
    name: category,
    level: "Expert", // Default level since Blake's data doesn't specify
    keywords: skills.split(' • ')
  }));
};

export const mapToEducation = (profileData) => {
  const education = [
    {
      institution: "University of Queensland",
      area: "Information Technology / Arts",
      degree: "Bachelor",
      startDate: "2006",
      endDate: null, // Skipped
      summary: "Self-directed learning approach with focus on practical application"
    }
  ];

  // Add education details from profile
  if (profileData.education) {
    Object.entries(profileData.education).forEach(([key, value]) => {
      education[0].summary += `\n${key}: ${value}`;
    });
  }

  return education;
};

export const mapToInterests = (profileData) => {
  const interests = [];

  // Map philosophy to interests
  if (profileData.philosophy) {
    interests.push({
      name: "Professional Philosophy",
      keywords: profileData.philosophy.map(p => `${p.title}: ${p.subtitle}`)
    });
  }

  // Map insights to personal interests
  if (profileData.insights) {
    interests.push({
      name: "Personal Insights",
      keywords: Object.entries(profileData.insights).map(([key, value]) => `${key}: ${value}`)
    });
  }

  return interests;
};

// Helper functions
const parseDatePeriod = (period) => {
  if (!period) return { start: null, end: null };

  // Handle formats like "Aug 2024 - Present", "Jan 2022 - Aug 2024 (2 yrs 8 mos)"
  const cleanPeriod = period.replace(/\s*\([^)]*\)/, ''); // Remove duration info
  const [start, end] = cleanPeriod.split(' - ');

  return {
    start: start ? convertToISODate(start.trim()) : null,
    end: end && end.trim() !== 'Present' ? convertToISODate(end.trim()) : null
  };
};

const convertToISODate = (dateStr) => {
  // Convert "Aug 2024" to "2024-08-01"
  const months = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };

  const parts = dateStr.split(' ');
  if (parts.length === 2) {
    const [month, year] = parts;
    return `${year}-${months[month]}-01`;
  }

  return dateStr; // Return as-is if can't parse
};

const formatWorkSummary = (exp) => {
  let summary = exp.description;

  if (exp.accomplishments && exp.accomplishments.length > 0) {
    // For "Earlier Career", don't add "Key Accomplishments:" header
    if (exp.title === 'Earlier Career') {
      summary += '\n\n';
      summary += exp.accomplishments.map(acc => `• ${acc}`).join('\n');
    } else {
      summary += '\n\n\nKey Accomplishments:\n';
      summary += exp.accomplishments.map(acc => `• ${acc}`).join('\n');
    }
  }

  // Add projects for Drksci experience
  if (exp.company === 'Drksci' && exp.projects && exp.projects.length > 0) {
    summary += '\n\nKey Projects:\n';
    summary += exp.projects.map(project => `• [LINK:${project.name}:https://drksci.com${project.url}]: ${project.description}`).join('\n');
  }

  // Add research projects for Drksci experience
  if (exp.company === 'Drksci' && exp.research && exp.research.length > 0) {
    summary += '\n\nResearch Projects:\n';
    summary += exp.research.map(research => `• [LINK:${research.name}:https://drksci.com${research.url}]: ${research.description}`).join('\n');
  }

  return summary;
};

// Main function to generate complete YAML Resume document
export const generateYAMLResume = (profileData) => {
  return {
    content: {
      basics: mapToBasics(profileData),
      location: mapToLocation(profileData),
      profiles: mapToProfiles(profileData),
      education: mapToEducation(profileData),
      work: mapToWork(profileData),
      skills: mapToSkills(profileData),
      interests: mapToInterests(profileData)
    },
    layout: {
      locale: {
        language: "en"
      },
      template: "moderncv-banking",
      typography: {
        fontSize: "11pt"
      },
      page: {
        margins: {
          top: "2.5cm",
          left: "1.5cm",
          right: "1.5cm",
          bottom: "2.5cm"
        },
        showPageNumbers: true
      }
    }
  };
};