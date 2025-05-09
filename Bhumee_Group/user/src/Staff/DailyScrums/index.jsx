import React, { useEffect, useState } from "react";
// import axios from "../../../axiosConfig";
import StaffNavbar from "../Navbar/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function DailyScrum() {
    const defaultDescription = `Name              - \nDate                -\nTotal call          - 0\nConnect call    - 0\nIncoming call  - 0\nCNR                 - 0\nDetails send    - 0\nExpected Visit - 0\nToday's expected- 0\nToday's visit     - 0\nToday revisit    - 0\nTotal visit         - 0\nTotal Booking   - 0`;

    const [description, setDescription] = useState(defaultDescription);
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();



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




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !date || !user) {
            setMessage("Please fill in all fields.");
            return;
        }
        try {
            const response = await axios.post("/api/dailyscrum/adddailyscrum", {
                description,
                date,
                name: user.name,  // Assuming `user.name` exists
            });

            if (response.status === 200) {
                setMessage("Scrum details added successfully.");
                setDescription("");
                setDate("");
            }
        } catch (error) {
            console.error("Error saving scrum:", error);
            setMessage("Failed to save scrum details.");
        }
    };

    return (
        <>
            <StaffNavbar />
            <div className="p-6 bg-purple-100 h-[1000px] *:">
                <h1 className="text-4xl font-bold text-center mb-4 text-purple-950">
                    Add Your Daily Scrum
                </h1>
                {message && <p className="text-center text-red-600">{message}</p>}

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            rows="15"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    {user && (
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={user.name}
                                disabled
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                        Add Scrum
                    </button>
                </form>
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

export default DailyScrum;
