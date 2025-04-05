import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Navbar/index";
import { useNavigate } from "react-router-dom";

const AddLeadForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    // const puneAreas = ["Katraj", "Shivajinagar", "Swargate", "Hinjewadi", "Kothrud", "Baner", "Wakad", "Hadapsar", "Viman Nagar", "Kharadi"];

    const puneAreas = [
        "Agarkar Nagar", "Akurdi", "Alandi", "Alandi Road", "Alephata", "Ambarwet", "Ambavane", "Ambegaon", "Ambegaon Budruk",
        "Ambegaon Khurd", "Amboli", "Aundh", "Aundh Road", "Awhalwadi", "Ashtapur", "Alandi-Markal Road", "Alephata", "Ambavane", "Ambegaon Khurd", "Ashtapur", "Bakori", "Balaji Nagar", "Balewadi", "Baner",
        "Baner Bypass Highway", "Baner-Pashan Link Road", "Baramati", "Bavdhan", "Bavdhan Khurd", "Bahul", "Bawada", "Bhekrai Nagar", "Bharti Vidyapith", "Bharti Hospital",
        "Bhaginghar", "Bhugaon", "Bhusari Colony", "Bhosale Nagar", "Bhosari", "Bhoirwadi", "Bhilarewadi", "Bibwewadi", "Bope",
        "Bopgaon", "Bopkhel", "Bopodi", "Boripardhi", "BT Kawade Road", "Budhwar Peth", "Bund Garden Road", "Camp", "Central Panchgani",
        "Chakan", "Chandani Chowk", "Chandan Nagar", "Chande", "Chikhali", "Chimbali", "Chinchwad", "Charholi Budruk", "Charholi Khurd",
        "Church Road", "Dange Chowk", "Dapodi", "Dattavadi", "Daund", "Deccan", "Deccan Gymkhana", "Dehu", "Dehu Road", "Dhanori",
        "Dhangarwadi", "Dhankawdi", "Dhayari", "Dighi", "Dive", "Donaje", "Dhole Patil Road", "East Khadki", "Empress Gardens", "Erandwane", "Factory Road",
        "FC Road", "Fatima Nagar", "Fursungi", "Ganesh Nagar", "Ganesh Peth", "Ganesh Road", "Ganeshkhind", "Ganga Dham", "Gavhane Vasti",
        "Ghorpadi", "Ghotawade", "Gokhale Nagar", "Gokhale Road", "Gudhe", "Gultekdi", "Guru Nanak Nagar", "Guruganesh Nagar", "Guruwar Peth",
        "Hadapsar", "Handewadi", "Handewadi Road", "Hinjawadi", "Hinjawadi Phase 1", "Hinjawadi Phase 2", "Hinjawadi Phase 3", "Holewadi", "Ideal Colony", "Indapur", "Indira Nagar",
        "Induri", "Ins Shivaji Lonavale", "Ingale Nagar", "Jalochi", "J M Road", "Jambhul", "Jejuri", "Junnar", "Kalas", "Kalyani Nagar",
        "Kaman", "Kamshet", "Kanhe", "Kanhur Mesai", "Karjat", "Karve Road", "Karvenagar", "Kasarsai", "Kasba Peth", "Kasar Amboli",
        "Kasarwadi", "Kavade Mala", "Kelawade", "Ketkawale", "Keshav Nagar", "Kesnand", "Khadakwasla", "Khadki", "Khamla", "Khamundi", "Katraj",
        "Kirkatwadi", "Kiwale", "Kondhapuri", "Kondhawe Dhawade", "Kondhwa", "Kondhwa Budruk", "Kondhwa Khurd", "Kondhwa-Pisoli Road",
        "Kodawadi", "Kolvan", "Kolwadi", "Kondanpur", "Koregaon", "Koregaon Bhima", "Koregaon Park", "Kothrud", "Kothrud Road", "Kudje",
        "Kukatpally", "Kurkumbh", "Lohagad", "Loni Kalbhor", "Lonikand", "Lokamanya Nagar", "Lulla Nagar", "Maan", "Magarpatta",
        "Magarpatta Road", "Mahatma Phule Peth", "Mahalunge", "Mahalunge Ingale", "Malegaon", "Malshiras", "Malkapur", "Mamurdi",
        "Mandai", "Mangalwar Peth", "Manjri", "Manchar", "Markal", "Market Yard", "Masulkar Colony", "Medankarwadi", "Midhila Nagar",
        "Misalwadi", "Model Colony", "Mohari BK", "Mohammadwadi", "Morgaon", "Moshi", "Moshi Phata", "Moshi Pradhikaran", "Mukund Nagar",
        "Mulshi", "Mumbai-Pune Expressway", "Mundhwa", "Mundhwa Road", "Nagar Road", "Nana Peth", "Nanekarwadi", "Narayan Peth", "Narayanpur",
        "Narhe", "Narayangaon", "NDA Road", "Nerhe", "Nerul", "Nigdi", "Nighoje", "NIBM", "NIBM Annexe", "NIBM Road", "Nilakh",
        "Nimgaon Mhalungi", "Nanded", "Naylar Road", "Nerul MIDC", "Old Mumbai Pune Highway", "Otur", "Padmavati", "Padvi",
        "Paud", "Paud Road", "Pargaon", "Panshet", "Parvati", "Parvati Darshan", "Parvati Gaon", "Pashan", "Pashan Sus Road",
        "Pate", "Pawna Nagar", "Peth Gaon", "Pimpalgaon Tarf Khed", "Pimpri", "Pimpri Chinchwad", "Pimpri Nilakh", "Pirangut",
        "Pisoli", "Prabhat Road", "Pradhikaran", "Purandar", "Rahatani", "Rajgurunagar", "Ramtekdi", "Range Hills", "Range Hill Road",
        "Rasta Peth", "Raviwar Peth", "Ravet", "Revenue Colony", "Rihe", "Sainath Nagar", "Salisbury Park", "Sambhaji Nagar", "Sanaswadi",
        "Sangamvadi", "Sangvi", "Sangvi Road", "Sasane Nagar", "Saswad", "Saswad Road", "Satara Road", "Senapati Bapat Road",
        "Shaniwar Peth", "Shankar Shet Road", "Shastri Nagar", "Shewalwadi", "Shikrapur", "Shinde", "Shinde Chhatri", "Shirgaon",
        "Shirur", "Shirwal", "Shiroli", "Shivajinagar", "Shivane", "Shreehans Nagar", "Shukrawar Peth", "Sinhagad", "Sinhagad Road",
        "Somatane", "Somatne Phata", "Somwar Peth", "Sopan Bag Road", "Sopan Baug", "Spine Road", "Swargate", "Talawade", "Talegaon",
        "Talegaon Dabhade", "Talegaon MIDC Road", "Taljai", "Tathawade", "Thergaon", "Theur", "Tingre Nagar", "Tingarli", "Vadgaon Budruk",
        "Vadgaon MIDC", "Viman Nagar", "Vishrant Wadi", "Wadgaon Sheri", "Wakad", "Wakadewadi", "Wai", "Wanwadi", "Warje",
        "Yashvant Nagar", "Yavat", "Yewalewadi"
    ];




  


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
                setFormData((prevData) => ({ ...prevData, assigned: storedUser.name }));
            } catch (err) {
                console.error("Invalid token format", err);
                sessionStorage.clear();
                navigate("/staff");
            }
        }, [navigate]);

    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        configuration: "",
        budget: "",
        area: "",
        assigned: "",
        date: "", // <-- added
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "fullName") {
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
            console.log("Data before sending to backend API", formData);
            const response = await axios.post("/api/property/leads", formData);

            if (response.data.success) {
                alert("Lead added successfully!");
                setFormData({ fullName: "",  date: "" , contactNumber: "", configuration: "", budget: "", area: "", assigned: user.name });
            }
        } catch (error) {
            console.error("Error adding lead:", error);
            alert("Failed to add lead");
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg">
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

                    <label className="block text-sm font-medium">Location</label>
                    <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select an Location</option>
                        {puneAreas.map((area, index) => (
                            <option key={index} value={area}>{area}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />


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
