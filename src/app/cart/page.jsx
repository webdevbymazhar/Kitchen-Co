"use client";
import Navbar from "@/components/Navbar";
import { Delete02Icon } from "hugeicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleIncrease = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCart((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full h-[150px] flex items-center justify-center gap-3 flex-col mt-20 md:mt-24  bg-cover bg-center"
        style={{ backgroundImage: "url('/image_items_bg.png')" }}
      >
        <h1 className="text-4xl font-bold text-white">Your Cart</h1>
      </div>

      <div className="overflow-x-auto px-1 mt-6">
        {cart.length > 0 ? (
          <div className="w-[95%] md:w-[80%] m-auto">
            <div className="hidden md:block">
              {/* Desktop Table View */}
              <table className="w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-100 transition-colors duration-200 border-b"
                    >
                      <td className="py-2 px-4">
                        <img
                          className="w-[100px] shadow-lg rounded"
                          src={item.image}
                          alt={item.name}
                        />
                      </td>
                      <td className="py-2 px-4 font-semibold text-center">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 font-semibold text-center">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-l"
                          >
                            -
                          </button>
                          <span className="mx-2 text-lg font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <Delete02Icon
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => handleDelete(item.id)}
                          size={24}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block  md:hidden"> {/* Mobile Card View */}
  {cart.map((item) => (
    <div
      key={item.id}
      className="flex flex-col w-full  bg-white shadow-lg rounded-lg p-4 mb-4 transition-all duration-200 hover:shadow-xl"
    >
      <div className="flex gap-4 items-center">
        <img
          className="w-[60px] h-[60px] object-cover shadow-md rounded"
          src={item.image}
          alt={item.name}
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-lg text-gray-900">{item.name}</h2>
          <p className="text-gray-700 text-sm">Price: ${item.price.toFixed(2)}</p>
          <p className="font-semibold text-indigo-500 text-sm">{item.category}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex items-center">
          <button
            onClick={() => handleDecrease(item.id)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-l transition-all duration-200"
          >
            -
          </button>
          <span className="mx-3 text-lg font-bold text-gray-800">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item.id)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-r transition-all duration-200"
          >
            +
          </button>
        </div>
        <Delete02Icon
          className="cursor-pointer text-gray-500 hover:text-red-600 transition-all duration-200"
          onClick={() => handleDelete(item.id)}
          size={24}
        />
      </div>
    </div>
  ))}
</div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <img src="/empty-cart.png" alt="" className="m-auto" />
              <p className="text-xl font-semibold">
                Your cart is currently empty
              </p>
              <Link
                href="/menu"
                className="inline-block mt-4 px-4 py-2 border border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="w-[80%] m-auto flex items-center justify-center mt-10 pb-10">
        <div className="border-2 border-gray-600 rounded-md w-full md:w-[300px] p-5 shadow-lg">
          <h1 className="text-2xl font-bold">Cart subTotal</h1>
          <p className="py-3 flex justify-between border-b-2 font-semibold">
            Order subtotal :{" "}
            <span className="text-orange-400">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </p>
          <p className="py-3 flex justify-between border-b-2 font-semibold">
            Shipping: <span className="text-orange-400">Free shipping</span>
          </p>
          <p className="py-3 flex justify-between border-b-2 font-semibold">
            Coupon: <span className="text-orange-400">0</span>
          </p>
          <p className="py-3 flex justify-between border-b-2 font-semibold">
            Total:{" "}
            <span className="text-orange-400">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </p>
          <Link
            href="/checkout"
            onClick={handleCheckout}
            className="block mt-4 px-4 py-2 text-center font-semibold uppercase bg-orange-500 text-white rounded"
          >
            Check Out
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
