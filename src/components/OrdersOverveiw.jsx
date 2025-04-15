import { useEffect, useState } from "react";
import moment from "moment"; // Ensure this is imported if you're using moment
import { motion } from "framer-motion";

const OrdersOverview = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverviewData = async () => {
    try {
      const response = await fetch("/api/checkout/admintwo"); // Make sure this endpoint is correct
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []); // Ensure it defaults to an empty array
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while fetching overview data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  // Calculate the order counts only if orders are available
  const todayCount =
    orders.length > 0
      ? orders.filter((order) =>
          moment(order.createdAt).isSame(moment(), "day")
        ).length
      : 0;

  const weekCount =
    orders.length > 0
      ? orders.filter((order) =>
          moment(order.createdAt).isSame(moment(), "week")
        ).length
      : 0;

  const monthCount =
    orders.length > 0
      ? orders.filter((order) =>
          moment(order.createdAt).isSame(moment(), "month")
        ).length
      : 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 bg-gradient-to-r from-white to-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h3 className="font-semibold mb-4 text-lg">Orders Overview</h3>
      <div className="space-y-4">
        <div className="flex justify-between ">
          <span>Today's Orders</span>
          <span className="font-bold text-blue-600">{todayCount}</span>
        </div>
        <div className="flex justify-between">
          <span>This Week's Orders</span>
          <span className="font-bold text-blue-600">{weekCount}</span>
        </div>
        <div className="flex justify-between">
          <span>This Month's Orders</span>
          <span className="font-bold text-blue-600">{monthCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Orders</span>
          <span className="font-bold text-blue-600">{orders.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersOverview;
