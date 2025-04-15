"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Gauge, House, Menu, UserIcon, X } from "lucide-react";
import { useSession } from "next-auth/react"; // Use Lucide Icons
import { useRouter } from "next/navigation";
import {
  BorderFullIcon,
  Cancel01Icon,
  CancelCircleIcon,
  Contact02Icon,
  Delete02Icon,
  DiscountTag02Icon,
  Login03Icon,
  Menu02Icon,
  NewTwitterIcon,
  ShoppingCart02Icon,
  ShoppingCartFavorite02Icon,
  UserStoryIcon,
} from "hugeicons-react";
import toast from "react-hot-toast";
import { TbCategory2 } from "react-icons/tb";

import { MdRestaurantMenu } from "react-icons/md";
// or import { FaBars, FaTimes } from "react-icons/fa"; // Uncomment this line to use React Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [cartside, setCartSide] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [resname, SetResname] = useState([]);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch("/api/resinfo", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        SetResname(data);
      } catch (error) {
        console.log("Failed to fetch the resinfo");
      }
    };
    fetchinfo();
  }, []);

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
  // const handleIncrease = (id) => {
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const handleDecrease = (id) => {
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };
  const handleDelete = (id) => {
    setCart((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);

      toast.success("Item deleted succesfully");
      window.location.reload();
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled to true if pageYOffset (scroll position) is greater than 50px
      setScrolled(window.scrollY > 10);
    };

    // Add event listener on scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(storedWishlist);
  }, []);

  return (
    <div className="fixed w-full z-30 top-0">
      <nav
        className={`flex items-center justify-between p-4 md:p-6 md:px-8  bg-opacity-80  ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="md:hidden" onClick={() => setIsOpen(true)}>
            <button className="text-black font-extrabold focus:outline-none">
              <Menu02Icon size={26} />
            </button>
          </div>
          <img
            className="  w-[170px] rounded-full"
            src="/logoo.png"
            alt="Restaurant Logo"
          />{" "}
          {resname.length > 0 && (
            <div>
              <Link href="/">
                {/* <h1 className="text-xl md:text-2xl text-black font-bold uppercase tracking-tight hover:text-gray-700 transition duration-300 ease-in-out">
                  {resname[resname.length - 1].name || AL-Tastehub}
                </h1> */}
              </Link>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            label="home"
            currentPath={router.pathname}
            className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:bg-slate-100 rounded-md px-3 py-2 hover:text-orange-500 font-semibold transition-all duration-[.3s]"
          >
            <House size={16} />
            Home
          </Link>
          <Link
            href="/menu"
            className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
          >
            <MdRestaurantMenu size={16} />
            Menu
          </Link>
          <Link
            href="/deal"
            className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
          >
            <DiscountTag02Icon size={16} />
            Deals
          </Link>
          <Link
            href="/categories"
            className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
          >
            <TbCategory2 size={16} />
            Categories
          </Link>
          {session?.user?.role === "customer" ? (
            <>
              {" "}
              <Link
                href="/aboutus"
                className="text-black flex items-center justify-center gap-2 text-[.9rem] hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
              >
                <UserStoryIcon size={16} />
                About Us
              </Link>
              <Link
                href="/contactus"
                className="text-black text-[.9rem] flex items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
              >
                <Contact02Icon size={16} />
                Contact Us
              </Link>
            </>
          ) : (
            <p></p>
          )}

          {session?.user ? (
            <Link
              href="/profile"
              className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
            >
              <UserIcon size={16} />
              Profile
            </Link>
          ) : (
            <Link
              className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
              href="/login"
            >
              <Login03Icon size={24} />
              Login
            </Link>
          )}

          {session?.user?.role === "superadmin" ? (
            <Link
              href="/admindashboard"
              className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
            >
              <Gauge size={16} />
              Dashboard
            </Link>
          ) : (
            <p></p>
          )}
          {session?.user?.role === "waiter" ? (
            <Link
              href="/takeorder"
              className="text-black  text-[.9rem] flex items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
            >
              <BorderFullIcon size={16} />
              Take Order
            </Link>
          ) : (
            <p></p>
          )}
          {session?.user?.role === "chef" ? (
            <Link
              href="/seeorders"
              className="text-black text-[.9rem] hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
            >
              See orders
            </Link>
          ) : (
            <p></p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="border relative rounded-full p-2 cursor-pointer hover:bg-orange-100">
            <Link href="/wishlist">
              <ShoppingCartFavorite02Icon
                title="Wishlist"
                size={20}
                color={"#000000"}
                variant={"stroke"}
              />
            </Link>
            <p className="absolute size-5 bg-orange-500 text-white flex items-center justify-center -top-1 -right-2 rounded-full">
              {wishlistItems.length}
            </p>
          </div>
          <div
            onClick={() => setCartSide(true)}
            className="border relative rounded-full p-2 cursor-pointer hover:bg-orange-100 "
          >
            <ShoppingCart02Icon
              className="hover:text-blue-500"
              size={20}
              variant={"stroke"}
            />
            <p className="absolute size-5 bg-orange-500 text-white flex items-center justify-center -top-1 -right-2 rounded-full">
              {cart.length}
            </p>
          </div>

          {session?.user?.role === "admin" ? (
            <Link href="/addtable">
              <button className="bg-orange-500 shadow-md hidden md:block text-white px-5 font-semibold py-3 rounded-tl-2xl rounded-br-2xl hover:bg-black hover:text-white transition-all duration-[.5s]">
                See booked Table
              </button>
            </Link>
          ) : (
            <Link href="/book-table">
              <button className="bg-orange-500 shadow-md hidden md:block text-white px-5 font-semibold py-3 rounded hover:bg-black hover:text-white transition-all duration-[.5s]">
                Book a Table
              </button>
            </Link>
          )}
        </div>
        <div
          className={`fixed inset-0 md:hidden  bg-gray-800 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col p-4 z-40  bg-white shadow-lg">
              <div className="flex items-center gap-2">
                <img
                  className="size-10 md:w-12 md:h-12 rounded-full"
                  src="/logo.png"
                  alt="Restaurant Logo"
                />
                <h1 className="text-2xl text-black font-bold">Restaurant</h1>
              </div>
              <div
                className="md:hidden absolute right-2 top-3"
                onClick={() => setIsOpen(true)}
              >
                <button className="text-black font-extrabold focus:outline-none">
                  <CancelCircleIcon size={26} />
                </button>
              </div>
              <div className="flex items-start gap-2 flex-col mt-3">
                <Link
                  href="/"
                  label="home"
                  currentPath={router.pathname}
                  className="text-black flex w-full items-center justify-start gap-2 hover:bg-slate-100 rounded-md px-3 py-2 hover:text-orange-500 font-semibold transition-all duration-[.3s]"
                >
                  <House size={20} />
                  Home
                </Link>
                <Link
                  href="/menu"
                  className="text-black w-full flex items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                >
                  <MdRestaurantMenu size={20} />
                  Menu
                </Link>
                <Link
                  href="/deal"
                  className="text-black flex text-[.9rem] items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                >
                  <DiscountTag02Icon size={16} />
                  Deals
                </Link>
                <Link
                  href="/categories"
                  className="text-black flex w-full items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                >
                  <TbCategory2 size={20} />
                  Categories
                </Link>
                {session?.user?.role === "customer" ? (
                  <>
                    {" "}
                    <Link
                      href="/aboutus"
                      className="text-black flex items-center justify-center gap-2 text-[.9rem] hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                    >
                      <UserStoryIcon size={16} />
                      About Us
                    </Link>
                    <Link
                      href="/contactus"
                      className="text-black w-full flex items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                    >
                      <Contact02Icon size={20} />
                      Contact Us
                    </Link>
                  </>
                ) : (
                  <p></p>
                )}

                {session?.user ? (
                  <Link
                    href="/profile"
                    className="text-black w-full flex items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                  >
                    <UserIcon size={20} />
                    Profile
                  </Link>
                ) : (
                  <Link
                    className="text-black w-full flex items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                    href="/login"
                  >
                    <Login03Icon size={20} />
                    Login
                  </Link>
                )}

                {session?.user?.role === "admin" ? (
                  <Link
                    href="/admindashboard"
                    className="text-black w-full flex items-center justify-start gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                  >
                    <Gauge size={20} />
                    Dashboard
                  </Link>
                ) : (
                  <p></p>
                )}
                {session?.user?.role === "waiter" ? (
                  <Link
                    href="/takeorder"
                    className="text-black   flex items-center justify-center gap-2 hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                  >
                    <BorderFullIcon size={20} />
                    Take Order
                  </Link>
                ) : (
                  <p></p>
                )}
                {session?.user?.role === "chef" ? (
                  <Link
                    href="/seeorders"
                    className="text-black hover:text-orange-500 hover:bg-slate-100 rounded-md px-3 py-2 font-semibold tracking-tight"
                  >
                    See orders
                  </Link>
                ) : (
                  <p></p>
                )}
              </div>
              {session?.user?.role === "admin" ? (
                <Link href="/addtable">
                  <button className="bg-orange-500 w-full shadow-md  md:block text-white px-5 font-semibold py-3 rounded-tl-2xl rounded-br-2xl hover:bg-black hover:text-white transition-all duration-[.5s]">
                    See booked Table
                  </button>
                </Link>
              ) : (
                <Link href="/book-table">
                  <button className="bg-orange-500 w-full shadow-md md:block text-white px-5 font-semibold py-3 rounded-tl-2xl rounded-br-2xl hover:bg-black hover:text-white transition-all duration-[.5s]">
                    Book a Table
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        style={{
          width: cartside === false ? "0%" : "100%",
          transitionDuration: ".5s",
        }}
        className="border bg-gray-50 bg-opacity-55 backdrop-blur-md h-screen  absolute top-0 right-0 z-50"
      >
        <div
          style={{
            width: cartside === false ? "0%" : "370px",
            transitionDuration: ".8s",
          }}
          className="absolute top-0 right-0 bg-white w-[370px] h-screen overflow-hidden"
        >
          <div
            onClick={() => setCartSide(false)}
            className=" border overflow-hidden absolute top-5 right-5 rounded-full p-2 cursor-pointer  hover:text-red-700"
          >
            <Cancel01Icon size={20} variant={"stroke"} />
          </div>
          <div className="px-4 py-4">
            <div className="border-b  py-3 border-black">
              <h1 className="text-xl border-l border-orange-500 px-2">
                Menu Cart
              </h1>
            </div>
            {cart.length > 0 ? (
              cart.map((item) => (
                <>
                  <div
                    style={{
                      opacity: cartside === false ? "0" : "1",
                      transitionDelay: ".7s",
                    }}
                    className="flex gap-3 mt-4 items-center justify-between border-b py-2"
                    key={item.id}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="size-[60px] rounded-md"
                        src={item.image}
                        alt=""
                      />
                      <div className="">
                        <h2 className="text-xs">{item.name}</h2>
                        <p className="text-xs">Price: ${item.price}</p>
                        <p className="text-xs">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    <div>
                      <Delete02Icon
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 mr-3 cursor-pointer hover:text-red-900"
                        size={20}
                        variant={"stroke"}
                      />
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
            <h2 className="text-[1rem] font-bold mt-4">
              SubTotal: ${calculateTotalPrice().toFixed(2)}
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <Link
                className="px-4 py-2 text-xs bg-orange-500 text-white rounded-3xl hover:bg-black transition-all duration-[.4s]"
                href="/cart"
              >
                View Cart
              </Link>
              <Link
                className="px-4 py-2 text-xs bg-orange-500 border border-white text-white rounded-3xl  hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-[.4s]"
                href="/menu"
              >
                Add More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
