import React from "react";
import { Link } from "react-router-dom";
import img from "../homepage/photobanks/BuildingHome1.webp"; 

export default function TornaMoharSection() {
  return (
    <div className="bg-[#8B1818] h-[700px] justify-center items-center flex">
      <div className="max-w-7xl  mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white">
            <span className="text-[#FF69B4] text-sm font-medium tracking-wider">
              NEWLY LAUNCHED
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              TORNA MOHAR
            </h1>

            <div className="space-y-6 text-gray-100 max-w-xl">
              <p className="leading-relaxed">
                Discover a life of elegance and modern convenience at Torna
                Mohar, a thoughtfully designed residential project by Right Time
                Realtors. Located in the scenic Ambegaon Bk, Pune South, this
                project brings you closer to nature while keeping you
                well-connected to the city's major hubs. Torna Mohar is a symbol
                of royal living, where every corner is designed to reflect
                luxury, comfort, and well-being.
              </p>

              <p className="leading-relaxed">
                Elevate Your Lifestyle with the Right Time Realtors LLP: Western
                Casa – Where Luxury Meets Innovation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors">
                View More Details
              </button>
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
                Call Now
              </button>
            </div>
          </div>

          {/* Right Image (Fixed) */}
          <div className="relative">
            <img
              src={img}
              alt="Torna Mohar Building"
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
