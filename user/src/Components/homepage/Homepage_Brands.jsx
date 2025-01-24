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
    dots: true,
    infinite: true,
    speed: 350,
    slidesToShow: 6,
    slidesToScroll: 6,
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
      {/* <h1 className=' text-center font-sans text-4xl sm:text-5xl font-bold mb-8 mt-12'>Brands we work with</h1> */}
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