import React, { useState, useEffect } from "react";
import back1 from "./compcareersimg/bg1.jpg";
import back2 from "./compcareersimg/bg2.jpg";
import back3 from "./compcareersimg/bg3.jpg";
import back4 from "./compcareersimg/bg4.jpg";
import back5 from "./compcareersimg/bg5.jpg";
import back6 from "./compcareersimg/bg2.jpg";

function Compcar() {
  const slides = [
    { id: 1, image: back1, description: "We may be strong as individuals but together we are invincible" },
    { id: 2, image: back2, description: "Description for Slide 2" },
    { id: 3, image: back3, description: "Description for Slide 3" },
    { id: 4, image: back4, description: "Description for Slide 4" },
    { id: 5, image: back5, description: "Description for Slide 5" },
    { id: 6, image: back6, description: "Description for Slide 6" },
  ];

  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 6 ? 1 : prevSlide + 1));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <div className="carousel w-full">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="carousel-item relative w-full "
          style={{ display: currentSlide === slide.id ? "block" : "none" }}
        >
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="w-full h-[300px] lg:h-[600px] xl:h-[600px] 2xl:h-[700px]"
          />
          <div className="text-overlay absolute bottom-0 left-0 w-full text-white text-center">
            <div className="inline-block sm:mb-24 bg-black bg-opacity-50 mb-8 p-4 rounded-lg">
              <h2 className=" sm:text-xl text-xs font-bold">{slide.description}</h2>
            </div>
          </div>
        </div>
      ))}
      {/* this is for buttons ................................ */}
      {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 sm:top-[22rem] md:top-[-4px] m-5 ">
        <button
          onClick={() => goToSlide(currentSlide === 1 ? 6 : currentSlide - 1)}
          className="btn btn-circle stroke-1 text-yellow-400 hover:text-purple-800 focus:outline-none bg-transparent border-none text-3xl"
        >
          ❮
        </button>
        <button
          onClick={() => goToSlide(currentSlide === 6 ? 1 : currentSlide + 1)}
          className="btn btn-circle stroke-1 text-yellow-400 hover:text-purple-800 focus:outline-none bg-transparent border-none text-3xl"
        >
          ❯
        </button>
      </div> */}
    </div>
  );
}

export default Compcar;
