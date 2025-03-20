

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ShowClient = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null); // State to hold the selected client for editing
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [searchQuery, setSearchQuery] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [updatedClient, setUpdatedClient] = useState({
        clientName: "",
        address: "",
        city: "",
        district: "",
        taluka: "",
        pincode: "",
        age: "",
        occupation: "",
        bookingDate: "",
        dateOfBirth: "",
        anniversaryDate: "",
        parentProperty: "",
        propertyName: "",
        propertyDescription: "",
        totalPrice: "",
        advancePaid: "",
        paymentMode: "",
        remainingAmount: "",
        sansaction: "",
        mobileNumber: "",
        email: "",
        aadharCard: "",
        pancardNumber: "",
        coApplicantName: "",
        coApplicantMobile: "",
        coApplicantEmail: "",
        coApplicantAadharCard: "",
        coApplicantPancardNumber: "",
        coApplicantAddress: "",
    });
    const navigate = useNavigate();


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const adminData = sessionStorage.getItem("admin");
        const admin = adminData ? JSON.parse(adminData) : null;
    
        console.log("User subrole ==> ", admin?.subrole);
    
        if (!token && !admin && (admin.role !== "admin" && admin.subrole !== "admin")) {
            console.log("Unauthorized access. Role:", admin?.role, "Subrole:", admin?.subrole);
            alert("You don't have permission to access the client data.");
            navigate("/admin/dashboard");
        }
    }, [navigate]);
    



    // Fetch client data from the backend
    const fetchClients = async () => {
        try {
            const response = await axios.get("/api/client/getclients");
            if (response.data.success) {
                setClients(response.data.clients);
            } else {
                alert("Failed to fetch client data.");
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
            alert("An error occurred while fetching client data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // Function to format the date to dd-mm-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Check if the date is invalid
        if (isNaN(date.getTime())) {
            return ''; // Return an empty string or any fallback value you prefer
        }

        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day is less than 10
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is less than 10
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    // Filter clients based on the search query
    const filteredClients = clients.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.coApplicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.propertyName.toLowerCase().includes(searchQuery.toLowerCase())


    );

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
        });

        const tableData = filteredClients.map((client, index) => [
            index + 1,
            client.clientName,
            client.address,
            formatDate(client.bookingDate),
            client.propertyName,
            client.coApplicantName,
        ]);

        doc.text("Client List", 14, 10);
        doc.autoTable({
            head: [["SR. No", "Name", "Address", "Booking Date", "Property Name", "Co-Applicant Name"]],
            body: tableData,
            startY: 20,
        });

        try { doc.save("Client_List.pdf"); }
        catch (err) {
            const pdfBlob = doc.output("blob");
            const blobURL = URL.createObjectURL(pdfBlob);
            window.open(blobURL, "_blank");
        }
    };

    const generateEXCEL = () => {
        const tableData = filteredClients.map((client, index) => [
            index + 1,
            client.clientName,
            client.address,
            formatDate(client.bookingDate),
            client.propertyName,
            client.coApplicantName,
        ]);
        // Excel Export
        const ws = XLSX.utils.aoa_to_sheet([
            ["SR. No", "Name", "Address", "Booking Date", "Property Name", "Co-Applicant Name"],
            ...tableData
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Client List");
        XLSX.writeFile(wb, "Client_List.xlsx");
    };


    // Show More Button Handler
    const showMoreDetails = (client) => {
        setSelectedClient(client);
        setUpdatedClient({
            clientName: client.clientName,
            address: client.address,
            city: client.city,
            district: client.district,
            taluka: client.taluka,
            pincode: client.pincode,
            age: client.age,
            occupation: client.occupation,
            bookingDate: formatDate(client.bookingDate), // Format the date here
            dateOfBirth: formatDate(client.dateOfBirth), // Format the date here
            anniversaryDate: formatDate(client.anniversaryDate), // Format the date here
            parentProperty: client.parentProperty,
            propertyName: client.propertyName,
            propertyDescription: client.propertyDescription,
            totalPrice: client.totalPrice,
            advancePaid: client.advancePaid,
            paymentMode: client.paymentMode,
            remainingAmount: client.remainingAmount,
            sansaction: client.sansaction,
            mobileNumber: client.mobileNumber,
            email: client.email,
            aadharCard: client.aadharCard,
            pancardNumber: client.pancardNumber,
            coApplicantName: client.coApplicantName,
            coApplicantMobile: client.coApplicantMobile,
            coApplicantEmail: client.coApplicantEmail,
            coApplicantAadharCard: client.coApplicantAadharCard,
            coApplicantPancardNumber: client.coApplicantPancardNumber,
            coApplicantAddress: client.coApplicantAddress,
        });
        setShowModal(true);
    };

    // Handler to update client details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIsChanged(true);
        setUpdatedClient((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdateClient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/client/updateclient/${selectedClient.client_id}`, updatedClient);
            if (response.data.success) {
                alert("Client details updated successfully.");
                setShowModal(false);
                fetchClients(); // Refresh the client list after update
            } else {
                alert("Failed to update client details.");
            }
        } catch (error) {
            console.error("Error updating client data:", error);
            alert("An error occurred while updating client data.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">All Booking Client List</h1>

            {/* Search Bar */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by Client Name, Co-Applicant Name, or Property Name..."
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                    onClick={generatePDF}
                >
                    Download Client list PDF
                </button>
                <button
                    className="px-4 ml-2 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                    onClick={generateEXCEL}
                >
                    Download Client list Excelsheet
                </button>
            </div>

            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border border-gray-300 border-collapse rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">SR. No</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Address</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Booking Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Property Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Co-Applicant Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.clientName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.address}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{formatDate(client.bookingDate)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.propertyName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.coApplicantName}</td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <button
                                                className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded"
                                                onClick={() => showMoreDetails(client)}
                                            >
                                                Show More
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-4 text-center text-sm text-gray-600 border border-gray-300"
                                    >
                                        No clients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for editing client details */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-3/4 ml-60 overflow-y-auto max-h-[90vh]">
                        <h1 className="text-2xl font-bold text-teal-600 mb-6">View and Edit Client Details</h1>

                        <form onSubmit={handleUpdateClient}>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        value={updatedClient.clientName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={updatedClient.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={updatedClient.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={updatedClient.district}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Taluka</label>
                                    <input
                                        type="text"
                                        name="taluka"
                                        value={updatedClient.taluka}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={updatedClient.pincode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Age</label>
                                    <input
                                        type="text"
                                        name="age"
                                        value={updatedClient.age}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Occupation</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={updatedClient.occupation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Booking Date</label>
                                    <input
                                        type="text"
                                        name="bookingDate"
                                        value={updatedClient.bookingDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="text"
                                        name="dateOfBirth"
                                        value={updatedClient.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Anniversary Date</label>
                                    <input
                                        type="text"
                                        name="anniversaryDate"
                                        value={updatedClient.anniversaryDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Parent Property</label>
                                    <input
                                        type="text"
                                        name="parentProperty"
                                        value={updatedClient.parentProperty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                    <input
                                        type="text"
                                        name="propertyName"
                                        value={updatedClient.propertyName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Property Description</label>
                                    <input
                                        type="text"
                                        name="propertyDescription"
                                        value={updatedClient.propertyDescription}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                                    <input
                                        type="text"
                                        name="totalPrice"
                                        value={updatedClient.totalPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Advance Paid</label>
                                    <input
                                        type="text"
                                        name="advancePaid"
                                        value={updatedClient.advancePaid}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                                    <input
                                        type="text"
                                        name="paymentMode"
                                        value={updatedClient.paymentMode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Remaining Amount</label>
                                    <input
                                        type="text"
                                        name="remainingAmount"
                                        value={updatedClient.remainingAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Sansaction</label>
                                    <input
                                        type="text"
                                        name="sansaction"
                                        value={updatedClient.sansaction}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={updatedClient.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedClient.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                                    <input
                                        type="text"
                                        name="aadharCard"
                                        value={updatedClient.aadharCard}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Pancard Number</label>
                                    <input
                                        type="text"
                                        name="pancardNumber"
                                        value={updatedClient.pancardNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Name</label>
                                    <input
                                        type="text"
                                        name="coApplicantName"
                                        value={updatedClient.coApplicantName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Mobile</label>
                                    <input
                                        type="text"
                                        name="coApplicantMobile"
                                        value={updatedClient.coApplicantMobile}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Email</label>
                                    <input
                                        type="email"
                                        name="coApplicantEmail"
                                        value={updatedClient.coApplicantEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Aadhar Card</label>
                                    <input
                                        type="text"
                                        name="coApplicantAadharCard"
                                        value={updatedClient.coApplicantAadharCard}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Pancard Number</label>
                                    <input
                                        type="text"
                                        name="coApplicantPancardNumber"
                                        value={updatedClient.coApplicantPancardNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Co-Applicant Address</label>
                                    <input
                                        type="text"
                                        name="coApplicantAddress"
                                        value={updatedClient.coApplicantAddress}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>


                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        type="button"
                                        className="px-6 py-2 mr-6 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-6 py-2 rounded-lg text-white ${isChanged ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                        disabled={!isChanged} // Disable the button if no changes
                                    >
                                        Update Client
                                    </button>
                                </div>
                            </div>
                        </form>

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-14 right-24 text-4xl text-gray-600 hover:text-gray-900"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowClient;


// import React, { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from 'xlsx';
// import axios from "../../../axiosConfig";

// const ShowClient = () => {
//     const [clients, setClients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedClient, setSelectedClient] = useState(null); // State to hold the selected client for editing
//     const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isChanged, setIsChanged] = useState(false);
//     const [updatedClient, setUpdatedClient] = useState({
//         // Your updatedClient state
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     // Format date function
//     const formatDate = (date) => {
//         if (!date) return "";
//         const d = new Date(date);
//         return d.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Fetch client data from the backend
//     const fetchClients = async () => {
//         try {
//             const response = await axios.get("/api/client/getclients");
//             if (response.data.success) {
//                 setClients(response.data.clients);
//             } else {
//                 alert("Failed to fetch client data.");
//             }
//         } catch (error) {
//             console.error("Error fetching client data:", error);
//             alert("An error occurred while fetching client data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const filteredClients = clients.filter((client) =>
//         client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         client.coApplicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         client.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Pagination logic
//     const indexOfLastClient = currentPage * itemsPerPage;
//     const indexOfFirstClient = indexOfLastClient - itemsPerPage;
//     const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

//     // Generate PDF
//     const generatePDF = () => {
//         const doc = new jsPDF({
//             orientation: "landscape",
//         });

//         const tableData = filteredClients.map((client, index) => [
//             index + 1,
//             client.clientName,
//             client.address,
//             formatDate(client.bookingDate),
//             client.propertyName,
//             client.coApplicantName,
//         ]);

//         doc.text("Client List", 14, 10);
//         doc.autoTable({
//             head: [["SR. No", "Name", "Address", "Booking Date", "Property Name", "Co-Applicant Name"]],
//             body: tableData,
//             startY: 20,
//         });

//         doc.save("Client_List.pdf");
//     };

//     const generateEXCEL = () => {
//         const tableData = filteredClients.map((client, index) => [
//             index + 1,
//             client.clientName,
//             client.address,
//             formatDate(client.bookingDate),
//             client.propertyName,
//             client.coApplicantName,
//         ]);
//         // Excel Export
//         const ws = XLSX.utils.aoa_to_sheet([
//             ["SR. No", "Name", "Address", "Booking Date", "Property Name", "Co-Applicant Name"],
//             ...tableData
//         ]);

//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Client List");
//         XLSX.writeFile(wb, "Client_List.xlsx");
//     };

//     // Handle pagination change
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

//     return (
//         <div className="max-w-5xl mx-auto">
//             <h1 className="text-2xl font-bold text-center mb-6">All Booking Client List</h1>

//             {/* Search Bar */}
//             <div className="flex justify-between mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by Client Name, Co-Applicant Name, or Property Name..."
//                     className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                     className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
//                     onClick={generatePDF}
//                 >
//                     Download Client list PDF
//                 </button>
//                 <button
//                     className="px-4 ml-2 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
//                     onClick={generateEXCEL}
//                 >
//                     Download Client list Excelsheet
//                 </button>
//             </div>

//             {loading ? (
//                 <p className="text-center text-lg text-gray-600">Loading...</p>
//             ) : (
//                 <div className="overflow-x-auto shadow-lg rounded-lg">
//                     <table className="min-w-full bg-white border border-gray-300 border-collapse rounded-lg">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">SR. No</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Name</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Address</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Booking Date</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Property Name</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Co-Applicant Name</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border border-gray-300">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentClients.length > 0 ? (
//                                 currentClients.map((client, index) => (
//                                     <tr
//                                         key={index}
//                                         className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
//                                     >
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
//                                             {(currentPage - 1) * itemsPerPage + index + 1}
//                                         </td>
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.clientName}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.address}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{formatDate(client.bookingDate)}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.propertyName}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{client.coApplicantName}</td>
//                                         <td className="px-6 py-4 border border-gray-300">
//                                             <button
//                                                 className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded"
//                                                 onClick={() => showMoreDetails(client)}
//                                             >
//                                                 Show More
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan="7"
//                                         className="px-6 py-4 text-center text-sm text-gray-600 border border-gray-300"
//                                     >
//                                         No clients found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>

//                     {/* Pagination Controls */}
//                     <div className="mt-4 flex justify-center">
//                         <button
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg"
//                             onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//                         >
//                             Prev
//                         </button>
//                         <span className="px-4 py-2 text-sm text-gray-700">
//                             Page {currentPage} of {totalPages}
//                         </span>
//                         <button
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg"
//                             onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             )}


//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg w-3/4 ml-60 overflow-y-auto max-h-[90vh]">
//                         <h1 className="text-2xl font-bold text-teal-600 mb-6">View and Edit Client Details</h1>

//                         <form onSubmit={handleUpdateClient}>
//                             <div className="grid grid-cols-3 gap-6">
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Client Name</label>
//                                     <input
//                                         type="text"
//                                         name="clientName"
//                                         value={updatedClient.clientName}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         value={updatedClient.address}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">City</label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={updatedClient.city}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">District</label>
//                                     <input
//                                         type="text"
//                                         name="district"
//                                         value={updatedClient.district}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Taluka</label>
//                                     <input
//                                         type="text"
//                                         name="taluka"
//                                         value={updatedClient.taluka}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={updatedClient.pincode}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Age</label>
//                                     <input
//                                         type="text"
//                                         name="age"
//                                         value={updatedClient.age}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Occupation</label>
//                                     <input
//                                         type="text"
//                                         name="occupation"
//                                         value={updatedClient.occupation}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Booking Date</label>
//                                     <input
//                                         type="text"
//                                         name="bookingDate"
//                                         value={updatedClient.bookingDate}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                                     <input
//                                         type="text"
//                                         name="dateOfBirth"
//                                         value={updatedClient.dateOfBirth}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Anniversary Date</label>
//                                     <input
//                                         type="text"
//                                         name="anniversaryDate"
//                                         value={updatedClient.anniversaryDate}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Parent Property</label>
//                                     <input
//                                         type="text"
//                                         name="parentProperty"
//                                         value={updatedClient.parentProperty}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Property Name</label>
//                                     <input
//                                         type="text"
//                                         name="propertyName"
//                                         value={updatedClient.propertyName}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Property Description</label>
//                                     <input
//                                         type="text"
//                                         name="propertyDescription"
//                                         value={updatedClient.propertyDescription}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Total Price</label>
//                                     <input
//                                         type="text"
//                                         name="totalPrice"
//                                         value={updatedClient.totalPrice}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Advance Paid</label>
//                                     <input
//                                         type="text"
//                                         name="advancePaid"
//                                         value={updatedClient.advancePaid}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
//                                     <input
//                                         type="text"
//                                         name="paymentMode"
//                                         value={updatedClient.paymentMode}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Remaining Amount</label>
//                                     <input
//                                         type="text"
//                                         name="remainingAmount"
//                                         value={updatedClient.remainingAmount}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Sansaction</label>
//                                     <input
//                                         type="text"
//                                         name="sansaction"
//                                         value={updatedClient.sansaction}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//                                     <input
//                                         type="text"
//                                         name="mobileNumber"
//                                         value={updatedClient.mobileNumber}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Email</label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={updatedClient.email}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
//                                     <input
//                                         type="text"
//                                         name="aadharCard"
//                                         value={updatedClient.aadharCard}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Pancard Number</label>
//                                     <input
//                                         type="text"
//                                         name="pancardNumber"
//                                         value={updatedClient.pancardNumber}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Name</label>
//                                     <input
//                                         type="text"
//                                         name="coApplicantName"
//                                         value={updatedClient.coApplicantName}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Mobile</label>
//                                     <input
//                                         type="text"
//                                         name="coApplicantMobile"
//                                         value={updatedClient.coApplicantMobile}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Email</label>
//                                     <input
//                                         type="email"
//                                         name="coApplicantEmail"
//                                         value={updatedClient.coApplicantEmail}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Aadhar Card</label>
//                                     <input
//                                         type="text"
//                                         name="coApplicantAadharCard"
//                                         value={updatedClient.coApplicantAadharCard}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Pancard Number</label>
//                                     <input
//                                         type="text"
//                                         name="coApplicantPancardNumber"
//                                         value={updatedClient.coApplicantPancardNumber}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Co-Applicant Address</label>
//                                     <input
//                                         type="text"
//                                         name="coApplicantAddress"
//                                         value={updatedClient.coApplicantAddress}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                                     />
//                                 </div>


//                                 <div className="flex justify-center mt-6">
//                                     <button
//                                         onClick={() => setShowModal(false)}
//                                         type="button"
//                                         className="px-6 py-2 mr-6 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
//                                     >
//                                         Close
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className={`px-6 py-2 rounded-lg text-white ${isChanged ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'}`}
//                                         disabled={!isChanged} // Disable the button if no changes
//                                     >
//                                         Update Client
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>

//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="absolute top-14 right-24 text-4xl text-gray-600 hover:text-gray-900"
//                         >
//                             &times;
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShowClient;
