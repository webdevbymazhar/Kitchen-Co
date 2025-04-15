// src/app/book-table/page.jsx
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

const BookTablePage = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequest: "",
    type: "Public",
    table: 1,
    seats: 8,
    bookedStatus: "pending",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { type, seats, guests, table } = formData;

    if (type === "Public" && (seats < 8 || seats > 10)) {
      setError("Public reservations must have 8-10 seats.");
      return;
    }
    if (type === "Private" && (seats < 15 || seats > 20)) {
      setError("Private reservations must have 15-20 seats.");
      return;
    }
    if (type === "Private" && table > 5) {
      setError("Only 5 tables are available for private reservations.");
      return;
    }
    if (guests > seats) {
      setError("Guest count cannot exceed seat count.");
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: 1,
          specialRequest: "",
          type: "Public",
          table: 1,
          seats: 8,
          bookedStatus: "pending",
        });
      } else {
        setError("Failed to book table. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[90%]  mx-auto mt-24 mb-10 p-6 bg-white shadow-xl rounded-lg  hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h1 className="text-4xl  mb-6 text-center font-bold text-indigo-600">
          Reserve Your Table
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4  w-full flex flex-wrap gap-5"
        >
          {error && <p className="text-red-600 text-center">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="w-full md:w-[49%] h-[54px] mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            required
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
            required
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          />

          <input
            type="time"
            name="time"
            onChange={handleChange}
            value={formData.time}
            required
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          />

          <select
            name="guests"
            onChange={handleChange}
            value={formData.guests}
            required
            className=" w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          >
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Guests
              </option>
            ))}
          </select>

          <select
            name="type"
            onChange={handleChange}
            value={formData.type}
            required
            className="w-full  md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          <input
            type="number"
            name="table"
            placeholder="Table Number (1-5 for Private, 1-10 for Public)"
            onChange={handleChange}
            value={formData.table}
            required
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
           
            max={formData.type === "Private" ? 5 : 10}
          />

          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            onChange={handleChange}
            value={formData.seats}
            required
            className="w-full md:w-[49%] p-3 border h-[50px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200"
            min={formData.type === "Private" ? 15 : 8}
            max={formData.type === "Private" ? 20 : 10}
          />

          <textarea
            name="specialRequest"
            placeholder="Special Requests (optional)"
            onChange={handleChange}
            value={formData.specialRequest}
            className="w-full md:w-[49%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition duration-200 h-24"
          ></textarea>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            Book Now
          </button>
        </form>
      </div>
    </>
  );
};

export default BookTablePage;
