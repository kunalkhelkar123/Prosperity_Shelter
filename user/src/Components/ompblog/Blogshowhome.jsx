import React from "react";
import aboutima from "../compcareers/compcareersimg/bg3.jpg";

const Blogshowhome = ({ image, name, price }) => {
  return (
    <>
      <div className="flex justify-center   transition delay-150">
        <div className="card m-5 grid content-center  ">   
          <div className="card_image relative ">
            <img src={aboutima} alt={name} className="rounded-xl h-[228px] w-full md:h-[350px] md:w-[550px]  " />


            <div className="z-50 mt-[-114px] flex justify-center align-middle items-center absolute lg:ml-12 hover:animate-bounce hover:p-0 ">
            <div className="bg-white text-xs flex-col   m-3 p-2 font-bold rounded-xl hover:bg-yellow-400 opacity-70 hover:opacity-100  md:px-12 lg:p-12  lg:mt-[-36px] lg:ml-[4px] ">
              <div className="">
                Render Method: In the render method, it returns JSX code that
              </div>
              <div>  
                <h2>{name}</h2>
                <h3> price :{Math.ceil(price.toLocaleString() * 50)} cr</h3>
              </div>
              <div className="flex font-medium items-center text-blue-600 hover:underline justify-center">
            See our guideline
          </div>
            </div>
          </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Blogshowhome;
