'use client';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ReservationsPage = () => {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's reservations
  const fetchUserReservations = async () => {
    setLoading(true);
    try {
      const userEmail = "admin@gmail.com"; // Use the user's email from the session
      if (!userEmail) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch('/api/reservations/customer', {
        headers: { 'session': JSON.stringify({ email: userEmail }) },
      });

      const data = await response.json();
      console.log(data); // Log the response data for debugging
      if (data.success) {
        setReservations(data.reservations);
        console.log(data.reservations); // Log reservations for debugging
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setError("An error occurred while fetching your reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserReservations();
    } else if (status === 'unauthenticated') {
      setError("User is not authenticated.");
    }
  }, [status]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className='container mx-auto mt-20 md:mt-24 p-4'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Your Reservations</h1>
        {reservations.length === 0 ? (
          <p className='text-center text-gray-600'>No reservations found.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation._id} className='border p-6 mb-6 rounded-lg shadow-lg'>
              <p className='text-gray-700'>Table Type: {reservation.type}</p>
              <p className='text-gray-700'>Seats: {reservation.seats}</p>
              <p className='text-gray-700'>Status: 
                <span 
                  className={`font-bold ${reservation.bookedStatus === 'Completed' ? 'text-green-600' : reservation.bookedStatus === 'Canceled' ? 'text-red-600' : 'text-yellow-600'}`}
                >
                  {reservation.bookedStatus}
                </span>
              </p>

              {/* Conditional message based on status */}
              <div className='mt-2 text-gray-700'>
                {reservation.bookedStatus === 'Pending' && (
                  <p>Your table is booked and will be confirmed soon!</p>
                )}
                {reservation.bookedStatus === 'Canceled' && (
                  <p>We're sorry, but your reservation was canceled.</p>
                )}
                {reservation.bookedStatus === 'Completed' && (
                  <p>Thank you for dining with us! We hope you enjoyed your experience.</p>
                )}
              </div>

              <p className='text-lg font-bold mt-4'>Date: {reservation.date}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ReservationsPage;
