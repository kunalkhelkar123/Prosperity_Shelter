import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons
import axiosinstance from '../../../axiosConfig';
import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom";


const EventManagement = () => {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [activeTab, setActiveTab] = useState('birthday');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const navigate = useNavigate();
    const [birthdayMessage, setBirthdayMessage] = useState(
        `On behalf of Homi Grow Properties , we extend our warmest wishes on your special day. 
May this birthday bring you joy, good health, and success in all your endeavors.

Thank you for your continued trust and association with us. 
We truly value our partnership and look forward to many more years of working together.

Enjoy your day to the fullest!`
    );
    const [anniversaryMessage, setAnniversaryMessage] = useState(
        `On behalf of Homi Grow Properties, we wish you a wonderful and joyous anniversary. May this special occasion bring happiness, prosperity, and continued success in both your personal and professional endeavors.

We deeply value the trust and partnership you’ve shown us over the years, and we look forward to many more years of collaboration and growth.

Enjoy your celebration and here's to many more successful years together!`
    );

    const [message, setMessage] = useState(birthdayMessage); // Set initial message to birthday message

    // Fetch clients from the server
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosinstance.get('api/client/getclientsdate');
                if (response.data.success) {
                    setClients(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    // Filter clients based on the active tab (birthdays or anniversaries)
    useEffect(() => {
        const filterClients = () => {
            const today = new Date().toISOString().slice(5, 10); // Format MM-DD
            if (activeTab === 'birthday') {
                setFilteredClients(clients.filter(client => client.dateOfBirth?.slice(5, 10) === today));
                setMessage(birthdayMessage); // Set message to birthday message when tab is 'birthday'
            } else if (activeTab === 'anniversary') {
                setFilteredClients(clients.filter(client => client.anniversaryDate?.slice(5, 10) === today));
                setMessage(anniversaryMessage); // Set message to anniversary message when tab is 'anniversary'
            }
        };

        filterClients();
    }, [activeTab, clients, birthdayMessage, anniversaryMessage]);

    // Handler to open the popup with client details
    const handleActionClick = (client) => {
        setSelectedClient(client);
        setShowPopup(true);
    };

    // Handler to send the updated data and message to the backend
    const handleSendMessage = async () => {
        if (!message) {
            alert('Please write a message before sending.');
            return;
        }
        try {
            const response = await axiosinstance.post('api/client/sendWish', {
                clientName: selectedClient.clientName,
                email: selectedClient.email,
                mobileNumber: selectedClient.mobileNumber,
                message,
                eventType: activeTab,
            });
            if (response.data.success) {
                alert('Message and updates sent successfully!');
                setShowPopup(false);
                setMessage(''); // Reset the message after sending
            } else {
                alert('Failed to send the updates.');
            }
        } catch (error) {
            console.error('Error sending updates:', error);
            alert('An error occurred while sending the updates.');
        }
    };

    // Handler to update editable fields in the popup
    const handleInputChange = (field, value) => {
        setSelectedClient((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // WhatsApp message link
    const generateWhatsappLink = () => {
        const phoneNumber = selectedClient.mobileNumber; // Assuming mobileNumber is in international format
        const encodedMessage = encodeURIComponent(message); // Encode message to fit in URL
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    };

    return (
        <> <NavBar />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

                {/* Left Sidebar */}
                <div className="w-full md:w-1/6 bg-gray-800 text-white p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 text-center md:text-left">Event Management</h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                className={`w-full text-left text-white py-2 px-4 rounded-md ${activeTab === 'birthday' ? 'bg-teal-600' : 'bg-gray-700'}`}
                                onClick={() => setActiveTab('birthday')}
                            >
                                Birthdays
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left text-white py-2 px-4 rounded-md ${activeTab === 'anniversary' ? 'bg-teal-600' : 'bg-gray-700'}`}
                                onClick={() => setActiveTab('anniversary')}
                            >
                                Anniversaries
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4 p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
                        {activeTab === 'birthday' ? "Today's Birthdays" : "Today's Anniversaries"}
                    </h2>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="table-auto w-full border-collapse bg-white rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="px-4 py-2">Sr. No</th>

                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Mobile</th>
                                    <th className="px-4 py-2">
                                        {activeTab === 'birthday' ? 'Date of Birth' : 'Anniversary Date'}
                                    </th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.length > 0 ? (
                                    filteredClients.map((client, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{client.clientName}</td>
                                            <td className="border px-4 py-2">{client.email}</td>
                                            <td className="border px-4 py-2">{client.mobileNumber}</td>
                                            <td className="border px-4 py-2">
                                                {activeTab === 'birthday' ? client.dateOfBirth : client.anniversaryDate}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                                                    onClick={() => handleActionClick(client)}
                                                >
                                                    Action
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popup Modal */}
                {showPopup && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-md w-full md:w-1/3 max-w-lg">
                            <h3 className="text-xl font-bold mb-4 text-center">Edit Client Details</h3>
                            <label className="block mb-2">
                                <strong>Name:</strong> {selectedClient.clientName}
                            </label>
                            <label className="block mb-2">
                                <strong>Email:</strong>
                                <input
                                    className="w-full border p-2 rounded-md"
                                    value={selectedClient.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </label>
                            <label className="block mb-2">
                                <strong>Mobile:</strong>
                                <input
                                    className="w-full border p-2 rounded-md"
                                    value={selectedClient.mobileNumber}
                                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                />
                            </label>
                            <label className="block mb-2">
                                <strong>Message:</strong>
                                <textarea
                                    className="w-full border p-2 rounded-md"
                                    rows="6"
                                    placeholder="Write your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </label>
                            <div className="flex justify-between items-center mt-4">
                                <a
                                    href={generateWhatsappLink()} // WhatsApp link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600"
                                >
                                    <FaWhatsapp className="mr-2" />
                                    Send via WhatsApp
                                </a>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        onClick={() => setShowPopup(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        onClick={handleSendMessage}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                >
                    <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
                </button>
            </div>
        </>
    );
};

export default EventManagement;
