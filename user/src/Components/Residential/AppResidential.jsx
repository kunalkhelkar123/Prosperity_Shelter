import React, { useState, useEffect, useLayoutEffect } from "react";
import Card from "./CardResidential";
import PaginationButton from "./PaginationButtonResidential";
import luxury from "../Residential/luxury homes.avif";
import axios from "axios";
import Corespace_navbar from "../Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "../Corespace_footer/Corespace_footer";
import ResidentialHeading from "./ResidentialHeading";
const AppResidential = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "api/property/residential_properties"
        );

        // console.log("commercial properties call")
        // const response2 = await axios.get("api/property/Commercial_properties");
        // console.log("Data from database commercial", response2.data);

        console.log("Data from database using proxy", response.data);
        setAllProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const updateCurrentOutput = () => {
      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      setCurrentOutput(allProperties.slice(firstPostIndex, lastPostIndex));
    };

    updateCurrentOutput();
  }, [allProperties, currentPage, postPerPage]);

  return (
    <>
    <Corespace_navbar/>
      {/* <div className="items-center justify-center mb-10">
        <div className="b-slate-100">
          <div className="relative w-full h-[600px] px-6 overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={luxury}
              alt="Luxury"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1
                className="text-[45px] mr-4 text-white font-[750] text-center"
                style={{
                  animation: "slideInFromLeft 1s ease-in-out forwards",
                  animationDelay: "0s",
                }}
              >
                ZERO
              </h1>
              <h1
                className="text-5xl font-[700]  ml-[20px] text-center"
                style={{
                  animation: "slideInFromLeft 1s ease-in-out forwards",
                  animationDelay: "0.5s",
                }}
              >
                BROKERAGE
              </h1>
              <h1
                className="text-5xl mt-3 font-bold text-center"
                style={{
                  animation: "slideInFromLeft 1s ease-in-out forwards",
                  animationDelay: "1s",
                }}
              >
                LIVE IN THE LUXURIOUS HOMES
              </h1>
            </div>

            <div className="absolute inset-0 w-full h-full bg-black opacity-20"></div>
          </div>
        </div>
      </div> */}
      <ResidentialHeading />
      <div className="flex flex-row justify-center items-center gap-6 flex-wrap">
        {currentOutput.map((card) => (
          <div key={card.id}>
            <Card data={card} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 mb-8">
        <PaginationButton
          totalPosts={allProperties.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage} // Pass currentPage to PaginationButton
        />
      </div>
      <Corespace_footer/>
    </>
  );
};

export default AppResidential;
