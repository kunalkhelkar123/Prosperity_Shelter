import React from "react";

const BlogPagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return (
        <div className="pagination flex sm:justify-end items-center p-4 sm:mr-12 gap-4 justify-center">
            {currentPage !== 1 && (
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-2 py-1 bg-yellow-400 text-white"
                >
                    &laquo; 
                </button>
            )}
            <button
                onClick={() => setCurrentPage(currentPage)}
                className="px-2 py-1 bg-yellow-400 text-white"
            >
                {currentPage}
            </button>
            {currentPage !== totalPages && (
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-2 py-1 bg-yellow-400 text-white"
                >
                     &raquo;
                </button>
            )}
        </div>
    );
};

export default BlogPagination;
