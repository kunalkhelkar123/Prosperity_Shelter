import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Upcomingvisits() {
    const [visites, setVisites] = useState([]);
    const [totalVisits, setTotalVisits] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();




    useEffect(() => {
        fetchVisites();
    }, []);

    const fetchVisites = async () => {
        try {
            const response = await axios.get("/api/adminstaffvisites/getvisits");
            if (response.status === 200 && response.data.length > 0) {
                const data = response.data;

                const formatDate = (date) => {
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    return `${year}-${month}-${day}`;
                };

                const today = new Date();
                const futureDates = Array.from({ length: 4 }, (_, i) => {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    return formatDate(date);
                });

                const initialFilteredData = data.filter((visite) => {
                    const [day, month, year] = visite.visit_date.split("/");
                    const visitDate = formatDate(new Date(`${year}-${month}-${day}`));
                    return futureDates.includes(visitDate);
                });

                setTotalVisits(initialFilteredData.length);
                setVisites(initialFilteredData);
            }
        } catch (error) {
            console.error("Error fetching visites:", error);
        }
    };

    const handleSearch = () => {
        if (!fromDate || !toDate) {
            setErrorMessage("Please select both From and To dates.");
            return;
        }
        setErrorMessage("");
        const from = new Date(fromDate);
        const to = new Date(toDate);
        fetchVisitesByDateRange(from, to);
    };

    const fetchVisitesByDateRange = async (from, to) => {
        try {
            const response = await axios.get("/api/adminstaffvisites/getvisits");
            if (response.status === 200 && response.data.length > 0) {
                const data = response.data;
                const filteredData = data.filter((visite) => {
                    const [day, month, year] = visite.visit_date.split("/");
                    const visitDate = new Date(`${year}-${month}-${day}`);
                    return visitDate >= from && visitDate <= to;
                });

                setTotalVisits(filteredData.length);
                setVisites(filteredData);
                setCurrentPage(1);
            }
        } catch (error) {
            console.error("Error fetching visites:", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVisites = visites.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(visites.length / itemsPerPage);


    const handleAttendClick = async (visiteId, attend) => {
        try {


            console.log("attend  ", attend)

            if (attend == "TRUE") {

                const response = await axios.post("/api/adminstaffvisites/updateAttend", {
                    visiteId,
                    attend: "FALSE",
                });
                if (response.status === 200) {
                    alert("Attend status updated successfully!");
                    setVisites((prevVisites) =>
                        prevVisites.map((visite) =>
                            visite.id === visiteId ? { ...visite, attend: "FALSE" } : visite
                        )
                    );
                }

            }
            else {
                const response = await axios.post("/api/adminstaffvisites/updateAttend", {
                    visiteId,
                    attend: "TRUE",
                });
                if (response.status === 200) {
                    alert("Attend status updated successfully!");
                    setVisites((prevVisites) =>
                        prevVisites.map((visite) =>
                            visite.id === visiteId ? { ...visite, attend: "TRUE" } : visite
                        )
                    );
                }


            }


        } catch (error) {
            console.error("Error updating attend status:", error);
        }
    };




    return (
        <>
            <NavBar />
            <div className="p-6 bg-purple-100 min-h-screen">
                <h1 className="text-2xl md:text-4xl font-bold flex justify-center items-center mt-12 p-2 text-purple-950 text-center">
                    Upcoming Visite Details
                </h1>

                <div className="flex flex-wrap items-center justify-center space-y-2 md:space-y-0 md:space-x-4 my-4">
                    <label className="font-bold text-gray-700">From:</label>
                    <input
                        type="date"
                        className="p-2 border rounded-md w-full md:w-auto"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <label className="font-bold text-gray-700">To:</label>
                    <input
                        type="date"
                        className="p-2 border rounded-md w-full md:w-auto"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                    <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-md w-full md:w-auto">Search</button>
                    <button onClick={fetchVisites} className="p-2 bg-gray-500 text-white rounded-md w-full md:w-auto">Reload Data</button>
                </div>

                {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}

                <div className="p-4 bg-teal-500 text-white rounded-md my-4 text-center">
                    <h3 className="font-bold">Total Visits</h3>
                    <p>{totalVisits}</p>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-3 border-r border-gray-300">Sr. No</th>
                                <th className="px-4 py-3 border-r border-gray-300">Client Name</th>
                                <th className="px-4 py-3 border-r border-gray-300">Follow-Up By</th>
                                <th className="px-4 py-3 border-r border-gray-300">Visit Date</th>
                                <th className="px-4 py-3 border-r border-gray-300">Description</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVisites.map((visite, index) => (
                                <tr key={index} className="bg-white border-b border-gray-300">
                                    <td className="px-4 py-2 border-r">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3 border-r">{visite.lead_name}</td>
                                    <td className="px-4 py-3 border-r">{visite.followup_by}</td>
                                    <td className="px-4 py-3 border-r">{visite.visit_date}</td>
                                    <td className="px-4 py-3 border-r">{visite.lead_description || "No Details"}</td>
                                    <td className="px-4 py-3">
                                        {/* {visite.attend === "TRUE" ? "Attended" : "Not Attended"} */}


                                        {visite.attend === "TRUE" ? (
                                            <button onClick={() => handleAttendClick(visite.id, visite.attend)} className="bg-green-500 text-white py-1 px-3 rounded-md">
                                                Attended
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAttendClick(visite.id, visite.attend)}
                                                className="bg-red-500 text-white py-1 px-3 rounded-md"
                                            >
                                                Not Attended
                                            </button>
                                        )}


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)} className={`p-2 px-4 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>{index + 1}</button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Upcomingvisits;
