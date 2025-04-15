import FeedBack from "@/components/FeedBack";
import FeedbackUsers from "@/components/FeedbackUsers";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center h-screen w-full">
        <div className="w-[50%]">
          <FeedBack />
        </div>
       
      </div>
    </>
  );
};

export default page;
