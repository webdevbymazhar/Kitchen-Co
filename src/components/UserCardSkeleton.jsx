// UserCardSkeleton.jsx
import React from 'react';

const UserCardSkeleton = () => {
  return (
    <div className="border p-4 mb-6 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg transition-transform transform animate-pulse">
      <p className="bg-gray-300 h-5 w-6/12 rounded mb-3"></p>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
        <div className="flex flex-col space-y-2">
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
          <div className="bg-gray-300 h-3 w-32 rounded"></div>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        <div className="bg-gray-300 h-4 w-32 rounded"></div>
        <div className="bg-gray-200 h-3 w-full rounded"></div>
        <div className="bg-gray-200 h-3 w-full rounded"></div>
        <div className="bg-gray-200 h-3 w-24 rounded"></div>
        <div className="bg-gray-200 h-3 w-full rounded"></div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-300 h-4 w-24 rounded mb-2"></div>
        <div className="bg-gray-200 h-3 w-16 rounded"></div>
      </div>

      <p className="mt-2 bg-gray-200 h-3 w-24 rounded"></p>
    </div>
  );
};

export default UserCardSkeleton;
