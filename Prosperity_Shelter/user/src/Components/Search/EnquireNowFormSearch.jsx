/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect } from "react";
import office from "../Investment/office.jpg";
import axios from "axios";

const EnquireNowFormSearch = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white p-8 rounded-mt shadow-md max-w-md mx-auto mt-8 ">
      <h1 className="text-2xl font-bold mb-4">LOOKING FOR PROPERTY?</h1>

      <img src={office} alt="Image 2" className="h-60 w-85 mt-3" />

      <p className="text-gray-600 mb-4 mt-7">
        Brickfolio provides you with the best real estate options. Whether you
        are looking for a flat, house, land, or commercial property, we've got
        you covered.
      </p>

      {/* Form Section */}
      <form>
        <label htmlFor="name" className="block text-gray-600 mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          className="w-full h-10 border rounded-md mb-4 px-3"
        />

        <label htmlFor="email" className="block text-gray-600 mb-2">
          Your Email:
        </label>
        <input
          type="text"
          id="email"
          className="w-full h-10 border rounded-md mb-4 px-3"
        />

        <label htmlFor="mobile" className="block text-gray-600 mb-2">
          Your Mobile Number:
        </label>
        <input
          type="text"
          id="mobile"
          className="w-full h-10 border rounded-md mb-4 px-3"
        />

        {/* Button Section */}
        <div>
          <button className="bg-[#FFF848] hover:bg-[#390255]  hover:border-[#390255] hover:text-white text-black h-12 w-full rounded-md mb-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquireNowFormSearch;
