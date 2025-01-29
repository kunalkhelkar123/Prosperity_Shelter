
import React, { useEffect, useState } from "react";

import NavBar from "../NavBar";
// import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LeadContact() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRow, setActiveRow] = useState(null); // Tracks which row is active
  const [descriptions, setDescriptions] = useState({}); // Tracks descriptions for each user

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));

     //  console.log("admin ==> ", admin)
      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    }
    catch (error) {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchDescriptions = async (leadId) => {
    try {
      const response = await axios.get(`/api/property/getDescriptions/${leadId}`);
      // console.log("Fetched Descriptions:", response.data.data);
      setDescriptions((prev) => ({
        ...prev,
        [leadId]: response.data.data,
      }));
    } catch (err) {
      console.error("Error fetching descriptions:", err);
      alert("Failed to fetch descriptions. Please try again.");
    }
  };

  const toggleRow = (id) => {
    if (activeRow === id) {
      setActiveRow(null); // Close the row
    } else {
      setActiveRow(id); // Open the row
      fetchDescriptions(id); // Fetch descriptions for this user
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const response = await axios.delete("/api/property/deleteLead", {
        data: { leadId: id },
      });

     //  console.log("Lead deleted successfully:", response.data);

      // Update the state to remove the deleted lead
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      alert("Lead deleted successfully.");
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const closeDescription = () => {
    setActiveRow(null); // Close the "Show Actions" component
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/property/getleads");
         //console.log("Fetched Users:", response.data);
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <>
    <NavBar />
  
    <div className="container mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center my-4 text-purple-950">
        Lead Details
      </h1>
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Phone No</th>
              <th scope="col" className="px-4 py-3">Subject</th>
              <th scope="col" className="px-4 py-3">Message</th>
              <th scope="col" className="px-4 py-3">Refer</th>
              <th scope="col" className="px-4 py-3">Visit Date</th>
              <th scope="col" className="px-4 py-3">Budget</th>
              <th scope="col" className="px-4 py-3">Configuration</th>
              <th scope="col" className="px-4 py-3">Area</th>
              <th scope="col" className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr className="bg-purple-50 text-black hover:bg-purple-100">
                  <td className="px-4 py-2 font-medium">{user.fullName}</td>
                  <td className="px-4 py-2">{user.emailId}</td>
                  <td className="px-4 py-2 text-blue-600">
                    <a href={`tel:+91${user.contactNumber}`}>{user.contactNumber}</a>
                  </td>
                  <td className="px-4 py-2">{user.subject}</td>
                  <td className="px-4 py-2">{user.message}</td>
                  <td className="px-4 py-2">{user.Refer}</td>
                  <td className="px-4 py-2">{user.visitDate}</td>
                  <td className="px-4 py-2">{user.budget}</td>
                  <td className="px-4 py-2">{user.configuration}</td>
                  <td className="px-4 py-2">{user.area}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleRow(user.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Follow-up
                    </button>
                    <button
                      onClick={() => handleDeleteLead(user.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
  
                {activeRow === user.id && (
                  <tr>
                    <td colSpan="12" className="px-4 py-2">
                      <div className="bg-gray-100 p-4 border rounded-md">
                        <h3 className="font-bold text-lg mb-2">Old Descriptions:</h3>
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                              <th className="px-4 py-2">Sr. No.</th>
                              <th className="px-4 py-2">Description</th>
                              <th className="px-4 py-2">Expected Visit Date</th>
                              <th className="px-4 py-2">Followup By</th>
                              <th className="px-4 py-2">Followup Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(descriptions[user.id] || []).map((desc, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{desc.lead_description}</td>
                                <td className="px-4 py-2">
                                  {desc.expected_visit_date === "01/01/1970" ? "NA" : desc.expected_visit_date}
                                </td>
                                <td className="px-4 py-2">{desc.followup_by}</td>
                                <td className="px-4 py-2">{desc.created_at}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={closeDescription}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
        onClick={() => navigate("/admin/dashboard")}
      >
        <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
      </button>
    </div>
  </>
  
  
  );
}

export default LeadContact;
