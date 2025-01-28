/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import office from "../Investment/office.jpg";

const EnquireNowForm = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { propertyID, propertyTitle } = location.state || {};
  console.log(propertyID, propertyTitle);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    propertyID: propertyID,
    propertyTitle: propertyTitle,
    budget: "",
    preferredLocation: "",
    propertyType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/property/addenquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        // console.log("Server Response:", result);

        setFormData({
          name: "",
          email: "",
          mobile: "",
          propertyID: propertyID,
          propertyTitle: propertyTitle,
          budget: "",
          preferredLocation: "",
          propertyType: "",
          message: "",
        });
      } else {
        console.error("Submission failed:", result);
        alert(result.message || "Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Looking for Property?
      </h1>

      <img
        src={office}
        alt="Office"
        className="h-60 w-full object-cover rounded-md mb-6"
      />

      <p className="text-gray-800 mb-4 text-center">
        You are enquiring about: <strong>{propertyTitle || propertyID}</strong>
      </p>

      <p className="text-gray-600 mb-6 text-center">
        HomiGrow provides you with the best real estate options. Whether you
        are looking for a flat, house, land, or commercial property, we've got
        you covered.
      </p>

      <form onSubmit={submitHandler}>
        <label htmlFor="name" className="block text-gray-600 mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        />

        <label htmlFor="email" className="block text-gray-600 mb-2">
          Your Email:
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        />

        <label htmlFor="mobile" className="block text-gray-600 mb-2">
          Your Mobile Number:
        </label>
        <input
          type="text"
          id="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        />

        <label htmlFor="budget" className="block text-gray-600 mb-2">
          Your Budget:
        </label>
        <input
          type="text"
          id="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="E.g., 50 Lakhs - 1 Crore"
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        />

        <label htmlFor="preferredLocation" className="block text-gray-600 mb-2">
          Preferred Location:
        </label>
        <input
          type="text"
          id="preferredLocation"
          value={formData.preferredLocation}
          onChange={handleInputChange}
          placeholder="E.g., Mumbai, Pune, Bangalore"
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        />

        <label htmlFor="propertyType" className="block text-gray-600 mb-2">
          Property Type:
        </label>
        <select
          id="propertyType"
          value={formData.propertyType}
          onChange={handleInputChange}
          className="w-full h-10 border rounded-md mb-4 px-3 focus:outline-none focus:ring-2 focus:ring-[#390255]"
          required
        >
          <option value="" disabled>
            Select a Property Type
          </option>
          <option value="Flat">Flat</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
        </select>

        <label htmlFor="message" className="block text-gray-600 mb-2">
          Additional Information:
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Provide any additional details or requirements"
          className="w-full h-24 border rounded-md mb-6 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#390255]"
        />

        <button
          type="submit"
          className="bg-[#FFF848] hover:bg-[#390255] hover:border-[#390255] hover:text-white text-black h-12 w-full rounded-md mb-2 font-bold transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EnquireNowForm;
