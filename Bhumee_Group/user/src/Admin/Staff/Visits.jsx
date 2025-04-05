import axios from "axios";
import React, { useState, useEffect } from "react";
// import axios from "../../../axiosConfig";

function Visites() {
  const [visites, setVisites] = useState([]);
  const [filteredVisites, setFilteredVisites] = useState([]);
  const [expandedVisites, setExpandedVisites] = useState([]);
  const [showAllFor, setShowAllFor] = useState(null);
  const [monthFilter, setMonthFilter] = useState(""); // For month filter
  const [totalVisits, setTotalVisits] = useState(0); // For Total Visits block

  useEffect(() => {
    const fetchVisites = async () => {
      try {
        const response = await axios.get("/api/adminstaffvisites/getstaffvisits");

        if (response.status === 200 && response.data.length > 0) {
          const total = response.data.length;
          setTotalVisits(total);
          const uniqueVisites = aggregateVisitesByFollowUp(response.data);
          setVisites(response.data);
          setFilteredVisites(uniqueVisites);
        }
      } catch (error) {
        console.error("Error fetching visites:", error);
      }
    };

    fetchVisites();
  }, []);

  // Aggregate visites by follow_up and calculate total count
  const aggregateVisitesByFollowUp = (data) => {
    const aggregated = {};
    data.forEach((visite) => {
      if (aggregated[visite.followup_by]) {
        aggregated[visite.followup_by].count += 1;
      } else {
        aggregated[visite.followup_by] = { ...visite, count: 1 };
      }
    });
    return Object.values(aggregated);
  };

  // Handle show all button
  const handleShowAll = (followUp) => {
    if (showAllFor === followUp) {
      setShowAllFor(null);
      setExpandedVisites([]);
    } else {
      const userVisites = visites.filter((visite) => visite.followup_by === followUp);
      setShowAllFor(followUp);
      setExpandedVisites(userVisites);
      console.log(" userVisites",userVisites )
    }
  };

  // Handle month filter
  const handleMonthFilter = (event) => {
    const selectedMonth = event.target.value;
    setMonthFilter(selectedMonth);

    if (selectedMonth) {
      const filteredData = visites.filter((visite) => {
        // Compare the month values as strings
        return visite.month === selectedMonth; // Both are strings
      });

      const uniqueFilteredData = aggregateVisitesByFollowUp(filteredData);
      setFilteredVisites(uniqueFilteredData);
    } else {
      const uniqueVisites = aggregateVisitesByFollowUp(visites);
      setFilteredVisites(uniqueVisites);
    }
  };

  return (
    <div className="p-6 h-screen">
      <h1 className="text-2xl font-bold mb-4">Visites</h1>

      {/* Total Visits Block */}
      <div className="mb-4 w-40 text-center bg-teal-800 p-4 rounded-md">
        <h2 className="text-lg  text-white font-semibold">Total Visits</h2>
        <p className="text-white  text-xl font-bold">{totalVisits}</p>
      </div>

      {/* Month Filter */}
      {/* <div className="mb-4">
        <label htmlFor="monthFilter" className="mr-2 font-medium">
          Filter by Month:
        </label>
        <select
          id="monthFilter"
          value={monthFilter}
          onChange={handleMonthFilter}
          className="border p-2 rounded-md"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div> */}

      {/* Visites Table */}
      <div className="relative overflow-autoc">
        <table className="w-full text-sm text-left text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200">
            <tr>
              <th className="px-4 py-3">Sr. No</th>
              <th className="px-4 py-3">Follow-Up By</th>
              <th className="px-4 py-3">Count</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisites.map((visite, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 text-black">{visite.followup_by}</td>
                  <td className="px-4 py-3">{visite.count}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-teal-500 hover:underline"
                      onClick={() => handleShowAll(visite.followup_by)}
                    >
                      {showAllFor === visite.followup_by ? "Hide" : "Show All"}
                    </button>
                  </td>
                </tr>
                {showAllFor === visite.followup_by && (
                  <tr>
                    <td colSpan="4" className="bg-gray-50">
                      <table className="w-full mt-2 text-sm text-left text-gray-500 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                          <tr>
                            <th className="px-4 py-3">Sr. No</th>
                            <th className="px-4 py-3">Client Name</th>
                            <th className="px-4 py-3">Property</th>
                            <th className="px-4 py-3">Lead Description</th>
                            <th className="px-4 py-3">Visit Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expandedVisites.map((detail, detailIndex) => (
                            <tr key={detailIndex} className="bg-white">
                              <td className="px-4 py-3 text-black">{detailIndex + 1}</td>
                              <td className="px-4 py-3 text-black">{detail.visitor_name}</td>
                              <td className="px-4 py-3 text-black">{detail.propertyname}</td>
                              <td className="px-4 py-3 text-black">{detail.purpose}</td>
                              <td className="px-4 py-3 text-black">{detail.visit_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Visites;
