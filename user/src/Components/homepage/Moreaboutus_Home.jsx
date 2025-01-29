import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "../homepage/photobanks/key-home.webp"; // Adjust the path as needed
import { Link } from "react-router-dom";

const Moreaboutus_Home = () => {
  const [showFuture, setShowFuture] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFuture((prev) => !prev);
    }, 2000); // Switch text every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl h-[600px] mx-auto px-6 md:px-12 py-10 flex justify-center items-center bg-white">
        <div className="space-y-6 text-center">
          {/* Welcome Text */}
          <h2 className="text-[#C14D1D] text-[20px] font-medium uppercase tracking-wider flex justify-self-end">
            WELCOME TO Prosperity Shelters 
          </h2>

          {/* Main Heading with Animation */}
          <h1 className="text-[50px] font-bold leading-tight flex justify-self-end">
            <span className="text-[#FF5C00]">THE PATH TO&nbsp;</span>
            <AnimatePresence mode="wait">
              {showFuture ? (
                <motion.span
                  key="future"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#7B2727]"
                >
                  YOUR FUTURE
                </motion.span>
              ) : (
                <motion.span
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-gray-900"
                >
                  YOUR HOME
                </motion.span>
              )}
            </AnimatePresence>
          </h1>

          {/* Image and Text Container */}
          <div className="flex flex-col md:flex-row gap-10 items-start mt-4">
            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src={img}
                alt="Real estate agent with clients"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 space-y-6 text-gray-700 text-lg leading-relaxed">
              {/* Intro Text */}
              <p className="text-gray-600">
                In the dynamic world of real estate, where timing can be the
                difference between finding your{" "}
                <span className="font-semibold text-[#FF5C00]">dream home</span>{" "}
                and settling for less,
                <strong className="text-[#C14D1D]">
                  {" "}
                  Prosperity Shelters{" "}
                </strong>
                stands out as a beacon of reliability and expertise. With a
                passion for helping clients navigate the intricate world of real
                estate, our company ensures that every property transaction
                happens at
                <span className="text-[#7B2727] font-semibold">
                  {" "}
                  the right moment.
                </span>
              </p>

              {/* Highlighted Question */}
              <p className="text-xl font-semibold text-gray-800 relative inline-block">
                What sets Prosperity Shelters apart?
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#FF5C00] to-[#C14D1D] rounded-lg"></span>
              </p>

              {/* More About Us Button */}
              <div>
                <Link to="/Aboutus"><button className="bg-gradient-to-r bg-gray-300 mt-5 text-black font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  More About Us
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moreaboutus_Home;
