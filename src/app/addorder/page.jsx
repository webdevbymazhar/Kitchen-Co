"use client";
import Navbar from "@/components/Navbar";
import SkeletonOrderCard from "@/components/SkeletonOrderCard";
import Sidebar from "@/components/Slidebar";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdCancel, MdCheck } from "react-icons/md";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // New state for status filter

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/checkout/admintwo");
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
        setFilteredOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term and status filter
    setFilteredOrders(
      orders.filter((order) => {
        const matchesSearch =
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || order.OrderStatus === statusFilter;

        return matchesSearch && matchesStatus;
      })
    );
  }, [searchTerm, orders, statusFilter]); // Added statusFilter dependency

  const updateOrderStatus = async (id, status) => {
    // Call your update order logic here
    fetchOrders(); // Refresh orders after updating
  };

  if (error)
    return <div className="text-red-500 text-center mt-24">{error}</div>;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.OrderStatus === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.OrderStatus === "Complete"
  ).length;

  return (
    <>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 overflow-scroll h-screen">
          <h1 className="text-4xl font-semibold text-gray-800 mb-8">
            Restaurant Dashboard
          </h1>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
            <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-[.4s] transform hover:scale-105">
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-3xl font-bold">{totalOrders}</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-[.4s] transform hover:scale-105">
              <h2 className="text-lg font-semibold">Pending Orders</h2>
              <p className="text-3xl font-bold">{pendingOrders}</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-[.4s] transform hover:scale-105">
              <h2 className="text-lg font-semibold">Completed Orders</h2>
              <p className="text-3xl font-bold">{completedOrders}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by email or address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 flex space-x-4">
            {["All", "Complete", "Cancelled", "pending"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Orders</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonOrderCard key={index} />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-[.5s] transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Order for {order.name}
                    </h2>
                    {order.OrderStatus === "Complete" ? (
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    ) : order.OrderStatus === "Cancelled" ? (
                      <FaTimesCircle className="text-red-500 text-2xl" />
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        {order.OrderStatus}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600">
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> {order.number}
                  </p>

                  <h3 className="font-semibold mt-4 text-gray-700">
                    Delivery Address:
                  </h3>
                  <p className="text-gray-600">
                    {order.address}, {order.apartment}
                  </p>
                  <p className="text-gray-600">
                    {order.city}, {order.state}, {order.zip}
                  </p>
                  <p className="text-gray-600">
                    <strong>Country:</strong> {order.country}
                  </p>

                  <h3 className="font-semibold mt-4 text-gray-700">
                    Payment Method:
                  </h3>
                  <p className="text-gray-600">{order.paymentMethod}</p>

                  <h3 className="font-semibold mt-4 text-gray-700">
                    Order Items:
                  </h3>
                  {order.cart.map((item) => (
                    <div key={item._id} className="flex items-center mt-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="ml-4 text-gray-600">
                        <p>{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  <h3 className="font-semibold mt-4 text-gray-700">
                    Total Price:
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Order placed on {new Date(order.createdAt).toLocaleString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={() => updateOrderStatus(order._id, "Cancelled")}
                    >
                      <MdCancel className="mr-1" /> Cancel
                    </button>
                    <button
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      onClick={() => updateOrderStatus(order._id, "Complete")}
                    >
                      <MdCheck className="mr-1" /> Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
