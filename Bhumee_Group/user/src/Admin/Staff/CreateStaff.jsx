import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

function AddStaff({ onClose }) {
  const [staffDetails, setStaffDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    status: "true", // Default status
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));

      console.log("admin ==> ", admin)
      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    }
    catch (error) {
      navigate("/admin");

    }
  }, [navigate]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log("staffDetails   ", staffDetails)
      const response = await axios.post("/api/property/createStaff", staffDetails);
      if (response.data.success) {
        alert("Staff member added successfully");

        setStaffDetails({
          name: "",
          phone: "",
          email: "",
          password: "",
          status: "active", // Default status
        });
        // onClose(); // Close the modal or go back to the previous page
      } else {
        alert("Failed to add staff member: " + response.data.message);
      }
    } catch (err) {
      console.error("Error adding staff member:", err);
      alert("An error occurred while adding the staff member.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border min-h-screen sm:w-full w-screen mx-auto">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Staff</h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={staffDetails.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
      <input
        type="text"
        name="phone"
        id="phone"
        value={staffDetails.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={staffDetails.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>

    <div className="space-y-2 relative">
      <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        value={staffDetails.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-8 right-4 text-sm text-gray-600 hover:text-teal-600"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>

    <div className="space-y-2">
      <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
      <select
        name="status"
        id="status"
        value={staffDetails.status}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
  </form>

  <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
    <button
      type="button"
      onClick={onClose}
      className="w-full sm:w-auto px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
    >
      Cancel
    </button>
    <button
       onClick={handleSubmit}
      type="submit"
      className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-800"
    >
      Add Staff
    </button>
  </div>
</div>

  );
}

export default AddStaff;
