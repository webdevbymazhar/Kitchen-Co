"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import FeedbackUsers from "@/components/FeedbackUsers";

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(
      (order) =>
        orderStatusFilter === "All" || order.OrderStatus === orderStatusFilter
    )
    .filter(
      (order) =>
        order._id.includes(searchTerm) ||
        new Date(order.orderTime).toLocaleDateString().includes(searchTerm)
    )
    .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

  const handleStatusChange = (e) => setOrderStatusFilter(e.target.value);
  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <>
      {session?.user?.role === "customer" ? (
        <p>You don't have any access</p>
      ) : (
        <>
          <Navbar />
          <div className="mt-24 min-h-screen p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold text-blue-700">Orders</h1>
              <input
                className="px-3 py-2 w-[50%] rounded-md shadow-lg outline-none"
                type="text"
                placeholder="Search by ID or Order Date"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-800">
                  Total Orders:{" "}
                  <span className="text-blue-700">{filteredOrders.length}</span>
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={handleStatusChange}
                  className="p-2 border border-gray-300 rounded-md shadow-lg bg-white text-gray-700 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <p className="text-gray-500 text-center text-lg animate-pulse">
                Loading orders...
              </p>
            ) : error ? (
              <p className="text-red-500 text-center text-lg">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="rounded-lg shadow-lg p-6 bg-gradient-to-r from-white to-gray-100 transition-transform transform hover:scale-105"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Order ID: {order._id}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          order.OrderStatus === "Completed"
                            ? "text-green-700"
                            : order.OrderStatus === "Pending"
                            ? "text-yellow-700"
                            : order.OrderStatus === "In Progress"
                            ? "text-blue-700"
                            : "text-red-700"
                        }`}
                      >
                        {order.OrderStatus}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Table Number:</strong> {order.tableNumber}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Server Name:</strong> {order.serverName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Order Time:</strong>{" "}
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Total Price:</strong> $
                      {order.items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Notes:</strong> {order.notes}
                    </p>
                    <div className="mt-3">
                      <strong>Items:</strong>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {order.items.map((item) => (
                          <li key={item._id}>
                            {item.name} (x{item.quantity}) - $
                            {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </>
      )}
    </>
  );
};

export default OrdersPage;
