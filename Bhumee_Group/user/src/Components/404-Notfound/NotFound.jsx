// src/pages/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the home page.
        </p>
        <button
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
