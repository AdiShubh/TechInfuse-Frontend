// src/pages/NotFound.js

import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); 

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg mt-4">The page you are looking for is not found.</p>
        <p className="mt-4">Redirecting you to the home page.....</p>
      </div>
    </div>
  );
};

export default NotFound;
