// src/components/CustomerFeedbackCard.jsx
import React, { useEffect, useState } from "react";

const CustomerFeedbackCard = () => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Customer Feedback</h2>
      <ul className="space-y-4">
        {feedback.slice(0,3).map((entry, index) => (
          <li key={index} className="border-b pb-2">
            <p className="font-medium">{entry.name}</p>
            <p className="text-gray-600 mb-4">
              {entry.review.length > 50 && expandedReviewIndex !== index ? (
                <>
                  {entry.review.substring(0, 50)}...{" "}
                  <button
                    className="text-blue-500 underline hover:text-blue-600"
                    onClick={() => setExpandedReviewIndex(index)}
                  >
                    More
                  </button>
                </>
              ) : (
                entry.review
              )}
              {expandedReviewIndex === index && (
              <button
                className="text-sm text-blue-500 underline hover:text-blue-600"
                onClick={() => setExpandedReviewIndex(null)}
              >
                Show Less
              </button>
            )}
            </p>
            
            <span className="text-yellow-500">{"⭐".repeat(entry.stars)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerFeedbackCard;
