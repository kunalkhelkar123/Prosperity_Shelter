import React from "react";
import aboutima from "./aboutimg/45.jpg";

function Abouttop(){


    return(
        <>
        <div className="relative">
            <div className=" ">
                <div className=" flex justify-center">
                    <img src={aboutima} alt="" className="h-[220px]  w-full  sm:h-[500px] md:h-[550px] lg:[550px]  " />
                </div>

                <div className="flex justify-center items-center">
                <div className=" z-0 sm:mt-[-580px] absolute sm:text-purple-900 sm:text-5xl  sm:font-extrabold mt-[-320px] text-2xl text-purple-900  font-extrabold">About Us</div>
                </div>
            </div>
        </div>

        <div className=" flex justify-center"> 
        <span
              className="  text-purple-900 bg-yellow-400 flex justify-center mb-4 hover:bg-purple-900 hover:text-white mt-8 sm:p-8 p-4 sm:text-2xl
              w-[350px] rounded-full  items-center font-bold  sm:bg-yellow-400 sm:flex sm:justify-center sm:text-purple-900
             sm:w-[250px] sm:rounded-full sm:h-10 sm:items-center sm:font-bold sm:mb-5 md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] transition duration-150 ease-in-out "
            >
              Welcome to HomiGrow
            </span></div>
        </>
    )
}

export default Abouttop;