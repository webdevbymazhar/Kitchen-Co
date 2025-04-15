"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Facebook02Icon, InstagramIcon, TwitterIcon } from "hugeicons-react";

export default function HeroSection() {
  const { data: session } = useSession();
  return (
    <div className=" items-center pb-10 bg-white justify-around flex flex-col md:flex-row w-full h-fit md:h-screen relative">
      {/* Animated Background Circles */}
      <motion.img
        className="absolute -top-[100px] md:size-[400px] size-[250px] -left-10"
        src="/Ellipse 3.png"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      />
      <motion.img
        className="absolute -top-[80px] md:size-[400px] size-[250px] -left-5"
        src="/Ellipse 4.png"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <motion.img
        className="absolute -top-[60px] md:size-[400px] size-[250px] left-0"
        src="/Ellipse 5.png"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2 }}
      />

      {/* Left Section with Text */}
      <div className="w-[90%] md:w-[50%] p-4 md:p-5 relative">
        {/* Animated Top Icon */}
        {/* <motion.img
          className="absolute -top-[90px] md:size-[100px] size-[60px]"
          src="/Group 1.png"
          alt=""
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            opacity: { duration: 0.8 }, // Fade-in duration
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity, // Infinite loop
            },
          }}
        /> */}
        {/* Heading Animation */}
        <motion.h1
          className="text-[2rem] md:text-[3.5rem] font-sans font-bold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          We Provide the <br /> best food for you
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          className="text-[0.9rem] md:text-[1rem]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Indulge in a blend of exquisite flavors and fresh ingredients, carefully crafted by our expert chefs. At Kitchen & Co, every meal is a celebration of taste, creating unforgettable dining experiences for all.
        </motion.p>

        {/* Buttons with Hover Scale Effect */}
        <div className="flex mt-3 flex-col md:flex-row gap-3">
          <motion.div className="rounded-md h-fit shadow overflow-hidden ">
            <Link
              href="/menu"
              className="flex  items-center justify-center rounded px-6 md:px-8 py-1 md:py-3 border border-transparent text-lg md:text-[1rem] font-medium text-white bg-slate-900 hover:bg-orange-500 transition-all duration-300"
            >
              Menu
            </Link>
          </motion.div>

          {session?.user ? (
            session.user.role === "customer" ? (
              <motion.div className="overflow-hidden">
                <Link
                  href="/book-table"
                  className="  flex items-center justify-center rounded px-6 md:px-8 py-1 md:py-3 border border-transparent text-lg md:text-[1rem] font-medium text-white bg-blue-600 hover:bg-slate-900 transition-all duration-300"
                >
                  Book a Table
                </Link>
              </motion.div>
            ) : (
              <p></p>
            )
          ) : (
            <Link
              href="/login"
              className=" flex items-center justify-center rounded px-6 md:px-8 py-1 md:py-2 border border-transparent text-lg md:text-[1rem] font-medium text-white bg-blue-600 hover:bg-slate-900 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Social Icons with Hover Effect */}
        <div className="flex items-center justify-center gap-4 w-fit mt-6 ml-2">
          <div className="p-2 border rounded-full cursor-pointer group hover:bg-blue-100">
            <Facebook02Icon
              className="hover:text-blue-400"
              size={20}
              color={"#000000"}
              variant={"stroke"}
            />
          </div>
          <div className="p-2 border rounded-full cursor-pointer group hover:bg-red-100">
            <InstagramIcon
              className="hover:text-red-400"
              size={20}
              color={"#000000"}
              variant={"stroke"}
            />
          </div>
          <div className="p-2 border rounded-full cursor-pointer group hover:bg-blue-100">
            <TwitterIcon
              className="hover:text-blue-400"
              size={20}
              color={"#000000"}
              variant={"stroke"}
            />
          </div>
        </div>
      </div>

      {/* Right Section with Images */}
      <div className="w-[60%] md:w-[28%]  relative mt-6 md:mt-0 mr-0 md:mr-10 flex justify-center">
        <motion.img
          className="w-full h-full"
          src="/Mask group.png"
          alt=""
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.img
          className="absolute -left-10 md:-left-24 bottom-3 size-[150px] md:size-[200px]"
          src="/dish-2 2.png"
          alt=""
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.img
          className="absolute -right-10 md:-right-24 top-3 size-[150px] md:size-[200px]"
          src="/flower1.png"
          alt=""
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.img
          className="absolute -left-10 md:-left-24 top-1 size-[80px] md:size-[100px]"
          src="/flower2.png"
          alt=""
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </div>
    </div>
  );
}
