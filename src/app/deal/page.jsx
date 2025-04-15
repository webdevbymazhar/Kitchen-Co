"use client";
import { useEffect, useState } from "react";
import { FaArrowRight, FaTimes, FaSearch, FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import DescButton from "@/components/DescButton";

const DealsPage = () => {
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

  if (loading) {
    return (
      <div className="max-w-7xl mt-24 mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 animate-pulse"
          >
            <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mt-24 mx-auto p-6">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
          Amazing Deals
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
    <input
      type="text"
      placeholder="Search deals..."
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full md:w-64"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <select
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full md:w-64"
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
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full md:w-64"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="price">Price: Low to High</option>
      <option value="discount">Discount: High to Low</option>
    </select>
  </div>
</div>


        {filteredDeals.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No deals available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <div
                key={deal._id}
                className="relative  rounded-lg shadow-md p-6 transition-transform transform duration-300 group"
              >
                {/* Discount Badge */}
                <div className="absolute z-40 top-4 left-4 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  {deal.discountPercentage}% OFF
                </div>

                {/* Image with Overlay */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    className="w-full h-64 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                    src={deal.mainImage}
                    alt={deal.name}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
                    <p className="text-center text-lg px-4">
                      {deal.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-black capitalize">
                    {deal.title}
                  </h3>
                  <div className="mt-3">
                    <p className="text-sm text-black line-through">
                      Original Price:{" "}
                      <span className="text-black">
                        ${deal.originalPrice}
                      </span>
                    </p>
                    <p className="text-lg text-blue-600 font-bold">
                      Discount Price:{" "}
                      <span className="text-xl">${deal.discountPrice}</span>
                    </p>
                  </div>
                  <div className="mt-4" onClick={() => handleShowDetails(deal)}>
                    <DescButton />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedDeal && (
          <div
          className={`fixed  inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center transition-all duration-500 ease-in-out opacity-100 ${
            selectedDeal === false ? "scale-0" : "scale-100"
          }`}
        >
         {selectedDeal && (
  <div
    className={`fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center transition-all duration-500 ease-in-out opacity-100 ${
      selectedDeal === false ? "scale-0" : "scale-100"
    }`}
  >
    <div className="bg-gray-900 text-white h-screen overflow-auto rounded-lg w-full max-w-4xl p-6 relative shadow-lg transition-all duration-300 animate-modal-in">
      <button
        className="fixed md:absolute top-4 right-4 text-3xl text-gray-400 hover:text-white transition-colors duration-300"
        onClick={handleCloseModal}
      >
        <FaTimes />
      </button>

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
        {/* Left Section: Main Image and Additional Images */}
        <div className="w-full sm:w-1/2 p-4">
          <div className="w-full flex justify-center">
            <img
              className="w-full sm:h-64 object-cover rounded-lg shadow-xl transition-all duration-300"
              src={selectedDeal.mainImage}
              alt={selectedDeal.name}
            />
          </div>
          {selectedDeal.images && selectedDeal.images.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedDeal.images.map((image, index) => (
                <img
                  key={index}
                  className="w-full sm:h-24 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  src={image}
                  alt={`Additional Image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Deal Information */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100">{selectedDeal.title}</h2>
          <p className="text-xs sm:text-sm mt-2 text-gray-400">{selectedDeal.description}</p>

          <div className="space-y-4 mt-6">
            <p className="text-lg sm:text-xl text-gray-500 line-through">
              Original Price:{" "}
              <span className="text-gray-400">${selectedDeal.originalPrice}</span>
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-red-500 font-bold">
              Discount Price:{" "}
              <span className="text-xl sm:text-2xl md:text-4xl">${selectedDeal.discountPrice}</span>
            </p>
            <p className="text-xs sm:text-2xl text-green-500 font-semibold">
              Discount: {selectedDeal.discountPercentage}%
            </p>
            <p className="text-sm sm:text-lg text-gray-300">
              Categories:{" "}
              <span className="text-gray-400">{selectedDeal.categories}</span>
            </p>
            <p className="text-xs sm:text-sm md:text-lg text-gray-300">
              Start Date:{" "}
              {new Date(selectedDeal.startDate).toLocaleDateString()}
            </p>
            <p className="text-xl sm:text-sm md:text-lg text-gray-300">
              End Date:{" "}
              {new Date(selectedDeal.endDate).toLocaleDateString()}
            </p>
            <p
              className={`text-xs sm:text-sm md:text-lg font-semibold ${
                selectedDeal.isActive ? "text-green-400" : "text-red-400"
              }`}
            >
              {selectedDeal.isActive ? "Available" : "Expired"}
            </p>

            {/* Quantity Input */}
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex text-xl items-center space-x-4 mt-4">
                Quantity: 
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="bg-gray-700 ml-3 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaMinus />
                </button>
                <span className="text-2xl text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg transform transition-all duration-300 hover:bg-indigo-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
        
        )}
      </div>
    </>
  );
};

export default DealsPage;
