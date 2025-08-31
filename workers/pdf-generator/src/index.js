import { buildPDF } from './pdf-builder.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // For GET requests with URL parameter (fetch page data and convert)
      if (request.method === 'GET' && url.searchParams.has('url')) {
        const pageUrl = url.searchParams.get('url');
        
        // Validate it's a collaborator page
        const validPaths = ['/collaborators/blake', '/collaborators/giselle', '/collaborators/emily'];
        const urlObj = new URL(pageUrl);
        if (!validPaths.includes(urlObj.pathname)) {
          return new Response(JSON.stringify({ error: 'Invalid page' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // For now, use static data for Blake
        // In production, you'd fetch and parse the actual page
        const resumeData = {
          name: 'Blake Carter',
          title: 'Technical Leader',
          summary: 'Transformational technology leader with expertise spanning AI/ML, cloud architecture, and rapid prototyping. Specialises in cross-pollinating ideas across disciplines to create innovative solutions.',
          experiences: [
            {
              title: 'Founder',
              company: 'd/rksci',
              period: 'Aug 2024 - Present',
              description: 'Founded d/rksci as an innovation laboratory exploring the intersection of AI, data science, and practical business applications. Specialised in rapidly prototyping novel solutions and transforming ambitious concepts into market-ready realities.'
            },
            {
              title: 'Chief Executive Officer',
              company: 'ValuePRO Software',
              period: 'Jan 2022 - Aug 2024',
              description: 'Led transformation of the company from a traditional software provider to a modern SaaS platform. Achieved 300% revenue growth and successful exit.'
            },
            {
              title: 'Operations Manager',
              company: 'ValuePRO Software',
              period: 'Jan 2017 - Jan 2022',
              description: 'Streamlined operations across engineering, support, and implementation teams. Reduced operational costs by 40% while improving customer satisfaction scores.'
            },
            {
              title: 'Senior Software Architect',
              company: 'ValuePRO Software',
              period: 'Apr 2016 - Jan 2017',
              description: 'Designed and implemented scalable architecture for enterprise software solutions. Led adoption of modern development practices and cloud technologies.'
            }
          ]
        };
        
        const pdfBuffer = buildPDF(resumeData);
        
        return new Response(pdfBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Blake_Carter_Resume.pdf"',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
      
      // For POST requests with JSON data
      if (request.method === 'POST') {
        const data = await request.json();
        const pdfBuffer = buildPDF(data);
        
        return new Response(pdfBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${data.name || 'Resume'}.pdf"`,
          },
        });
      }
      
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      console.error('PDF generation error:', error);
      
      return new Response(JSON.stringify({ 
        error: 'PDF generation failed',
        message: error.message 
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};