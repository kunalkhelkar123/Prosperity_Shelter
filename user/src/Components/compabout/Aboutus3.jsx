import React from "react";
import img from "./aboutimg/hand-holding-house.webp";

export default function AboutSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 ">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Image */}
        <div className="relative">
          <div className="border-2 border-gray-200 p-4">
            <img
              src={img}
              alt="Professional hand holding a model house"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-[#FF1493] text-sm font-medium tracking-wider">WHO WE ARE</h2>
            <h1 className="text-[#8B0000] text-3xl md:text-4xl font-bold border-b-2 border-gray-200 pb-4">
              ABOUT RIGHT TIME REALTORS LLP
            </h1>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Right Time Realtors LLP is a Limited Liability Partnership (LLP) firm that was incorporated on December
              11, 2020. It is registered at the Registrar of Companies in Pune, Maharashtra, India.
            </p>

            <div className="space-y-4">
              <h3 className="font-medium">The Designated Partners of Right Time Realtors LLP are:</h3>
              <ul className="space-y-2 list-decimal pl-5">
                <li>Dilip Fulchand Surana</li>
                <li>Sankesh Dilip Surana</li>
                <li>Vikram Balasaheb Shinde</li>
                <li>Suvarna Rahul Sonmali</li>
                <li>Manisha Vallabh Bharadia</li>
                <li>Amar Siddheshwar Anarase</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p>
                Right Time Realtors LLP's LLP Identification Number is{" "}
                <span className="font-medium">"LLPIN AAV-0515"</span>. You can contact us via email at:
              </p>
              <p className="text-gray-600">info@rightimerealtors.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
