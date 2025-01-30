import React, { useEffect, useState } from "react";
import StaffNavBar from "../StaffNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LeadContact() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [descriptions, setDescriptions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 20;
  const navigate = useNavigate();
  const [staffuser, setStaffuser] = useState("");

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setStaffuser(user.name);
      if (!token || !user || user.role !== "staff") {
        navigate("/staff");
      }
    } catch (error) {
      navigate("/staff");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/property/getleads");
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

  const toggleRow = (id) => {
    if (activeRow === id) {
      setActiveRow(null);
    } else {
      setActiveRow(id);
      fetchDescriptions(id);
    }
  };

  const fetchDescriptions = async (leadId) => {
    try {
      const response = await axios.get(`/api/property/getDescriptions/${leadId}`);
      setDescriptions((prev) => ({
        ...prev,
        [leadId]: response.data.data,
      }));
    } catch (err) {
      console.error("Error fetching descriptions:", err);
      alert("Failed to fetch descriptions. Please try again.");
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete("/api/property/deleteLead", { data: { leadId: id } });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("Lead deleted successfully.");
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }
  if (!users || users.length === 0) {
    return <div>No users available.</div>;
  }

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredUsers.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <StaffNavBar />
      <div className="container max-w-full px-4 py-6 bg-slate-300 ">
        <h1 className="text-4xl font-bold text-center text-purple-950  mb-4">Lead Details</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
        </div>

        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto text-left text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr className="border-2 border-gray-300">
                  <th className="px-4 py-3 border-2 border-gray-300">Sr</th>
                  <th className="px-4 py-3 border-2 border-gray-300">Name</th>
                  <th className="px-4 py-3 border-2 border-gray-300">Email</th>
                  <th className="px-4 py-3 border-2 border-gray-300">Phone No</th>
                  <th className="px-4 py-3 border-2 border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((user, index) => (
                  <tr key={user.id} className="bg-purple-50 text-black border-2 border-gray-300">
                    <td className="px-4 py-2 border-2 border-gray-300">{indexOfFirstLead + index + 1}</td>
                    <td className="px-4 py-2 border-2 border-gray-300 font-medium">{user.fullName}</td>
                    <td className="px-4 py-2 border-2 border-gray-300">{user.emailId}</td>
                    <td className="px-4 py-2 border-2 border-gray-300 text-blue-600">
                      <a href={`tel:+91${user.contactNumber}`}>{user.contactNumber}</a>
                    </td>
                    <td className="px-4 py-2 border-2 border-gray-300">
                      <button
                        onClick={() => toggleRow(user.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Follow-up
                      </button>
                      <button
                        onClick={() => handleDeleteLead(user.id)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          {[...Array(Math.ceil(filteredUsers.length / leadsPerPage)).keys()].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`mx-1 px-3 py-1 ${currentPage === num + 1 ? "bg-blue-600 text-white" : "bg-gray-200"} rounded-md`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>

      <button
        className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
        onClick={() => navigate("/staff/dashboard")}
      >
        <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
      </button>
    </>
  );
}

export default LeadContact;
