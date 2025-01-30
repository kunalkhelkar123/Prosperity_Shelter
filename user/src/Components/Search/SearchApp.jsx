/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect, memo } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import CardSearch from "./CardSearch";
import HeadingSearch from "./HeadingSearch";
import PaginationButtonSearch from "./PaginationButtonSearch";
import { Link, useLocation } from "react-router-dom";
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
      {(showMassage) ? (<div className="flex flex-col items-center justify-center sm:h-[600px] h-[900px] bg-gray-100 rounded-lg shadow-md p-6">
        <FaHome className="text-red-500 text-6xl mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700">
          Oops! No Properties Found
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Try adjusting your search criteria or explore other options.
        </p>
        <Link to="/Investmentapp" ><button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Browse All Properties
        </button></Link>
      </div>) : (<div className="bg-white flex flex-col justify-center items-center">
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
