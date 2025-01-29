/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect, memo } from "react";

import axios from "axios";
import CardSearch from "./CardSearch";
import HeadingSearch from "./HeadingSearch";
import PaginationButtonSearch from "./PaginationButtonSearch";
import { useLocation } from "react-router-dom";
// import { Homepage_filter_menu } from "../../Components/homepage/Homepage_filter_menu";
// import axios from "axios";

const SearchApp = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const [showMassage, setShowMassage] = useState(false);


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const location = useLocation();
  const { state } = location;

  console.log("search data state ", state)
  useEffect(() => {
    const updateCurrentOutput = () => {
      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      setCurrentOutput(allProperties.slice(firstPostIndex, lastPostIndex));
    };
    setAllProperties(state.data);
    // console.log("data incoming",state.data);
    console.log("data incoming length", state.data.length);
    if (state.data.length == 0 || state.data == null || state.data == undefined) {
      setShowMassage(true);
    }

    updateCurrentOutput();
  }, [allProperties, currentPage, postPerPage, showMassage]);

  return (
    <>
      {(showMassage) ? (<h1 className="text-4xl text-center font-bold uppercase h-[300px] justify-center flex flex-col">For This configuration property  is not found</h1>) : (<div className="bg-white flex flex-col justify-center items-center">
        <div className="items-center justify-center mt-4">
          <HeadingSearch />
        </div>
        <div className="flex flex-row justify-center  items-center gap-6 flex-wrap">
          {currentOutput.map((card) => (
            <div key={card.id}>
              <CardSearch data={card} />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8 mb-8">
          <PaginationButtonSearch
            totalPosts={allProperties.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>)}
    </>
  );
};

export default memo(SearchApp);
