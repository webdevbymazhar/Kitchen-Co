"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
const FeedbackUsers = () => {
  const [feedback, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null); // State to manage expanded reviews

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/feedback", { method: "GET" });

        if (!response.ok) {
          throw new Error("Failed to fetch the feedbacks");
        }
        const data = await response.json();
        setFeedBack(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-4xl font-semibold text-gray-800 text-center mb-4">
        Customer Feedback
      </h2>

      {feedback.length === 0 ? (
        <p className="text-center text-gray-500">No feedback available.</p>
      ) : (
        <ul className="space-y-6">
          {[...feedback].reverse().map((item, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-gray-300 transition-transform duration-200 transform"
            >
              <h4 className="text-2xl font-semibold text-gray-700 mb-2">
                {item.name}
              </h4>

              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, starIndex) => (
                  <span key={starIndex}>
                    {starIndex < item.stars ? (
                      <span className="text-yellow-400">★</span> // Filled star
                    ) : (
                      <span className="text-gray-300">★</span> // Empty star
                    )}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mb-4">
                {item.review.length > 200 && expandedReviewIndex !== index ? (
                  <>
                    {item.review.substring(0, 200)}...{" "}
                    <button
                      className="text-blue-500 underline hover:text-blue-600"
                      onClick={() => setExpandedReviewIndex(index)}
                    >
                      More
                    </button>
                  </>
                ) : (
                  item.review
                )}
              </p>

              {expandedReviewIndex === index && (
                <button
                  className="text-sm text-blue-500 underline hover:text-blue-600"
                  onClick={() => setExpandedReviewIndex(null)}
                >
                  Show Less
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <Link href="sendFeedBack">
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition">
          Send Feedback
        </button>
      </Link>
    </div>
  );
};

export default FeedbackUsers;
