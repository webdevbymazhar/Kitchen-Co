// components/SkeletonReservationCard.jsx
import React from 'react';

const SkeletonReservationCard = () => {
  return (
    <div className="bg-gradient-to-r w-[300px]  from-gray-200 to-gray-300 shadow-lg rounded-lg p-6 animate-pulse transition-transform duration-300 transform hover:shadow-2xl flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-400 rounded w-1/3 mt-3"></div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonReservationCard;
