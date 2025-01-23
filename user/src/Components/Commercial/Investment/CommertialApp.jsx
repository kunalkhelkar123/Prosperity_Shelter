import React, { useState, useEffect, useLayoutEffect } from "react";
import axiosinstance from "../../../../axiosConfig";
import CommertialHeading from "./CommertialHeading";
import Cardcommertial from "./Cardcommertial";
import PaginationButtonCommertial from "./PaginationButtonCommertial";
 import Corespace_navbar from "../../Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "../../Corespace_footer/Corespace_footer";
const CommertialApp = () => {
  const [coinData, setCoinsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);
  const [currentOutput, setCurrentOutput] = useState([]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosinstance.get(
          "/api/property/Commercial_properties"
        );
        console.log("Data from database using proxy:", response.data);
        setCoinsData(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    setCurrentOutput(coinData.slice(firstPostIndex, lastPostIndex));
  }, [currentPage, coinData, postPerPage]);

  return ( 

    <>
    <Corespace_navbar/>
    <div className="bg-white flex flex-col justify-center items-center">
      <div className="items-center justify-center mt-4">
        <CommertialHeading />
      </div>
      <div className="flex flex-row justify-center items-center gap-6 flex-wrap">
        {currentOutput.map((card) => (
          <div key={card.id}>
            <Cardcommertial data={card} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 mb-8">
        <PaginationButtonCommertial
          totalPosts={coinData.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
    <Corespace_footer/>
    
    </>
  );
};

export default CommertialApp;
