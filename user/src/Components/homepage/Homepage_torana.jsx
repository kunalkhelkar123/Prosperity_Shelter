import React from "react";
import { Link } from "react-router-dom";
import img from "../homepage/photobanks/BuildingHome1.webp";

export default function TornaMoharSection() {
  return (
    <div className="bg-[#8B1818] sm:mt-0 mt-[300px] justify-center items-center flex">
      <div className="max-w-7xl  mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12  items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white mt-[-150px">
            <span className="text-[#FF69B4] text-sm font-medium tracking-wider">
              NEWLY LAUNCHED
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Prosperity Shelters
            </h1>

            <div className="space-y-6 text-gray-100 max-w-xl">
              <p className="leading-relaxed">
                Discover a life of elegance and modern convenience at Prosperity
                Shelters, a thoughtfully designed residential project by us.
                Strategically located across all regions of Pune—South, East,
                West, and North, this project offers a perfect blend of nature
                and urban connectivity. Prosperity Shelters is a symbol of royal
                living, where every corner is crafted to reflect luxury, comfort,
                and well-being.
              </p>

              <p className="leading-relaxed">
                Elevate Your Lifestyle with Prosperity Shelters -
                Multiple Projects Where Luxury Meets Innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/Aboutus">
                <button className="px-8 py-3 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors">
                  View More Details
                </button>
              </Link>

              <Link to="/Contactus">
                <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
                  Call Now
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image (Fixed) */}
          <div className="relative">
            <img
              src={img}
              alt="Prosperity shelter "
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
