"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import SectionPage from "./section/section2/page";
import SpecialDish from "./section/section 1/page";
import Section3 from "./section/section3/page";
import Hero from "./section/hero/page";
import Section05 from "./section/section05/page";
import DealsPage from "./section/section25/page";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-24">
        <Hero />

        <SpecialDish />
       <Section05/>
       <DealsPage/>

        <SectionPage />

        {/* <Section3 /> */}
      </div>
    </>
  );
}
