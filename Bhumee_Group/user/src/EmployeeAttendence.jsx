import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeAttendance = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Work IN");
  const [location, setLocation] = useState({ latitude: "", longitude: "", address: "" });

  // Function to fetch the human-readable address
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (response.data && response.data.display_name) {
        setLocation((prev) => ({
          ...prev,
          address: response.data.display_name,
        }));
      } else {
        setLocation((prev) => ({ ...prev, address: "Address not found" }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocation((prev) => ({ ...prev, address: "Error retrieving address" }));
    }
  };

  // Fetch user's live location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({ latitude, longitude, address: "Fetching address..." });

          // Call function to get the human-readable address
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !status || !location.address) {
      alert("Please enter all details and enable location access.");
      return;
    }

    const attendanceData = {
      name,
      status,
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/attendance", attendanceData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to mark attendance.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Mark Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Status</label>
            <select
              className="w-full border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Work IN">Work IN</option>
              <option value="Work OUT">Work OUT</option>
              <option value="Leave">Leave</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Location</label>
            {location.address ? (
              <p>{location.address}</p>
            ) : (
              <p className="text-red-500">Fetching address...</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
    