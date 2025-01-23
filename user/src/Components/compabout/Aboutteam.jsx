import React from "react";
import iimg from "./aboutimg/av1.jpg";
import iimg1 from "./aboutimg/av2.jpg";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect } from "react";
// import axiosinstance

const Aboutteam = () => {



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

  };


  
  return (
    <>
      <div className="flex justify-center sm:mt-410">
        <span
          className="  text-purple-900 bg-yellow-400 flex justify-center mb-4 mt-7 p-4 sm:p-8 sm:text-3xl
              w-[250px] rounded-full h-10 items-center font-bold   sm:bg-yellow-400 sm:flex sm:justify-center
             sm:w-[250px] sm:rounded-full sm:h-10 sm:items-center sm:font-bold sm:mb-5 md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] "
        >
          Our Team
        </span>
      </div>

      <div>
        <div className="text-xl  flex justify-center mt-5 sm:text-3xl font-semibold mb-8">
          Property Experts{" "}
        </div>
      </div>

      {/* this is for ....................experties photo..................................... */}

     <div>

    <div className="container mx-auto px-4 w-[90%]">
      <Slider {...settings}>
        <div className="px-2 ">
          <img src={iimg} alt="Slide 1"   className="w-full h-full" />
        </div>
        <div className="px-2">
          <img src={iimg1} alt="Slide 2" className="w-full h-auto" />
        </div>
        <div className="px-2">
          <img src={iimg} alt="Slide 3" className="w-full h-auto" />
        </div>
        <div className="px-2">
          <img src={iimg} alt="Slide 4" className="w-full h-auto" />
        </div>
        <div className="px-2">
          <img src={iimg1} alt="Slide 5" className="w-full h-auto" />
        </div>
      </Slider>
    </div>

     </div>
     <div>

<div className="container mx-auto px-4 w-[90%] sm:mt-12">
  <Slider {...settings}>
    <div className="px-2 ">
      <img src={iimg} alt="Slide 1"   className="w-full h-full" />
      <div className="">helllo</div>
    </div>
    <div className="px-2">
      <img src={iimg1} alt="Slide 2" className="w-full h-auto" />
    </div>
    <div className="px-2">
      <img src={iimg} alt="Slide 3" className="w-full h-auto" />
    </div>
    <div className="px-2">
      <img src={iimg} alt="Slide 4" className="w-full h-auto" />
    </div>
    <div className="px-2">
      <img src={iimg1} alt="Slide 5" className="w-full h-auto" />
    </div>
  </Slider>
</div>

 </div>



    </>
  );
}

export default Aboutteam;
