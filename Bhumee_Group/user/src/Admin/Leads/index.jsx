import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const [users, setUsers] = useState([]);
  const [staffnames, setStaffnames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRow, setActiveRow] = useState(null); // Tracks which row is active
  const [descriptions, setDescriptions] = useState({}); // Tracks descriptions for each user
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Display only 20 leads per page
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
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("No leads data found. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    const fetchStaff = async () => {
      try {
        const response = await axios.get("/api/property/getstaff");
        console.log("staff names ==> ", response.data.data)
        setStaffnames(response.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("No leads data found. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);


  // Filter leads based on search term
  const filteredLeads = (users || []).filter((user) => {
    const areaWords = user.area.toLowerCase().split(" ");
    const searchWords = searchTerm.toLowerCase().split(" ");
    return searchWords.every((word, index) => areaWords[index] && areaWords[index].startsWith(word));
  });



  const handleAssignChange = async (leadId, newAssigned) => {
    try {
      const response = await axios.put("/api/property/updateAssigned", {
        leadId,
        assigned: newAssigned,
      });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === leadId ? { ...user, assigned: newAssigned } : user
          )
        );
        alert("Lead Assigned updated successfully!");
      }
    } catch (error) {
      console.error("Error updating assigned staff:", error);
      alert("Failed to update assigned staff. Please try again.");
    }
  };
  // Pagination Logic
  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl md:text-4xl font-bold text-center my-4 text-purple-950">
          Lead Details
        </h1>





        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by Area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>



        <div className="relative overflow-x-auto max-w-full">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-lg text-red-500 font-semibold">
              {error}
            </div>
          )}
          {!loading && !error && (
            <>
              <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-400 border border-gray-300 shadow-md rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-3">Sr. No</th>
                    <th scope="col" className="px-4 py-3">Name</th>
                    <th scope="col" className="px-4 py-3">Budget</th>
                    <th scope="col" className="px-4 py-3">Phone No</th>
                    <th scope="col" className="px-4 py-3">Area</th>
                    <th scope="col" className="px-4 py-3">Assigned</th>
                    <th scope="col" className="px-4 py-3">Update Assigned</th>
                    <th scope="col" className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="px-4 py-3">{indexOfFirstLead + index + 1}</td>
                        <td className="px-4 py-3">{user.fullName}</td>
                        <td className="px-4 py-3">{user.budget}</td>
                        <td className="px-4 py-3 text-blue-600">
                          <a href={`tel:+91${user.contactNumber}`}>{user.contactNumber}</a>
                        </td>
                        <td className="px-4 py-3">{user.area}</td>
                        <td className="px-4 py-3 font-semibold">{user.assigned || "Not Assigned"}</td>
                        {/* New Column - Update Assigned */}
                        <td className="px-4 py-3">
                          <select
                            value={user.assigned === "NOT ASSIGNED" ? "NOT ASSIGNED" : user.assigned}
                            onChange={(e) => handleAssignChange(user.id, e.target.value)}
                            className="px-2 py-1 border rounded-md bg-white"
                          >
                            {/* Ensure "NOT ASSIGNED" is always an option */}
                            <option value="NOT ASSIGNED">NOT ASSIGNED</option>

                            {/* Populate staff names */}
                            {staffnames.map((person) => (
                              <option key={person.id} value={person.name}>
                                {person.name}
                              </option>
                            ))}
                          </select>
                        </td>



                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => toggleRow(user.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                          >
                            Follow-up
                          </button>
                          <button
                            onClick={() => handleDeleteLead(user.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                      {activeRow === user.id && (
                        <tr>
                          <td colSpan="12" className="px-4 py-2">
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                              <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-2">Old Descriptions:</h3>
                              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-300">
                                  <tr>
                                    <th className="px-4 py-2">Sr. No.</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2">Expected Visit Date</th>
                                    <th className="px-4 py-2">Follow-up By</th>
                                    <th className="px-4 py-2">Follow-up Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(descriptions[user.id] || []).map((desc, index) => (
                                    <tr key={index} className="border-b dark:border-gray-600">
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


              <div className="flex justify-center mt-4">


                <div className="flex justify-center mt-4 space-x-2">
                  {[...Array(Math.ceil(filteredLeads.length / itemsPerPage)).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`px-4 py-2 border rounded-md ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>

              </div>
            </>
          )}
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

export default Home;
