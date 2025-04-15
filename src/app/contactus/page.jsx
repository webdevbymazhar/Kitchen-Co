"use client";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setError("Error submitting message");
      }
    } catch (err) {
      setError("Error submitting message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-[98px]">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full border border-blue-500">
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">
            Get In Touch
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Leave us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="First_Name Last_Name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>

              {success && <p className="text-green-500 mt-4">{success}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <p> Zameen.com building, Susan road, Faisalabad, Pakistan.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p>+923106459178</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p>jamalali18470@gmail.com</p>
              </div>
              <div className="flex space-x-4">
                <Link href="#" aria-label="YouTube">
                  <Youtube className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
              </div>
              <div className="">
                <iframe
                  className="rounded-full "
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54475.328148096676!2d73.15449349230957!3d31.42216999832215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1729937853597!5m2!1sen!2s"
                  width="200"
                  height="200"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade "
                ></iframe>
                {/* <Image
                // src="/https://maps.app.goo.gl/qD2coxdCU765UKN19"
                alt="Map"
                layout="fill"
                objectFit="cover"
                className="rounded"
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
