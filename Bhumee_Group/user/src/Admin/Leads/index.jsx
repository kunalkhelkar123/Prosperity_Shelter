import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';
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
  const [itemsPerPage] = useState(200); // Display only 20 leads per page


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null); // Current lead to edit



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


    const generateEXCEL = () => {
          const tableData = filteredLeads.map((client, index) => [
              index + 1,
              client.fullName,
              client.contactNumber,
              // formatDate(client.bookingDate),
              client.budget,
              client.configuration,
              client.area,

          ]);
          // Excel Export
          const ws = XLSX.utils.aoa_to_sheet([
              ["SR. No", "Name", "Number", "Budget", "Configuration", "Area"],
              ...tableData
          ]);
  
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Client List");
          XLSX.writeFile(wb, "Client_List.xlsx");
      };




  return (
    <>
      <NavBar />
      <div className="container overflow-x-auto max-w-full px-2  mt-16">
        <h1 className="text-2xl md:text-4xl font-bold text-center my-4 text-purple-950">
          Lead Details
        </h1>


        {/*  */}

        {/* <div className="flex justify-between mb-4"> */}
        {/* <input
            type="text"
            placeholder="Search by Client Name, Co-Applicant Name, or Property Name..."
            className="px-4 py-2 w-full border border-gray-300 rounded-lg mr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
            onClick={generatePDF}
          >
            Download Client list PDF
          </button> */}
        {/* <button
            className="px-4 ml-2 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
            // onClick={generateEXCEL}
          >
            Download Client list Excelsheet
          </button> */}
        {/* </div> */}








        {/*  */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by Area, Name & Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <button
            className="px-4 ml-2 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
          onClick={generateEXCEL}
          >
            Download Excelsheet
          </button>
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
                    <th scope="col" className="px-4 py-3">Configuration</th>
                    <th scope="col" className="px-4 py-3">Date</th>
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
                        <td className="px-4 py-3">{user.configuration}</td>
                        <td className="px-4 py-3">{user.visitDate}</td>
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
                          <button
                            onClick={() => openEditModal(user)}
                            className=" px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                          >
                            Edit
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


                <div className="flex justify-center mt-4 mb-6 space-x-2">
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


      {isEditModalOpen && editLead && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>
          <div className="space-y-4">
      
            {/* Full Name */}
            <div>
              <label htmlFor="edit-fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                id="edit-fullName"
                type="text"
                name="fullName"
                value={editLead.fullName}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Full Name"
              />
            </div>
      
            {/* Contact Number */}
            <div>
              <label htmlFor="edit-contactNumber" className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                id="edit-contactNumber"
                type="text"
                name="contactNumber"
                value={editLead.contactNumber}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Phone Number"
              />
            </div>
      
            {/* Area */}
            <div>
              <label htmlFor="edit-area" className="block text-sm font-medium mb-1">Area</label>
              <select
                id="edit-area"
                name="area"
                value={editLead.area}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Area</option>
                {puneAreas.map((area, idx) => (
                  <option key={idx} value={area}>{area}</option>
                ))}
              </select>
            </div>
      
            {/* Visit Date */}
            <div>
              <label htmlFor="edit-visitDate" className="block text-sm font-medium mb-1"> Date</label>
              <input
                id="edit-visitDate"
                type="date"
                name="visitDate"
                value={editLead.visitDate}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>
      
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



    </>
  );
}

export default Home;
