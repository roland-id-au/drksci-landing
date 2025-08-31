import { jsPDF } from 'jspdf';

export function buildPDF(data) {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageHeight = pdf.internal.pageSize.height;
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 50;

  // Helper functions
  const checkPageBreak = (neededSpace = 100) => {
    if (yPosition + neededSpace > pageHeight - 60) {
      pdf.addPage();
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

  // Build PDF content
  // Title
  pdf.setFontSize(36);
  pdf.text('Blake Carter', 50, yPosition);
  yPosition += 40;
  
  pdf.setFontSize(20);
  pdf.setTextColor(100);
  pdf.text('Technical Leader', 50, yPosition);
  yPosition += 45;
  
  // Philosophy
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0);
  pdf.text('Envision', 80, yPosition);
  pdf.text('Collaborate', 230, yPosition);
  pdf.text('Persevere', 390, yPosition);
  yPosition += 20;
  
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(150);
  pdf.text('the extraordinary', 65, yPosition);
  pdf.text('with charisma', 235, yPosition);
  pdf.text('to achieve', 395, yPosition);
  yPosition += 40;
  
  // Executive Summary
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(120);
  pdf.text('EXECUTIVE SUMMARY', 50, yPosition);
  yPosition += 30;
  
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(0);
  const summary = data.summary || 'Transformational technology leader with expertise spanning AI/ML, cloud architecture, and rapid prototyping. Specialises in cross-pollinating ideas across disciplines to create innovative solutions. Known for hands-on technical leadership and ability to navigate complex challenges with strategic vision and measured execution.';
  yPosition = addWrappedText(summary, 50, yPosition, 500, 16, 11);
  yPosition += 30;

  // Experience
  checkPageBreak(200);
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(80);
  pdf.text('PROFESSIONAL EXPERIENCE', 50, yPosition);
  yPosition += 30;

  const experiences = data.experiences || [
    {
      title: 'Founder',
      company: 'd/rksci',
      period: 'Aug 2024 - Present',
      description: 'Founded d/rksci as an innovation laboratory exploring the intersection of AI, data science, and practical business applications.'
    },
    {
      title: 'Chief Executive Officer',
      company: 'ValuePRO Software',
      period: 'Jan 2022 - Aug 2024',
      description: 'Led company transformation, achieving 300% revenue growth and successful exit.'
    },
    {
      title: 'Operations Manager',
      company: 'ValuePRO Software',
      period: 'Jan 2017 - Jan 2022',
      description: 'Streamlined operations and built high-performing teams across multiple departments.'
    }
  ];

  experiences.forEach(exp => {
    checkPageBreak(100);
    pdf.setFontSize(13);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0);
    pdf.text(exp.title, 50, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(' — ' + exp.company, 50 + pdf.getTextWidth(exp.title), yPosition);
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(exp.period, 420, yPosition);
    yPosition += 20;
    
    pdf.setTextColor(0);
    yPosition = addWrappedText(exp.description, 50, yPosition, 500, 15, 10);
    yPosition += 20;
  });

  return pdf.output('arraybuffer');
}