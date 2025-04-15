// src/app/404.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Custom404 = () => {
  const [hovered, setHovered] = useState(false);

  // Animation for the title text
  useEffect(() => {
    const letters = document.querySelectorAll(".error-letters span");
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="flex items-center fixed w-full justify-center h-screen bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-wider mb-6">
          <span className="error-letters flex justify-center">
            {"404".split("").map((char, idx) => (
              <span
                key={idx}
                className="inline-block animate-bounce text-indigo-500"
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        <h2 className="text-2xl mb-4 font-semibold text-gray-300">
          Oops! Page not found
        </h2>
        <p className="mb-8 text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative inline-flex items-center px-6 py-2 text-lg font-semibold rounded-md bg-indigo-500 text-gray-100 transform transition-all duration-300 hover:scale-105 ${
              hovered ? "animate-pulse" : ""
            }`}
          >
            <span>Return to Home</span>
          </button>
        </Link>
      </div>
      <style jsx>{`
        .error-letters span {
          display: inline-block;
          animation: bounce 0.6s ease-in-out forwards infinity;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Custom404;
