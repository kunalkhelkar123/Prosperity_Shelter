import React from "react";
import aboutima from "./aboutimg/Cover1.jpg";

function Abouttop() {
  return (
    <>
      <div className="relative">
        <div className=" ">
          <div className=" flex justify-center h-[300px] sm:h-[500px] md:h-[550px] lg:[550px]  ">
            <img
              src={aboutima}
              className="h-[300px]  w-full  sm:h-[500px] md:h-[550px] lg:[550px]  "
            />
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-base font-[500] uppercase tracking-wide ">
              LET'S FIND THE
            </p>
            <h1 className="text-7xl md:text-8xl font-[500] tracking-widest mt-9">
              PERFECT <span className="">HOME</span>
            </h1>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Abouttop;
