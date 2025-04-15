// src/app/categories/page.jsx

"use client";
import Navbar from "@/components/Navbar";
import { FavouriteIcon } from "hugeicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";

const categories = [
  { name: "Dessert", bgImage: "url('/hero-img-1-1-1-1536x844.png')" },
  { name: "Main Course", bgImage: "url('/c2.jpg')" },
  { name: "Appetizer", bgImage: "url('/g3.avif')" },
  { name: "Beverage", bgImage: "url('/g4.jpg')" },
  { name: "Salad", bgImage: "url('/g5.jpg')" },
  { name: "Soup", bgImage: "url('/g6.avif')" },
  { name: "Pasta", bgImage: "url('/g7.jpg')" },
  { name: "Grill", bgImage: "url('/g8.jpg!bw700')" },
];

const CategoriesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setShowCategories(false);
  };

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full relative pb-10 mt-24 bg-gray-100 flex flex-col items-center pt-16">
        <h1 className="text-5xl font-extrabold my-8 text-gray-800">
          Categories
        </h1>
        <img
          className="absolute top-3 left-4 -rotate-12 w-[140px] md:w-[200px]"
          src="/hero-img-1-1-3.png"
          alt=""
        />
        {/* Show Categories Button */}
        {!showCategories && (
          <button
            onClick={() => {
              setShowCategories(true);
              setSelectedCategory(null);
            }}
            className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Show Categories
          </button>
        )}

        {/* Categories Display */}
        {showCategories && (
          <div className="w-full flex flex-wrap items-center px-4 justify-center gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative w-[350px] md:w-[500px] shadow-xl rounded-lg overflow-hidden h-60 md:h-80 flex items-center justify-center text-center text-white font-bold text-2xl bg-cover bg-center transition transform hover:scale-105 hover:shadow-2xl cursor-pointer
                  ${
                    selectedCategory === category.name
                      ? "ring-4 ring-blue-500"
                      : ""
                  }`}
                style={{
                  backgroundImage: category.bgImage,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-30 hover:opacity-40 transition"></div>
                <span className="relative z-10">{category.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Dishes Display */}
        {selectedCategory && (
          <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <div
                  key={dish._id}
                  className="relative w-[300px] md:w-[400px] flex bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl shadow-lg overflow-hidden transform group transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ height: "250px" }}
                >
                  {/* Left Section: Content */}

                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white bg-opacity-70 bg-gradient-to-t from-black to-transparent z-10">
                    <div className="z-40">
                      <a
                        href={`/menu/${dish._id}`}
                        className="text-2xl font-bold mb-1 hover:underline "
                      >
                        {dish.name}
                      </a>
                      <p className="text-sm opacity-90 mb-2">
                        {dish.description}
                      </p>
                      <p className="text-xs font-medium text-pink-200">
                        Category: {dish.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-orange-200 mt-1">
                        From ${dish.price}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Image */}
                  <div className="w-full h-full">
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="h-full w-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Overlay Effect */}
                  <Link href={`/menu/${dish._id}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 hover:opacity-50 transition-opacity duration-300 z-10"></div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No dishes available for this category.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
