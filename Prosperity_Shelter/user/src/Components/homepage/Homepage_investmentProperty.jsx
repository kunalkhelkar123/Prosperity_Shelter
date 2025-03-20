import React from "react";
import City from "../homepage/city.jpeg";
import Location from "../homepage/location.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage_investmentProperty = () => {
  const Property = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
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
    <div className="flex flex-col justify-center items-center">
      <h1 className=" text-center font-sans text-4xl sm:text-5xl font-bold mt-6 ">
        Investment Property
      </h1>
      <div className="container w-[93%] px-4 mt-6">
      <Slider {...settings}>
       {Property.map((properties) => {
          return (
            <div
              key={properties.id}
              className=" flex w-full max-w-xs flex-col  rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <a
                className=" mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="#"
              >
                <img className="object-cover" src={City} alt="product image" />
              </a>
              <div className="mt-4 px-2 pb-2">
                <div className="flex flex-row justify-between">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      Retail
                    </h5>
                  </a>
                  <span className="flex flex-row">
                    <img className="w-4" src={Location} />
                    <span>Pune</span>
                  </span>
                </div>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-slate-900">6.05%</p>
                    <p className="text-xs font-bold text-slate-500 ">ROI</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">1655</p>
                    <p className="text-xs font-bold text-slate-500 ">Sq.ft.</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">5</p>
                    <p className="text-xs font-bold text-slate-500 ">Year</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium border-[#FFF848] bg-[#FFF848] hover:bg-[#390255]  hover:border-[#390255] hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Know More
                </a>
              </div>
            </div>
          );
        })} 
      </Slider>
    </div>
    </div>
        
      
    </>
  );
};
export default Homepage_investmentProperty;
