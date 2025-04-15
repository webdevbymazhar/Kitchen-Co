"use client";
// pages/rating.js
import StarRating from '@/components/StarRating';
import { useState } from 'react';

const staffMembers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

export default function RatingPage() {
  const [ratings, setRatings] = useState({});

  const handleRatingChange = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  const handleSubmit = () => {
    console.log('Ratings submitted:', ratings);
    // Here you can implement API call to save ratings
  };

  return (
    <div className="container w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Staff Ratings</h1>
      <div className="space-y-4 w-full">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg shadow-md">
            <span className="text-xl">{staff.name}</span>
            <StarRating
              rating={ratings[staff.id] || 0}
              onRatingChange={(rating) => handleRatingChange(staff.id, rating)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
      >
        Submit Ratings
      </button>
    </div>
  );
}
