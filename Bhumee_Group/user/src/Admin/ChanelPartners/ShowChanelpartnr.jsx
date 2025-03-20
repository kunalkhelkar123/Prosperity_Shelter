import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowCPUsers = () => {
    const [cpUsers, setCPUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAddPaymentPopupOpen, setIsAddPaymentPopupOpen] = useState(false);
    const [totalamount, setTotalamount] = useState("");
    const [newPayment, setNewPayment] = useState({
        amount: "",
        date: "",
        payment_mode: "",
        description: "",
        propertyname: "",
        clientname: "",
    });
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState((currentDate.getMonth() + 1).toString());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

    const filteredPayments = selectedUser?.payments.filter(payment => {


        const paymentDate = new Date(payment.date);
        const paymentMonth = paymentDate.getMonth() + 1; // Months are 0-based
        const paymentYear = paymentDate.getFullYear();

        return (
            (!selectedMonth || paymentMonth === parseInt(selectedMonth)) &&
            (!selectedYear || paymentYear === parseInt(selectedYear))
        );
    });
    const filteredClients = cpUsers.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company_name.toLowerCase().includes(searchQuery.toLowerCase())



    );



    useEffect(() => {
        fetchCPUsers();
    }, []);

    const fetchCPUsers = async () => {
        try {
            const response = await axios.get("/api/client/getcpusers");
            if (response.data.success) {
                setCPUsers(response.data.cp_users);
            } else {
                setCPUsers([]);
                alert("Failed to fetch CP user data.");
            }
        } catch (error) {
            console.error("Error fetching CP user data:", error);
            alert("An error occurred while fetching CP user data.");
        } finally {
            setLoading(false);
        }
    };


    // const [totalamount,setTotalamount]=useState("")
    const openPopup = async (user) => {
        try {

            console.log("inside get payment details")
            const response = await axios.get(`/api/client/getcppaymentdetails/${user.id}`);
            if (response.data.success && response.status == 200) {
                const payments = response.data.payments || [];

                // Calculate total amount
                const totalPaid = payments.reduce((sum, payment) => sum + parseInt(payment.amount || 0, 10), 0);
                setTotalamount(totalPaid);
                setSelectedUser({ ...user, payments });
                setIsPopupOpen(true);
            } else if (response.data.success && response.status == 202) {
                alert("No Payment Details Found. For Selected User");
            }
            else {
                alert("Something went wrong. Please try again")
            }
        } catch (error) {
            console.error("Error fetching payment details:", error);
            alert("An error occurred while fetching payment details.");
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null);
    };

    const openAddPaymentPopup = () => {
        setIsAddPaymentPopupOpen(true);
    };

    const closeAddPaymentPopup = () => {
        setIsAddPaymentPopupOpen(false);
    };

    const handlePaymentChange = (e) => {
        setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
    };

    const submitNewPayment = async () => {
        if (!selectedUser) return;
        try {
            const response = await axios.post("/api/client/addcppayment", {
                cpid: selectedUser.id,
                ...newPayment,
            });

            if (response.data.success) {
                alert("Payment added successfully!");
                setIsAddPaymentPopupOpen(false);
                openPopup(selectedUser); // Refresh payment details
            } else {
                alert("Failed to add payment.");
            }
        } catch (error) {
            console.error("Error adding payment:", error);
            alert("An error occurred while adding payment.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">CP Users List</h1>

            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by CP Name, Client Name and CP Company Name..."
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border">SR. No</th>
                                <th className="px-6 py-3 border">Name</th>
                                <th className="px-6 py-3 border">Phone</th>
                                <th className="px-6 py-3 border">Address</th>
                                <th className="px-6 py-3 border">Company Name</th>
                                <th className="px-6 py-3 border">Payments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border">{index + 1}</td>
                                        <td className="px-6 py-4 border">{user.name}</td>
                                        <td className="px-6 py-4 border">{user.phone}</td>
                                        <td className="px-6 py-4 border">{user.address}</td>
                                        <td className="px-6 py-4 border">{user.company_name}</td>
                                        <td className="px-6 py-4 border">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => openPopup(user)}>
                                                View Payment
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

            {isPopupOpen && selectedUser && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex mt-10 justify-center items-center p-4 sm:p-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] ">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Payment Details of <span className="font-bold text-blue-600">{selectedUser.name}</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                            <button className="bg-orange-500 text-white px-6 py-4 rounded shadow  transition">
                                Total Amount Paid  <span className="font-bold">{totalamount}</span> /-
                            </button>
                            <select
                                className="border p-2 rounded w-full sm:w-auto"
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="">Select Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border p-2 rounded w-full sm:w-auto"
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option value="">{selectedYear || "Select Year"}</option>
                                {Array.from({ length: 20 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                            <button
                                onClick={openAddPaymentPopup}
                                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                            >
                                Add New Payment
                            </button>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-4">

                        </div>

                        <div className="max-h-[50vh] overflow-y-auto border rounded-md">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-gray-100 sticky top-0">
                                    <tr className="text-gray-700">
                                        <th className="px-4 py-2 border">Sr. No.</th>
                                        <th className="px-4 py-2 border">Amount</th>
                                        <th className="px-4 py-2 border">Date</th>
                                        <th className="px-4 py-2 border">Payment Mode</th>
                                        <th className="px-4 py-2 border">Description</th>
                                        <th className="px-4 py-2 border">Property Name</th>
                                        <th className="px-4 py-2 border">Client Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{payment.amount}</td>
                                            <td className="px-4 py-2 border">
                                                {new Intl.DateTimeFormat("en-GB").format(new Date(payment.date)).replace(/\//g, "-")}
                                            </td>
                                            <td className="px-4 py-2 border">{payment.payment_mode}</td>
                                            <td className="px-4 py-2 border truncate max-w-[120px]" title={payment.description}>
                                                {payment.description}
                                            </td>
                                            <td className="px-4 py-2 border truncate max-w-[120px]" title={payment.propertyname}>
                                                {payment.propertyname}
                                            </td>
                                            <td className="px-4 py-2 border">{payment.clientname}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
                                onClick={closePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {isAddPaymentPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-center">Add New Payment</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="amount"
                                placeholder="Amount"
                                className="border p-2 w-full rounded"
                                onChange={handlePaymentChange}
                            />

                            <input
                                name="date"
                                type="date"
                                className="border p-2 w-full rounded"
                                onChange={handlePaymentChange}
                            />

                            {/* Dropdown for Payment Mode */}
                            <select
                                name="payment_mode"
                                className="border p-2 w-full rounded bg-white"
                                onChange={handlePaymentChange}
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                            </select>

                            <input
                                name="propertyname"
                                placeholder="Property Name"
                                className="border p-2 w-full rounded"
                                onChange={handlePaymentChange}
                            />
                            <input
                                name="clientname"
                                placeholder="Client Name"
                                className="border p-2 w-full rounded"
                                onChange={handlePaymentChange}
                            />
                        </div>

                        <textarea
                            name="description"
                            placeholder="Description"
                            className="border p-2 w-full rounded resize-none mt-4"
                            rows="3"
                            onChange={handlePaymentChange}
                        ></textarea>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={submitNewPayment}
                            >
                                Submit
                            </button>
                            <button
                                className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                onClick={closeAddPaymentPopup}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default ShowCPUsers;
