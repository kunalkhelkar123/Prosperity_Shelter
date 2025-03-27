import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Upcomingvisits() {
    const [allVisites, setAllVisites] = useState([]); // Store all visits from API
    const [visites, setVisites] = useState([]); // Filtered visits for display
    const [totalVisits, setTotalVisits] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const storedUser = JSON.parse(sessionStorage.getItem("user"));

        if (!token || !storedUser || storedUser.role !== "staff") {
            navigate("/staff");
        } else {
            setUser(storedUser);
            fetchVisites(storedUser.name);
        }
    }, [navigate]);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const fetchVisites = async (username) => {
        try {
            const response = await axios.post("/api/staff/getvisits", { followup_by: username });

            if (response.status === 200 && response.data.length > 0) {
                const data = response.data;
                setAllVisites(data); // Store all data
                filterVisites(data, selectedDate); // Filter visits for the selected date
            }
        } catch (error) {
            console.error("Error fetching visits:", error);
        }
    };

    const filterVisites = (data, date) => {
        const selected = new Date(date);
        const tomorrow = new Date(selected);
        tomorrow.setDate(selected.getDate() + 1);
        const dayAfterTomorrow = new Date(selected);
        dayAfterTomorrow.setDate(selected.getDate() + 2);

        const selectedFormatted = formatDate(selected);
        const tomorrowFormatted = formatDate(tomorrow);
        const dayAfterTomorrowFormatted = formatDate(dayAfterTomorrow);

        const filteredData = data.filter((visite) => {
            const [day, month, year] = visite.visit_date.split("/");
            const visitDate = new Date(`${year}-${month}-${day}`);
            const visitFormatted = formatDate(visitDate);

            return (
                visitFormatted === selectedFormatted ||
                visitFormatted === tomorrowFormatted ||
                visitFormatted === dayAfterTomorrowFormatted
            );
        });

        setTotalVisits(filteredData.length);
        setVisites(filteredData);
    };

    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
        filterVisites(allVisites, newDate);
    };

    const handleAttendClick = async (visiteId) => {
        try {
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
        } catch (error) {
            console.error("Error updating attend status:", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-6 bg-purple-100 h-[1000px]">
                <h1 className="text-4xl font-bold flex justify-center items-center mt-[-10px] p-2 text-purple-9500">
                    Upcoming Visit Details
                </h1>

                <div className="flex justify-between items-center my-4">
                    <div className="p-4 bg-teal-500 text-white rounded-md">
                        <h3 className="font-bold">Total Visits</h3>
                        <p>{totalVisits}</p>
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate.toISOString().slice(0, 10)}
                            onChange={handleDateChange}
                            className="border rounded-md px-4 py-2"
                        />
                    </div>
                </div>

                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-black uppercase bg-gray-400">
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
                                    <td className="px-4 py-3 w-80 text-black border-r font-bold break-words">
                                        {visite.lead_name}
                                       

                                    </td>
                                    <td className="px-4 py-3 w-80 text-black border-r border-gray-300 break-words">
                                        {visite.followup_by}
                                    </td>
                                    <td className="px-4 py-3 w-40 border-r border-gray-300 break-words">
                                        {visite.visit_date}
                                    </td>
                                    <td className="px-4 py-3 w-40 border-r border-gray-300 break-words max-w-xs">
                                        {visite.lead_description || "No Details"}
                                    </td>
                                    <td className="px-4 py-3 w-40 break-words max-w-xs">
                                        {visite.attend === "TRUE" ? (
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
                    onClick={() => navigate(-1)}
                >
                    <span className="material-symbols-outlined font-extrabold text-3xl">
                        arrow_circle_left
                    </span>
                </button>
            </div>
        </>
    );
}

export default Upcomingvisits;
