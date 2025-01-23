import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import City from "../homepage/preLaunch.jpg";
import Couple from "../homepage/readyToMove.jpg";
import Nhome from "../homepage/NatureHome.jpg";
import UnderC from "../homepage/underConstruction.jpg";
import Luxury from "../homepage/luxuryHome.jpg";


const CarouselPre = ({
  
}) => {

  const CuratedCollection = [
    { id: 1, img1: City, heading: "Pre Launch" },
    { id: 2, img1: Luxury, heading: "Luxury Homes" },
    { id: 3, img1: Nhome, heading: "Nature Homes" },
    { id: 4, img1: UnderC, heading: "Under Construction" },
    { id: 5, img1: Couple, heading: "Ready To Move" },
  ];

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
    <div className="container mx-auto px-4">
      <Slider {...settings}>
      {CuratedCollection.map((CuratedCollection) => (
              
                    <div key={CuratedCollection.id} className="relative hover:-translate-y-2 hover:shadow-2xl rounded-xl p-2 ">
                      <img
                        className="  rounded-xl  "
                        src={CuratedCollection.img1}
                      />
                      <h4 className="absolute   w-fit  font-bold text-2xl md:text-3xl  text-[#fff848] top-8 md:top-20 left-10">
                        {CuratedCollection.heading}
                      </h4>
                    </div>
                  
            ))}
      </Slider>
    </div>
  );
};

export default CarouselPre;
