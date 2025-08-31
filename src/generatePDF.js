export const generateCompletePDF = (jsPDF) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageHeight = pdf.internal.pageSize.height;
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 50;
  let pageNumber = 1;

  // Helper functions
  const checkPageBreak = (neededSpace = 100) => {
    if (yPosition + neededSpace > pageHeight - 60) {
      pdf.addPage();
      pageNumber++;
      yPosition = 50;
      return true;
    }
    return false;
  };

  const addWrappedText = (text, x, y, maxWidth, lineHeight, fontSize = 11) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      checkPageBreak(lineHeight);
      pdf.text(line, x, y + (index * lineHeight));
    });
    return y + (lines.length * lineHeight);
  };

  const addSection = (title, yOffset = 30) => {
    checkPageBreak(60);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(120);
    pdf.text(title, 50, yPosition);
    yPosition += yOffset;
  };

  // PAGE 1: Title & Profile
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Blake Carter', 50, yPosition);
  yPosition += 40;
  
  pdf.setFontSize(20);
  pdf.setTextColor(100);
  pdf.text('Technical Leader', 50, yPosition);
  yPosition += 45;
  
  // Philosophy
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0);
  const philosophyY = yPosition;
  pdf.text('Envision', 80, philosophyY);
  pdf.text('Collaborate', 230, philosophyY);
  pdf.text('Persevere', 390, philosophyY);
  yPosition += 20;
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(150);
  pdf.text('the extraordinary', 65, yPosition);
  pdf.text('with charisma', 235, yPosition);
  pdf.text('to achieve', 395, yPosition);
  yPosition += 40;
  
  // Executive Summary
  addSection('EXECUTIVE SUMMARY');
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0);
  const summary = 'Transformational technology leader with expertise spanning AI/ML, cloud architecture, and rapid prototyping. Specialises in cross-pollinating ideas across disciplines to create innovative solutions. Known for hands-on technical leadership and ability to navigate complex challenges with strategic vision and measured execution.';
  yPosition = addWrappedText(summary, 50, yPosition, 500, 16, 11);
  yPosition += 30;

  // Character Profile
  addSection('CHARACTER PROFILE');
  const traits = [
    'Thrives on novel challenges, hands-on learning opportunities, and doing the hard yards – jumping into the deep end',
    'Natural integrator who synthesises complexity into clarity through systematic thinking and creative problem-solving',
    'Builds trust through authentic relationships, combining technical excellence with genuine human connection',
    'Resilient problem-solver who views setbacks as data points for iteration and improvement'
  ];
  
  pdf.setFont('helvetica', 'normal');
  traits.forEach(trait => {
    pdf.setFontSize(10);
    yPosition = addWrappedText('• ' + trait, 50, yPosition, 480, 15);
    yPosition += 5;
  });
  yPosition += 25;

  // Personal Details
  addSection('PERSONAL DETAILS');
  const details = [
    ['Location', 'Australia'],
    ['Education', 'Self-directed continuous learning'],
    ['Interests', 'AI/ML, Spelunking, Innovation, Cross-disciplinary thinking'],
    ['First PC', 'Osbourne 1'],
    ['Favourite Place', 'Waratah, Tasmania']
  ];
  
  pdf.setFontSize(10);
  details.forEach(([label, value]) => {
    checkPageBreak(20);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120);
    pdf.text(label + ':', 50, yPosition);
    pdf.setTextColor(0);
    pdf.text(value, 150, yPosition);
    yPosition += 18;
  });
  yPosition += 20;

  // PROFESSIONAL EXPERIENCE
  checkPageBreak(200);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(80);
  pdf.text('PROFESSIONAL EXPERIENCE', 50, yPosition);
  yPosition += 30;

  // 1. Drksci Founder
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0);
  pdf.text('Founder', 50, yPosition);
  pdf.setFont('helvetica', 'normal');
  pdf.text(' — d/rksci', 110, yPosition);
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text('Aug 2024 - Present', 420, yPosition);
  yPosition += 20;

  pdf.setFontSize(10);
  pdf.setTextColor(60);
  pdf.text('Innovation Lab • AI Integration • Data Visualisation • Rapid Prototyping', 50, yPosition);
  yPosition += 20;

  pdf.setTextColor(0);
  const drksciDesc = 'Founded d/rksci as an innovation laboratory exploring the intersection of AI, data science, and practical business applications. Specialised in rapidly prototyping novel solutions and transforming ambitious concepts into market-ready realities.';
  yPosition = addWrappedText(drksciDesc, 50, yPosition, 500, 15, 10);
  yPosition += 15;

  // Drksci Projects
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Key Projects:', 50, yPosition);
  yPosition += 18;

  const projects = [
    ['rained.cloud', 'Historical rainfall data preservation platform (100+ years of weather data)'],
    ['Kareer.app', 'AI-powered career transition platform with intelligent job matching']
  ];

  pdf.setFont('helvetica', 'normal');
  projects.forEach(([name, desc]) => {
    checkPageBreak(30);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('• ' + name + ':', 60, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition = addWrappedText(desc, 150, yPosition, 380, 14, 10);
    yPosition += 8;
  });
  yPosition += 20;

  // Previous Experience (summarized)
  checkPageBreak(150);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Senior Technical Consultant', 50, yPosition);
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text('2020 - 2023', 420, yPosition);
  yPosition += 18;

  pdf.setTextColor(0);
  pdf.setFont('helvetica', 'normal');
  const consultingPoints = [
    '• Led cloud migration initiatives achieving 40% infrastructure cost reduction',
    '• Implemented AI/ML solutions improving operational efficiency by 35%',
    '• Mentored technical teams in modern development practices and agile methodologies'
  ];
  
  consultingPoints.forEach(point => {
    yPosition = addWrappedText(point, 50, yPosition, 480, 14, 10);
    yPosition += 5;
  });
  yPosition += 25;

  // RESEARCH PROJECTS
  checkPageBreak(300);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(80);
  pdf.text('RESEARCH PROJECTS', 50, yPosition);
  yPosition += 30;

  // MapGyver
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0);
  pdf.text('MapGyver', 50, yPosition);
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.text(' — Lost Person Behaviour Modelling', 115, yPosition);
  yPosition += 18;
  
  pdf.setFont('helvetica', 'normal');
  const mapgyverDesc = 'Advanced geospatial AI system for search and rescue operations, integrating terrain analysis with behavioural prediction models. Field-tested in Tasmania with 847 simulated paths over 3 weeks.';
  yPosition = addWrappedText(mapgyverDesc, 50, yPosition, 500, 14, 10);
  yPosition += 20;

  // Prophet
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Prophet', 50, yPosition);
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.text(' — Experimental Analytics Platform', 100, yPosition);
  yPosition += 18;
  
  pdf.setFont('helvetica', 'normal');
  const prophetDesc = 'Predictive analytics system leveraging machine learning for pattern recognition and anomaly detection. Focused on experimental AI consciousness exploration.';
  yPosition = addWrappedText(prophetDesc, 50, yPosition, 500, 14, 10);
  yPosition += 20;

  // Princhester
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Princhester Associates', 50, yPosition);
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.text(' — Innovation Framework', 190, yPosition);
  yPosition += 18;
  
  pdf.setFont('helvetica', 'normal');
  const princhesterDesc = 'AI-powered consulting and strategic advisory platform. Developed frameworks for rapid innovation and digital transformation initiatives.';
  yPosition = addWrappedText(princhesterDesc, 50, yPosition, 500, 14, 10);
  yPosition += 30;

  // TECHNICAL EXPERTISE
  checkPageBreak(150);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(80);
  pdf.text('TECHNICAL EXPERTISE', 50, yPosition);
  yPosition += 25;

  const skills = [
    ['Languages', 'Python, JavaScript/TypeScript, SQL, Rust, Go'],
    ['Frameworks', 'React, Node.js, FastAPI, TensorFlow, PyTorch'],
    ['Cloud & DevOps', 'AWS, GCP, Azure, Docker, Kubernetes, CI/CD'],
    ['Data & AI', 'Machine Learning, NLP, Computer Vision, Data Analytics'],
    ['Architecture', 'Microservices, Event-Driven, Serverless, API Design'],
    ['Methodologies', 'Agile, Design Thinking, Cross-functional Leadership']
  ];

  pdf.setFontSize(10);
  skills.forEach(([category, items]) => {
    checkPageBreak(25);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100);
    pdf.text(category + ':', 50, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0);
    yPosition = addWrappedText(items, 150, yPosition, 380, 14, 10);
    yPosition += 12;
  });

  // Footer on last page
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  const footerY = pageHeight - 50;
  pdf.text('Blake Carter | linkedin.com/in/blake-carter | drksci.com', pageWidth/2, footerY, { align: 'center' });
  
  // Save the PDF
  pdf.save('Blake_Carter_Complete_Resume.pdf');
};