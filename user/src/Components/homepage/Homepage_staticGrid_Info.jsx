import React from "react";

import City from "../homepage/preLaunch.jpg";
import Build from "../homepage/homebuilding2.jpg";
import Couple from "../homepage/readyToMove.jpg";
import Nhome from "../homepage/NatureHome.jpg";
import UnderC from "../homepage/underConstruction.jpg";
import Luxury from "../homepage/luxuryHome.jpg";
import CarouselPre from "./CarouselPre";
import discover from "../homepage/photo/globe.png";
import Earth from "../homepage/photo/purchase.png";
import search from "../homepage/photo/search.png";


const Homepage_staticGrid_Info = () => {
  const CuratedCollection = [
    { id: 1, img1: City, heading: "Pre Launch" },
    { id: 2, img1: Luxury, heading: "Luxury Homes" },
    { id: 3, img1: Nhome, heading: "Nature Homes" },
    { id: 4, img1: UnderC, heading: "Under Construction" },
    { id: 5, img1: Couple, heading: "Ready To Move" },
  ];
  return (
    <>
      <div className="mx-auto grid max-w-screen-lg justify-center mt-6 items-center px-4  gap-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3 ">
        <div className="flex flex-col  justify-between items-center p-4 h-[17rem] border   shadow-xl hover:shadow-2xl rounded-xl hover:shadow-fuchsia-800 hover:bg-[#fff848] hover:-translate-y-2">
          <img className=" w-12 h-12 hover:text-white" src={discover} />
          <h1 className="text-xl  font-bold text-center">
          Discover Your Ideal Home from Anywhere{" "}
          </h1>
          <p className=" text-basic text-center">
          Browse through our extensive collection of properties for sale, and find the one that matches your lifestyle and needs.
          </p>
        </div>
        <div className="flex flex-col  justify-between items-center p-4 h-[17rem] border  shadow-xl hover:shadow-2xl rounded-xl hover:shadow-fuchsia-800 hover:bg-[#fff848] hover:-translate-y-2 ">
          <img className=" w-12 h-12" src={Earth} />
          <h1 className="text-xl  font-bold text-center">
          Discovery and Consultation Understand Your Needs{" "}
          </h1>
          <p className=" text-basic text-center">

          Personalized consultation to understand your preferences and budget, presenting property options that align with your unique needs and financial plans.          </p>
        </div>
        <div className="flex flex-col  justify-between items-center p-4 h-[17rem] border  shadow-xl hover:shadow-2xl rounded-xl hover:shadow-fuchsia-800 hover:bg-[#fff848] hover:-translate-y-2">
          <img className=" w-12 h-12" src={search} />
          <h1 className="text-xl  font-bold text-center">
          Closing the Deal and Beyond Seamless Transactions{" "}
          </h1>
          <p className=" text-basic text-center">
          Handle legalities and offer post-purchase support for a seamless transition, ensuring your peace of mind in your new home.
          </p>
        </div>
      </div>

      <div className="relative">
        <img
          src={Build}
          alt="Full-width Image"
          className="w-full h-[300px] object-cover mt-[100px]"
        />
        <div className="absolute top-1/2 ml-5 left-4 transform -translate-y-1/2 text-white z-10">
          <h1 className="text-5xl font-bold mb-4">HomiGrow By Kunal's Properties</h1>
          <h2 className="text-3xl font-semibold">
            We are the best you choose !
          </h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-950 opacity-70"></div>
      </div>

      <div className="flex flex-col  items-center p-8">
        <h1 className="text-center font-sans text-4xl sm:text-5xl font-bold mb-8">
          Curated Collection
        </h1>
          <CarouselPre />
        </div>
      
    </>
  );
};
export default Homepage_staticGrid_Info;
