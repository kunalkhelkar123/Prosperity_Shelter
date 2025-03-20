import React, { useEffect, useState } from "react";
import StaffDashBoardHomePage from "./StaffDashBoardHomePage";
import StaffNavBar from "../Navbar/index";
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
    <div >
      {/* Sidebar */}
 

      {/* Main Content Area */}
      {/* <div
        className={`flex-1 ml-16  sm:lg:ml-[20%]   bg-purple-100 transition-all duration-300`}
      > */}
        <div>
          {/* Navigation Bar */}
          <StaffNavBar />

          {/* Dashboard Content */}
          <StaffDashBoardHomePage />
        </div>
      {/* </div> */}
    </div>
  );
}

export default DashBoradSliderBar;
