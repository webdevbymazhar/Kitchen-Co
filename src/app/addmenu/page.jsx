"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Sidebar from "@/components/Slidebar";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; 
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Page = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this dish?");
    if (confirmation) {
      try {
        const response = await fetch(`/api/dishes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
          toast.success("Dish deleted successfully");
        } else {
          console.error("Failed to delete the dish.");
        }
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 min-h-screen overflow-auto">
        <Sidebar />
        <div className="flex-1 p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-extrabold text-gray-800">Dishes Admin</h1>
            <Link
              href="/adddishes"
              className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <FaPlus size={18} />
              Add Dish
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 h-screen overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 h-screen overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <div
                  key={dish._id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={dish.images[0]}
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-md mb-4 transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="flex flex-col justify-between h-fit">
                    <div>
                      <Link href={`/menu/${dish._id}`}>
                        <h3 className="text-2xl font-semibold text-gray-700 hover:text-red-500 transition-colors duration-300">
                          {dish.name} 
                        </h3>
                      </Link>
                      <p className="mt-2 text-gray-600 text-sm">{dish.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-red-600">${dish.price}</p>
                     
                      <div className="flex space-x-3">
                      <Link href={`/updateDish/${dish._id}`}>
                          <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-300" size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(dish._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                          <FaTrash  size={20} />
                        </button>
                      </div>
                    </div>
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
