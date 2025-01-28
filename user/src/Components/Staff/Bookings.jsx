import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import StaffLeftSideNavBar from "./StaffLeftSideNavBar";
import StaffNavBar from "../StaffNavBar";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [changes, setSetchanges] = useState("false");
  const [user, setUser] = useState("null");
  const [activeTab, setActiveTab] = useState("bookings");
  const [userId, setId] = useState("");
  const [bookingcount, setBookingcount] = useState();
  const [newBooking, setNewBooking] = useState({
    count: "",
    date: "",
    propertyName: "",
    clientName: "",
    price: "",
    month: "",
    book_by: "",
  });
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [expandedBookings, setExpandedBookings] = useState([]);
  const [showAllFor, setShowAllFor] = useState(null);

  const months = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("admin");
    if (user) {
      try {
        const parsedAdmin = JSON.parse(user);
        setUser(parsedAdmin || "Guest");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    const fetchBookings = async () => {
      try {
        const userId = user ? JSON.parse(user).id : "";
        console.log("userId ==>", userId);

        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        console.log("currentMonth", currentMonth);

        setSelectedMonth(currentMonth);

        if (userId) {
          const response = await axiosinstance.post("api/staff/get-bookings");

          if (response.status === 200) {
            if (response.data.length > 0) {
              console.log("Bookings ==> ", response.data);

              const addition_of_count = response.data.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
              setBookingcount(addition_of_count);

              const uniqueBookings = aggregateBookingsByBookBy(response.data);
              setBookings(response.data);
              setFilteredBookings(uniqueBookings);

              setSetchanges("false");
            }
          } else {
            setError("Failed to load bookings. Please try again later.");
          }
        } else {
          setError("User ID is not available.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, [changes]);

  const aggregateBookingsByBookBy = (data) => {
    const aggregated = {};
    data.forEach((booking) => {
      if (aggregated[booking.book_by]) {
        aggregated[booking.book_by].count += Number(booking.count) || 0;
      } else {
        aggregated[booking.book_by] = { ...booking, count: Number(booking.count) || 0 };
      }
    });
    return Object.values(aggregated);
  };

  const handleMonthFilterChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    let filteredData = [];
    if (month === "" || month === "All Months") {
      filteredData = aggregateBookingsByBookBy(bookings);
      const addition_of_count = filteredData.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
      setBookingcount(addition_of_count);
    } else {
      filteredData = aggregateBookingsByBookBy(bookings.filter((booking) => booking.month === month));
      const addition_of_count = filteredData.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
      setBookingcount(addition_of_count);
    }

    setFilteredBookings(filteredData);
  };

  const handleInputChange = (e) => {
    setNewBooking({
      ...newBooking,
      [e.target.name]: e.target.value,
    });
  };

  const validateBooking = (booking) => {
    const { count, date, propertyName, clientName, price, month } = booking;
    if (!propertyName || !clientName || !date || !month || !count || !price) {
      return "All fields are required.";
    }
    if (isNaN(count) || isNaN(price)) {
      return "Count and Price must be valid numbers.";
    }
    return null;
  };

  const handleAddBooking = async () => {
    const validationError = validateBooking(newBooking);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const newBookingData = { ...newBooking, book_by: user.name, id: user.id };

      console.log("user ", user);
      console.log("newBookingData ", newBookingData);
      const response = await axiosinstance.post("api/staff/add-booking", newBookingData);

      if (response.status === 201) {
        setBookings([...bookings, response.data]);
        setFilteredBookings(aggregateBookingsByBookBy([...bookings, response.data]));
        setNewBooking({
          count: "",
          date: "",
          propertyName: "",
          clientName: "",
          price: "",
          month: "",
          book_by: "",
          id: "",
        });
        setError(null);
        setSetchanges("true");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      setError("Failed to add booking. Please try again.");
    }
  };

  const handleShowAll = (bookBy) => {
    let filteredData;

    if (selectedMonth === "All Months" || selectedMonth === "") {
      filteredData = bookings.filter((booking) => booking.book_by === bookBy);
    } else {
      filteredData = bookings.filter(
        (booking) => booking.book_by === bookBy && booking.month === selectedMonth
      );
    }

    if (filteredData.length < 1) {
      setShowAllFor(null);
      setExpandedBookings([]);
    } else if (showAllFor === bookBy) {
      setShowAllFor(null);
      setExpandedBookings([]);
    } else {
      setShowAllFor(bookBy);
      setExpandedBookings(filteredData);
    }
  };



  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="flex-grow p-6 overflow-auto">
          {activeTab === "bookings" && (
            <div>
              <h1 className="text-4xl font-bold flex justify-center items-center mt-[-40px] p-2 text-purple-950">
                Booking Details
              </h1>

              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="flex justify-end my-4 ">
                <label className="mr-4">Filter by Month:</label>
                <select
                  value={selectedMonth}
                  onChange={handleMonthFilterChange}
                  className="p-2 border rounded-md"
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center my-4">
                <div className="p-4 bg-teal-500 mt-[-100px] text-white rounded-md">
                  <h3 className="font-bold">Total Bookings</h3>
                  <p>{bookingcount}</p>
                </div>
              </div>

              <div className="relative flex justify-center items-center">
                <table className="w-full text-sm text-left text-gray-500 border">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                      <th className="px-4 py-3">Sr. No</th>
                      <th className="px-4 py-3">Book By</th>
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">Count</th>
                      <th className="px-4 py-3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking, index) => (
                      <React.Fragment key={index}>
                        <tr className="bg-gray-100">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 text-black">{booking.book_by}</td>
                          <td className="px-4 py-3">{booking.month}</td>
                          <td className="px-4 py-3">{booking.count}</td>
                          <td className="px-4 py-3">
                            <button
                              className="text-teal-500 hover:underline"
                              onClick={() => handleShowAll(booking.book_by)}
                            >
                              {showAllFor === booking.book_by ? "Hide" : "Show"} Details
                            </button>
                          </td>
                        </tr>
                        {showAllFor === booking.book_by && (
                          <tr>
                            <td colSpan="5" className="bg-gray-50">
                              <table className="w-full mt-2 text-sm text-left text-gray-500 border">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                  <tr>
                                    <th className="px-4 py-3">Sr. No</th>
                                    <th className="px-4 py-3">Property Name</th>
                                    <th className="px-4 py-3">Month</th>
                                    <th className="px-4 py-3">Count</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Price</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  {expandedBookings.map((detail, detailIndex) => (
                                    <tr key={detailIndex} className="bg-white">
                                      <td className="px-4 py-3">{detailIndex + 1}</td>
                                      <td className="px-4 py-3 text-black">{detail.property_name}</td>
                                      <td className="px-4 py-3">{detail.month}</td>
                                      <td className="px-4 py-3">{detail.count}</td>
                                      <td className="px-4 py-3">{detail.date}</td>
                                      <td className="px-4 py-3">{detail.price}</td>

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


              <div className="flex flex-col mt-6">
                <h2 className="text-2xl font-bold mb-4">Add New Booking</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddBooking();
                  }}
                  className="space-y-4"
                >
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="propertyName"
                      placeholder="Property Name"
                      value={newBooking.propertyName}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md flex-1"
                    />
                    <input
                      type="text"
                      name="clientName"
                      placeholder="Client Name"
                      value={newBooking.clientName}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md flex-1"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="count"
                      placeholder="Booking Count"
                      value={newBooking.count}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={newBooking.price}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      name="date"
                      value={newBooking.date}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md"
                    />
                    <select
                      name="month"
                      value={newBooking.month}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md"
                    >
                      <option value="">Select Month</option>
                      {months.slice(1).map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Booking
                  </button>
                </form>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

export default Booking;

