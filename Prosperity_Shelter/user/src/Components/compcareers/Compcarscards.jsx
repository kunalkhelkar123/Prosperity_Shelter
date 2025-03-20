import React from "react";
import reward0 from "./compcareersimg/reward0.png";
import imgcar1 from "./compcareersimg/imgcar1.png";
import imgcar2 from "./compcareersimg/imgcar2.png";
import performance3 from "./compcareersimg/performance3.png";
import training5 from "./compcareersimg/training5.png";
import partyhat6 from "./compcareersimg/party-hat6.png";
import piggybank7 from "./compcareersimg/piggy-bank7.png";
import growth4 from "./compcareersimg/growth4.png";
import loan8 from "./compcareersimg/loan8.png";
import reward19 from "./compcareersimg/reward (1)9.png";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import one1 from "./compcareersimg/1.jpg";
import two2 from "./compcareersimg/2.jpg";
import three3 from "./compcareersimg/3.jpg";
import four4 from "./compcareersimg/4.jpg";
import smiling from "./compcareersimg/smiling.mp4";


function Compcarscards() {

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
      <div className="flex justify-center text-base font-bold ">
        How We Care
      </div>
      {/* .........................................grid compo cards */}
      <div>
        <div>
          <div className="controler grid grid-cols-2 items-center  place-content-center p-4 gap-4 sm:grid-cols-5 sm:p-8  ">
            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={reward0} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={imgcar1} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={imgcar2} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={performance3} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={training5} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={partyhat6} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={piggybank7} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={growth4} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={loan8} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>

            <div className="cards p-5 gap-3 bg-slate-300 flex flex-col justify-center items-center rounded-lg">
              <div>
                <img src={reward19} alt="" className="h-24" />
              </div>
              <div>
                <div>Competitive </div>
                <div>Compensation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   rewards and recognition */}


      <div className=" flex justify-center text-base font-bold p-4 sm:text-3xl sm:font-normal">Rewards and Recognitions</div>

      <div>
        <div className="container mx-auto px-4 w-[90%] sm:mt-12">
          <Slider {...settings}>
            <div className="px-2 ">
              <img src={one1} alt="Slide 1" className="w-full  sm:h-[420px] h-[320px]" />
              <div className=""></div>
            </div>
            <div className="px-2">
              <img src={two2} alt="Slide 2" className="w-full  sm:h-[420px] h-[320px]" />
            </div>
            <div className="px-2">
              <img src={three3} alt="Slide 3" className="w-full  sm:h-[420px] h-[320px]" />
            </div>
            <div className="px-2">
              <img src={four4} alt="Slide 4" className="w-full  sm:h-[420px] h-[320px]" />
            </div>
            <div className="px-2">
              <img src={two2} alt="Slide 5" className="w-full  sm:h-[420px] h-[320px]" />
            </div>
          </Slider>
        </div>
      </div>


      <div><div className=" flex justify-center text-base font-bold p-4 sm:text-3xl sm:font-normal">Celebrations at HomiGrow</div></div>
    </>
  );
}

export default Compcarscards;
