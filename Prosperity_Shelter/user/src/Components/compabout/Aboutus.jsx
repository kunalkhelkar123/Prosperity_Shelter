import React, { useLayoutEffect } from "react";
import Aboutus2 from "./Aboutus2";
import Aboutteam from "./Aboutteam";
import Aboutmoto from "./Aboutmoto";
import Abouttop from "./Abouttop";
import Aboutus3 from "./Aboutus3";
import Aboutus4 from "./Aboutus4";
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
      <Corespace_navbar />
      <div>
        <Abouttop />
      </div>
      <div className=" bg-[#f1f1f1] w-full px-4 py-8 flex flex-col items-center">
        <div className="mt-8 w-full bg-white  border-gray-300 shadow-xl border-2">
          <Aboutus2 />
        </div>
        <div className=" mt-8 full bg-white  border-gray-300 shadow-xl border-2">
          <Aboutus3 />
        </div>
        <div className="mt-8 ">
          <Aboutus4 />
        </div>
      </div>

      {/* <div  className="flex flex-col items-center sm:flex-row sm:justify-center flex-wrap gap-6 mt-8 animate__animated animate__slideInLeft"  style={{ animationDelay: "0s" }} >
        {[
          {
            icon: "real_estate_agent",
            title: "Need help in Claim?",
            description:
              "Go to this step-by-step guideline process on how to certify for your weekly benefits:",
            linkText: "See our guideline",
          },
          {
            icon: "chalet",
            title: "Looking for Housing Options?",
            description:
              "Discover resources and assistance for finding affordable housing near you:",
            linkText: "Learn more",
          },
          {
            icon: "volunteer_activism",
            title: "Volunteer to Help Others",
            description:
              "Explore volunteering opportunities and make a difference in your community:",
            linkText: "Get involved",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transform transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center h-36 w-36 rounded-full bg-yellow-300 shadow-md">
                <span className="material-symbols-outlined text-4xl text-gray-800">
                  {card.icon}
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-center text-2xl font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h5>
            </div>
            <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                {card.linkText}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 10H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div> */}
      {/* ..............................................our team section ..................................................... */}

      <div>
        {" "}
        {/* <Aboutteam /> */}
        {/* <Homepage_staticGrid_Info /> */}
      </div>

      {/* ................................................moto..of corespace.................................................. */}
      <div>
        <Aboutmoto />
      </div>
      <div>{/* <Homepage_google_reviews /> */}</div>
      <Corespace_footer />
    </>
  );
}

export default Aboutus;
