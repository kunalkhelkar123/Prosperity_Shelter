import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeftSideNavBar({ setActiveTab, activeTab }) {


  const navigate = useNavigate();


 


  return (
    <div className="w-60 h-screen bg-gray-200 p-4 flex flex-col justify-between">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === "bookings" ? "bg-teal-500 text-white" : "bg-gray-300"
              }`}
          >
            Bookings
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("visits")}
            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === "visits" ? "bg-teal-500 text-white" : "bg-gray-300"
              }`}
          >
            Visits
          </button>
        </li>
      </ul>

      {/* You can add any footer or additional content here */}
      <div className="mt-auto text-center text-gray-600 text-sm">
        <p>© 2024 Your Company</p>
      </div>
    </div>
  );
}

export default LeftSideNavBar;
