/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axiosinstance from "../../../axiosConfig";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteProperty({ propertyId, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state to handle UI during the delete operation

  const handleDelete = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call
      console.log("PROPERTY ID ==> ", propertyId);

      // Make sure the propertyId is valid
      if (!propertyId) {
        toast.error("Invalid property ID");
        setLoading(false);
        return;
      }

      const response = await axiosinstance.delete(`/api/property/deletepropertyDetails/${propertyId}`);
      console.log("Response from delete property:", response);

      if (response.status == "200") {
        toast.success("Property deleted successfully");
        onDelete(propertyId); // Trigger the parent component's callback
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("Error deleting property");
      console.error("Error deleting property:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
      setShowConfirmation(false); // Close the confirmation dialog
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        className="text-red-500"
        onClick={() => setShowConfirmation(true)}
        disabled={loading} // Disable button when loading
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p className="text-m text-red-600 font-semibold">
            Are you sure you want to delete this property?
          </p>
          <button
            onClick={handleDelete}
            className="m-2 p-2 bg-green-500 text-white rounded-md font-semibold text-lg"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="m-2 p-2 bg-red-500 text-white rounded-md font-semibold text-lg"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
