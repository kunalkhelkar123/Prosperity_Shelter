import axios from "axios";
import React, { useState } from "react";
// import axios from "../../../axiosConfig";

const AddClient = () => {
    const [clientData, setClientData] = useState({
        clientName: "",
        address: "",
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

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Log the client data for debugging purposes
            // console.log("Sending clientData:", clientData);

            // Make a POST request to the backend API
            const response = await axios.post("/api/client/addclient", { ...clientData });

            if (response.data.success) {
                alert("Client added successfully");

                // Reset the form to its initial state
                setClientData({
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

                // Optional: Close modal or redirect
                // onClose(); 
            } else {
                // Handle the failure case
                alert("Failed to add Client : " + response.data.message);
            }
        } catch (err) {
            // Handle errors that occurred during the API request
            console.error("Error adding staff member:", err);
            alert("An error occurred while adding the staff member.");
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Client Data Submitted: ", clientData);
    //     alert("Client Added Successfully!");
    //     setClientData({
    //         clientName: "",
    //         address: "",
    //         city: "",
    //         district: "",
    //         taluka: "",
    //         pincode: "",
    //         age: "",
    //         occupation: "",
    //         bookingDate: "",
    //         dateOfBirth: "",
    //         anniversaryDate: "",
    //         parentProperty: "",
    //         propertyName: "",
    //         propertyDescription: "",
    //         totalPrice: "",
    //         advancePaid: "",
    //         paymentMode: "",
    //         remainingAmount: "",
    //         sansaction: "",
    //         mobileNumber: "",
    //         email: "",
    //         aadharCard: "",
    //         pancardNumber: "",
    //         coApplicantName: "",
    //         coApplicantMobile: "",
    //         coApplicantEmail: "",
    //         coApplicantAadharCard: "",
    //         coApplicantPancardNumber: "",
    //         coApplicantAddress: "",
    //     });
    // };

    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-teal-600 mb-6">Add New Client</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Client Name */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={clientData.clientName}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={clientData.address}
                            onChange={handleChange}
                            rows={1}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={clientData.mobileNumber}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={clientData.email}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Aadhar Card Number */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Aadhar Card Number</label>
                        <input
                            type="text"
                            name="aadharCard"
                            value={clientData.aadharCard}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Pancard Number */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Pancard Number</label>
                        <input
                            type="text"
                            name="pancardNumber"
                            value={clientData.pancardNumber}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* District */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">District</label>
                        <input
                            type="text"
                            name="district"
                            value={clientData.district}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Taluka */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Taluka</label>
                        <input
                            type="text"
                            name="taluka"
                            value={clientData.taluka}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Pincode/Zipcode */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Pincode/Zipcode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={clientData.pincode}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Age */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={clientData.age}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Occupation/Business */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Occupation/Business</label>
                        <input
                            type="text"
                            name="occupation"
                            value={clientData.occupation}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Date of Booking */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Date of Booking</label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={clientData.bookingDate}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={clientData.dateOfBirth}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Anniversary Date */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Anniversary Date</label>
                        <input
                            type="date"
                            name="anniversaryDate"
                            value={clientData.anniversaryDate}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Parent Property */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Parent Property</label>
                        <input
                            type="text"
                            name="parentProperty"
                            value={clientData.parentProperty}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Property Name */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Property Name</label>
                        <input
                            type="text"
                            name="propertyName"
                            value={clientData.propertyName}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Property Description */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Property Description</label>
                        <textarea
                            name="propertyDescription"
                            value={clientData.propertyDescription}
                            onChange={handleChange}
                            rows={2}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Total Price</label>
                        <input
                            type="number"
                            name="totalPrice"
                            value={clientData.totalPrice}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Advance Paid */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Advance Paid</label>
                        <input
                            type="number"
                            name="advancePaid"
                            value={clientData.advancePaid}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Payment Mode */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Payment Mode</label>
                        <input
                            type="text"
                            name="paymentMode"
                            value={clientData.paymentMode}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Remaining Amount */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Remaining Amount</label>
                        <input
                            type="number"
                            name="remainingAmount"
                            value={clientData.remainingAmount}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>



                    {/* Sansaction */}
                    <div className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1">Sansaction</label>
                        <input
                            type="text"
                            name="sansaction"
                            value={clientData.sansaction}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Co-Applicant Section */}
                    <div className="col-span-2 lg:col-span-4">
                        <h1 className="text-2xl font-bold text-teal-600 mb-6">Co-Applicant Details</h1>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Co-Applicant Name */}
                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Name</label>
                                <input
                                    type="text"
                                    name="coApplicantName"
                                    value={clientData.coApplicantName}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Co-Applicant Mobile */}
                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Mobile</label>
                                <input
                                    type="text"
                                    name="coApplicantMobile"
                                    value={clientData.coApplicantMobile}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Co-Applicant Email */}
                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Email</label>
                                <input
                                    type="email"
                                    name="coApplicantEmail"
                                    value={clientData.coApplicantEmail}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Co-Applicant Aadhar Card */}
                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Aadhar Number</label>
                                <input
                                    type="text"
                                    name="coApplicantAadharCard"
                                    value={clientData.coApplicantAadharCard}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Co-Applicant Pancard Number */}
                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Pancard Number</label>
                                <input
                                    type="text"
                                    name="coApplicantPancardNumber"
                                    value={clientData.coApplicantPancardNumber}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Co-Applicant Address */}
                            {/* <div className="flex flex-col col-span-2">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Address</label>
                                <input
                                    name="coApplicantAddress"
                                    value={clientData.coApplicantAddress}
                                    onChange={handleChange}
                                    rows={1}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div> */}



                            <div className="flex flex-col">
                                <label className="block font-medium text-gray-700 mb-1">Co-Applicant Address</label>
                                <input
                                    type="text"
                                    name="coApplicantAddress"
                                    value={clientData.coApplicantAddress}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
                >
                    Add Client
                </button>
            </form>
        </div>
    );
};

export default AddClient;
