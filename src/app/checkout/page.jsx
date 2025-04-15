"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const CheckoutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: document.getElementById("email").value,
      country,
      name: document.getElementById("name").value,
      number: document.getElementById("number").value,
      address: document.getElementById("address").value,
      apartment: document.getElementById("apartment").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      paymentMethod: document.querySelector('input[name="payment"]:checked')
        ? "Cash on Delivery"
        : "Credit Card",
      cart,
      totalPrice: calculateTotalPrice(),
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Order send successfully");
        router.push("/thankyou");
      } else {
        alert("There was an error placing the order.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to submit checkout data:", error);
    }
  };
  return (
    <div>
      <Navbar />

      <div className=" mt-20 md:mt-24 pb-10">
        <h1 className="text-[4rem] font-bold ml-16 mt-14  font-serif text-gray-700">
          Checkout
        </h1>
        <div
          className="flex md:flex-row flex-col-reverse
         w-full justify-center gap-14 h-fit p-6 bg-gray-50"
        >
          <div className="w-full md:w-[50%] h-fit border border-gray-200 bg-white px-6 py-8 rounded-lg shadow-lg">
            <form className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  We'll use this email to send you details and updates about
                  your order.
                </p>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={session?.user?.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  Billing Address
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Choose the address that matches your card or payment method.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country/Region
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select a country</option>
                      <option value="us">United States</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                      placeholder="First and last name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact Number
                    </label>
                    <input
                      type="number"
                      id="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                      placeholder="Valid Contact number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                        placeholder="City"
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  Payment Options
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" />
                    <span className="text-sm">Credit Card (Stripe)</span>
                  </label>
                  <div className="ml-6 p-3 bg-gray-100 rounded-md text-sm text-gray-600">
                    Visa, Master, Amex, Discover, Diners Club, JCB
                  </div>
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" />
                    <span className="text-sm">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input type="checkbox" id="terms" className="mt-1 mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  By proceeding with your purchase, you agree to our Terms and
                  Conditions and Privacy Policy.
                </label>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
              >
                {loading ? "Processing..." : "PLACE ORDER"}
              </button>
            </form>
          </div>

          <div className="w-full md:w-[35%] border p-4 rounded-lg shadow-lg bg-white">
            {cart.length > 0 ? (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-gray-800">
                  Order summary
                </h1>
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <img
                      className=" size-12 md:w-20 md:h-20 object-cover rounded-lg shadow-sm"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="flex-grow">
                      <p className="font-semibold md:text-[1rem] text-[.8rem] text-gray-800">{item.name}</p>
                      <p className="text-[.7rem] md:text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 font-semibold py-4">
                No items in cart
              </p>
            )}
            <p className="flex items-center justify-between py-3 border-b-2 font-semibold text-gray-900">
              Total :{" "}
              <span className="text-orange-400">
                ${calculateTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
