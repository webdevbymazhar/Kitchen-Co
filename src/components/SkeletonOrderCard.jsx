// components/SkeletonOrderCard.jsx
import React from 'react';

const SkeletonOrderCard = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>

      <div className="flex space-x-4 mt-4">
        <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-1/2 mt-4 mb-2"></div>
      <div className="h-6 bg-gray-400 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonOrderCard;
