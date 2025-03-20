import React from "react";
import Compcar from "./Compcar";
import compcar1 from "./compcareersimg/twitter_1216864.png";
import compcar2 from "./compcareersimg/linkedin_87838.png";
import compcar3 from "./compcareersimg/facebook_665209.png";
import Aboutmoto from "../compabout/Aboutmoto";
import Compcarscards from "./Compcarscards";
import Careercelebrations from "./Careercelebrations";
import Carjobopening from "./Carjobopening";

function Compcarmain() {
  return (
    <>
      <div>
        <Compcar />
      </div>


      <div className="p-4 sm:px-24 sm:mt-16 mb-8 mt-4">
        <div className="  text-xl font-semi-bold sm:grid sm:justify-center md:text-4xl md:mt-5 sm:text-3xl sm:mt-1 font-semibold text-purple-900 ">
          Why work with us  ?
        </div>

        <div className="h-[320px]   overflow-auto sm:overflow-x-hidden sm:h-auto text-s mt-4 sm:mt-8 border-t-2  border-b-2  sm:border-none  sm:text-m font-light sm:font-normal leading-8">
          <div>
            Brickfolio centers around the values and culture we have set for
            everyone, as we believe in building trusted relationships and
            empowering new talents. We have a dynamic team of young energy, fun
            loving who are filled with enthusiasm.
          </div>

          <div className="mt-4">
            Brickfolio Solutions Pvt Ltd. is all about the ethics, culture,
            growth, opportunities and success . We offer a workspace that
            challenges and brings out the absolute best. We nourish ideas,
            train, and create a flourishing path towards success for all the new
            talents we welcome in our organization . We do our best to make sure
            every talent receives opportunities to unleash true potential by
            working with the best of the industrial experts.
          </div>
        </div>

        <div className="sm:flex sm:gap-8 sm:mt-8  mt-4">
          <div className="flex justify-center font-lighter text-2xl ">connect With us </div>

          <div className="flex mt-4 flex-col sm:mt-0 gap-5  justify-center items-center sm:flex-row ">
            <div className="flex gap-3">
              <div>
                <img
                  src={compcar1}
                  alt=""
                  className=" h-9  bg-yellow-400 rounded-lg p-1"
                />
              </div>
              <div className="inline-flex font-medium items-center  text-purple-900 hover:underline "> Twitter </div>
            </div>

            <div className="flex gap-3">
              <div>
                <img
                  src={compcar2}
                  alt=""
                  className=" h-9 bg-yellow-400 rounded-lg p-1"
                />
              </div>
              <div  className="inline-flex font-medium items-center  text-purple-900 hover:underline "> linkedin </div>
            </div>

            <div className="flex gap-3">
              <div>
                <img
                  src={compcar3}
                  alt=""
                  className=" h-9 bg-yellow-400 rounded-lg p-1 ml-3"
                />
              </div>
              <div  className="inline-flex font-medium items-center text-purple-900 hover:underline "> facebook </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Aboutmoto/>
      </div>

      {/* cards div for careers  */}

      <div>
        <Compcarscards/>
      </div>
        {/*....................................Celebrations at Brickfolio  */}
      <div>
        <Careercelebrations/>
      </div>

      <div>

        <Carjobopening/>
      </div>

      
    </>
  );
}

export default Compcarmain;
