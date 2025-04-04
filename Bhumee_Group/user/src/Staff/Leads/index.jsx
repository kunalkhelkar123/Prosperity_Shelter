import React, { useEffect, useState } from "react";
import StaffNavBar from "../Navbar/index";
// import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"

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
  const [staffuser, setStaffuser] = useState("")  // staff user name 
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null); // Current lead to edit


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(200); // Display only 20 leads per page
  // Static data for old descriptions
  const staticDescriptions = {
    1: [
      { text: "Contacted user via email.", addedBy: "Admin", visitDate: "2024-12-12" },
      { text: "Scheduled a visit for 12th Dec.", addedBy: "Admin", visitDate: "2024-12-12" }
    ],

  };

  const puneAreas = [
    "Agarkar Nagar", "Akurdi", "Alandi", "Alandi Road", "Alephata", "Ambarwet", "Ambavane", "Ambegaon", "Ambegaon Budruk",
    "Ambegaon Khurd", "Amboli", "Aundh", "Aundh Road", "Awhalwadi", "Ashtapur", "Alandi-Markal Road", "Alephata", "Ambavane", "Ambegaon Khurd", "Ashtapur", "Bakori", "Balaji Nagar", "Balewadi", "Baner",
    "Baner Bypass Highway", "Baner-Pashan Link Road", "Baramati", "Bavdhan", "Bavdhan Khurd", "Bahul", "Bawada", "Bhekrai Nagar", "Bharti Vidyapith", "Bharti Hospital",
    "Bhaginghar", "Bhugaon", "Bhusari Colony", "Bhosale Nagar", "Bhosari", "Bhoirwadi", "Bhilarewadi", "Bibwewadi", "Bope",
    "Bopgaon", "Bopkhel", "Bopodi", "Boripardhi", "BT Kawade Road", "Budhwar Peth", "Bund Garden Road", "Camp", "Central Panchgani",
    "Chakan", "Chandani Chowk", "Chandan Nagar", "Chande", "Chikhali", "Chimbali", "Chinchwad", "Charholi Budruk", "Charholi Khurd",
    "Church Road", "Dange Chowk", "Dapodi", "Dattavadi", "Daund", "Deccan", "Deccan Gymkhana", "Dehu", "Dehu Road", "Dhanori",
    "Dhangarwadi", "Dhankawdi", "Dhayari", "Dighi", "Dive", "Donaje", "Dhole Patil Road", "East Khadki", "Empress Gardens", "Erandwane", "Factory Road",
    "FC Road", "Fatima Nagar", "Fursungi", "Ganesh Nagar", "Ganesh Peth", "Ganesh Road", "Ganeshkhind", "Ganga Dham", "Gavhane Vasti",
    "Ghorpadi", "Ghotawade", "Gokhale Nagar", "Gokhale Road", "Gudhe", "Gultekdi", "Guru Nanak Nagar", "Guruganesh Nagar", "Guruwar Peth",
    "Hadapsar", "Handewadi", "Handewadi Road", "Hinjawadi", "Hinjawadi Phase 1", "Hinjawadi Phase 2", "Hinjawadi Phase 3", "Holewadi", "Ideal Colony", "Indapur", "Indira Nagar",
    "Induri", "Ins Shivaji Lonavale", "Ingale Nagar", "Jalochi", "J M Road", "Jambhul", "Jejuri", "Junnar", "Kalas", "Kalyani Nagar",
    "Kaman", "Kamshet", "Kanhe", "Kanhur Mesai", "Karjat", "Karve Road", "Karvenagar", "Kasarsai", "Kasba Peth", "Kasar Amboli",
    "Kasarwadi", "Kavade Mala", "Kelawade", "Ketkawale", "Keshav Nagar", "Kesnand", "Khadakwasla", "Khadki", "Khamla", "Khamundi", "Katraj",
    "Kirkatwadi", "Kiwale", "Kondhapuri", "Kondhawe Dhawade", "Kondhwa", "Kondhwa Budruk", "Kondhwa Khurd", "Kondhwa-Pisoli Road",
    "Kodawadi", "Kolvan", "Kolwadi", "Kondanpur", "Koregaon", "Koregaon Bhima", "Koregaon Park", "Kothrud", "Kothrud Road", "Kudje",
    "Kukatpally", "Kurkumbh", "Lohagad", "Loni Kalbhor", "Lonikand", "Lokamanya Nagar", "Lulla Nagar", "Maan", "Magarpatta",
    "Magarpatta Road", "Mahatma Phule Peth", "Mahalunge", "Mahalunge Ingale", "Malegaon", "Malshiras", "Malkapur", "Mamurdi",
    "Mandai", "Mangalwar Peth", "Manjri", "Manchar", "Markal", "Market Yard", "Masulkar Colony", "Medankarwadi", "Midhila Nagar",
    "Misalwadi", "Model Colony", "Mohari BK", "Mohammadwadi", "Morgaon", "Moshi", "Moshi Phata", "Moshi Pradhikaran", "Mukund Nagar",
    "Mulshi", "Mumbai-Pune Expressway", "Mundhwa", "Mundhwa Road", "Nagar Road", "Nana Peth", "Nanekarwadi", "Narayan Peth", "Narayanpur",
    "Narhe", "Narayangaon", "NDA Road", "Nerhe", "Nerul", "Nigdi", "Nighoje", "NIBM", "NIBM Annexe", "NIBM Road", "Nilakh",
    "Nimgaon Mhalungi", "Nanded", "Naylar Road", "Nerul MIDC", "Old Mumbai Pune Highway", "Otur", "Padmavati", "Padvi",
    "Paud", "Paud Road", "Pargaon", "Panshet", "Parvati", "Parvati Darshan", "Parvati Gaon", "Pashan", "Pashan Sus Road",
    "Pate", "Pawna Nagar", "Peth Gaon", "Pimpalgaon Tarf Khed", "Pimpri", "Pimpri Chinchwad", "Pimpri Nilakh", "Pirangut",
    "Pisoli", "Prabhat Road", "Pradhikaran", "Purandar", "Rahatani", "Rajgurunagar", "Ramtekdi", "Range Hills", "Range Hill Road",
    "Rasta Peth", "Raviwar Peth", "Ravet", "Revenue Colony", "Rihe", "Sainath Nagar", "Salisbury Park", "Sambhaji Nagar", "Sanaswadi",
    "Sangamvadi", "Sangvi", "Sangvi Road", "Sasane Nagar", "Saswad", "Saswad Road", "Satara Road", "Senapati Bapat Road",
    "Shaniwar Peth", "Shankar Shet Road", "Shastri Nagar", "Shewalwadi", "Shikrapur", "Shinde", "Shinde Chhatri", "Shirgaon",
    "Shirur", "Shirwal", "Shiroli", "Shivajinagar", "Shivane", "Shreehans Nagar", "Shukrawar Peth", "Sinhagad", "Sinhagad Road",
    "Somatane", "Somatne Phata", "Somwar Peth", "Sopan Bag Road", "Sopan Baug", "Spine Road", "Swargate", "Talawade", "Talegaon",
    "Talegaon Dabhade", "Talegaon MIDC Road", "Taljai", "Tathawade", "Thergaon", "Theur", "Tingre Nagar", "Tingarli", "Vadgaon Budruk",
    "Vadgaon MIDC", "Viman Nagar", "Vishrant Wadi", "Wadgaon Sheri", "Wakad", "Wakadewadi", "Wai", "Wanwadi", "Warje",
    "Yashvant Nagar", "Yavat", "Yewalewadi"
  ];




  const openEditModal = (lead) => {
    setEditLead(lead);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditLead(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateLead = async () => {
    try {

      console.log(" editLead ", editLead)
      const response = await axios.put(`/api/staff/updateLead`, {
        data: editLead,
      });

      // Update the local users state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editLead.id ? editLead : user))
      );

      alert("Lead updated successfully");
      closeEditModal();
    } catch (err) {
      console.error("Error updating lead:", err);
      alert("Failed to update lead.");
    }
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (!token || !user || user.role !== "staff") {
          navigate("/staff");
        } else {
          setStaffuser(user.name);


        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        navigate("/staff");
      }
    };

    fetchData();
  }, [navigate]); // ✅ Only runs once when component mounts

  // ✅ Second useEffect: Fetch leads only when staffuser is set
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!staffuser) return; // ✅ Prevent API call until staffuser is set

        console.log("staffuser name user ", staffuser)
        const response = await axios.get(`/api/property/getstaffleads/${staffuser}`);
        console.log("Fetched Users:", response.data.data);
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("No user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [staffuser]); // ✅ Runs only when `staffuser` is set, preventing infinite loop


  const handleAddDescription = async (id) => {
    if (!queryInputs.trim()) return alert("Description cannot be empty.");
    // if (!visitDate.trim()) return alert("Please enter a visit date.");
    // if (!followUpBy.trim()) return alert("Please specify the follow-up person.");

    // Send the data to the API
    try {


      const newDescription = {
        lead_name: staffuser,
        lead_id: id,
        lead_description: queryInputs,
        expected_visit_date: visitDate,
        followup_by: staffuser
      };

      console.log("formData ==> ", newDescription)
      // Send the new description to the API
      const response = await axios.post("/api/property/addDescription", newDescription);
      console.log("Description added successfully:", response.data);
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
      const response = await axios.get(`/api/property/getDescriptions/${leadId}`);
      console.log("Fetched Descriptions:", response.data.data);
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
    if (!window.confirm("Are you sure you want to delete this lead?", id)) return;

    try {
      console.log("user id ", id)
      const response = await axios.put("/api/property/deleteLead", {
        data: { leadId: id },
      });

      console.log("Lead deleted successfully:", response.data);

      // Update the state to remove the deleted lead
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      alert("Lead deleted successfully.");
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const filteredLeads = (users || []).filter((user) => {
    const search = searchTerm.toLowerCase();
  
    // Prepare fields
    const area = user.area?.toLowerCase() || "";
    const fullName = user.fullName?.toLowerCase() || "";
    const contactNumber = user.contactNumber?.toLowerCase() || "";
  
    // Return true if search term matches any of the fields
    return (
      area.startsWith(search) ||
      fullName.startsWith(search) ||
      contactNumber.startsWith(search)
    );
  });
  



  const closeDescription = () => {
    setActiveRow(null); // Close the "Show Actions" component
  };



  // Pagination Logic
  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);


  // if (loading) {
  //   return <div className="text-center text-lg">Loading...</div>;
  // }
  // if (error) {
  //   return <div className="text-center text-lg text-red-500">{error}</div>;
  // }

  // if (!users || users.length === 0) {
  //   return <div>No users available.</div>;
  // }

  return (
    <>
      <StaffNavBar />
      <div className="container overflow-x-auto max-w-full px-4 py-6">
        <h1 className="text-4xl font-bold text-center text-purple-950 mb-4">Lead Details</h1>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Area, Name, Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>







        <div className="overflow-x-auto">



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
              <table className="w-full text-sm text-left text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-3 rounded-s-lg">Sr. No.</th>
                    <th scope="col" className="px-4 py-3">Name</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Phone No</th>
                    {/* <th scope="col" className="px-4 py-3">Subject</th>
                    <th scope="col" className="px-4 py-3">Message</th>
                    <th scope="col" className="px-4 py-3">Refer</th> */}
                    {/* <th scope="col" className="px-4 py-3">Preferred Location</th> */}
                    {/* <th scope="col" className="px-4 py-3">Visit Date</th>*/}
                   

                    <th scope="col" className="px-4 py-3">Area</th>
                    <th scope="col" className="px-4 py-3">Configuration</th>
                    <th scope="col" className="px-4 py-3">Date</th>
                    <th scope="col" className="px-4 py-3 rounded-e-lg">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {Array.isArray(users) && users.length > 0 ? (
                    currentLeads.map((user, index) => (
                      <React.Fragment key={user.id}>
                        <tr className="bg-purple-50 text-black">
                          <td className="px-4 py-2 font-medium">{index + 1}</td>
                          <td className="px-4 py-2 font-medium">{user.fullName}</td>
                          <td className="px-4 py-2">{user.emailId}</td>
                          <td className="px-4 py-2 text-blue-600">
                            <a href={`tel:+91${user.contactNumber}`}>{user.contactNumber}</a>
                          </td>
                    
                          <td className="px-4 py-2">{user.area}</td>
                          <td className="px-4 py-2">{user.configuration}</td>
                          <td className="px-4 py-2">{user.visitDate}</td>
                          <td className="px-4 py-2 flex gap-2">
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
                            <button
                              onClick={() => openEditModal(user)}
                              className=" ml-2  px-2 py-1  bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                            >
                              Edit
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
                                        <td className="px-4 py-2">
                                          {desc.expected_visit_date === "01/01/1970"
                                            ? "NA"
                                            : desc.expected_visit_date}
                                        </td>
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
                                    <p className="text-black">Enter Expected visit date:</p>
                                    <input
                                      type="date"
                                      value={visitDate}
                                      onChange={(e) => setVisitDate(e.target.value)}
                                      placeholder="Select date"
                                      className="w-40 sm:w-40 px-2 py-1 border border-gray-300 rounded-md mb-2"
                                    />
                                    <input
                                      type="text"
                                      value={staffuser}
                                      placeholder="Enter follow-up person"
                                      className="w-full sm:w-40 px-2 py-1 border border-gray-300 rounded-md mb-2"
                                    />
                                    <button
                                      onClick={() => handleAddDescription(user.id)}
                                      className="w-50 ml-4 sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
                    ))
                  ) : (
                    <p>No Lead Data Assign to You</p>
                  )}

                </tbody>
              </table>

              <div className="flex justify-center mt-4">


                <div className="flex justify-center mt-4  mb-6  space-x-2">
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
              <button
                className="rounded-md p-2 bg-purple-950 text-white fixed bottom-2 right-2"
                onClick={() => navigate("/staff/dashboard")}
              >
                <span className="material-symbols-outlined font-extrabold text-3xl">
                  arrow_circle_left
                </span>
              </button>

            </>)}

        </div>
        {isEditModalOpen && editLead && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={editLead.fullName}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Full Name"
                />
                {/* <input
                  type="text"
                  name="emailId"
                  value={editLead.emailId}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                /> */}
                <input
                  type="text"
                  name="contactNumber"
                  value={editLead.contactNumber}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Phone Number"
                />
                <select
                  name="area"
                  value={editLead.area}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Area</option>
                  {puneAreas.map((area, idx) => (
                    <option key={idx} value={area}>
                      {area}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  name="visitDate"
                  value={editLead.visitDate}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Date"
                />


              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLead}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
}

export default LeadContact;