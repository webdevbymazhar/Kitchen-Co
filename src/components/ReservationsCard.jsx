
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ReservationsCard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <motion.div
      className="bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h3 className="font-semibold mb-4 text-lg">Upcoming Reservations</h3>

      <div>
        {reservations.slice(0,5).map((reservation) => (
          <div className="flex item-center justify-between border-b">
            <p className="font-semibold font-sans text-blue-500 mb-3">{reservation.name}</p>

            <p className="tracking-wider font-semibold">{new Date(reservation.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};



export default ReservationsCard;
