import React, { useEffect, useState } from "react";
import StaffDashBoardHomePage from "./StaffDashBoardHomePage";
import StaffNavBar from "../StaffNavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoradSliderBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    function check(menus) {
        if (menus.name === 'Logout') {
            // console.log("logout == ")
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("admin");
        }
    // Check if the token exists and user has the role 'staff'
    if (!token || !user || user.role !== "staff") {
      navigate("/staff");
    }
  }
}, [navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menus = [
    { id: 1, name: "Home", link: "#", icons: "home" },
    {
      id: 2,
      name: "All Properties",
      link: "/staff/myProperties",
      icons: "dashboard_customize",
    },
    { id: 4, name: "Add Property", link: "/staff/submit", icons: "add" },
    { id: 5, name: "Bookings", link: "/staff/bookings", icons: "home" },
    { id: 6, name: "Logout", link: "/staff", icons: "logout" },
  ];

  function check(menu) {
    if (menu.name === "Logout") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("admin");
    }
  }

  return (
    <div className="flex bg-[#390255] min-h-screen">
      {/* Sidebar */}
      <nav
  className={`bg-[#390255] ${
    isOpen || window.innerWidth >= 640 ? "w-40" : "w-16"
  } sm:w-64 md:w-72 h-screen fixed top-0 left-0 z-50 transition-all duration-300`}
>
  <div className="h-full flex flex-col">
    {/* Toggle Button */}
    <div
      onClick={toggleMenu}
      className="flex justify-end sm:hidden mt-4 pr-4"
    >
      <button className="text-white hover:text-gray-300 focus:outline-none">
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>

    {/* Logo Section */}
    <div className="flex justify-center items-center mt-6">
      <div
        className={`text-white font-bold ${
          isOpen || window.innerWidth >= 640 ? "text-xl" : "text-base"
        } transition-all duration-300`}
      >
        {/* Add Logo or Brand Name */}
        {/* {isOpen || window.innerWidth >= 640 ? "Your Brand" : "Logo"} */}
      </div>
    </div>

    {/* Menu Links */}
    <div className="flex-1 mt-10">
      <div className="flex flex-col items-center sm:items-start text-[#FFF848]">
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index} className="w-full">
            <div
              className={`flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-[#FFF848] hover:text-[#390255] transition-all duration-200 ${
                isOpen || window.innerWidth >= 640
                  ? "justify-start"
                  : "justify-center"
              }`}
              onClick={() => check(menu)}
            >
              {menu.icons && (
                <span className="material-symbols-outlined text-2xl mr-3">
                  {menu.icons}
                </span>
              )}
              {/* Always show names on desktop */}
              {(isOpen || window.innerWidth >= 640) && (
                <span className="whitespace-nowrap">{menu.name}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</nav>

      {/* Main Content Area */}
      <div
        className={`flex-1 ml-[20%] sm:ml-[20%] md:ml-[20%] lg:ml-[20%] p-6 md:p-10 bg-purple-100 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Navigation Bar */}
          <StaffNavBar />

          {/* Dashboard Content */}
          <StaffDashBoardHomePage />
        </div>
      </div>
    </div>
  );
}

export default DashBoradSliderBar;
