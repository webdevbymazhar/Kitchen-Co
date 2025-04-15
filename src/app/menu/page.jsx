"use client";
import DishSkeleton from "@/components/DishSkeleton";
import Navbar from "@/components/Navbar";
import {
  FavouriteIcon,
  Search01Icon,
  FavouriteFilledIcon,
  ShoppingBasketCheckOut02Icon,
} from "hugeicons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];

  useEffect(() => {
    // Fetch wishlist from localStorage only on the client
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();
        setDishes(data);
        setFilteredDishes(data); // Initially set filtered dishes to all dishes
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    // Filter dishes based on search term and selected categories
    let filtered = dishes;

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((dish) =>
        selectedCategories.includes(dish.category)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
  }, [dishes, selectedCategories, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter((cat) => cat !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
  };

  const addToWishlist = (dish) => {
    const isAlreadyInWishlist = wishlist.some((item) => item._id === dish._id);

    let updatedWishlist;
    if (!isAlreadyInWishlist) {
      // Add dish to wishlist
      updatedWishlist = [...wishlist, dish];
      toast.success("Added to wishlist!");
    } else {
      // Remove dish from wishlist
      updatedWishlist = wishlist.filter((item) => item._id !== dish._id);
      toast.error("Removed from wishlist!");
    }

    // Update wishlist in localStorage and state
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div
        className="w-full h-[100px] md:h-[200px] flex items-center justify-center gap-3 flex-col mt-20 md:mt-24 border bg-cover bg-center"
        style={{
          backgroundImage: "url('/image_items_bg.png')",
        }}
      >
        <h1 className="text-4xl font-bold text-white">Items</h1>
        <p className="text-xs md:text-xl text-white font-semibold px-4 text-center">
        Welcome to a world of taste! Each dish on our menu is made with passion, <br /> fresh ingredients, and a touch of culinary magic.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex items-center justify-between gap-2 mt-5 mx-auto w-fit px-4">
        <div className="relative w-full">
          <input
            className="px-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Optional Search Icon */}
          <div className="absolute  inset-y-0 left-0 flex items-center pl-3">
            <Search01Icon size={20} color={"#000000"} variant={"stroke"} />
          </div>
        </div>
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategories([]); // Clear selected categories as well
          }}
          className="border py-2 rounded-lg w-[200px]"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-5 m-auto items-start gap-5 p-3 bg-slate-100">
        {/* Sidebar for Category Filters */}
        <div className="w-full md:w-[20%] h-full border p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>

        {/* Dishes Display Area */}
        <div className="w-full md:w-[80%] flex flex-wrap gap-3">
          {isLoading ? (
            // Show Skeletons while loading
            <div className="flex w-full gap-6">
              {[...Array(3)].map((_, index) => (
                <DishSkeleton key={index} /> // Display multiple skeletons
              ))}
            </div>
          ) : (
            // Map over actual dish data once loaded
            filteredDishes.map((dish) => (
              <div
              key={dish._id}
              className="flex bg-white relative group border border-gray-200 rounded-md shadow-xl items-center overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out"
              style={{ width: "100%", maxWidth: "500px", height: "220px" }}
            >
              {/* Left Section: Content */}
              <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
                {/* Title (linkable) */}
                <Link
                  href={`/menu/${dish._id}`}
                  className="text-[1rem] md:text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-200"
                >
                  {dish.name}
                </Link>
                {/* Description */}
                <p className="text-[.7rem] md:text-sm text-gray-600 mb-2 line-clamp-3">
                  {dish.description}
                </p>
                {/* Category */}
                <p className="text-[.8rem] italic font-sans font-semibold text-indigo-400">
                  {dish.category}
                </p>
                {/* Price */}
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  ${dish.price}
                </p>
              </div>
            
              {/* Wishlist Icon */}
              {wishlist.some((item) => item._id === dish._id) ? (
                <GoHeartFill
                  onClick={() => addToWishlist(dish)}
                  className="absolute top-2 left-2 cursor-pointer text-red-600 hover:text-red-700 transition-all transform hover:scale-110"
                  size={22}
                  title="Remove from wishlist"
                />
              ) : (
                <FavouriteIcon
                  onClick={() => addToWishlist(dish)}
                  className="absolute top-2 left-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all transform hover:scale-110"
                  size={22}
                  title="Add to wishlist"
                />
              )}
            
              {/* Right Section: Image */}
              <div className="w-full md:w-1/3 h-full flex items-center justify-center overflow-hidden">
                <img
                  src={dish.images[0]}
                  alt={dish.name}
                  className="rounded-lg object-cover w-[80%] h-[80%] transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DishesPage;
