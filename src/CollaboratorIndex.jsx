import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CollaboratorIndex = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Collaborators</h1>
          
          <div className="grid gap-6">
            <Link 
              to="/c/blake" 
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Blake Carter</h2>
              <p className="text-gray-600">Chief Executive Officer • Technical Leader</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollaboratorIndex;