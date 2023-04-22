import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/"><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Go back to home
      </button></Link>
    </div>
  );
};

export default Error404;
