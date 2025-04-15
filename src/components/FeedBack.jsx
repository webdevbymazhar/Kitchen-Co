"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const FeedBack = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    review: "",
    stars: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      setFormData((prevData) => ({
        ...prevData,
        userId: session?.user?.id || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Feedback sent successfully");
        setFormData({ userId: session?.user?.userId || "", name: "", review: "", stars: "" });
      } else {
        setMessage("Failed to send feedback");
      }
    } catch (error) {
      setMessage("An error occurred while sending feedback");
    }
  };

  return (
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-semibold text-center mb-6">Send Us Your Feedback</h1>
    {message && <p class="text-center text-green-500 mb-4">{message}</p>}
    <form onSubmit={handleSubmit} class="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          name="review"
          placeholder="Your review"
          value={formData.review}
          onChange={handleChange}
          required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div>
        <input
          type="number"
          name="stars"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={formData.stars}
          onChange={handleChange}
          required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default FeedBack;
