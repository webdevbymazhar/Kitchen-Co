'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MoreButton from '@/components/MoreButton';

const Section05 = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center gap-5 py-10">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse w-[90%] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[350px] sm:h-[400px] md:h-[450px] rounded-lg shadow-lg"
            />
          ))}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-gray-100 to-blue-50 py-14 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
        Explore Our Featured Dishes
      </h2>
      <div className="max-w-[1200px] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {dishes.slice(0, 3).map((dish) => (
          <div
            key={dish._id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 w-full h-[400px] sm:h-[450px]"
          >
            {/* Image Background with Overlay */}
            <div className="relative h-full w-full">
              <img
                src={dish.images?.[0]}
                alt={dish.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
              <Link href={`/menu/${dish._id}`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 hover:underline cursor-pointer">
                  {dish.name}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm mb-1 line-clamp-2">{dish.description}</p>
              <p className="text-sm sm:text-md font-semibold mb-2">From ${dish.price}</p>
              <Link
                href={`/menu/${dish._id}`}
                className="inline-block bg-blue-500 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-full hover:bg-blue-600 transition duration-200"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center sm:justify-start lg:justify-center mt-6 sm:mt-0">
          <MoreButton />
        </div>
      </div>
    </section>
  );
};

export default Section05;