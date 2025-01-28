// src/PopupForm.js
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import axios from "axios";
const PopupForm = ({ isOpen, onClose }) => {
  
  const isAlreadySubmit = localStorage.getItem("submit") === "true";
  if (isAlreadySubmit) {
      onClose();
    // setIsScratched(true); // Skip the scratch if already done
  }

  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    contactNumber: "",
    subject: "",
    message: "",
    Refer: "",
    preferredLocation: "",
    visitDate: "",
    budget: "",
    configuration: "",
    area: "",
  });

  const [errors, setErrors] = useState({
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (contactNumber) => {
    const phoneNumber = parsePhoneNumberFromString(contactNumber, "IN"); // 'IN' for India
    if (!phoneNumber || !phoneNumber.isValid()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: "Invalid contact number",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      contactNumber: "",
    }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("submit", "true");

    // Validate phone number before submitting
    if (!validatePhoneNumber(formData.contactNumber)) {
      alert("Please enter a valid contactNumber number.");
      return;
    }

    try {
      // window.location.reload();
      // Send the form data to the backend
      const response = await axios
        .post("api/property/leads", formData)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message); // Show success alert
            setFormData({
              // Reset the form data
              fullName: "",
              emailId: "",
              contactNumber: "",
              subject: "",
              message: "",
              Refer: "",
              preferredLocation: "",
              visitDate: "",
              budget: "",
              configuration: "",
              area: "",
            });
            onClose();
          } else {
            // If success is false, show an error alert
            alert("Error submitting the lead. Please try again.");
          }
        });
    } catch (error) {
      console.error("There was an error submitting the lead:", error);
      alert("Error submitting the lead. Please try again.");
    }
  };

  if (!isOpen) return null;

  const puneAreas = [
    "Shivaji Nagar",
    "Kothrud",
    "Baner",
    "Aundh",
    "Viman Nagar",
    "Koregaon Park",
    "Hadapsar",
    "Pimpri",
    "Chinchwad",
    "Wakad",
    "Kalyani Nagar",
    "Hinjewadi",
    "Bavdhan",
    "Pashan",
    "Kharadi",
    "Magarpatta",
    "Camp",
    "Deccan",
    "Pune University",
    "Yerwada",
    "Swargate",
    "Karve Nagar",
    "Dhanori",
    "Wanowrie",
    "Nigdi",
    "Tathawade",
    "Warje",
    "Lohegaon",
    "Sahakar Nagar",
    "Balewadi",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[650px] w-full">
        <div className="relative flex">
          <h2 className="text-2xl mb-4">Contact Us</h2>
          <button
            onClick={onClose}
            className="absolute top-1 right-4 text-2xl font-bold text-gray-600"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="  p-6 max-sm:overflow-y-scroll"
        >
          <div>
            <label className="block mb-2">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter Your Name"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block mb-2">
              Email ID:
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                placeholder="Enter Email-Address"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block mb-2">
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Your Number"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            {/* <label className="block mb-2">
              Subject:
              <input
                type="text"
                name="subject"
                value={formData.subject}
                placeholder="Enter Subject"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label> */}
            <label className="block mb-2">
              Message:
              <textarea
                name="message"
                value={formData.message}
                placeholder="Enter Your Message"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
          </div>
          <div>
            {/* <label className="block mb-2">
              Refer:
              <input
                type="text"
                name="Refer"
                value={formData.Refer}
                placeholder="Enter Reference"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Preferred Location:
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                placeholder="Enter Preferred Location"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Visit Date:
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Budget:
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Choose a Budget</option>
                <option value="below 50L">Below 50L</option>
                <option value="50L - 99L">50L - 99L</option>
                <option value="1Cr - 1.99Cr">1Cr - 1.99Cr</option>
                <option value="2Cr - 2.99Cr">2Cr - 2.99Cr</option>
                <option value="3Cr - 3.99Cr">3Cr - 3.99Cr</option>
                <option value="4Cr - 6Cr">4Cr - 6Cr</option>
                <option value="above 6Cr">Above 6Cr</option>
              </select>
            </label>
            <label className="block mb-2">
              Configuration:
              <select
                name="configuration"
                value={formData.configuration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Choose a Configuration</option>
                <option value="RK">RK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5 BHK">5 BHK</option>
                <option value="OFFICE">Office</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="OPEN SPACE">Open Space</option>
                <option value="GARAGE">Garage</option>
              </select>
            </label>
            <label className="block mb-2">
              Area:
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Select Area</option>
                {puneAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label> */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
