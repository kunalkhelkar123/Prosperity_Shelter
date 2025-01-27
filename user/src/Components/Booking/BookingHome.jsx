import React, { useEffect, useState } from "react";
import axiosinstance from '../../../axiosConfig';
import NavBar from "../Client/NavBar";

const BookingHome = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null); // For popup data
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [searchQuery, setSearchQuery] = useState('');




    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosinstance.get("/api/client/bookings");
                if (response.status === 200) {
                    setBookings(response.data);
                    // console.log("call")
                } else {
                    setError("Failed to fetch booking details.");
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("An error occurred while fetching bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleShowMore = (booking) => {
        setSelectedBooking(booking);
        setShowPopup(true);
    };

    const handleUpdateBooking = async () => {
        try {

            // console.log("selectedBooking", selectedBooking)
            const response = await axiosinstance.put(`/api/client/update-booking`, selectedBooking);
            if (response.status === 200) {
                alert("Booking updated successfully!");
                setShowPopup(false);
                // Refresh bookings list
                const updatedBookings = bookings.map(b => b.id === selectedBooking.id ? selectedBooking : b);
                setBookings(updatedBookings);

            } else {
                alert("Failed to update booking.");
            }
        } catch (err) {
            console.error("Error updating booking:", err);
            alert("An error occurred while updating the booking.");
        }
    };



    const filteredClients = bookings.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) 
    );



    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-teal-600 mb-6">Booking Section</h1>


                {/* Search Bar */}
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by Client Name"
                        className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>



                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-black">
                        <thead className="bg-teal-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left border border-black">Sr.no</th>
                                <th className="py-3 px-6 text-left border border-black">Client Name</th>
                                <th className="py-3 px-6 text-left border border-black">Address</th>
                                <th className="py-3 px-6 text-left border border-black">Mobile Number</th>
                                <th className="py-3 px-6 text-left border border-black">Email</th>
                                <th className="py-3 px-6 text-left border border-black">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((booking, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-6 border border-black">{index + 1}</td>
                                    <td className="py-3 px-6 border border-black ">{booking.clientName || "N/A"}</td>
                                    <td className="py-3 px-6 border border-black" >{booking.address || "N/A"}</td>
                                    <td className="py-3 px-6 border border-black">{booking.mobileNumber || "N/A"}</td>
                                    <td className="py-3 px-6 border border-black">{booking.email || "N/A"}</td>
                                    <td className="py-3 px-6 border border-black">
                                        <button
                                            className="bg-teal-600 text-white px-4 py-2 rounded"
                                            onClick={() => handleShowMore(booking)}
                                        >
                                            Show More
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Popup Modal */}
            {showPopup && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-auto">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Booking Details</h2>
                        <form className="grid grid-cols-2 gap-6">
                            {/* ID */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">ID</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={selectedBooking.id || ""}
                                    readOnly
                                />
                            </div>

                            {/* Client ID */}
                            {/* <div>
                    <label className="block text-gray-700 font-medium mb-2">Client ID</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={selectedBooking.client_id || ""}
                        readOnly
                    />
                </div> */}

                            {/* Client Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Client Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={selectedBooking.clientName || ""}
                                    onChange={(e) =>
                                        setSelectedBooking((prev) => ({
                                            ...prev,
                                            clientName: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={selectedBooking.address || ""}
                                    onChange={(e) =>
                                        setSelectedBooking((prev) => ({
                                            ...prev,
                                            address: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={selectedBooking.mobileNumber || ""}
                                    onChange={(e) =>
                                        setSelectedBooking((prev) => ({
                                            ...prev,
                                            mobileNumber: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={selectedBooking.email || ""}
                                    onChange={(e) =>
                                        setSelectedBooking((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {/* Remaining Fields */}
                            {[
                                { label: "Aadhar Card", key: "aadharCard" },
                                { label: "Pancard Number", key: "pancardNumber" },
                                { label: "Parent Property", key: "parentProperty" },
                                { label: "Property Description", key: "propertyDescription" },
                                { label: "Property Name", key: "propertyName" },
                                { label: "Apartment Type/No", key: "apartmentTypeOrNo" },
                                { label: "Source", key: "source" },
                                { label: "Booking Date", key: "bookingDate", type: "date" },
                                { label: "Sales Person", key: "salesPerson" },
                                { label: "Sales Manager", key: "salesManager" },
                                { label: "Flat Type", key: "flatType" },
                                { label: "Flat Cost", key: "flatCost" },
                                { label: "Wing", key: "wing" },
                                { label: "Floor", key: "floor" },
                                { label: "Carpet Area", key: "carpetArea" },
                                { label: "Parking No", key: "parkingNo" },
                                { label: "Stamp Duty", key: "stampDuty" },
                                { label: "Registration", key: "registration" },
                                { label: "GST", key: "GST" },
                                { label: "Total Cost", key: "totalCost" },
                                { label: "Maintenance Charges", key: "maintenanceCharges" },
                                { label: "Legal Charges", key: "legalCharges" },
                                { label: "Booking Token Amount", key: "bookingTokenAmount" },
                                { label: "Payment Mode", key: "paymentMode" },
                                { label: "Cheque No", key: "chequeNo" },
                                { label: "Cheque Date", key: "chequeDate", type: "date" },
                                { label: "Bank Name", key: "bankName" },

                            ].map((field) => (
                                <div key={field.key}>
                                    <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
                                    <input
                                        type={field.type || "text"}
                                        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        value={selectedBooking[field.key] || ""}
                                        onChange={(e) =>
                                            setSelectedBooking((prev) => ({
                                                ...prev,
                                                [field.key]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            ))}
                        </form>
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-500 mr-4"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700"
                                onClick={handleUpdateBooking}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
};

export default BookingHome;
