// Cloudflare Pages Function for PDF generation
// Note: Browser Rendering is only available in Workers, not Pages Functions
// This provides a fallback response that triggers client-side printing

export async function onRequestPost(context) {
  // Since Browser Rendering isn't available in Pages Functions,
  // we return a response that tells the client to use print dialog
  return new Response(JSON.stringify({ 
    fallback: true,
    message: 'PDF generation via server not available, please use browser print'
  }), {
    status: 503,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  });
}