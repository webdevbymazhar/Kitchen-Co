import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutUs() {
  return (
    <div className="bg-white mt-20 md:mt-24 text-gray-800 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* About Us Section */}
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">About Us</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 text-left">
              <p className="mb-4 text-lg leading-relaxed">
                We’re dedicated to providing an unforgettable experience filled
                with culinary delights and personalized service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our journey began with a vision to create a space where
                delicious food meets great ambiance. Join us and experience a
                unique dining adventure.
              </p>
            </div>
            <div className="md:w-1/2 shadow-lg hover:scale-105 transition-transform duration-500">
              <Image
                src="/dining.webp"
                alt="People dining"
                width={700}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-8 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mx-auto max-w-3xl">
            From humble beginnings to a beloved community restaurant, we’ve
            embraced our passion for fine food and hospitality every step of the
            way. Our story is filled with dedication, creativity, and the joy of
            sharing meals with friends and family.
          </p>
        </section>

        {/* Our Chef Section */}
        <section className="py-8 px-4 my-8 bg-pink-50 rounded-lg shadow-md transition hover:shadow-lg hover:bg-pink-100">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Meet Our Chef
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <Image
              src="/souschef.jpeg"
              alt="Chef Maryam Sheikh"
              width={250}
              height={250}
              className="rounded-full border-4 border-pink-300"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Chef Maryam Sheikh
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Known for her innovative dishes and passion for excellence,
                Chef Maryam creates culinary masterpieces that delight and
                inspire. Her dedication to quality and taste sets our restaurant
                apart.
              </p>
            </div>
          </div>
        </section>

        {/* Special Services Section */}
        <section className="py-8 px-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Special Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {["Birthday Party", "Wedding Party"].map((service, index) => (
              <div
                key={index}
                className="bg-white border p-6 rounded-lg hover:shadow-lg transition hover:bg-indigo-50"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service}
                </h3>
                <p className="text-gray-600">
                  {service === "Birthday Party"
                    ? "Celebrate your special day with us! We offer custom menus and decorations for birthday parties."
                    : "Make your wedding reception unforgettable with our exquisite catering and venue options."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-8  px-4 bg-gray-50 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Head Chef", "Sous Chef", "Pastry Chef"].map((role, index) => (
              <div
                key={index}
                className="text-center p-4 hover:bg-indigo-50 rounded-lg"
              >
                <Image
                  src="/headchef.jpeg"
                  alt={role}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4 border-4 border-gray-300"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {role}
                </h3>
                <p className="text-gray-600 mb-4">
                  Dedicated and talented, our {role.toLowerCase()} brings
                  creativity and expertise to every dish.
                </p>
                <div className="flex justify-center space-x-4">
                  <Facebook className="w-5 h-5 text-indigo-700" />
                  <Twitter className="w-5 h-5 text-indigo-700" />
                  <Instagram className="w-5 h-5 text-indigo-700" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
