import React from "react";
import Navbar from "./Navbar";

const SkeletonLoader = () => {
  return (
    <>
      <Navbar />
      <div
        className="w-full h-[150px] flex items-center justify-center gap-3 flex-col mt-20 md:mt-24 border bg-cover bg-center"
        style={{
          backgroundImage: "url('/image_items_bg.png')",
        }}
      >
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </div>
      <div className="w-full  flex items-center justify-center p-4 mt-10">
        <div className="flex flex-col md:flex-row h-fit mt-3 items-center justify-center space-x-0 md:space-x-6">
          {/* Image Section */}
          <div className="p-3 overflow-hidden rounded-md shadow-lg flex-shrink-0 w-full md:w-[400px] h-[300px]">
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-md" />
          </div>

          {/* Dish Details Section */}
          <div className="flex-1 p-4 space-y-4">
            <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Dish Name Skeleton */}
            <div className="h-6 w-full bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Dish Description Skeleton */}
            <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Price Skeleton */}
            <div className="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Stock Skeleton */}
            <div className="h-6 w-[400px] bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Category Skeleton */}
            <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Availability Skeleton */}
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded"></div>{" "}
            {/* Ingredients Skeleton */}
            {/* Quantity Selector Skeleton */}
            <div className="flex items-center mt-4 space-x-4">
              <div className="w-10 h-8 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Decrease Button Skeleton */}
              <div className="w-12 h-8 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Quantity Display Skeleton */}
              <div className="w-10 h-8 bg-gray-300 animate-pulse rounded" />{" "}
              {/* Increase Button Skeleton */}
            </div>
            <div className="h-12 bg-blue-600 animate-pulse rounded-lg mt-4" />{" "}
            {/* Add to Cart Button Skeleton */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
