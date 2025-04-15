// src/app/admin/reservations/page.jsx
'use client';
import React, { useEffect, useState } from 'react';

const AdminReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) throw new Error('Failed to fetch reservations');
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
      setError('Could not load reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, bookedStatus: newStatus }),
      });

      if (response.ok) {
        alert('Status updated successfully!');
        fetchReservations(); // Refresh reservations to show updated status
      } else {
        alert('Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred while updating the status.');
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-md">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Reservations</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Phone</th>
            <th className="py-2 border-b">Date</th>
            <th className="py-2 border-b">Time</th>
            <th className="py-2 border-b">Guests</th>
            <th className="py-2 border-b">Status</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id} className="text-center">
              <td className="py-2 border-b">{reservation.name}</td>
              <td className="py-2 border-b">{reservation.email}</td>
              <td className="py-2 border-b">{reservation.phone}</td>
              <td className="py-2 border-b">{new Date(reservation.date).toLocaleDateString()}</td>
              <td className="py-2 border-b">{reservation.time}</td>
              <td className="py-2 border-b">{reservation.guests}</td>
              <td className="py-2 border-b">{reservation.bookedStatus}</td>
              <td className="py-2 border-b">
                <button
                  onClick={() => handleStatusChange(reservation._id, 'confirmed')}
                  className="mr-2 p-2 bg-green-500 text-white rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(reservation._id, 'cancelled')}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservationsPage;
