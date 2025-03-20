import React from "react";
import img from "../../Components/compabout/aboutimg/Cover1.jpg";
const ContactBanner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
      {/* Background Image */}
      <img
        src={img} // Change the path if necessary
        alt="Contact Us"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
          CONTACT US
        </h1>
      </div>
    </div>
  );
};

export default ContactBanner;
