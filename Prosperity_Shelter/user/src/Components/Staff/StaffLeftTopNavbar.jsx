import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing menu and close icons
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopNavBar({ setActiveTab, activeTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility

  return (
    <div className="relative bg-gray-200 shadow-md">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="text-xl font-bold text-teal-500">
          {/* <p>Your Company</p> */}
        </div>

        {/* Menu Button for Mobile View */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links for Desktop View */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-md ${
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
              onClick={() => setActiveTab("visits")}
              className={`px-4 py-2 rounded-md ${
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

      {/* Dropdown Menu for Mobile View */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-200 shadow-md md:hidden z-20">
          <ul className="flex flex-col space-y-2 py-4 px-4">
            <li>
              <button
                onClick={() => {
                  setActiveTab("bookings");
                  setIsOpen(false); // Close menu after selection
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
                  setIsOpen(false); // Close menu after selection
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
      )}
    </div>
  );
}

export default TopNavBar;
