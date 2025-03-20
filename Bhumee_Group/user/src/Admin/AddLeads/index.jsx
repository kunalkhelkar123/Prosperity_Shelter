import NavBar from "../Navbar/NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeadForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [staffnames, setStaffnames] = useState([]);

    useEffect(() => {
        try {
            const token = sessionStorage.getItem("token");
            const admin = JSON.parse(sessionStorage.getItem("admin"));
            setUser(admin);
            if (!token || !admin || admin.role !== "admin") {
                navigate("/admin");
            }
        } catch (error) {
            navigate("/admin");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get("/api/property/getstaff");
                setStaffnames(response.data.data);
            } catch (err) {
                console.error("Error fetching leads:", err);
            }
        };
        fetchStaff();
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        configuration: "",
        budget: "",
        area: "",
        assigned: "NOT ASSIGNED",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "fullName" || name === "area") {
            if (!/^[a-zA-Z\s]*$/.test(value)) return;
        }
        if (name === "contactNumber") {
            if (value === "" || /^[789][0-9]{0,9}$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
            return;
        }
        if (name === "configuration" || name === "budget") {
            if (!/^[a-zA-Z0-9\s]*$/.test(value)) return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/property/leads", formData);
            if (response.data.success) {
                alert("Lead added successfully!");
                setFormData({ fullName: "", contactNumber: "", configuration: "", budget: "", area: "", assigned: "" });
            }
        } catch (error) {
            console.error("Error adding lead:", error);
            alert("Failed to add lead");
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-4 max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add Lead</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block text-sm font-medium">Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Enter Number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block text-sm font-medium">Configuration</label>
                    <input
                        type="text"
                        name="configuration"
                        placeholder="Enter Configuration"
                        value={formData.configuration}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block text-sm font-medium">Budget</label>
                    <input
                        type="text"
                        name="budget"
                        placeholder="Enter Budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block text-sm font-medium">Area</label>
                    <input
                        type="text"
                        name="area"
                        placeholder="Enter Area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block text-sm font-medium">Select Employee</label>
                    <select
                        name="assigned"
                        value={formData.assigned}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="NOT ASSIGNED">Select an Employee</option>
                        {staffnames.map((staff, index) => (
                            <option key={index} value={staff.name}>{staff.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add/Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddLeadForm;