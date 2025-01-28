/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import BloghomesList from "./BloghomesList";
import BlogPagination from "./BlogPagination";
import aboutima from "../compabout/aboutimg/45.jpg";
import Corespace_navbar from "../Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "../Corespace_footer/Corespace_footer";
function Compactblog() {
  const [coinsData, setCoinsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.comapi/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoinsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);

  return (
    <>
    < Corespace_navbar/>
      <div>
        <div className="relative">
          <div className=" ">
            <div className=" flex justify-items-stretch">
              <img
                src={aboutima}
                alt=""
                className="h-[220px]  w-full  sm:h-[500px] md:h-[550px] lg:[550px]  "
              />
            </div>

            <div className="flex justify-center items-center">
              <div className=" z-0 sm:mt-[-580px] absolute sm:text-purple-900 sm:text-5xl  sm:font-extrabold mt-[-320px] text-2xl text-purple-900  font-extrabold">
                Blogs
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-8 mb-8 ">
        <div className=" sm:text-4xl text-xl font-semibold ">
          Our Latest Blog
        </div>

        <div className="text-xs sm:text-xl mx-5 sm:m-5">
          Here we try to bring you the latest ideas and trends of the real
          estate market. You should definitely check our blogs out.
        </div>
      </div>
      <div>
        <div className="app">
          <BloghomesList coinsData={currentPosts} />
          <BlogPagination
            totalPosts={coinsData.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Corespace_footer/>
    </>
  );
}

export default Compactblog;
