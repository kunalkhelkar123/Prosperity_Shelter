import React from "react";
import axios from "axios";

const PaginationButtonCommertial = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${
            page === currentPage ? "bg-red-500" : "bg-[#FFF848]"
          } hover:bg-[#39025] text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out m-1`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationButtonCommertial;
