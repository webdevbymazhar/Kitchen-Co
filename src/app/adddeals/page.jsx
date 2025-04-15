// src/app/adddeals/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddDealPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountPrice: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    categories: "",
    images: "",
    mainImage: "",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.title || !formData.description || !formData.originalPrice) {
      setError("Title, description, and original price are required.");
      return;
    }

    // Further validation (e.g., correct price format, date format)

    try {
      const response = await fetch("/api/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add deal");
      }

      const result = await response.json();
      setSuccess("Deal added successfully!");
      toast.success("Deal added successfully");
      setFormData({
        title: "",
        description: "",
        originalPrice: "",
        discountPrice: "",
        discountPercentage: "",
        startDate: "",
        endDate: "",
        categories: "",
        images: "",
        mainImage: "",
        isActive: true,
      });
      setError("");
      setSuccess("");
    } catch (err) {
      setError("Error adding deal: " + err.message);
      setSuccess("");
    }
  };
  const categories = [
    "Dinner",
    "Lunch",
    "Breakfast",
    "Family Pack",
    "Friends Pack",
    "Special",
  ];
  const handleCategoryClick = (category) => {
    // Check if the category is already in the field
    const currentCategories = formData.categories
      .split(",")
      .map((cat) => cat.trim());
    if (!currentCategories.includes(category)) {
      // Add category and update the field
      const updatedCategories = currentCategories
        .filter(Boolean)
        .concat(category)
        .join(", ");
      setFormData({ ...formData, categories: updatedCategories });
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 pb-10 bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Add New Deal
      </h1>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Prices Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="originalPrice"
                className="text-sm font-medium text-gray-700"
              >
                Original Price
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="discountPrice"
                className="text-sm font-medium text-gray-700"
              >
                Discount Price
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="discountPercentage"
                className="text-sm font-medium text-gray-700"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                Select a Category:
              </h3>
              <div className="flex gap-2 mt-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="px-3 text-[.7rem] py-2 border-2 border-gray-400 text-black rounded-lg shadow   font-semibold transition duration-300"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <label
              htmlFor="categories"
              className="text-sm font-medium text-gray-700"
            >
              Categories (comma separated)
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              required
              
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Main Image */}
          <div>
            <label
              htmlFor="mainImage"
              className="text-sm font-medium text-gray-700"
            >
              Main Image URL
            </label>
            <input
              type="text"
              id="mainImage"
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Additional Images */}
          <div>
            <label
              htmlFor="images"
              className="text-sm font-medium text-gray-700"
            >
              Additional Image URLs (comma separated)
            </label>
            <input
              type="text"
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-1 justify-start">
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700"
            >
              Is Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className=" rounded-md focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition duration-300"
          >
            Submit Deal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDealPage;
