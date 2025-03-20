import React from "react";
import celi1 from "./compcareersimg/celi1.jpg";
import celi2 from "./compcareersimg/celi2.webp";
import celi3 from "./compcareersimg/celi3.webp";
import celi4 from "./compcareersimg/celi4.webp";
import celi5 from "./compcareersimg/celi5.jpg";
import celi6 from "./compcareersimg/celi6.jpg";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Careercelebrations(){

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

    return(
        <>
        <div>

        <div>
        <div className="container mx-auto px-4 w-[90%] sm:mt-12 pt-7">
          <Slider {...settings}>
            <div className="px-2 ">
              <img src={celi1} alt="Slide 1" className="w-full sm:h-[420px] h-[300px]" />
              <div className=""></div>
            </div>
            <div className="px-2">
              <img src={celi2} alt="Slide 2" className="w-full sm:h-[420px] h-[300px]" />
            </div>
            <div className="px-2">
              <img src={celi3} alt="Slide 3" className="w-full sm:h-[420px] h-[300px]" />
            </div>
            <div className="px-2">
              <img src={celi6} alt="Slide 4" className="w-full sm:h-[420px] h-[300px]" />
            </div>
            <div className="px-2">
              <img src={celi5} alt="Slide 5" className="w-full sm:h-[420px] h-[300px]" />
            </div>
          </Slider>
        </div>
      </div>
        </div>

        <div className="flex justify-center text-base font-bold p-4 sm:text-3xl sm:font-normal mt-24 ">
          <div>Job Openings</div>
        </div>
        </>
    )
}

export default Careercelebrations;