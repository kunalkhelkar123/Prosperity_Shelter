import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import AddClient from "./AddClient"
import ShowClient from "./ShowClient";

function ClientHome() {
    const [view, setView] = useState("allClients");
    const navigate = useNavigate();

  

    return (
        <>
            <NavBar />
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-full sm:w-1/4 lg:w-1/5 bg-gray-800 text-white p-6 flex flex-col">
                    <h3 className="text-lg font-bold mb-4">Menu</h3>
                    <ul className="space-y-3 flex-1">
                        <li
                            onClick={() => setView("allClients")}
                            className={`p-3 rounded cursor-pointer ${view === "allClients" ? "bg-teal-500" : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            All Clients
                        </li>
                        <li
                            onClick={() => setView("addClient")}
                            className={`p-3 rounded cursor-pointer ${view === "addClient" ? "bg-teal-500" : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            Add Clients
                        </li>
                    </ul>
                </div>




                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-100">
                    {view === "allClients" && (
                        <ShowClient />
                    )}

                    {view === "addClient" && (


                        <AddClient />

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
