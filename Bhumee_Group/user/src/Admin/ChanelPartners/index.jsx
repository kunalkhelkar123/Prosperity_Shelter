import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import CreateChanelpartnr from "./CreateChanelpartnr"
import ShowChanelpartnr from "./ShowChanelpartnr";
import axios from "axios";

function ClientHome() {
    const [view, setView] = useState("allChannelPartners");
    const navigate = useNavigate();

    useEffect(() => {
          const token = sessionStorage.getItem("token");
          const adminData = sessionStorage.getItem("admin");
          const admin = adminData ? JSON.parse(adminData) : null;
      
          console.log("User role:", admin?.role, "Subrole:", admin?.subrole);
      
          if (token && admin && admin.role === "admin" && admin.subrole !== "admin") {
              // console.log("Unauthorized access. Redirecting...");
             
              alert("You don't have permission to access the client data.\nPlease login as an Admin Login.");

              navigate("/admin/dashboard");
          }
      }, [navigate]);

    return (
        <>
            <NavBar />
            <div className="flex  h-[1000px]">
                {/* Sidebar */}
                <div className="w-full sm:w-1/4 lg:w-1/5 bg-gray-800 text-white p-6 flex flex-col">
                    <h3 className="text-lg font-bold mb-4">Menu</h3>
                    <ul className="space-y-3 flex-1">
                        <li
                            onClick={() => setView("allChannelPartners")}
                            className={`p-3 rounded cursor-pointer ${view === "allChannelPartners" ? "bg-teal-500" : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            All Channel Partners
                        </li>
                        <li
                            onClick={() => setView("CreateChanelpartnr")}
                            className={`p-3 rounded cursor-pointer ${view === "CreateChanelpartnr" ? "bg-teal-500" : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            Add Channel Partners
                        </li>
                    </ul>
                </div>




                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-100">
                    {view === "allChannelPartners" && (
                        <ShowChanelpartnr />
                    )}

                    {view === "CreateChanelpartnr" && (


                        <CreateChanelpartnr />

                    )}
                </div>
                <button
                    className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                >
                    <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
                </button>
            </div>
        </>
    );
}

export default ClientHome;
