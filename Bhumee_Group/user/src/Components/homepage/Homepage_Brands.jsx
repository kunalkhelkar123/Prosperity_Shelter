import React from 'react'
import image from '../homepage/city.jpeg'
import DummyTestCarousel from './DummyTestCarousel'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand1 from "./photo/1.png"
import brand2 from "./photo/2.png"
import brand3 from "./photo/3.png"
import brand4 from "./photo/4.png"
import brand5 from "./photo/5.png"
import brand6 from "./photo/6.png"
import brand7 from "./photo/Godrej-Properties.png"
import brand8 from "./photo/Kumar-properties.jpg"
import brand9 from "./photo/Lodha.png"
import brand10 from "./photo/Majestique.png"
import brand11 from "./photo/Nyati.png"
import brand12 from "./photo/Puranik.png"
import brand13 from "./photo/Raheja.png"
import brand14 from "./photo/Shapoorji-Pallonji.png"
import brand15 from "./photo/Tribeca.png"
import brand16 from "./photo/Vilas-Javdekar.png"
import brand17 from "./photo/VTP.png"

function Homepage_Brands() {
  let dummyArr = [{ img: brand1 }, { img: brand2 }, { img: brand3 }, { img: brand4 }, { img: brand5 }, { img: brand6 }, { img: brand7 }, { img: brand8 }, { img: brand9 }, { img: brand10 }, { img: brand11 }, { img: brand12 }, { img: brand13 }, { img: brand14 }, { img: brand15 }, { img: brand16 }, { img: brand17 }];



  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1, // Ensure smooth scrolling one by one
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // Helps center the active slide properly
    centerPadding: "0px", // Prevents half slides from showing
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };
  
  return (
    <>
      <div className=" md:w-[100%] w-[90%] container  mx-auto px-4  ">
        <Slider {...settings} >
          {
            dummyArr.map((ele) => {
              return (
                <div key={ele} className=''>
                  <img
                    src={ele.img}
                    className='w-[90%] h-[100px]  p-[10px]  border border-gray-300 rounded-lg flex gap-10'
                    />
                </div>
              )
            })
          }
        </Slider>
      </div>
    </>
  )
}

export default Homepage_Brands