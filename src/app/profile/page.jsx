"use client";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Cancel01Icon, PencilEdit02Icon } from "hugeicons-react";
import UserProfile from "@/components/Updateprofile";
import { FaStore, FaTruck, FaUserCircle, FaUserShield } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiCook, GiCrown } from "react-icons/gi";
export default function ProfilePage() {
  const { data: session } = useSession();
  const [showProfile, setShowProfle] = useState(false);
  const handleSignOut = async () => {
    const confirmation = confirm("Are you sure you want to Logout?");

    if (confirmation) {
      await signOut({ callbackUrl: "/" });
      toast.success("Logout successfully");
    } else {
      return;
    }
  };
  const getRoleIcon = (role) => {
    switch (role) {
      case "customer":
        return <FaUserCircle className="text-indigo-600 text-4xl" />;
      case "chef":
        return <GiCook className="text-green-600 text-4xl" />;
      case "driver":
        return <FaTruck className="text-yellow-500 text-4xl" />;
      case "admin":
        return <FaUserShield className="text-red-600 text-4xl" />;
      case "vendor":
        return <FaStore className="text-purple-500 text-4xl" />;
      case "waiter":
        return <MdOutlineRestaurantMenu className="text-blue-600 text-4xl" />;
      case "superadmin":
        return <GiCrown className="text-gold-500 text-blue-700 text-4xl" />;
      default:
        return <FaUserCircle className="text-gray-400 text-4xl" />; // Default icon
    }
  };
  return (
    <>
      <Navbar />

      {session?.user? (
        <div className="min-h-screen bg-gray-100 mt-[97px] hover:shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 bg-white shadow rounded-lg p-4">
              <div className="flex flex-col items-center">
                <Image
                  src="/deafultuser.png?height=100&width=100"
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h2 className="mt-4 text-xl font-semibold">
                  {session?.user?.name || "Guest"}
                 
                </h2>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
                <div className="flex items-center mt-2 space-x-2">
                  {getRoleIcon(session?.user?.role)}
                  <h2 className="text-xl font-semibold text-indigo-700">
                    {session?.user?.role || "User"}
                  </h2>
                </div>
              </div>
              <nav className="mt-8 hover:shadow-2xl">
                <a
                  href="#"
                  className="block py-2 px-4 text-red-600 bg-red-100 rounded"
                >
                  Profile
                </a>
                {session?.user?.role === "customer" ? (
                  <>
                    <Link
                      href="/cart"
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                    >
                      My Cart
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/prorder"
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                    >
                      Orders
                    </Link>
                    <Link
                      href="#"
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                    >
                      Help Desk
                    </Link>
                  </>
                ) : (
                  <p></p>
                )}
                {(session?.user?.role === "superadmin" ||
                  session?.user?.role === "admin") && (
                  <Link
                    href="/admindashboard"
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  onClick={handleSignOut}
                  href="/"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded mt-1"
                >
                  Logout
                </Link>
              </nav>
            </div>

            <div className="md:col-span-3 space-y-6 hover:shadow-xl py-1 px-5">
              {/* Basic Information */}
              <div className="bg-white shadow rounded-lg p-6 py-3">
                <h3 className="text-lg font-semibold text-red-600 mb-4  ">
                  BASIC INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700  ">
                      User Full Name*
                    </label>
                    <p>{session?.user?.name}</p>
                    {/* <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="David Matin" /> */}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  ">
                      Email*
                    </label>
                    <p>{session?.user?.email}</p>
                    {/* <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Web developer" /> */}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <textarea
                    className="mt-1 px-3 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows={4}
                    defaultValue="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
                    disabled
                  />
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl">
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  CONTACT INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      defaultValue={session?.user?.address?.ContactNumber}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      defaultValue={session?.user?.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      defaultValue={session?.user?.address?.Country}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postcode
                    </label>
                    <input
                      type="text"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      defaultValue={session?.user?.address?.PostCode}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      defaultValue={session?.user?.address?.city}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm"
                      disabled
                      defaultValue={session?.user?.address?.zip}
                    />
                  </div>
                </div>
                <Link
                  className="flex items-center gap-2 mt-5 px-3 py-2 bg-indigo-300 hover:bg-indigo-500  w-fit rounded-md text-white"
                  onClick={(e) => setShowProfle(true)}
                  href="#"
                >
                  <PencilEdit02Icon /> Update Profile
                </Link>
              </div>

              {/* Our Branch */}
              <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-2xl">
                <h3 className="text-lg font-semibold p-6 bg-gray-50">
                  Our Branch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                  {["Kitchen & Co", "Kitchen & Co", "Kitchen & Co"].map(
                    (branch, index) => (
                      <div key={index} className="p-6 bg-red-600 text-white">
                        <h4 className="font-semibold">{branch}</h4>
                        <p className="text-sm mt-2">
                          Zameen.com building Fisalabad city, Pakistan
                        </p>
                        <div className="flex items-center mt-2">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="text-sm">+923106459178</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div
                  className={`w-full  flex items-center justify-center top-0 left-0 fixed h-screen border-2 backdrop-blur-md  border-red-500 ${
                    showProfile === false ? "hidden" : "fixed"
                  } `}
                >
                  <Cancel01Icon
                    className="absolute cursor-pointer font-semibold   mt-24 top-0 right-10"
                    onClick={(e) => setShowProfle(false)}
                    size={26}
                  />
                  <div className="overflow-auto">
                    <UserProfile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ):(
        <div className="w-full h-screen flex items-center justify-center">        
          <Link className="mt-24" href='login'>Login</Link>
        </div>

      )}
      
    </>
  );
}
