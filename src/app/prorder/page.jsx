"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FeedbackUsers from "@/components/FeedbackUsers";
import Link from "next/link";
import Porderskelton from "@/components/Porderskelton";
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const userEmail = session?.user?.email;

      // Check if userEmail exists
      if (!userEmail) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch("/api/checkout/customer", {
        headers: {
          session: JSON.stringify({ email: userEmail }), // Pass email in headers
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders); // Set orders in state
      } else {
        setError(data.message); 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while fetching your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch orders if the session is loaded and user is authenticated
    if (status === "authenticated") {
      fetchUserOrders();
    } else if (status === "unauthenticated") {
      setError("User is not authenticated.");
    }
  }, [status]); // Dependency on status

  if (loading)
    return (
      <div className="text-center mt-10">
        <Porderskelton />
      </div>
    );
  if (error)
    return <div className="text-center flex items-center justify-center w-full h-screen  mt-10 ">
      <Navbar/>
      <div >

        <h1 className="text-xl font-semibold md:text-2xl">Failed to Load your Orders </h1>
        <p>Try refreshing <span onClick={()=>window.location.reload()} className="text-blue-500 cursor-pointer underline text-xs md:text-xl">Refresh</span></p>
      </div>
    </div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20 md:mt-24 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
          Your Order Details
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gradient-to-br from-gray-100 to-gray-200">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg shadow-xl bg-white p-6 transform transition-all duration-300 hover:shadow-2xl "
              >
                <p className="text-gray-700 text-sm mb-2">
                  <span className="text-indigo-600 font-semibold">
                    "{order.name}"
                  </span>{" "}
                  will receive your order.
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Confirmation sent to{" "}
                  <span className="text-indigo-600 font-semibold">
                    "{order.email}"
                  </span>
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Delivery Address:{" "}
                  <span className="text-gray-800 font-medium">
                    {order.address}
                  </span>
                </p>
                <p className="text-lg font-bold mt-2">
                  Total Price:{" "}
                  <span className="text-blue-600">${order.totalPrice}</span>
                </p>

                {/* Order Status Message */}
                <div className="flex items-center mt-4">
                  <p className="font-semibold text-sm">Status:</p>
                  <span
                    className={`ml-2 font-bold rounded-full px-3 py-1 text-xs ${
                      order.OrderStatus === "complete"
                        ? "text-green-700 bg-green-200"
                        : order.OrderStatus === "Packed"
                        ? "text-yellow-700 bg-yellow-200"
                        : "text-gray-600 bg-gray-200"
                    }`}
                  >
                    {order.OrderStatus === "pending" && "Processing"}
                    {order.OrderStatus === "Packed" && "Packed for Shipping"}
                    {order.OrderStatus === "On the way" && "On the Way!"}
                    {order.OrderStatus === "complete" && "Completed! 🎉"}
                  </span>
                </div>

                {/* Items Details */}
                <h3 className="font-bold mt-6 text-lg mb-3 border-b pb-2">
                  Items:
                </h3>
                {order.cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover mr-4 rounded shadow-md transform transition-transform duration-300 hover:scale-110"
                    />
                    <div className="flex-grow ml-4">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: <span className="font-bold">${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}

                {/* Send Feedback Button for Completed Orders */}
                {order.OrderStatus === "complete" && (
                  <div className="mt-6 text-center">
                    <Link href="/sendFeedBack">
                      <button
                        onClick={() => handleSendFeedback(order._id)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-300"
                      >
                        Send Feedback
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <FeedbackUsers />
    </>
  );
};

export default ProfilePage;
