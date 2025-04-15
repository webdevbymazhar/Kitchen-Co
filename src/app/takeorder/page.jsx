"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
const Page = () => {
  const {data:session} = useSession();
  const [dishes, setDishes] = useState([]);
  const [orderTime, setOrderTime] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(""); // Table number
  const [serverName, setServerName] = useState(""); // Server's name
  const [notes, setNotes] = useState(""); // Additional notes
  const [isLoading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const handleOrderItem = (dish) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((item) => item.dishId === dish._id);
      if (existingItem) {
        return prev.map((item) =>
          item.dishId === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { dishId: dish._id, name: dish.name, price: dish.price, quantity: 1 }];
      }
    });
  };
  

  const handleSendOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          orderTime,
          tableNumber,
          serverName,
          notes,
        }),
      });

      if (response.ok) {
       toast.success("Order send successfully")
        setCountdown((new Date(orderTime).getTime() - new Date().getTime()) / 1000);
        setOrderItems([]);
        setOrderTime("");
        setServerName("");
        setTableNumber("");
        setNotes("")
      } else {
        console.error("Failed to send order.");
        alert("Failed to send order");
      }
    } catch (error) {
      console.error("Error sending order:", error);
      alert("Error sending order");
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setOrderItems((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
        }
        return item;
      });
    });
  };

  return (
    <>

    {session?.user?.role === "waiter" ? (
      <>
      <Navbar />
      <div className="flex mt-24">
      <div className="flex-1 p-6 bg-gradient-to-r from-blue-50 to-blue-100 overflow-auto h-screen">
  <h1 className="text-5xl font-extrabold text-gray-800 mb-8">Take Order</h1>

  {/* Order Details Form */}
  <div className="space-y-6 mb-8">
    <div>
      <label className="block text-gray-700 font-semibold mb-2">Order Time:</label>
      <input
        type="datetime-local"
        value={orderTime}
        onChange={(e) => setOrderTime(e.target.value)}
        className="p-3 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-2">Table Number:</label>
      <input
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        placeholder="Table number"
        className="p-3 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-2">Server Name:</label>
      <input
        type="text"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        placeholder="Server Name"
        className="p-3 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-2">Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Special instructions or allergies"
        className="p-3 border rounded-lg w-full shadow-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Menu Items Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {isLoading ? (
      <p className="text-center text-gray-500 col-span-full">Loading dishes...</p>
    ) : (
      dishes.map((dish) => (
        <div
          key={dish._id}
          className="border rounded-xl shadow-lg bg-white p-5 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
        >
          <img
            src={dish.images[0]}
            alt={dish.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-gray-800 text-lg">{dish.name}</h3>
          <p className="text-gray-600 text-md">${dish.price}</p>
          <button
            onClick={() => handleOrderItem(dish)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full transition duration-200 hover:bg-blue-600 hover:shadow-md"
          >
            Add to Order
          </button>
        </div>
      ))
    )}
  </div>
</div>


        <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Items</h3>
            <ul className="mt-2">
              {orderItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-gray-700 border-b py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="bg-gray-300 px-2 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="bg-gray-300 px-2 rounded-r"
                    >
                      +
                    </button>
                    <span className="ml-2">{item.name} - ${item.price}</span>
                  </div>
                  <button onClick={() => handleRemoveItem(item._id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            {countdown && countdown > 0 ? (
              <p className="text-green-500 font-semibold">Time Remaining: {formatCountdown()}</p>
            ) : (
              <button
                onClick={handleSendOrder}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Order
              </button>
            )}
          </div>
        </div>
      </div>
      </>
    ):(
      <p>You are not a waiter</p>
    )}

    </>
  );
};

export default Page;
