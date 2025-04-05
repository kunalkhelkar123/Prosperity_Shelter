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
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!token || !storedUser || storedUser.role !== "staff") {
        navigate("/staff");
        return;
    }

    try {
        // Decode the payload of the token (middle part)
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        // Check if token is expired
        if (decodedPayload.exp * 1000 < Date.now()) {
            console.log("Token expired");
            sessionStorage.clear();
            navigate("/staff");
            return;
        }

        // If valid and not expired
        // setUser(storedUser);
    } catch (err) {
        console.error("Invalid token format", err);
        sessionStorage.clear();
        navigate("/staff");
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
