import React from "react";

const PaginationButtonSearch = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination flex justify-center items-center mt-4">
      {pages.map((page) => (
        <button
          key={page} // Using `page` as the key since it's unique
          onClick={() => setCurrentPage(page)}
          className={`${
            page === currentPage ? "bg-red-500" : "bg-yellow-300"
          } hover:bg-yellow-400 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out m-1`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationButtonSearch;
