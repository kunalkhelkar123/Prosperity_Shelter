import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosConfig";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

// Function to get the local formatted date (yyyy-mm-dd)
const getFormattedDate = (date) => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

function DailyScrumsList() {
    const [scrums, setScrums] = useState([]);
    const [filteredScrums, setFilteredScrums] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date())); // Default to today's local date
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order: ascending
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [recordsPerPage] = useState(15); // Number of records to show per page
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchScrums = async () => {
            try {
                const response = await axiosinstance.get("/api/dailyscrum/getdailyscrum");

                if (response.status === 200 && response.data.length > 0) {
                    setScrums(response.data);
                    setFilteredScrums(response.data);
                } else {
                    setMessage("No daily scrums available.");
                }
            } catch (error) {
                console.error("Error fetching scrums:", error);
                setMessage("Failed to load daily scrums.");
            }
        };

        fetchScrums();
    }, []);

    // Search button handler
    const handleSearch = () => {
        filterAndSortData();
    };

    const filterAndSortData = () => {
        let filteredData = scrums.filter((scrum) => {
            const scrumDate = getFormattedDate(scrum.date); // Use local formatted date
            return scrumDate === selectedDate;
        });

        if (sortOrder === "asc") {
            filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setFilteredScrums(filteredData);

        if (filteredData.length === 0) {
            setMessage("No daily scrums available for the selected date.");
        } else {
            setMessage("");
        }
    };

    // Pagination Logic: Get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredScrums.slice(indexOfFirstRecord, indexOfLastRecord);

    // Pagination Controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredScrums.length / recordsPerPage);

    // Function to format date to dd-mm-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Function to format date and time to dd-mm-yyyy hh:mm:ss
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${amPm}`;
    };

    const convertNewlinesToBr = (str) => {
        return str.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <>
            <NavBar />
            <div className="p-6 bg-purple-100">
                <h1 className="text-4xl font-bold text-center mb-4 text-teal-950">
                    Daily Scrum List
                </h1>

                {/* Filters Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label htmlFor="date" className="text-gray-700 font-medium">
                                Filter by Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="ml-2 border border-gray-300 rounded px-2 py-1"
                            />
                        </div>

                        <button
                            onClick={handleSearch}
                            className="ml-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {message && <p className="text-center text-red-600">{message}</p>}

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-3 border-r border-gray-300">Sr. No</th>
                                <th className="px-4 py-3 border-r border-gray-300">Name</th>
                                <th className="px-4 py-3 border-r border-gray-300">Description</th>
                                <th className="px-4 py-3 border-r border-gray-300">Date</th>
                                <th className="px-4 py-3 border-r border-gray-300">Post Date and Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((scrum, index) => (
                                <tr key={scrum.id} className="bg-white border-b border-gray-300">
                                    <td className="px-4 py-3 border-r">{index + 1 + indexOfFirstRecord}</td>
                                    <td className="px-4 py-3 border-r">{scrum.name}</td>
                                    <td className="px-4 py-3 border-r">{convertNewlinesToBr(scrum.description)}</td>
                                    <td className="px-4 py-3 border-r">{formatDate(scrum.date)}</td>
                                    <td className="px-4 py-3">{formatDateTime(scrum.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-teal-500 text-white rounded-l hover:bg-teal-600"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-lg">{`${currentPage} / ${totalPages}`}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-teal-500 text-white rounded-r hover:bg-teal-600"
                    >
                        Next
                    </button>
                </div>

                <button
                    className="rounded-md p-2 bg-teal-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-teal-800"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                >
                    <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
                </button>
            </div>
        </>
    );
}

export default DailyScrumsList;
