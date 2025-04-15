"use client";

import Sidebar from "@/components/Slidebar";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RestaurantSettings() {
  // State for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/resinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          address: address,
          phone: phone,
          isOpen: isOpen,
        }),
      });

      if (response.ok) {
        toast.success("Restourent Info was changed");
        setName("");
        setAddress("");
        setPhone("");
      } else {
        const errorData = await response.json();
        console.error("Failed to save general settings:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6  overflow-auto h-screen ">
        <div className="container mx-auto p-6 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Restaurant Settings
            </h1>
          </header>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                General Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isOpen"
                  checked={isOpen}
                  onChange={(e) => setIsOpen(e.target.checked)}
                  className="h-4 px-2 py-1 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isOpen"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Restaurant is currently {isOpen ? "Open" : "Closed"}
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save General Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
