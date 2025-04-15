'use client'
import Image from "next/image";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Hafiz Jamal Ali",
    role: "CEO & Founder Inc",
    image: "/jamal.jpg",
    content:
      "Lorem ipsum dolor sit amet consectetur. Tortor massa nisi quam sit. Vitae congue ultrices neque penatibus mi in quis in. Lacus enim magnis ante. Proin lacus purus scum sagittis ac eu egestas quis. Ornare tincidunt tempus semper.",
    rating: 5,
  },
  {
    name: "Mubisher Ali",
    role: "CEO & Founder LLC",
    image: "/mubisher.jpg",
    content:
      "Lorem ipsum dolor sit a massa nisi quam sit. Vitae congue ultrices neque penatibus mi in quis in. Lacus enim magnis ante. Proin lacus purus scum sagittis ac eu egestas quis. Ornare tincidunt tempus semper.",
    rating: 5,
  },
];

export default function Section3() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-gray-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Happy Customers
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>

        <div className="mt-16 relative">
          <Image
            src="/Plate sketch.png"
            alt="Plate sketch"
            width={400}
            height={400}
            className="absolute left-0 top-0 opacity-10"
          />

          <div className="relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                  <div className="flex items-center flex-col justify-center">
                    <img className="size-32 relative rounded-full" src={testimonials[currentTestimonial].image} alt="" />
                    <div className="ml-4">
                      <div className="flex items-center mt-2">
                        {[
                          ...Array(testimonials[currentTestimonial].rating),
                        ].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg text-gray-600">
                      {testimonials[currentTestimonial].content}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-base font-medium text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={prevTestimonial}
              className="mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`mx-1 h-3 w-3 rounded-full ${
                  currentTestimonial === index ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
            ))}
            <button
              onClick={nextTestimonial}
              className="mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-600 rounded-lg overflow-hidden h-96">
        <div
  className="px-6 py-8 sm:p-10 sm:pb-6 bg-cover bg-no-repeat h-full flex items-center justify-center gap-8 flex-col bg-center "
  style={{ backgroundImage: "url('/Mask group.png')" }}
>
  <div className="text-center">
    <h3 className="text-2xl leading-9 font-extrabold text-white sm:text-3xl sm:leading-10">
      Get Our Promo Code by Subscribing To our Newsletter
    </h3>
  </div>
  <form className=" sm:flex justify-center items-center">
    <input
      aria-label="Email address"
      type="email"
      required
      className="appearance-none sm:max-w-xs px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out w-[800px]"
      placeholder="Enter your email"
    />
    <div className="mt-3 sm:mt-0 sm:ml-3">
      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition duration-150 ease-in-out"
      >
        Subscribe
      </button>
    </div>
  </form>
</div>

        </div>
      </div>
    </div>
  );
}
