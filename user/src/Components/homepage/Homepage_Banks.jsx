import React from 'react'
import image from '../homepage/city.jpeg'
import DummyTestCarousel from './DummyTestCarousel'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand1 from "./photobanks/BOI.png"
import brand2 from "./photobanks/2.png"
import brand3 from "./photobanks/3.png"
import brand4 from "./photobanks/4.png"
import brand5 from "./photobanks/5.png"
import brand6 from "./photobanks/6.png"
import brand7 from "./photobanks/7.png"

function Homepage_Brands() {
  let dummyArr =[{img:brand1},{img:brand2},{img:brand3},{img:brand4},{img:brand5},{img:brand6},{img:brand7}];



  const settings = {
    dots: true,
    infinite: true,
    speed: 350,
    slidesToShow: 5,
    slidesToScroll: 5,
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
    {/* <h1 className=' text-center font-sans text-4xl sm:text-5xl font-bold mb-8 mt-12'>Banks</h1> */}
    <div className=" md:w-[100%] w-[100%] container mx-auto px-4 ">
        <Slider {...settings}>
          {
            dummyArr.map((ele) => {
              return (
                <div key={ele} className=''>
                  <img
                    src={ele.img}
                    className='w-[90%] h-[100px] ml-[90px] p-[10px] border border-gray-300 rounded-lg'
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