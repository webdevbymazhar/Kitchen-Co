"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Slidebar";
import Link from "next/link";

const page = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch("/api/deals");
        if (!response.ok) {
          throw new Error("Failed to fetch deals");
        }
        const data = await response.json();
        setDeals(data);
        setFilteredDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    let filtered = [...deals];

    if (categoryFilter) {
      filtered = filtered.filter((deal) => {
        const categories = Array.isArray(deal.categories)
          ? deal.categories
          : [deal.categories];
        return categories.some((category) =>
          category.toLowerCase().includes(categoryFilter.toLowerCase())
        );
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "price") {
      filtered = filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === "discount") {
      filtered = filtered.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    }

    setFilteredDeals(filtered);
  }, [searchQuery, categoryFilter, sortOption, deals]);

  const handleShowDetails = (deal) => {
    setSelectedDeal(deal);
  };

  const handleCloseModal = () => {
    setSelectedDeal(null);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${selectedDeal.name} to cart!`);
    setSelectedDeal(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 h-screen overflow-auto bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Restaurant Dashboard
        </h1>
        <div className="max-w-7xl mt-12 mx-auto p-6">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">
            Amazing Deals
          </h1>

          {/* Search and Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search deals..."
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price">Price: Low to High</option>
                <option value="discount">Discount: High to Low</option>
              </select>
              <Link
                href="/adddeals"
                className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <FaPlus size={18} />
                Add Deal
              </Link>
            </div>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 h-screen overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.length === 0 ? (
              <p className="text-center text-xl text-gray-500">
                No deals available at the moment.
              </p>
            ) : (
              filteredDeals.map((deal) => (
                <div
                  key={deal._id}
                  className="bg-white shadow-lg w-full rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group relative"
                >
                  <img
                    className="w-full h-64 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                    src={deal.mainImage}
                    alt={deal.name}
                  />
                  <div
                    onClick={() => handleShowDetails(deal)}
                    className="absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300"
                  >
                    <FaArrowRight className="text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                    {deal.name}
                  </h3>
                  <p className="text-gray-600 my-2">{deal.description}</p>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-500 line-through">
                      Original Price:{" "}
                      <span className="text-gray-400">
                        ${deal.originalPrice}
                      </span>
                    </p>
                    <p className="text-lg text-red-600 font-bold">
                      Discount Price:{" "}
                      <span className="text-xl">${deal.discountPrice}</span>
                    </p>
                    <p className="text-lg text-green-600 font-semibold">
                      Discount: {deal.discountPercentage}%
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal */}
          {selectedDeal && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center transition-all duration-[.5] ease-in-out opacity-100 ${
                selectedDeal === false ? "scale-0" : "scale-100"
              }`}
            >
              <div className="bg-gray-900 text-white rounded-lg w-full max-w-4xl p-6 relative shadow-lg transition-all duration-300 animate-modal-in">
                <button
                  className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={handleCloseModal}
                >
                  <FaTimes />
                </button>

                <div className="flex ">
                  <div className="w-[50%]  p-4">
                    <div className="w-full  flex justify-center">
                      <img
                        className="w-full h-64 object-cover rounded-lg shadow-xl"
                        src={selectedDeal.mainImage}
                        alt={selectedDeal.name}
                      />
                    </div>
                    {selectedDeal.images && selectedDeal.images.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedDeal.images.map((image, index) => (
                          <img
                            key={index}
                            className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                            src={image}
                            alt={`Additional Image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-6">
                    <h2 className="text-4xl font-semibold text-gray-100">
                      {selectedDeal.name}
                    </h2>
                    <p className="text-lg text-gray-400">
                      {selectedDeal.description}
                    </p>

                    <div className="space-y-4 mt-6">
                      <p className="text-lg text-gray-500 line-through">
                        Original Price:{" "}
                        <span className="text-gray-400">
                          ${selectedDeal.originalPrice}
                        </span>
                      </p>
                      <p className="text-3xl text-red-500 font-bold">
                        Discount Price:{" "}
                        <span className="text-4xl">
                          ${selectedDeal.discountPrice}
                        </span>
                      </p>
                      <p className="text-xl text-green-500 font-semibold">
                        Discount: {selectedDeal.discountPercentage}%
                      </p>
                      <p className="text-lg text-gray-300">
                        Categories:{" "}
                        <span className="text-gray-400">
                          {selectedDeal.categories}
                        </span>
                      </p>
                      <p className="text-lg text-gray-300">
                        Start Date:{" "}
                        {new Date(selectedDeal.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg text-gray-300">
                        End Date:{" "}
                        {new Date(selectedDeal.endDate).toLocaleDateString()}
                      </p>
                      <p
                        className={`text-lg  font-semibold ${
                          selectedDeal.isActive
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {selectedDeal.isActive ? "Available" : "Expired"}
                      </p>

                      {/* Quantity Input */}
                      <div className="flex items-center space-x-4 mt-6">
                        <label
                          htmlFor="quantity"
                          className="text-lg text-gray-300"
                        >
                          Quantity:
                        </label>
                        <input
                          id="quantity"
                          type="number"
                          value={quantity}
                          min="1"
                          className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>

                      <button
                        className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg transform transition-all duration-300 hover:bg-indigo-700"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Images */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
