import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeftSideNavBar({ setActiveTab, activeTab }) {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));

      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    } catch (error) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="w-60 text-sm h-screen bg-gray-200 p-4 flex flex-col justify-between lg:w-1/6 md:w-1/4 sm:w-1/3"> {/* Added responsive width classes */}
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveTab("allStaff")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "allStaff" ? "bg-teal-500 text-white" : "bg-gray-300"
            }`}
          >
            Show All Staff Members
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("createStaff")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "createStaff" ? "bg-teal-500 text-white" : "bg-gray-300"
            }`}
          >
            Create New Staff Members
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "bookings" ? "bg-teal-500 text-white" : "bg-gray-300"
            }`}
          >
            Bookings
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("visits")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "visits" ? "bg-teal-500 text-white" : "bg-gray-300"
            }`}
          >
            Visits
          </button>
        </li>
      </ul>

      {/* You can add any footer or additional content here */}
      <div className="mt-auto text-center text-gray-600 text-sm">
        <p>© 2025 RealityOne</p>
      </div>
    </div>
  );
}

export default LeftSideNavBar;