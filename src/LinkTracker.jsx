import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LinkTracker = () => {
  const [searchParams] = useSearchParams();
  const [redirecting, setRedirecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleRedirect = () => {
      const targetUrl = searchParams.get('to');
      const sourceFile = searchParams.get('from');
      const version = searchParams.get('v');

      if (!targetUrl) {
        setError('Missing target URL parameter');
        setRedirecting(false);
        return;
      }

      // Log tracking data (you can send this to analytics service)
      console.log('Link Tracking:', {
        targetUrl,
        sourceFile,
        version,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      });

      // Optional: Send to analytics endpoint
      try {
        // You can add analytics tracking here, e.g.:
        // fetch('/api/track-link', {
        //   method: 'POST',
        //   body: JSON.stringify({ targetUrl, sourceFile, version })
        // });

        // Redirect after a short delay to ensure tracking is captured
        setTimeout(() => {
          window.location.href = decodeURIComponent(targetUrl);
        }, 500);
      } catch (err) {
        console.error('Tracking error:', err);
        // Still redirect even if tracking fails
        window.location.href = decodeURIComponent(targetUrl);
      }
    };

    handleRedirect();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m-6 3h12m-6 0l3-3-3-3"></path>
          </svg>
          <h2 className="text-2xl font-thin mb-4">Redirect Error</h2>
          <p className="text-gray-400 mb-2">{error}</p>
          <p className="text-gray-500 text-sm">Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Redirecting...</title>
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "o8s21qgxqo");
          `}
        </script>
      </Helmet>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">Following link...</div>
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
          <div className="text-gray-500 text-sm mt-4">
            {searchParams.get('from') && (
              <p>From: {searchParams.get('from')}</p>
            )}
            {searchParams.get('v') && (
              <p>Version: {searchParams.get('v')}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkTracker;