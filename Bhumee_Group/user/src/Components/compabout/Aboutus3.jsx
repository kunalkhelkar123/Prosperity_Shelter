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
              ABOUT Reality One Pvt Ltd
            </h1>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
            Reality One is real estate advisor that functions on the Pillars of trust, transparency and expertise. As a digital marketplace with an exhaustive range of property listings, we know it is easy to get lost so we at Reality One, guide the home buyers right from the start of their home search to the very end. Shortlist your favourite homes and allow us to arrange site visits. Our work does not end here. We assist you with home loans and property registrations. Buying a home is an important investment – turn it into your safest, best deal at Reality One
            </p>  <p>
            We are a technology-enabled transaction and aggregator platform for Global real estate. Founded in 2008 and growing at a scorching pace. By consolidating supply and demand, Reality One is creating significant barriers of entry through scale, sourcing capabilities, demand aggregation, and use of technology to enable multi modal distribution platform which will help consolidate its positioning as one of the most innovative, largest and scalable O2O real estate platforms in India. Accomplished professionals, ex bankers, and Ivy school alumni are here to make sure that your search for the dream property ends here at Prosperity.
            
            </p>

            {/* <div className="space-y-4">
              <h3 className="font-medium">The Designated Partners of Right Time Realtors LLP are:</h3>
              <ul className="space-y-2 list-decimal pl-5">
                <li>Dilip Fulchand Surana</li>
                <li>Sankesh Dilip Surana</li>
                <li>Vikram Balasaheb Shinde</li>
                <li>Suvarna Rahul Sonmali</li>
                <li>Manisha Vallabh Bharadia</li>
                <li>Amar Siddheshwar Anarase</li>
              </ul>
            </div> */}

            {/* <div className="space-y-2">
              <p>
                Right Time Realtors LLP's LLP Identification Number is{" "}
                <span className="font-medium">"LLPIN AAV-0515"</span>. You can contact us via email at:
              </p>
              <p className="text-gray-600">info@rightimerealtors.com</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
