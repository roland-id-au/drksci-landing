#!/usr/bin/env python3
"""
Simple PDF generator from HTML content
Creates a basic PDF resume for Blake Carter
"""

def create_pdf():
    """Create a PDF file with Blake's resume content"""
    
    # Create PDF content manually
    pdf_content = b"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 3500 >>
stream
BT
/F2 24 Tf
50 720 Td
(Blake Carter) Tj
0 -30 Td
/F1 14 Tf
(Technical Leader) Tj
0 -40 Td

/F2 10 Tf
(EXECUTIVE SUMMARY) Tj
0 -20 Td
/F1 11 Tf
(Transformational technology leader with expertise spanning AI/ML, cloud architecture,) Tj
0 -15 Td
(and rapid prototyping. Specialises in cross-pollinating ideas across disciplines to create) Tj
0 -15 Td
(innovative solutions. Known for hands-on technical leadership and ability to navigate) Tj
0 -15 Td
(complex challenges with strategic vision.) Tj
0 -30 Td

/F2 10 Tf
(CORE VALUES) Tj
0 -20 Td
/F1 11 Tf
(Envision - Extraordinary Futures   |   Collaborate - With Charisma   |   Persevere - To Achieve) Tj
0 -30 Td

/F2 10 Tf
(PROFESSIONAL EXPERIENCE) Tj
0 -20 Td

/F2 11 Tf
(Co-Founder & Technical Director - d/rksci Innovation Studio) Tj
350 0 Td
/F1 10 Tf
(2023 - Present) Tj
-350 -15 Td
/F1 11 Tf
(Leading technical strategy for innovation consultancy specialising in rapid prototyping) Tj
0 -15 Td
(and AI transformation.) Tj
0 -15 Td
(- Architected AI-powered solutions for enterprise clients across multiple industries) Tj
0 -15 Td
(- Developed rapid prototyping methodology reducing time-to-market by 60%) Tj
0 -15 Td
(- Built and led cross-functional teams delivering transformational digital products) Tj
0 -25 Td

/F2 11 Tf
(Senior Technical Consultant - Independent) Tj
330 0 Td
/F1 10 Tf
(2020 - 2023) Tj
-330 -15 Td
/F1 11 Tf
(Provided strategic technical guidance to organisations navigating digital transformation.) Tj
0 -15 Td
(- Led cloud migration initiatives achieving 40% cost reduction) Tj
0 -15 Td
(- Implemented AI/ML solutions improving operational efficiency by 35%) Tj
0 -15 Td
(- Mentored technical teams in modern development practices) Tj
0 -25 Td

/F2 11 Tf
(Lead Software Engineer - Technology Ventures) Tj
330 0 Td
/F1 10 Tf
(2018 - 2020) Tj
-330 -15 Td
/F1 11 Tf
(Spearheaded development of innovative software solutions in high-growth environment.) Tj
0 -15 Td
(- Designed scalable microservices architecture supporting 1M+ users) Tj
0 -15 Td
(- Established CI/CD pipelines reducing deployment time by 75%) Tj
0 -15 Td
(- Led adoption of modern development practices across engineering organisation) Tj
0 -30 Td

/F2 10 Tf
(KEY PROJECTS) Tj
0 -20 Td
/F2 11 Tf
(MapGyver - Lost Person Behaviour Modelling) Tj
0 -15 Td
/F1 11 Tf
(Advanced geospatial AI system for search and rescue operations) Tj
0 -20 Td

/F2 11 Tf
(Prophet - Experimental Analytics Platform) Tj
0 -15 Td
/F1 11 Tf
(Predictive analytics leveraging ML for pattern recognition) Tj
0 -20 Td

/F2 11 Tf
(Princhester Associates - Innovation Framework) Tj
0 -15 Td
/F1 11 Tf
(Strategic consulting methodology for rapid innovation initiatives) Tj
0 -30 Td

/F2 10 Tf
(TECHNICAL EXPERTISE) Tj
0 -20 Td
/F1 11 Tf
(Core: Python, JavaScript/TypeScript, React, Node.js, Cloud Architecture (AWS/GCP/Azure)) Tj
0 -15 Td
(Specialisations: AI/ML, Rapid Prototyping, System Architecture, Data Analytics, DevOps) Tj
0 -15 Td
(Methodologies: Agile, Design Thinking, Cross-functional Leadership, Innovation Frameworks) Tj

ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000345 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
3950
%%EOF"""
    
    # Write PDF file
    with open('/Users/blake/Projects/drksci-landing/public/blake-carter-resume.pdf', 'wb') as f:
        f.write(pdf_content)
    
    print("PDF created successfully at public/blake-carter-resume.pdf")

if __name__ == "__main__":
    create_pdf()