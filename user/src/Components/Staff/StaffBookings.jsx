import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import StaffLeftSideNavBar from "./StaffLeftSideNavBar";
import StaffNavBar from "../StaffNavBar";
import StaffVisites from "./StaffVisites"

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [changes, setSetchanges] = useState("false");
  const [user, setUser] = useState("null");
  const [activeTab, setActiveTab] = useState("bookings");
  const [userId, setId] = useState("");
  const [bookingcount, setBookingcount] = useState()
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
  const [selectedMonth, setSelectedMonth] = useState(""); // State to store selected month for filter

  const months = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from sessionStorage and set the user
    const user = sessionStorage.getItem("user");
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
        const userId = user ? JSON.parse(user).id : ""; // Ensure it's available
        console.log("userId ==>", userId); // Log userId for debugging

        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        console.log("currentMonth", currentMonth); // Output will be the current month as a string (e.g., "December")

        setSelectedMonth(currentMonth);

        if (userId) {
          const response = await axiosinstance.post("api/staff/get-bookings", { id: userId });

          if (response.status === 200) {
            if (response.data.length > 0) {
              console.log("Bookings ==> ", response.data);

              // Calculate the sum of the 'count' values in the response data
              const addition_of_count = response.data.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
              setBookingcount(addition_of_count)
              console.log("addition_of_count", addition_of_count);

              // Set the bookings and filtered bookings
              setBookings(response.data);
              const filteredData = response.data.filter(booking => booking.month === currentMonth);
              setFilteredBookings(filteredData); // Initially filter bookings by current month
              setSetchanges("false");

              // You can now use the `addition_of_count` as needed, for example:
              // Update some state to display the total count or perform any other logic
            }
          }
          else {
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

  const handleMonthFilterChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    let filteredData = [];
    if (month === "" || month === "All Months") {
      filteredData = bookings; // Show all bookings if no month is selected
      const addition_of_count = filteredData.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
      setBookingcount(addition_of_count); // Update the booking count
    } else {
      filteredData = bookings.filter((booking) => booking.month === month);
      const addition_of_count = filteredData.reduce((acc, booking) => acc + (Number(booking.count) || 0), 0);
      setBookingcount(addition_of_count); // Update the booking count
    }

    setFilteredBookings(filteredData); // Filter bookings based on the selected month

    // Calculate the sum of the 'count' values in the filtered bookings

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
        setFilteredBookings([...filteredBookings, response.data]); // Also add the new booking to filtered bookings
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

  return (
    <div className="flex flex-col h-screen">
  {/* Top Navigation */}
  <div className="w-full">
    <StaffNavBar />
  </div>

  <div className="flex flex-grow flex-col sm:flex-row">
    {/* Left Navigation (Collapsible on mobile) */}
    <div className="w-full sm:w-1/6 bg-gray-200 h-auto sm:h-full hidden sm:block">
      <StaffLeftSideNavBar setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>

    {/* Main Content */}
    <div className="flex-grow p-4 overflow-auto">
      {activeTab === "bookings" && (
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-center mt-4 p-2 text-purple-950">
            Booking Details
          </h1>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          {/* Month Filter */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 my-4">
            <label className="text-sm sm:text-base">Filter by Month:</label>
            <select
              value={selectedMonth}
              onChange={handleMonthFilterChange}
              className="p-2 border rounded-md w-full sm:w-auto"
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Summary */}
          <div className="flex justify-center sm:justify-between items-center my-4 gap-4 flex-wrap">
            <div className="p-4 bg-teal-500 text-white rounded-md w-full sm:w-auto mt-[-80px]">
              <h3 className="font-bold">Total Bookings</h3>
              <p>{bookingcount}</p>
            </div>
          </div>

          {/* Table (Responsive) */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-3">Sr. No</th>
                  <th className="px-4 py-3">Property Name</th>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Count</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Client Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Book By</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{booking.property_name}</td>
                    <td className="px-4 py-3">{booking.month}</td>
                    <td className="px-4 py-3">{booking.count}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.client_name}</td>
                    <td className="px-4 py-3">{booking.price}</td>
                    <td className="px-4 py-3">{booking.book_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Booking Form */}
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold mb-4">Add New Booking</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm">Property Name</label>
                <input
                  type="text"
                  name="propertyName"
                  value={newBooking.propertyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Count</label>
                <input
                  type="number"
                  name="count"
                  value={newBooking.count}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newBooking.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Month</label>
                <select
                  name="month"
                  value={newBooking.month}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={newBooking.clientName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newBooking.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 md:col-span-3">
                <button
                  onClick={handleAddBooking}
                  className="w-full px-4 py-2 bg-purple-950 text-white rounded-md hover:bg-purple-800"
                >
                  Add Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "visits" && (
        <div>
          <StaffVisites />
        </div>
      )}
    </div>
  </div>

  {/* Back Button */}
  <button
    className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
    onClick={() => navigate(-1)}
  >
    <span className="material-symbols-outlined font-extrabold text-3xl">
      arrow_circle_left
    </span>
  </button>
</div>

  );
}

export default Booking;
