import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Importing menu and close icons
import axios from "axios";

function LeftSideNavBar({ setActiveTab, activeTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility

  return (
    <div>
      

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0  bg-gray-200 p-4 flex  justify-between transition-transform  z-40 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => {
                setActiveTab("bookings");
                setIsOpen(false); // Close sidebar after selection
              }}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === "bookings"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              Bookings
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("visits");
                setIsOpen(false); // Close sidebar after selection
              }}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === "visits"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              Visits
            </button>
          </li>
        </ul>

       
      </div>

      {/* Overlay to close menu when clicked outside */}
     {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        >
        </div>
      )}
    </div>
  );
}

export default LeftSideNavBar;
