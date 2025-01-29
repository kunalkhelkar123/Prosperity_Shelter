import React from "react";
import img from "./aboutimg/homes.webp";

export default function TurningHouses() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16   z-50 ">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 w-full h-[400px] flex flex-col justify-center  md:h-[400px] lg:h-[500px]">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-[400]">
            <span className="text-[#FF1493]">TURNING HOUSES </span>
            <span className="text-[#8B4513]">INTO HOMES</span>
          </h1>

          <p className="text-gray-600  leading-relaxed">
            In the dynamic world of real estate, where timing can be the difference between finding your dream home and
            settling for less, <strong>Right Time Realtors LLP</strong> stands out as a beacon of reliability and
            expertise. With a passion for helping clients navigate the intricate world of real estate, this company has
            become synonymous with making every property transaction happen at precisely the right moment.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="border-2 border-gray-200 p-2 rounded-lg ">
            <img
              src={img}
              alt="Real estate professional with house model"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
