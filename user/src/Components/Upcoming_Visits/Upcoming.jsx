import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosConfig";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function Upcomingvisits() {
    const [visites, setVisites] = useState([]);
    const [totalVisits, setTotalVisits] = useState(0); // For Total Visits block
    const [selectedDate, setSelectedDate] = useState(new Date()); // Current date as default
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchVisites = async () => {
            try {
                const response = await axiosinstance.get("/api/adminstaffvisites/getvisits");

                if (response.status === 200 && response.data.length > 0) {
                    const data = response.data;

                    // Helper function to format a date as YYYY-MM-DD
                    const formatDate = (date) => {
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear();
                        return `${year}-${month}-${day}`;
                    };

                    // Compute the selected date, tomorrow, and day after tomorrow
                    const today = selectedDate;
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    const dayAfterTomorrow = new Date(today);
                    dayAfterTomorrow.setDate(today.getDate() + 2);

                    const todayFormatted = formatDate(today);
                    const tomorrowFormatted = formatDate(tomorrow);
                    const dayAfterTomorrowFormatted = formatDate(dayAfterTomorrow);

                    // Filter visits for the three days
                    const filteredData = data.filter((visite) => {
                        const [day, month, year] = visite.visit_date.split("/");
                        const visitDate = new Date(`${year}-${month}-${day}`);
                        const visitFormatted = formatDate(visitDate);

                        return (
                            visitFormatted === todayFormatted ||
                            visitFormatted === tomorrowFormatted ||
                            visitFormatted === dayAfterTomorrowFormatted
                        );
                    });

                    setTotalVisits(filteredData.length);
                    setVisites(filteredData);
                }
            } catch (error) {
                console.error("Error fetching visites:", error);
            }
        };

        fetchVisites();
    }, [selectedDate]); // Re-fetch data whenever selectedDate changes

    const handleAttendClick = async (visiteId) => {
        try {
            const response = await axiosinstance.post("/api/adminstaffvisites/updateAttend", {
                visiteId: visiteId,
                attend: true,
            });

            if (response.status === 200) {
                setVisites((prevVisites) =>
                    prevVisites.map((visite) =>
                        visite.id === visiteId ? { ...visite, attend: true } : visite
                    )
                );
            }
        } catch (error) {
            console.error("Error updating attend status:", error);
        }
    };

    return (
        <>
            <NavBar />

            <div className="p-6 bg-purple-100">
                <h1 className="text-4xl font-bold flex justify-center items-center mt-[-10px] p-2 text-purple-950">
                    Upcoming Visite Details
                </h1>

                {/* Date Filter */}
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="dateFilter" className="font-bold text-gray-700">
                            Select Start Date:
                        </label>
                        <input
                            id="dateFilter"
                            type="date"
                            className="p-2 border rounded-md"
                            value={selectedDate.toISOString().split("T")[0]} // Format to YYYY-MM-DD
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />
                    </div>
                </div>

                {/* Total Visits Block */}
                <div className="flex justify-between items-center my-4">
                    <div className="p-4 bg-teal-500 text-white rounded-md">
                        <h3 className="font-bold">Total Visits</h3>
                        <p>{totalVisits}</p>
                    </div>
                </div>

                {/* Visites Table */}
                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-3 border-r border-gray-300">Sr. No</th>
                                <th className="px-4 py-3 border-r border-gray-300">Client Name</th>
                                <th className="px-4 py-3 border-r border-gray-300">Follow-Up By</th>
                                <th className="px-4 py-3 border-r border-gray-300">Visit Date</th>
                                <th className="px-4 py-3 border-r border-gray-300">Description</th>
                                <th className="px-4 py-3 border-r border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visites.map((visite, index) => (
                                <tr key={index} className="bg-white border-b border-gray-300">
                                    <td className="px-4 py-2 w-20 border-r">{index + 1}</td>
                                    <td className="px-4 py-3 w-80 text-black border-r font-bold w-40 break-words">
                                        {visite.visitor_name}
                                    </td>
                                    <td className="px-4 py-3 w-80 text-black border-r border-gray-300 break-words">
                                        {visite.followup_by}
                                    </td>
                                    <td className="px-4 py-3 w-40 border-r border-gray-300 break-words">
                                        {visite.visit_date}
                                    </td>
                                    <td className="px-4 py-3 w-40 border-r border-gray-300 break-words max-w-xs">
                                        {visite.purpose || "No Details"}
                                    </td>
                                    <td className="px-4 py-3 w-40 break-words max-w-xs">
                                        {visite.attend === "1" ? (
                                            <button className="bg-green-500 text-white py-1 px-3 rounded-md">
                                                Attended
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAttendClick(visite.id)}
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

export default Upcomingvisits;
