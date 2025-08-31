import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import shortUrls from './data/shortUrls.json';

const ShortUrlResolver = () => {
  const { shortCode } = useParams();
  const [resolving, setResolving] = useState(true);
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const resolveShortUrl = () => {
      const data = shortUrls[shortCode];
      
      if (!data) {
        setError('Short URL not found');
        setResolving(false);
        return;
      }

      // Check if expired
      const now = Math.floor(Date.now() / 1000);
      if (now > data.expires) {
        setError('expired');
        setResolving(false);
        return;
      }

      setUrlData(data);
      setResolving(false);
    };

    resolveShortUrl();
  }, [shortCode]);

  if (resolving) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">Resolving link...</div>
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error === 'expired') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-thin mb-4">Link Expired</h2>
          <p className="text-gray-400 mb-2">This application link has expired.</p>
          <p className="text-gray-500 text-sm mb-6">Please contact the candidate for a new link.</p>
          <a href="mailto:blake@drksci.com" className="inline-block px-6 py-3 bg-cyan-400 text-black hover:bg-cyan-300 transition-colors">
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h2 className="text-2xl font-thin mb-4">Link Not Found</h2>
          <p className="text-gray-400 mb-2">This short link is not valid or has been removed.</p>
          <p className="text-gray-500 text-sm">Please check the URL or contact the candidate for assistance.</p>
        </div>
      </div>
    );
  }

  // Redirect to the full application URL with authentication
  const fullUrl = `/c/${urlData.collaborator}/j/${urlData.jobId}?t=${urlData.token}&d=${urlData.data}`;
  
  return (
    <>
      <Helmet>
        <title>Redirecting to {urlData.jobTitle} Application</title>
      </Helmet>
      <Navigate to={fullUrl} replace />
    </>
  );
};

export default ShortUrlResolver;