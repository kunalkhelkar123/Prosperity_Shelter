import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosConfig";

const Visits = () => {
    const [visits, setVisits] = useState([]);
    const [filteredVisits, setFilteredVisits] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [user, setUser] = useState(null); // Initialize as null
    const [newVisit, setNewVisit] = useState({
        visitorName: "",
        visitDate: "",
        purpose: "",
        followupBy: "",
    });
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Fetch visits data and user data from session storage
    useEffect(() => {
        const userData = sessionStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser); // Set user as an object
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            const fetchVisits = async () => {
                try {
                    console.log("user.staff_id", user);

                    const response = await axiosinstance.post('/api/staff/getvisits', {
                        id: user.id,  // Ensure `user.id` exists
                    });
                    if (response.status === 200) {
                        setVisits(response.data);
                        setFilteredVisits(response.data);
                    } else {
                        console.error("Error fetching visits:", response.data.error);
                    }
                } catch (error) {
                    console.error('Error fetching visits:', error);
                }
            };
            fetchVisits();
        }
    }, [user]);  // Re-fetch visits when `user` changes

    // Handle month filter change
    const handleMonthFilterChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
        setFilteredVisits(
            month ? visits.filter((visit) => visit.month === month) : visits
        );
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVisit({ ...newVisit, [name]: value });
    };

    // Handle adding a new visit using axios
    const handleAddVisit = async () => {
        if (newVisit.visitorName && newVisit.visitDate && newVisit.purpose) {
            const visitMonth = new Date(newVisit.visitDate).toLocaleString("default", {
                month: "long",
            });

            const visitData = {
                ...newVisit,
                month: visitMonth,
                followupBy: user.name,
                id: user.id // Use staff_id instead of id
            };

            try {
                console.log("Visit data:", visitData);

                // Send POST request to add visit
                const response = await axiosinstance.post("/api/staff/addvisits", visitData);

                if (response.status === 201) { // Changed to 201 for successful creation
                    const result = response.data;

                    // Notify user about success
                    alert(result.message); // Ensure `result.message` is returned by API

                    // Assuming `result.visitId` is returned with the created visit ID
                    const updatedVisits = [...visits, { ...visitData, id: result.visitId }];
                    setVisits(updatedVisits);
                    setFilteredVisits(
                        selectedMonth
                            ? updatedVisits.filter((visit) => visit.month === selectedMonth)
                            : updatedVisits
                    );

                    // Reset form fields after visit added
                    setNewVisit({
                        visitorName: "",
                        visitDate: "",
                        purpose: "",
                        followupBy: user.name, // Reset followupBy to user name
                    });
                } else {
                    const error = response.data;
                    alert(error.error || "Failed to add visit");
                }
            } catch (err) {
                console.error("Error adding visit:", err);
                alert("Failed to add visit");
            }
        } else {
            alert("Please fill in all required fields!");
        }
    };

    // Handle deleting a visit
   // Handle deleting a visit
   const handleDeleteVisit = async (visitId) => {
    try {
        console.log("Deleting visit with ID:", visitId); // Debugging line
        
        // Make the DELETE request to the backend
        const response = await axiosinstance.delete(`/api/staff/deletevisit/${visitId}`);
        
        // Debugging line to check the response
        console.log("Response from server:", response);
        
        if (response.status === 200) {
           
            alert(response.data.message); // Alert the success message from the backend

            // Remove the deleted visit from the state
            const updatedVisits = visits.filter((visit) => visit.id !== visitId);
            setVisits(updatedVisits);
            setFilteredVisits(
                selectedMonth
                    ? updatedVisits.filter((visit) => visit.month === selectedMonth)
                    : updatedVisits
            );
        } else {
            alert(response.data.error || "Failed to delete visit");
        }
    } catch (error) {
        console.error("Error deleting visit:", error);
        alert("Failed to delete visit");
    }
};




    return (
        <div>
            <h1 className="text-4xl font-bold flex justify-center items-center mt-[-20px] p-2 text-purple-950">
                Visit Details
            </h1>

            {/* Month Filter */}
            <div className="flex justify-end my-4">
                <label className="mr-4">Filter by Month:</label>
                <select
                    value={selectedMonth}
                    onChange={handleMonthFilterChange}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Months</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Visit Summary */}
            <div className="flex justify-between items-center my-4">
                <div className="p-4 bg-teal-500 mt-[-90px] text-white rounded-md">
                    <h3 className="font-bold">Total Visits</h3>
                    <p>{filteredVisits.length}</p>
                </div>
            </div>

            {/* Visit Table */}
            <div className="relative flex justify-center items-center">
                <table className="w-full text-sm text-left text-gray-500 border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className="px-4 py-3">Sr. No</th>
                            <th className="px-4 py-3">Visitor Name</th>
                            <th className="px-4 py-3">Visit Date</th>
                            <th className="px-4 py-3">Purpose</th>
                            <th className="px-4 py-3">Followup By</th>
                            <th className="px-4 py-3">Month</th>
                            <th className="px-4 py-3">Action</th> {/* New Action Column */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVisits.map((visit, index) => (
                            <tr key={visit.id || index} className="bg-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{visit.visitor_name}</td>
                                <td className="px-4 py-3">{visit.visit_date}</td>
                                <td className="px-4 py-3">{visit.purpose}</td>
                                <td className="px-4 py-3">{visit.followup_by}</td>
                                <td className="px-4 py-3">{visit.month}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleDeleteVisit(visit.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                                    >
                                        Delete
                                    </button>
                                </td> {/* Delete Button */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Visit Form */}
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-bold mb-4">Add New Visit</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block">Visitor Name</label>
                        <input
                            type="text"
                            name="visitorName"
                            value={newVisit.visitorName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block">Visit Date</label>
                        <input
                            type="date"
                            name="visitDate"
                            value={newVisit.visitDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block">Purpose</label>
                        <input
                            type="text"
                            name="purpose"
                            value={newVisit.purpose}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block">Followup By</label>
                        <input
                            type="text"
                            name="followupBy"
                            value={user ? user.name : ""}
                            disabled
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="col-span-3">
                        <button
                            onClick={handleAddVisit}
                            className="w-full sm:w-auto px-6 py-2 bg-purple-950 text-white rounded-md hover:bg-purple-800"
                        >
                            Add Visit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visits;
