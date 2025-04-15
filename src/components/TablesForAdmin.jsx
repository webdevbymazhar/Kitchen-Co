"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Icons for actions
import { BiFilterAlt } from "react-icons/bi"; // Filter icon
import SkeletonReservationCard from "./SkeletonReservationCard";

const AdminReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reservations");
      if (!response.ok) throw new Error("Failed to fetch reservations");
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
      setError("Could not load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId, bookedStatus: newStatus }),
      });

      if (response.ok) {
        alert("Status updated successfully!");
        fetchReservations(); // Refresh reservations to show updated status
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
    }
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      statusFilter === "all" || reservation.bookedStatus === statusFilter
  );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-md h-screen overflow-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Admin Reservations
      </h1>
      <div className="mb-4 flex justify-center space-x-4">
        {["all", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              statusFilter === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            {status === "all" && <BiFilterAlt className="mr-2" />}
            {status === "completed" && <AiOutlineCheck className="mr-2" />}
            {status === "cancelled" && <AiOutlineClose className="mr-2" />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {loading ? (
          <div className="flex flex-wrap items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonReservationCard key={index} />
            ))}
          </div>
        ) : (
          filteredReservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-xl text-blue-800 mb-3">
                  Honour Name:{" "}
                  <span className="text-xl">{reservation.name}</span>
                </h2>
                <p className="text-gray-600">Email: {reservation.email}</p>
                <p className="text-gray-600">Phone: {reservation.phone}</p>
                <p className="text-gray-600">
                  Date: {new Date(reservation.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Time: {reservation.time}</p>
                <p className="text-gray-600">Type: {reservation.type}</p>
                <p className="text-gray-600">Table No.: {reservation.table}</p>
                <p className="text-gray-600">Seats: {reservation.seats}</p>
                <p className="text-gray-600">Guests: {reservation.guests}</p>
                <p className="text-blue-600 font-semibold">
                  Special Request:
                  <br />
                  <span className="italic text-gray-500">
                    {reservation.specialRequest}
                  </span>
                </p>
                <span
                  className={`mt-3 inline-block px-4 py-2 text-xs font-semibold rounded-full ${
                    reservation.bookedStatus === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {reservation.bookedStatus.charAt(0).toUpperCase() +
                    reservation.bookedStatus.slice(1)}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    handleStatusChange(reservation._id, "completed")
                  }
                  className="flex-1 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                >
                  <AiOutlineCheck className="text-lg mr-2" />
                  <span className="text-xs">Book Table</span>
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(reservation._id, "cancelled")
                  }
                  className="flex-1 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200 flex items-center justify-center"
                >
                  <AiOutlineClose className="text-lg mr-2" />
                  <span className="text-xs">Reject</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReservationsPage;
