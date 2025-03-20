import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateChannelPartner({ onClose }) {
  const [channelPartnerDetails, setChannelPartnerDetails] = useState({
    name: "",
    address: "",
    // client_name: "",
    company_name: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));

      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    } catch (error) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelPartnerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/client/createChannelPartner", channelPartnerDetails);
      if (response.data.success) {
        alert("Channel Partner added successfully");
        setChannelPartnerDetails({
          name: "",
          address: "",
        //   client_name: "",
          company_name: "",
          phone: "",
        });
      } else {
        alert("Failed to add Channel Partner: " + response.data.message);
      }
    } catch (err) {
      console.error("Error adding Channel Partner:", err);
      alert("An error occurred while adding the Channel Partner.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border w-full sm:w-96 mx-auto mt-20" style={{ width: "440px" }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Channel Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(channelPartnerDetails).map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-600">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={channelPartnerDetails[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-800"
          >
            Create Channel Partner
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChannelPartner;
