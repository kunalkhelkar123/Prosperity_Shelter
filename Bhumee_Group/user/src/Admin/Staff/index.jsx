import { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
// import axios from "../../../axiosConfig";
import LeftSideNavBar from "./LeftSideNavbar"; // Import the LeftSideNavBar component
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import CreateStaff from "./CreateStaff";
import { useNavigate } from "react-router-dom";
import Booking from "./Booking";
import Visits from "./Visits";
import axios from "axios";


function Managestaff() {
    const [users, setUsers] = useState([]);
    const [datachanges, setDataChanges] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("allStaff");
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        try {
            const token = sessionStorage.getItem("token");
            const admin = JSON.parse(sessionStorage.getItem("admin"));

            console.log("admin ==> ", admin)
            if (!token || !admin || admin.role !== "admin") {
                navigate("/admin");
            }
        }
        catch (error) {
            navigate("/admin");

        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/property/staff");
            console.log("Fetched staff:", response.data);
            setUsers(response.data.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/property/staff");
                console.log("Fetched staff:", response.data);
                setUsers(response.data.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, [datachanges]);

    const handleEdit = async (userId, isActive) => {
        try {
            let updatedStatus = isActive === "true" ? "false" : "true";
            const response = await axios.post("/api/property/updateStatus", {
                userId,
                isActive: updatedStatus,
            });

            if (response.data.success) {
                alert("User status updated successfully")
                fetchUsers()
                setDataChanges(!datachanges);
                console.log("User status updated successfully");
            } else {
                console.error("Failed to update user status:", response.data.message);
            }
        } catch (err) {
            console.error("Error updating user status:", err);
        }
    };

    const handleEditDetails = (userId) => {
        const userToEdit = users.find((user) => user.staffid === userId);
        setEditedUser({ ...userToEdit });
        setEditUserId(userId);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post("/api/property/updateUser", editedUser);
            if (response.data.success) {
                setDataChanges(!datachanges);
                setEditUserId(null);
                console.log("User details updated successfully");
            } else {
                console.error("Failed to update user details:", response.data.message);
            }
        } catch (err) {
            console.error("Error updating user details:", err);
        }
    };

    const handleCancel = () => {
        setEditUserId(null); // Close the editable form without saving changes
        setEditedUser(null); // Reset the edited user data
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete("/api/property/deleteUser", {
                data: { userId },
            });

            if (response.data.success) {
                setDataChanges(!datachanges);
                console.log("User deleted successfully");
            } else {
                console.error("Failed to delete user:", response.data.message);
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex mt-16">
                {/* Left side navigation bar */}
                <LeftSideNavBar setActiveTab={setActiveTab} activeTab={activeTab} />

                <div className="flex-1 p-4">
                    {activeTab === "allStaff" && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr className="border-b-2 border-gray-400"> {/* Horizontal border for header */}
                                        <th scope="col" className="px-4 py-3 rounded-s-lg border-r border-gray-300">Sr. No</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Name</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Email</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Phone No</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Password</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Status</th>
                                        <th scope="col" className="px-4 py-3 border-r border-gray-300">Action</th>
                                        <th scope="col" className="px-4 py-3">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <>
                                            <tr key={user.id} className="bg-purple-50 text-black border-b border-gray-300">
                                                <td className="px-4 py-2 border-r border-gray-300">{index + 1}</td>
                                                <td className="px-4 py-2 font-medium border-r border-gray-300">{user.name}</td>
                                                <td className="px-4 py-2 border-r border-gray-300">{user.email}</td>
                                                <td className="px-4 py-2 border-r border-gray-300">{user.phone}</td>
                                                <td className="px-4 py-2 border-r border-gray-300">{user.password}</td>
                                                <td className="px-4 py-2 border-r border-gray-300">
                                                    {user.isActive === "true" ? (
                                                        <>
                                                            <label className="mr-8"> Active </label>
                                                            <button
                                                                onClick={() => handleEdit(user.staffid, user.isActive)}
                                                                className="w-30 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700 mt-4 sm:mt-0"
                                                            >
                                                                Inactivate
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className="mr-6"> Inactive </label>
                                                            <button
                                                                onClick={() => handleEdit(user.staffid, user.isActive)}
                                                                className="w-30 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 mt-4 sm:mt-0"
                                                            >
                                                                Activate
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border-r border-gray-300">
                                                    <button
                                                        onClick={() => handleDelete(user.staffid)}
                                                        className="w-36 sm:w-auto ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4 sm:mt-0 sm:ml-4"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => {
                                                            handleEditDetails(user.staffid)
                                                            if (editUserId) {
                                                                setEditUserId(null)
                                                            }
                                                        }}
                                                        className="w-30 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-800 mt-4 sm:mt-0"
                                                    >
                                                        Edit Details
                                                    </button>
                                                </td>
                                            </tr >

                                            {/* Editable row */}
                                            {editUserId === user.staffid && (
                                                <tr>
                                                    <td colSpan="8" className="px-4 py-2">
                                                        <div className="bg-white p-6 rounded-lg shadow-lg border">
                                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit User Details</h3>
                                                            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                                                <div className="space-y-2">
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                                                                    <input
                                                                        id="name"
                                                                        type="text"
                                                                        value={editedUser?.name || ''}
                                                                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                                                                    <input
                                                                        id="email"
                                                                        type="email"
                                                                        value={editedUser?.email || ''}
                                                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone No</label>
                                                                    <input
                                                                        id="phone"
                                                                        type="text"
                                                                        value={editedUser?.phone || ''}
                                                                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                                    />
                                                                </div>

                                                                <div className="relative">
                                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-600">Password</label>

                                                                    <input
                                                                        id="password"
                                                                        type={showPassword ? "text" : "password"}  // Toggle between password and text
                                                                        value={editedUser?.password || ''}
                                                                        onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                                                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={handlePasswordToggle}
                                                                        className="absolute inset-y-0 right-3  mt-6  flex items-center text-gray-500 text-2xl"
                                                                    >
                                                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}  {/* Toggle icon */}
                                                                    </button>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
                                                                    <select
                                                                        id="status"
                                                                        value={editedUser?.isActive || ''}
                                                                        onChange={(e) => setEditedUser({ ...editedUser, isActive: e.target.value })}
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                                    >
                                                                        <option value="true">Active</option>
                                                                        <option value="false">Inactive</option>
                                                                    </select>
                                                                </div>

                                                                <div className="flex justify-between col-span-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditUserId(null)}  // Cancel editing
                                                                        className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-200"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleSave}  // Save updated details
                                                                        className="px-6 py-2 mr-80 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}
                    {activeTab === "createStaff" && (
                        <div>
                            <CreateStaff />
                        </div>
                    )}

                    {activeTab === "bookings" && (
                        <div>

                            <Booking />
                        </div>
                    )}
                    {activeTab === "visits" && (
                        <div>
                            <Visits />
                        </div>
                    )}
                </div>
                <button
                    className="rounded-md p-2 bg-purple-950 text-white fixed bottom-4 right-4 shadow-md hover:bg-purple-800"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                >
                    <span className="material-symbols-outlined font-extrabold text-3xl">arrow_circle_left</span>
                </button>
            </div >
        </>
    );
}

export default Managestaff;
