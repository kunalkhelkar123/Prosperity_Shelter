import React, { useState, useEffect, useLayoutEffect } from "react";
import Card from "./Card";
import PaginationButton from "./PaginationButton";
import Heading from "./Heading";
import axios from "axios";

import Corespace_navbar from "../Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "../Corespace_footer/Corespace_footer";
const InvestmentApp = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "api/property/properties"
        );
        const { propertyTitle}=response;
        // console.log(propertyTitle);
       //  console.log("Data from database using proxy", response.data);
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
<><Corespace_navbar/>

    <div className="bg-white flex flex-col justify-center items-center">
      <div className="items-center justify-center mt-4">
        <Heading />
      </div>
      <div className="flex flex-row justify-center  items-center gap-6 flex-wrap">
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
          currentPage={currentPage}
        />
      </div>
    </div>
    <Corespace_footer/>
    
    </>
  );
};

export default InvestmentApp;
