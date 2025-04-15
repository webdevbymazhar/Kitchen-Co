// src/app/dishes/[id]/page.jsx
"use client";
import Navbar from "@/components/Navbar";
import { ShoppingBasketCheckOut02Icon } from "hugeicons-react";
import Link from "next/link";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { use } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/SingleProductSkelton";
import MoreButton from '@/components/MoreButton'
const DishDetail = ({ params }) => {
  const { data: session } = useSession();
  const { id } = use(params);
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]); // Initialize cart state

  // Fetch all dishes for related items
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

  // Fetch single dish detail
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`/api/dishes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dish");
        }
        const data = await response.json();
        setDish(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDish();
    }
  }, [id]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleIncrease = () => {
    if (quantity < dish.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add dish to cart
  const handleAddToCart = () => {
    const newCartItem = {
      id: dish._id,
      name: dish.name,
      price: dish.price,
      stock: dish.stock,
      category:dish.category,
      quantity,
      image: dish.images[0],
    };

    // Check if item already exists in cart and update quantity
    const existingItem = cart.find((item) => item.id === newCartItem.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === newCartItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, newCartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added Successfully");
    window.location.reload();
  };

  if (error) return <p>Error: {error}</p>;
  if (loading) return <SkeletonLoader />;

  return (
    <>
      <Navbar />

      <div>
        {session?.user ? (
          <>
            <div
              className="w-full h-[150px] flex items-center justify-center gap-3 flex-col mt-20 md:mt-24 border bg-cover bg-center"
              style={{
                backgroundImage: "url('/image_items_bg.png')",
              }}
            >
              <h1 className="md:text-4xl text-center text-xl font-bold text-white">{dish.name}</h1>
            </div>
            <div className="w-full flex items-center justify-center p-6 mt-6">
  <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
    {/* Image Section */}
    <div className="p-3 overflow-hidden rounded-md shadow-sm flex-shrink-0 w-full md:w-[450px] h-[350px] border border-gray-300">
      <img
        src={dish.images[0]}
        alt={dish.name}
        className="h-full w-full object-cover object-center transition-all duration-500 transform hover:scale-105"
      />
    </div>

    {/* Dish Details Section */}
    <div className="flex-1 p-6 bg-white shadow-sm rounded-md border border-gray-200 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">{dish.name}</h1>
      <p className="text-lg text-gray-600">{dish.description}</p>

      <div className="space-y-2">
        <p className="text-2xl font-semibold text-gray-900">Price: ${dish.price}</p>

        {/* Stock Status */}
        <p className="text-base">
          Stock:{" "}
          {dish.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {/* Category */}
        <p className="text-base text-gray-700 font-medium">
          Category: <span className="text-blue-600">{dish.category}</span>
        </p>

        {/* Availability */}
        <p className="text-base text-gray-700 font-medium">
          Availability:{" "}
          <span className={dish.isAvailable ? "text-green-600" : "text-red-600"}>
            {dish.isAvailable ? "Available" : "Unavailable"}
          </span>
        </p>

        {/* Ingredients */}
        <p className="text-base text-gray-700">
          <span className="text-blue-800 font-semibold">Ingredients: </span>
          <span className="italic">{dish.ingredients.join(", ")}</span>
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mt-4 space-x-4">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-xl font-medium disabled:opacity-50"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="text-2xl font-semibold">{quantity}</span>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-xl font-medium disabled:opacity-50"
          onClick={handleIncrease}
          disabled={quantity >= dish.stock}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        className="mt-6 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300"
        onClick={handleAddToCart} // Call handleAddToCart on click
      >
        Add to Cart{" "}
        <ShoppingBasketCheckOut02Icon
          size={20}
          color="#ffffff"
          variant="stroke"
        />
      </button>
    </div>
  </div>
</div>


            <h1 className="text-3xl text-center text-black font-bold py-4 mt-10">
              Related Dishes
            </h1>
            <div className="w-[95%] md:w-[80%] m-auto flex flex-wrap gap-3 pb-5">
              {dishes.slice(0, 4).map((dish) => (
                <div
                  key={dish._id}
                  className="flex bg-white border shadow-lg items-center rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  style={{ width: "500px", height: "180px" }}
                >
                  {/* Left Section: Content */}
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    {/* Title (linkable) */}
                    <Link
                      href={`/menu/${dish._id}`}
                      className="text-[1rem] font-semibold mb-2 text-blue-600 hover:underline cursor-pointer"
                    >
                      {dish.name}
                    </Link>
                    <p className="text-xs">{dish.description}</p>
                    <p className="text-xs text-blue-400 mt-1">
                      {dish.category}
                    </p>

                    {/* Price */}
                    <p className="text-md font-medium text-gray-800 mt-1">
                      From ${dish.price}
                    </p>
                  </div>

                  {/* Right Section: Image */}
                  <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="h-full w-full object-cover object-center hover:scale-105 transition-all duration-[.5s]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center pb-5 justify-center w-full">
              <Link
                
                href="/menu"
              >
               <MoreButton/>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-24 flex items-center justify-center w-full h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-4xl font-bold">Login for more detail</p>
              <Link
                className="px-4 py-2 border border-orange-500"
                href="/login"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DishDetail;
