import React, { useState, useEffect } from "react";
import NavBar from "../Client/NavBar";
import axios from "axios";
// import axios from "../../../axiosConfig";

const PaymentHome = () => {
    const [clientPayments, setClientPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);  // Store the selected client for show more
    const [showPopup, setShowPopup] = useState(false);  // Control popup visibility
    const [updatedDetails, setUpdatedDetails] = useState({}); // Store updated details
    const [showPaymentPopup, setShowPaymentPopup] = useState(false); // Control payment popup visibility
    const [paymentDetails, setPaymentDetails] = useState(Array(1).fill({})); // Store payment details for 10 rows
    const [newPayment, setNewPayment] = useState({
        amount: '',
        paymentMode: '',
        paymentDate: '',
        remarks: '',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const [CurrentId, setCurrentId] = useState(0)


    const handleSaveNewPaymentok = async () => {
        // Validate inputs
        if (!newPayment.amount || !newPayment.paymentMode || !newPayment.paymentDate) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log("CurrentId", CurrentId);

        try {
            // Construct payload
            const payload = {
                clientId: CurrentId, // Pass the current user's client ID
                amount: newPayment.amount,
                paymentMode: newPayment.paymentMode,
                paymentDate: newPayment.paymentDate,
                remarks: newPayment.remarks,
                balanceAmount: selectedClient.balanceAmount,
            };

            // Send POST request to backend
            const response = await axios.post('/api/client/addpayments', payload);

            // Handle response
            if (response.status === 200) {
                const data = response.data;

                // Update local state with new payment
                setPaymentDetails([...paymentDetails, data]);

                // Reset input fields
                setNewPayment({
                    amount: '',
                    paymentMode: '',
                    paymentDate: '',
                    remarks: '',
                });

                alert('Payment added successfully!');
                handleClosePaymentPopup(); // Close the payment popup
                fetchClientPayments(); // Refresh the payment list
            } else {
                alert(`Conform you want to add recived payment `)
            }
        } catch (error) {
            console.error('Error adding payment:', error);
            alert('Conform you want to add recived payment. ');
            alert('Click on Save Payment  again. ');

        }
    };

    // Fetch client payments from the backend
    const fetchClientPayments = async () => {
        try {
            const response = await axios.get('/api/client/paymentsDetails');  // Using Axios GET request
            setClientPayments(response.data);  // Set the response data
        } catch (error) {
            console.error("Error fetching client payments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientPayments();
    }, []);

    const handleShowMore = (client) => {
        setSelectedClient(client);  // Set the selected client
        setShowPopup(true);  // Show the popup
        setUpdatedDetails(client);
    };

    const handleClosePopup = () => {
        setShowPopup(false);  // Close the popup

    };

    const handleAddPayment = (index) => {
        const newPaymentRow = paymentDetails[index];
        // Call API or update the state with new payment data for the selected row
        console.log("Add payment for row", index, newPaymentRow);
    };

    const handlePaymentPopupOpen = async (client) => {
        try {
            console.log("client_id", client.client_id);
            setSelectedClient(client); // Set the selected client
            setShowPaymentPopup(true); // Show the payment popup
            setLoading(true); // Start loading state

            const response = await axios.post(`/api/client/getpayments`, {
                id: client.client_id, // Pass client_id in the request body
            });

            if (response.status === 200) {
                const fetchedPayments = response.data || [];

                if (fetchedPayments.length > 0) {
                    // Populate existing rows or pad with empty rows to maintain 10 rows
                    const rows = [...fetchedPayments, ...Array(0).fill({})];
                    setPaymentDetails(rows);
                } else {
                    // If no data is returned, set an empty array
                    setPaymentDetails([]);
                    console.log("No payment details found.");
                }
            } else {
                console.error("Error fetching payment details:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching payment details:", error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };


    const handleClosePaymentPopup = () => {
        setShowPaymentPopup(false);  // Close the payment popup
        setNewPayment({
            amount: '',
            paymentMode: '',
            paymentDate: '',
            remarks: '',
            clientId: '',
            totalAmount: ''
        });
    };

    const handleUpdate = async () => {
        try {
            // Update client details
            const response = await axios.put('/api/client/updateclientpayment', updatedDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Re-fetch client payments after update
                alert("Details Update Successfully")
                fetchClientPayments();
                setShowPopup(false);
            } else {
                console.error('Failed to update client details');
            }
        } catch (error) {
            console.error("Error updating client payment:", error);
        }
    };

    if (loading) {
        return <div>Wait Data Loading...</div>;
    }

    const filteredClients = clientPayments.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase())


    );

    return (
        <div className="bg-gray-100 min-h-screen ">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-teal-600 mb-6">Client Payments Section</h1>
                <input
                    type="text"
                    placeholder="Search by Client Name"
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

            </div>
            {/* Table to display client payments */}
            <table className="min-w-full table-auto   bg-white shadow-md rounded-lg overflow-hidden border border-black">
                <thead>
                    <tr className="bg-teal-600 text-white">
                        <th className="py-3 px-6 text-left border border-black">Sr. No</th>
                        <th className="py-3 px-6 text-left border border-black">Client Name</th>
                        <th className="py-3 px-6 text-left border border-black">Address</th>
                        <th className="py-3 px-6 text-left border border-black">Mobile Number</th>
                        <th className="py-3 px-6 text-left border border-black">Total Amount</th>
                        <th className="py-3 px-6 text-left border border-black">Balance Amount</th>
                        <th className="py-3 px-6 text-left border border-black">Action</th>
                        <th className="py-3 px-6 text-left border border-black">Payment</th> {/* New column for Payments */}
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((payment, index) => (
                        <tr key={payment.loan_Id} className="border-b border-black">
                            <td className="py-3 px-6 text-left border border-black">{index + 1}</td>
                            <td className="py-3 px-6 text-left border border-black">{payment.clientName}</td>
                            <td className="py-3 px-6 text-left border border-black">{payment.address}</td>
                            <td className="py-3 px-6 text-left border border-black">{payment.mobileNumber}</td>
                            <td className="py-3 px-6 text-left border border-black"> {new Intl.NumberFormat("en-IN").format(payment.totalAmount)} /-</td>
                            <td className="py-3 px-6 text-left border border-black">{new Intl.NumberFormat("en-IN").format(payment.balanceAmount)} /- </td>
                            <td className="py-3 px-6 text-left border border-black">
                                <button
                                    onClick={() => handleShowMore(payment)}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Show More
                                </button>
                            </td>
                            <td className="py-3 px-6 text-left border border-black">
                                <button
                                    onClick={() => handlePaymentPopupOpen(payment)} // Open the payment popup
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Payments
                                </button>
                            </td> {/* New Payment Button */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup for updating client payment details */}
            {showPopup && selectedClient && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg  w-full max-w-4xl h-auto md:h-[600px] overflow-y-auto scroll-smooth">
                        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Update Client Payment</h2>

                        {/* Scrollable Content Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-h-[500px]">
                            {/* Client Name */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                                <input
                                    type="text"
                                    value={updatedDetails.clientName || selectedClient.clientName}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, clientName: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Address */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea
                                    value={updatedDetails.address || selectedClient.address}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, address: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="text"
                                    value={updatedDetails.mobileNumber || selectedClient.mobileNumber}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, mobileNumber: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500  focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Final Amount */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                                <input
                                    type="number"
                                    value=  {updatedDetails.totalAmount || selectedClient.totalAmount}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, totalAmount: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 bg-yellow-200 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Balance Amount */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Balance Amount</label>
                                <input
                                    type="number"
                                    value={updatedDetails.balanceAmount || selectedClient.balanceAmount}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, balanceAmount: e.target.value })}
                                    className={`border ${updatedDetails.balanceAmount ? 'bg-red-300' : 'bg-red-300'} focus:ring-red-500 focus:border-red-500 p-3 w-full rounded-lg shadow-sm text-sm font-semibold`}
                                />
                            </div>

                            {/* Agreement Value */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Value</label>
                                <input
                                    type="number"
                                    value={updatedDetails.agreementValue || selectedClient.agreementValue}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, agreementValue: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* All Package */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">All Packages</label>
                                <input
                                    value={updatedDetails.allPackage || selectedClient.allPackage}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, allPackage: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Own Contribution */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Own Contribution</label>
                                <input
                                    type="number"
                                    value={updatedDetails.ownContribution || selectedClient.ownContribution}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, ownContribution: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* GST */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">GST</label>
                                <input
                                    type="number"
                                    value={updatedDetails.gst || selectedClient.gst}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, gst: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>

                            {/* Stamp Duty Registration */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stamp Duty Registration</label>
                                <input
                                    type="number"
                                    value={updatedDetails.stampDutyRegistration || selectedClient.stampDutyRegistration}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, stampDutyRegistration: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>
                             {/* Infra charges*/}
                             <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Infra Charges</label>
                                <input
                                    type="number"
                                    value={updatedDetails.infra_Charges || selectedClient.infra_Charges}
                                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, infra_Charges: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-3 w-full rounded-lg shadow-sm text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit and Cancel buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleClosePopup}
                                className="bg-gray-400 text-white px-6 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-teal-600 text-white px-6 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPaymentPopup && selectedClient && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-6xl h-auto md:h-[600px] overflow-y-auto scroll-smooth">
                        <h2 className="text-2xl font-semibold text-teal-600 mb-6">
                            Payment Details of {selectedClient.clientName}

                        </h2>
                        <button
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                        >
                            Balance Amount      {new Intl.NumberFormat("en-IN").format(selectedClient.balanceAmount)} /-
                        </button>

                        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border border-black">
                            <thead>
                                <tr className="bg-teal-600 text-white">
                                    <th className="py-3 px-6 text-left border border-black">Sr. No</th>
                                    <th className="py-3 px-6 text-left border border-black">Amount</th>
                                    <th className="py-3 px-6 text-left border border-black">Payment Mode</th>
                                    <th className="py-3 px-6 text-left border border-black">Payment Date</th>
                                    <th className="py-3 px-6 text-left border border-black">Remarks</th>
                                    <th className="py-3 px-6 text-left border border-black">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentDetails.map((payment, index) => {
                                    const formattedDate = new Date(payment.payment_date).toLocaleDateString('en-GB'); // Formats to dd-mm-yyyy
                                    return (
                                        <tr key={payment.loan_Id} className="border-b border-black">
                                            <td className="py-3 px-6 text-left border border-black">{index + 1}</td>
                                            <td className="py-3 px-6 text-left border border-black">{new Intl.NumberFormat("en-IN").format(payment.amount)} /-</td>
                                            <td className="py-3 px-6 text-left border border-black">{payment.payment_mode}</td>
                                            <td className="py-3 px-6 text-left border border-black">{formattedDate}</td>
                                            <td className="py-3 px-6 text-left border border-black">{payment.added_by}</td>
                                            <td className="py-3 px-6 text-left border border-black">
                                                <button
                                                    onClick={() => handleAddPayment(index)}
                                                    className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Update Payment
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>

                        {/* Input Fields for Adding New Payment Details */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-teal-600 mb-4">Add New Payment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <input
                                    type="text"
                                    placeholder="Amount"
                                    value={newPayment.amount || ''}
                                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-2 rounded-lg text-sm"
                                />
                                <select
                                    value={newPayment.paymentMode || ''}
                                    onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-2 rounded-lg text-sm"
                                >
                                    <option value="">Select Mode</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Online">Online</option>
                                </select>
                                <input
                                    type="date"
                                    value={newPayment.paymentDate || ''}
                                    onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-2 rounded-lg text-sm"
                                />
                                <textarea
                                    type="text"
                                    placeholder="Remarks"
                                    value={newPayment.remarks || ''}
                                    onChange={(e) => setNewPayment({ ...newPayment, remarks: e.target.value })}
                                    className="border border-gray-300 focus:ring-teal-500 focus:border-teal-500 p-2 rounded-lg text-sm"
                                />
                                <button
                                    onClick={() => {
                                        handleSaveNewPaymentok();
                                        setCurrentId(selectedClient.client_id);
                                    }}

                                    className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Save Payment
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleClosePaymentPopup}
                                className="bg-gray-400 text-white px-6 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div >
    );
};

export default PaymentHome;
