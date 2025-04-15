'use client';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

const ThankYouPage = () => {
  useEffect(() => {
    // Redirect to the homepage after a few seconds
    const timer = setTimeout(() => {
      window.location.href = '/'; // Change to your homepage route
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="text-center p-6 rounded-lg shadow-lg bg-white max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg mb-4">Your order has been placed successfully.</p>
         
          <p className="text-md text-gray-700 mb-4">
            We're preparing your order and will notify you once it's shipped!
          </p>
          <p className="text-sm text-gray-500">
            You will be redirected to the homepage shortly.
          </p>
          <a href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Go to Homepage
          </a>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
