"use client";

import Navbar from "@/components/Navbar";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (dishId) => {
    const updatedWishlist = wishlistItems.filter((item) => item._id !== dishId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Removed from wishlist!");
  };

  return (
    <div className="min-h-screen bg-slate-100">
<Navbar/>

<div className="container mt-24 mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist</h2>
  {wishlistItems.length === 0 ? (
    <div className="text-center">
      <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
      <Link
        href="/menu"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 transform "
      >
        Browse Dishes
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
    {wishlistItems.map((dish) => (
      <div
        key={dish._id}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
      >
        {/* Dish Image */}
        <div className="relative group">
          <img
            src={dish.images[0]}
            alt={dish.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
  
        {/* Dish Information */}
        <div className="p-6">
          {/* Dish Name */}
          <h3 className="text-2xl font-semibold mb-2 text-gray-800 truncate">{dish.name}</h3>
          
          {/* Dish Description */}
          <p className="text-gray-600 mb-3 text-sm line-clamp-2">{dish.description}</p>
          
          {/* Dish Category */}
          <span className="text-indigo-600 text-sm font-medium mb-3 block">{dish.category}</span>
          
          {/* Dish Price */}
          <p className="text-xl font-bold text-gray-900 mb-5">${dish.price}</p>
  
          {/* Actions */}
          <div className="flex justify-between items-center">
            {/* View Details Button */}
            <Link
              href={`/menu/${dish._id}`}
              className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm font-medium"
            >
              View Details
            </Link>
  
            {/* Remove from Wishlist Button */}
            <button
              onClick={() => removeFromWishlist(dish._id)}
              className="text-red-600 hover:text-red-700 transition duration-200"
              aria-label={`Remove ${dish.name} from wishlist`}
            >
              <TrashIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  )}
</div>

    </div>
  );
};

export default WishlistPage;