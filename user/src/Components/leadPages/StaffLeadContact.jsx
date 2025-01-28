import React, { useEffect, useState } from "react";
import StaffNavBar from "../StaffNavBar";
import axiosinstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

function LeadContact() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRow, setActiveRow] = useState(null); // Tracks which row is active
  const [queryInputs, setQueryInputs] = useState("");
  const [visitDate, setVisitDate] = useState(""); // Store visit date input
  const [descriptions, setDescriptions] = useState({}); // Tracks descriptions for each user
  const [currentUser, setCurrentUser] = useState("Admin"); // Name of the person adding descriptions
  const [followUpBy, setFollowUpBy] = useState(""); // Follow-up person field
  const navigate = useNavigate();
  const [staffuser, setStaffuser] = useState("")



  // Static data for old descriptions
  const staticDescriptions = {
    1: [
      { text: "Contacted user via email.", addedBy: "Admin", visitDate: "2024-12-12" },
      { text: "Scheduled a visit for 12th Dec.", addedBy: "Admin", visitDate: "2024-12-12" }
    ],

  };

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setStaffuser(user.name)
      setFollowUpBy(user.name)
      // console.log("staffuser ==> ", staffuser)
      if (!token || !user || user.role !== "staff") {
        navigate("/staff");
      }
    }
    catch (error) {
      navigate("/staff");

    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosinstance.get("/api/property/getleads");
      //   console.log("Fetched Users:", response.data);
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

  const handleAddDescription = async (id) => {
    if (!queryInputs.trim()) return alert("Description cannot be empty.");
    // if (!visitDate.trim()) return alert("Please enter a visit date.");
    // if (!followUpBy.trim()) return alert("Please specify the follow-up person.");

    // Send the data to the API
    try {


      const newDescription = {
        lead_id: id,
        lead_description: queryInputs,
        expected_visit_date: visitDate,
        followup_by: followUpBy
      };

      // console.log("formData ==> ", newDescription)
      // Send the new description to the API
      const response = await axiosinstance.post("/api/property/addDescription", newDescription);
       //console.log("Description added successfully:", response.data);
      // console.error("Description added successfully:");
      // alert("Description added successfully:.");

      // Update state with the new description (local state update)
      setDescriptions((prev) => ({
        ...prev,
        [id]: [
          ...(prev[id] || staticDescriptions[id] || []),
          { text: queryInputs, addedBy: currentUser, visitDate: visitDate }
        ]
      }));
      fetchDescriptions(id);

      // Clear the input fields after submitting
      setQueryInputs("");
      setVisitDate("");
      // setFollowUpBy("");
    } catch (err) {
      console.error("Error adding description:", err);
      alert("Failed to add description. Please try again.");
    }
  };


  const fetchDescriptions = async (leadId) => {
    try {
      const response = await axiosinstance.get(`/api/property/getDescriptions/${leadId}`);
       //console.log("Fetched Descriptions:", response.data.data);
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
      const response = await axiosinstance.delete("/api/property/deleteLead", {
        data: { leadId: id },
      });

      // console.log("Lead deleted successfully:", response.data);

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
      <StaffNavBar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center text-purple-950 mb-4">Lead Details</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-s-lg">Name</th>
                <th scope="col" className="px-4 py-3">Email</th>
                <th scope="col" className="px-4 py-3">Phone No</th>
                <th scope="col" className="px-4 py-3">Subject</th>
                <th scope="col" className="px-4 py-3">Message</th>
                <th scope="col" className="px-4 py-3">Refer</th>
                {/* <th scope="col" className="px-4 py-3">Preferred Location</th> */}
                <th scope="col" className="px-4 py-3">Visit Date</th>
                <th scope="col" className="px-4 py-3">Budget</th>
                <th scope="col" className="px-4 py-3">Configuration</th>
                <th scope="col" className="px-4 py-3">Area</th>
                <th scope="col" className="px-4 py-3 rounded-e-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className="bg-purple-50 text-black">
                    <td className="px-4 py-2 font-medium">{user.fullName}</td>
                    <td className="px-4 py-2">{user.emailId}</td>
                    <td className="px-4 py-2 text-blue-600"> <a href={`tel:+91${user.contactNumber}`}>{user.contactNumber}</a></td>
                    <td className="px-4 py-2">{user.subject}</td>
                    <td className="px-4 py-2">{user.message}</td>
                    <td className="px-4 py-2">{user.Refer}</td>
                    {/* <td className="px-4 py-2">{user.preferredLocation}</td> */}
                    <td className="px-4 py-2">{user.visitDate}</td>
                    <td className="px-4 py-2">{user.budget}</td>
                    <td className="px-4 py-2">{user.configuration}</td>
                    <td className="px-4 py-2">{user.area}</td>
                    <td className="px-4 py-2">
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
                                <tr key={index}>
                                  <td className="px-4 py-2">{index + 1}</td>
                                  <td className="px-4 py-2">{desc.lead_description}</td>
                                  <td className="px-4 py-2">{(desc.expected_visit_date == "01/01/1970" ? "NA" : desc.expected_visit_date)}</td>
                                  <td className="px-4 py-2">{desc.followup_by}</td>
                                  <td className="px-4 py-2">{desc.created_at}</td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <div className="w-full sm:w-2/3">
                              <textarea
                                value={queryInputs}
                                onChange={(e) => setQueryInputs(e.target.value)}
                                placeholder="Write a new description"
                                rows={4}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                              />
                              <p className="text-black">Enter Expected visit date : </p>
                              <input
                                type="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                                placeholder="Select date"
                                className="w-40  sm:w-40 px-2 py-1 border border-gray-300 rounded-md mb-2"
                              />
                              <input
                                type="text"
                                value={staffuser}
                                // onChange={(e) => setFollowUpBy(e.target.value)}
                                placeholder="Enter follow-up person"
                                className="w-full sm:w-40 px-2 py-1 border border-gray-300 rounded-md mb-2"
                              />
                              <button
                                onClick={() => handleAddDescription(user.id)}
                                className="w-50 ml-4 sm:w-auto  px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                              >
                                Add New Description
                              </button>
                              <button
                                onClick={closeDescription}
                                className="w-40 sm:w-auto ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4 sm:mt-0 sm:ml-4"
                              >
                                Close
                              </button>
                            </div>
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
          className="rounded-md p-2 bg-purple-950 text-white fixed bottom-2 right-2"
          onClick={() => navigate("/staff/dashboard")}
        >
          <span className="material-symbols-outlined font-extrabold text-3xl">
            arrow_circle_left
          </span>
        </button>
      </div>
    </>
  );
}

export default LeadContact;
