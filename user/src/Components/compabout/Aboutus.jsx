import React, { useLayoutEffect } from "react";
import Aboutus2 from "./Aboutus2";
import Aboutteam from "./Aboutteam";
import Aboutmoto from "./Aboutmoto";
import Abouttop from "./Abouttop";
import AboutBounce from "./AboutBounce";
import Homepage_google_reviews from "../homepage/Homepage_google_reviews";
import Homepage_staticGrid_Info from "../homepage/Homepage_staticGrid_Info";
import Corespace_navbar from "../Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "../Corespace_footer/Corespace_footer";
function Aboutus() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Corespace_navbar/>
      <div>
        <Abouttop />
      </div>
      <div className="">
        <Aboutus2 />
      </div>
      {/*  ................................................ cards    ..........................................................*/}
      <div
        className=" flex flex-col  justify-center items-center sm:flex-row  sm:justify-center mt-8 animate__animated animate__slideInLeft "
        style={{ animationDelay: "0s" }}
      >
        <div className="  drop-shadow-xl max-w-sm p-4 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className=" flex justify-center sm:h-36 items-center ">
              <span className="material-symbols-outlined rounded-full  bg-yellow-300 p-5">
                real_estate_agent
              </span>
            </div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Need a help in Claim?
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Go to this step by step guideline process on how to certify for your
            weekly benefits:
          </p>
          <div className="inline-flex font-medium items-center text-blue-600 hover:underline">
            See our guideline
          </div>
        </div>

        <div className="  drop-shadow-xl  max-w-sm p-4 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className=" flex justify-center    sm:h-36   items-center     ">
              <span className="material-symbols-outlined   rounded-full  bg-yellow-300 p-5 ">
                chalet
              </span>
            </div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Need a help in Claim?
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Go to this step by step guideline process on how to certify for your
            weekly benefits:
          </p>
          <div className="inline-flex font-medium items-center text-blue-600 hover:underline">
            See our guideline
          </div>
        </div>

        <div className="   drop-shadow-xl  max-w-sm p-4 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className=" flex justify-center   sm:h-36    items-center ">
              <span className="material-symbols-outlined  rounded-full  bg-yellow-300 p-5">
                volunteer_activism
              </span>
            </div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white  flex justify-center">
              Need a help in Claim?
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Go to this step by step guideline process on how to certify for your
            weekly benefits:
          </p>
          <div className="inline-flex font-medium items-center text-blue-600 hover:underline">
            See our guideline
          </div>
        </div>
      </div>

      {/* ..............................................our team section ..................................................... */}

      <div>
        {" "}
        {/* <Aboutteam /> */}
        <Homepage_staticGrid_Info />
      </div>

      {/* ................................................moto..of corespace.................................................. */}
      <div>
        <Aboutmoto />
      </div>
      <div>{/* <Homepage_google_reviews /> */}</div>
      <Corespace_footer/>
    </>
  );
}

export default Aboutus;
