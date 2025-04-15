import React from "react";
import Image from "next/image";
import motion from "framer-motion";
const SpecialDish = ({ name, description, price, imageSrc }) => (
  <div className="h-[300px] cursor-pointer border-2 border-white w-[280px] hover:bg-white py-4 px-0  transition-all duration-[.2s] rounded-tl-[70px] rounded-br-[70px] bg-slate-100 mt-16 shadow-md">
    <div className="relative">
      <img
        className=" w-[60%] h-40 ml-12 mt-[-86px] object-contain rounded-full"
        src={imageSrc}
        alt=""
      />
      <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full text-sm">
        ${price}
      </div>
    </div>
    <h3 className="mt-6 text-lg text-center font-semibold">{name}</h3>
    <p className="mt-3 text-sm text-center text-gray-600">{description}</p>
  </div>
);

export default function Component() {
  const specialDishes = [
    {
      name: "Lumpia with Sauce",
      description:
        "Crispy spring rolls filled with savory vegetables, served with a rich, tangy dipping sauce.",
      price: 25,
      imageSrc: "lumpia.webp",
    },
    {
      name: "Fish and Veggie",
      description:
        "Grilled fish paired with a medley of fresh seasonal vegetables, delicately seasoned to perfection.",
      price: 20,
      imageSrc: "/fishhh.webp",
    },
    {
      name: "Tofu Chili",
      description:
        "Spicy tofu cooked in a bold chili sauce, perfect for those who enjoy a little heat with their meal.",
      price: 20,
      imageSrc: "/tofu.jpeg",
    },
    {
      name: "Egg and Cucumber",
      description:
        "A refreshing dish combining soft-boiled eggs with crisp cucumber slices, drizzled with light dressing.",
      price: 30,
      imageSrc: "Frame.png",
    }
  ];    

  return (
    <>
      <div className="w-full bg-slate-100  px-4 py-28 pb-10">
        <div className="relative">
          <Image
            className="md:absolute hidden ml-[340px] mt-[-20px]"
            src="/Group (1).png"
            alt="imag"
            width={150}
            height={150}
          />

          <Image
            className="md:absolute hidden right-0 mr-[340px] mt-[-20px]"
            src="/Group.png"
            alt="img"
            width={130}
            height={130}
          />

<h2 className="text-4xl font-bold text-orange-500 text-center mb-2">
  Our Special Dishes
</h2>
<p className="text-center text-gray-600 mt-8 mb-12">
  Discover a curated selection of our finest culinary creations, <br /> crafted with passion and the freshest ingredients.
</p>

        </div>
        <div className=" flex flex-col items-center justify-center  md:flex-row gap-8">
          {specialDishes.map((dish, index) => (
            <SpecialDish key={index} {...dish} />
          ))}

          <Image
            className="absolute md:block bottom-0 hidden  mb-[-170px]  ml-60"
            src="/Group (8).png"
            alt="omg"
            width={70}
            height={70}
          />

          <Image
            className="absolute md:block hidden bottom-0 right-0 mb-[-240px] mr-6 "
            src="/Group (6).png"
            alt="omg"
            width={150}
            height={150}
          />
        </div>
      </div>

      <div className="relative bg-slate-100  pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-slate-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full  lg:pb-28 xl:pb-32">
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              {/* Navigation can be added here if needed */}
            </div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
  <span className="block xl:inline">Welcome to Our</span>{" "}
  <span className="block text-orange-600 xl:inline">
    Restaurant
  </span>
</h1>
<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
  Indulge in a culinary journey where every dish is prepared with passion and the finest ingredients. Experience the perfect blend of flavor, ambiance, and hospitality that will keep you coming back for more.
</p>

                <div className="flex mt-6 flex-col md:flex-row gap-3">
                  <div className="h-fit shadow overflow-hidden ">
                    <a
                      href="#"
                      className="flex rounded  items-center justify-center px-6 md:px-8 py-2 md:py-3 border border-transparent text-lg md:text-[1rem] font-medium text-white bg-slate-900 hover:bg-orange-500 transition-all duration-300"
                    >
                      Menu
                    </a>
                  </div>
                  <div className="overflow-hidden">
                    <a
                      href="#"
                      className="w-full rounded flex items-center justify-center px-6 md:px-8 py-2 md:py-3 border border-transparent text-lg md:text-[1rem] font-medium text-white bg-orange-600 hover:bg-slate-900 transition-all duration-300"
                    >
                      Book a Table
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute mt-9 lg:inset-y-0 lg:right-0 lg:w-1/2 pb-10">
          <Image
            className="h-72 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-[80vh] pb-10"
            src="/dish-2 2.png?height=600&width=800"
            alt="Delicious dish"
            width={800}
            height={600}
          />
        </div>
        <img
          className="absolute top-10 mt-14 right-6 size-[150px]"
          src="/leaf-2.png"
        />

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute top-0 left-0 w-24 h-24 bg-contain bg-no-repeat opacity-10"
            style={{
              backgroundImage: "url('/leaf-1.png?height=200&width=200')",
            }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-24 h-24 bg-contain bg-no-repeat opacity-10"
            style={{
              backgroundImage: "url('/leaf-2.png?height=100&width=100')",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
