// pages/section.js
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import Head from 'next/head';

const SectionPage = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 py-16 px-6'>
      <Head>
        <title>Our Expert Chefs</title>
      </Head>
      
      <div className='w-full md:w-[60%] flex flex-col justify-center p-6 md:px-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-gray-800 font-bold text-3xl md:text-4xl leading-tight'>
  Our Expert Chefs
</h1>
<p className='text-gray-600 mt-4 text-lg md:text-xl leading-relaxed'>
  Meet the culinary masters behind our kitchen—passionate, skilled, and dedicated to delivering exceptional flavors in every dish.
</p>

<div className='mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
  {[
    "Award-winning culinary professionals",
    "Expertise in international cuisines",
    "Passionate about food innovation",
    "Years of fine dining experience",
    "Committed to top-tier quality",
    "Masters of flavor and presentation"
  ].map((text, index) => (
    <div key={index} className='flex items-center gap-3 text-gray-700 text-lg'>
      <CheckmarkCircle02Icon size={24} color={"#FF8C00"} variant={"stroke"} />
      <span>{text}</span>
    </div>
  ))}
</div>

        
        <div className='flex flex-col md:flex-row gap-6 mt-12'>
          <button className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105">
            Menu
          </button>
          <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105">
            Book a Table
          </button>
        </div>
      </div>
      
      <img
        className='w-full md:w-[25%] h-auto object-cover rounded-lg shadow-md mt-10 md:mt-0 md:ml-10 transform hover:scale-105 transition-transform duration-300'
        src="chef 1.png"
        alt="Chef"
      />
    </div>
  );
};

export default SectionPage;
