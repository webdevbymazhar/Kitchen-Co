'use client'
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrdersOverview = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for the line chart (replace with your logic to calculate revenue for the last 4 months)
  const mockChartData = {
    labels: ["January", "February", "March", "April" , 'August' , 'September' , 'December'],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 3000, 10000 , 2000,17000,9000],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  const fetchOrderSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout/admin'); // Adjust the endpoint to return only summary data
      const data = await response.json();

      if (response.ok) {
        setTotalRevenue(data.totalRevenue); // Assuming API response includes total revenue
        setTotalOrders(data.totalOrders); // Assuming API response includes total orders count
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setError("An error occurred while fetching order summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg p-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h3 className="font-semibold mb-4 text-lg">Orders Overview</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Total Revenue</span>
          <span className="font-bold text-green-600">${totalRevenue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Orders</span>
          <span className="font-bold text-blue-600">{totalOrders}</span>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h3 className="font-semibold mb-4 text-lg">Monthly Revenue Chart</h3>
        <Line data={mockChartData} options={options} />
      </motion.div>
    </motion.div>
  );
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 3000, 5000],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 1000,
    easing: "easeInOutQuad",
  },
};

const RevenueChart = () => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.5 }}
  >
    <h3 className="font-semibold mb-4 text-lg">Monthly Revenue</h3>
    <Line data={data} options={options} />
  </motion.div>
);

export default RevenueChart;
