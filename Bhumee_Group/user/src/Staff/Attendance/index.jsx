import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeAttendance = () => {
    const [status, setStatus] = useState("Select");
    const [location, setLocation] = useState({ latitude: "", longitude: "", address: "" });
    const [submittedStatuses, setSubmittedStatuses] = useState([]); // Stores already marked statuses
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]); // Current Date
    const navigate = useNavigate();
    const [staffUser, setStaffUser] = useState("");
    const [staffUserId, setStaffUserId] = useState("");




    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const storedUser = JSON.parse(sessionStorage.getItem("user"));

        if (!token || !storedUser || storedUser.role !== "staff") {
            navigate("/staff");
            return;
        }

        try {
            // Decode the payload of the token (middle part)
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            // Check if token is expired
            if (decodedPayload.exp * 1000 < Date.now()) {
                console.log("Token expired");
                sessionStorage.clear();
                navigate("/staff");
                return;
            }

            // If valid and not expired
            setUser(storedUser);
        } catch (err) {
            console.error("Invalid token format", err);
            sessionStorage.clear();
            navigate("/staff");
        }
    }, [navigate]);




    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("user"));
                if (!user || user.role !== "staff") {
                    return;
                }

                setStaffUser(user.name);
                setStaffUserId(user.id);

                console.log("Fetching attendance data...");

                // ✅ Fetch already marked attendance for today
                const response = await axios.get(`/api/staff/attendance`, {
                    params: { user_id: user.id, date: currentDate },
                });

                if (response.data && response.data.length > 0) {
                    const statuses = response.data.map((entry) => entry.status);
                    setSubmittedStatuses(statuses);
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchData();
    }, [currentDate]);

    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setLocation((prev) => ({ ...prev, address: response.data.display_name || "Address not found" }));
        } catch (error) {
            console.error("Error fetching address:", error);
            setLocation((prev) => ({ ...prev, address: "Error retrieving address" }));
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude, address: "Fetching address..." });
                    fetchAddress(latitude, longitude);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    alert("Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!staffUser || status === "Select" || !location.address) {
            alert("Please enter all details and enable location access.");
            return;
        }

        if (submittedStatuses.includes(status)) {
            alert(`You have already marked "${status}" for today.`);
            return;
        }

        try {
            const response = await axios.post("/api/staff/addattendance", {
                user_id: staffUserId,
                name: staffUser,
                status,
                time: new Date().toLocaleTimeString("en-GB"),
                date: currentDate,
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
            });

            if (response) {
                alert(response.data.message);
                setSubmittedStatuses((prev) => [...prev, status]); // ✅ Update state after submission
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("Failed to mark attendance.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Mark Attendance</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium">Name</label>
                        <input type="text" className="w-full border p-2 rounded" value={staffUser} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Status</label>
                        <select className="w-full border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Select" disabled>
                                Select Status
                            </option>
                            {["Work IN", "Work OUT", "Leave", "Comp Off", "Holiday"].map((option) => (
                                <option key={option} value={option} disabled={submittedStatuses.includes(option)}>
                                    {option} {submittedStatuses.includes(option) ? "(Already Marked)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Location</label>
                        <p>{location.address || "Fetching address..."}</p>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Submit Attendance
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAttendance;
