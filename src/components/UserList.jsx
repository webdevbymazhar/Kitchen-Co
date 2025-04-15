// src/components/UserList.jsx
"use client";

import React, { useEffect, useState } from "react";
import UserCardSkeleton from "./UserCardSkeleton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [searchTerm , setSearchTerm] = useState("")
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      // Filter users whose role is 'customer'
      const customerUsers = data.filter((user) => user.role === "customer");
      setUsers(customerUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const filteredUsers = users.filter((user)=>{
  const userId = user._id.toLowerCase();
  const userName = user.name.toLowerCase();
  const search = searchTerm.toLowerCase();

  return userId.includes(search) || userName.includes(search);

})

  if (error)
    return <div className="text-red-500 text-center mt-24">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 overflow-auto h-screen">
      <div className="flex items-center justify-between pb-5">
      <h1 className="text-3xl font-bold mb-6">Customer List</h1>
      <input
            className="px-3 py-2 w-[50%] rounded-md shadow-lg outline-none"
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="Search by User ID or Username name"
            
          />
      </div>

      {loading &&
      Array.from({ length: 6 }).map((_, index) => <UserCardSkeleton key={index} />)}

    {/* Render actual users if not loading */}
    {!loading && filteredUsers.map((user, index) => (
      <div
        key={user._id}
        className="border p-4 mb-6 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg transition-transform transform "
      >
        {/* Actual user content */}
        <p className="text-indigo-600 font-bold text-xl text-end">{index + 1}</p>
        <div className="flex items-center mb-4">
          <img
            src="/two.png"
            className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-blue-600 text-xs">{user._id}</p>
          </div>
        </div>
        
        {/* User address and orders */}
        <div className="mt-2">
          <h3 className="font-bold text-gray-700">Address:</h3>
          <p>Contact Number : <span className="font-semibold text-indigo-600">{user.address.ContactNumber || "Not provided"}</span></p>
          <p>Street : {user.address.street || "Not provided"}</p>
          <p>Country : {user.address.Country || "Not provided"}</p>
          <p>City : {user.address.city || "Not provided"}</p>
          <p>{user.address.state || "Not provided"}, {user.address.zip || "Not provided"}</p>
          <p>Post Code : {user.address.PostCode || "Not provided"}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-gray-700">Orders:</h3>
          <p>{user.orders.length > 0 ? `${user.orders.length} order(s)` : "No orders placed yet."}</p>
        </div>

        <p className="mt-2 text-gray-500">User since: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    ))}
    </div>
  );
};

export default UserList;
