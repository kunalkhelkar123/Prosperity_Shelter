import { Building2, Home, Phone } from "lucide-react";
import React from "react";

export default function ServicesSection() {
  return (
    <div className="bg-[#f1f1f1] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-[#FF1493] text-sm font-medium tracking-wider">
            OUR SERVICES
          </h2>
          <h1 className="text-[#8B0000] text-4xl font-bold">OUR SERVICES</h1>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 pt-8">
          {/* Residential Real Estate Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC0CB] to-white rounded-full opacity-20" />
                <div className="relative p-4 transition-transform transform hover:rotate-6">
                  <Building2 className="w-12 h-12 text-gray-800" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Residential Real Estate
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Whether you're looking for your forever home, a vacation property,
              or an investment opportunity, we have a vast portfolio of
              residential properties to explore.
            </p>
          </div>

          {/* Commercial Real Estate Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC0CB] to-white rounded-full opacity-20" />
                <div className="relative p-4 transition-transform transform hover:rotate-6">
                  <Home className="w-12 h-12 text-gray-800" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Commercial Real Estate
            </h3>
            <p className="text-gray-600 leading-relaxed">
              For business owners and investors, we provide access to a range of
              commercial properties, from office spaces to retail outlets and
              industrial spaces.
            </p>
          </div>

          {/* Investment Properties Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC0CB] to-white rounded-full opacity-20" />
                <div className="relative p-4 transition-transform transform hover:rotate-6">
                  <Phone className="w-12 h-12 text-gray-800" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Investment Properties
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our team specializes in identifying lucrative investment
              properties, helping you build wealth through real estate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
