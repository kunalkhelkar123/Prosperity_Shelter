import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import corespace from "../assets/CORE SPACE.png";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#390255] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between sm:h-16 ">
          <div className="flex-shrink-0">
            {/* <img src={corespace} className="h-8 md:h-8 w-full" alt="Logo" /> */}
          </div>
          {/* <div className=""> */}
          {/* <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button> */}
          {/* </div> */}
          <div className="hidden sm:block">
          <div className="ml-4 flex items-center space-x-4">
            <Link to="/admin/dashboard" className="text-[#FFF848] px-3 py-2 rounded-md sm:text-lg text-[14px] hover:bg-gray-700">
                Home
            </Link>
            {/* <Link to="/admin/AllProperties" className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">
                Properties
            </Link> */}
            {/* <button
                className="text-[#FFF848] bg-[#390255] px-3 py-2 text-base flex justify-center items-center rounded-md hover:bg-[#FFF848] hover:text-[#390255]"
                onClick={() => navigate("/admin/AddProperty")}
            >
                Add Property
            </button> */}
            {/* <Link to="/admin/offers" className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">
                Offers
            </Link> */}
            <Link to="/admin/ManageStaff" className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">
                Staff
            </Link>
            <Link to="/admin/Showclient" className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">
                Client
            </Link>
            <Link to="/admin/ChanelPartners" className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">
                Channel Partners
            </Link>
        </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
         

          <div className="px-2 pt-2 pb-3 space-y-1 flex justify-end items-center">
            <Link to="/admin/dashboard" className="text-[#FFF848] block px-3 py-2 rounded-md sm:text-base text-[14px] font-medium">
              Home
            </Link>
            <Link to="/admin/ManageStaff" className="text-[#FFF848] block px-3 py-2 rounded-md sm:text-base text-[14px] font-medium">
              Staff
            </Link>
            <Link to="/admin/Showclient" className="text-[#FFF848] block px-3 py-2 rounded-md sm:text-base text-[14px] font-medium">
              Clients
            </Link>
            <Link to="/admin/ChanelPartners" className="text-[#FFF848] block px-3 py-2 rounded-md sm:text-base text-[14px] font-medium">
              Channel Partners
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}

export default NavBar;