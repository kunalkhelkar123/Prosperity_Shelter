import React, { useState, useEffect } from "react";
// import axios from "../../../axiosConfig";
import NavBar from "../../ClientNavbar/NavBar";
import axios from "axios";

const Loans = () => {
    const [loanDetails, setLoanDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false); // Track changes in modal input fields
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await axios.get("/api/client/loan");
                setLoanDetails(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching loan details:", err);
                setError("Failed to load loan details.");
                setLoading(false);
            }
        };

        fetchLoanDetails();
    }, []);

    const handleShowMore = (loan) => {
        setSelectedLoan(loan);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLoan(null);
        setIsUpdated(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedLoan((prev) => ({ ...prev, [name]: value }));
        setIsUpdated(true);
    };

    const handleUpdateLoan = async () => {
        if (!isUpdated) {
            alert("No changes made to update.");
            return;
        }

        try {
            const updatedLoan = { ...selectedLoan };
            await axios.put("/api/client/loan", updatedLoan);  // Send data in body
            setLoanDetails((prev) =>
                prev.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan))
            );
            alert("Loan details updated successfully!");
            handleCloseModal();
        } catch (err) {
            console.error("Error updating loan details:", err);
            alert("Failed to update loan details.");
        }
    };


    const filteredClients = loanDetails.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) 
    );


    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">All Client Loan Details</h1>
               

                <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by Client Name"
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
            </div>
               
               
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && loanDetails.length > 0 && (
                    <table className="table-auto w-full bg-white shadow-md rounded border border-gray-300">
                        <thead className="bg-teal-600 text-white">
                            <tr className="bg-teal-600 text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left border">Sr. No</th>
                                <th className="py-3 px-6 text-left border">Client Name</th>
                                <th className="py-3 px-6 text-left border">Address</th>
                                <th className="py-3 px-6 text-left border">Mobile Number</th>
                                <th className="py-3 px-6 text-left border">Advance Paid Value</th>
                                <th className="py-3 px-6 text-center border">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm text-black">
                            {filteredClients.map((loan, index) => (
                                <tr
                                    key={loan.id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-black text-left whitespace-nowrap border " >
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap border text-black text-xl font-semibold  ">
                                        {loan.clientName}
                                    </td>
                                    <td className="py-3 px-6 text-left border text-black">{loan.address}</td>
                                    <td className="py-3 px-6 text-left border text-black">
                                        {loan.mobileNumber}
                                    </td>
                                    <td className="py-3 px-6 text-left border text-black">
                                        {loan.advancePaid}
                                    </td>
                                    <td className="py-3 px-6 text-center border">
                                        <button
                                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800"
                                            onClick={() => handleShowMore(loan)}
                                        >
                                            Show More
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!loading && filteredClients.length === 0 && <p>No loan details found.</p>}

                {/* Modal */}
                {showModal && selectedLoan && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full h-auto max-h-[90vh] overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Loan Details</h2>

                            <div className="grid grid-cols-2 gap-4">


                                {/* Client Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        value={selectedLoan.clientName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={selectedLoan.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* City */}
                                {/* <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={selectedLoan.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div> */}

                                {/* Advance Paid */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Advance Paid</label>
                                    <input
                                        type="text"
                                        name="advancePaid"
                                        value={selectedLoan.advancePaid}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={selectedLoan.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={selectedLoan.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Aadhar Card */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                                    <input
                                        type="text"
                                        name="aadharCard"
                                        value={selectedLoan.aadharCard}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Pancard Number */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Pancard Number</label>
                                    <input
                                        type="text"
                                        name="pancardNumber"
                                        value={selectedLoan.pancardNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Agreement Value */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Agreement Value</label>
                                    <input
                                        type="text"
                                        name="agreementValue"
                                        value={selectedLoan.agreementValue}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Total Amount */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                                    <input
                                        type="text"
                                        name="totalAmount"
                                        value={selectedLoan.totalAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Bank Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        value={selectedLoan.bankName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Branch Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                                    <input
                                        type="text"
                                        name="branchName"
                                        value={selectedLoan.branchName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Disbursement */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Disbursement</label>
                                    <input
                                        type="text"
                                        name="disbursement"
                                        value={selectedLoan.disbursement}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-4 mt-4">
                                <button
                                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex-1"
                                    onClick={handleUpdateLoan}
                                >
                                    Save Changes
                                </button>
                                <button
                                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 flex-1"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Loans;
