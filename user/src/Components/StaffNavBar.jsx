import React, { useState } from "react";
import logo from "../assets/logo.png";
import corespace from "../assets/CORE SPACE.png";
import { Link, useNavigate } from "react-router-dom";
// import dashboard from "./dashBorad"

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#390255]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src={corespace} className="h-8 md:h-8 w-full" alt="Logo" />
          </div>
          <div className="block sm:hidden">
            <button
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
            </button>
          </div>
          <div className="hidden sm:block">
            <div className="ml-4 flex items-center">
              <Link to={"/staff/dashboard"}>
                <a
                  href="#"
                  className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
                  to=""
                >
                  Home
                </a>
              </Link>
              <Link to={"/staff/myProperties"}>
                <a
                  href="#"
                  className="text-[#FFF848] px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700"
                >
                  Properties
                </a>
              </Link>
              <button
                className="text-[#FFF848] bg-[#390255] px-3 py-2 text-base flex justify-center items-center rounded-md hover:bg-[#FFF848] hover:text-[#390255]"
                onClick={() => navigate("/staff/submit")}
              >
                <span className="material-symbols-outlined text-center text-lg">
                  add
                </span>
                Add Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-[#FFF848] block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#FFF848] block px-3 py-2 rounded-md text-base font-medium"
            >
              Property
            </a>
            {/* <div>
              <div
                className="text-[#FFF848] block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => navigate("/staff/dashboard")}
              >
                {" "}
                Home
              </div>
              <div
                className="text-[#FFF848] block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => navigate("/staff/myProperties")}
              >
                {" "}
                Property
              </div>
            </div> */}
            <button
              className="text-[#FFF848] border border-purple-600 bg-[bg-[#390255]] px-3 py-1 flex justify-center items-center rounded-md text-base hover:bg-[#FFF848] hover:text-purple-950"
              onClick={() => navigate("/staff/submit")}
            >
              <span className="material-symbols-outlined text-center text-3xl mt-2">
                add
              </span>
              Submit Property
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
