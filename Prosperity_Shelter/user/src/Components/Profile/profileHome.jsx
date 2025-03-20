import React, { useState, useEffect } from 'react';
import axios from "axios"; // Your axios instance for API calls
import NavBar from '../NavBar';
const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('myProfile');
    const [myProfile, setMyProfile] = useState(null);
    const [allProfiles, setAllProfiles] = useState([]);
    const [user, setUser] = useState(null);
    const [newProfile, setNewProfile] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        isActive: true,
        role: 'admin',
        subrole:"",
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    // Show/Hide password visibility
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
        password: false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
  
    const handleEdit = (profileId) => {
      const profile = allProfiles.find((p) => p.id === profileId);
      setSelectedProfile(profile);
      setUpdatedProfile(profile); // Set initial state with the profile data
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedProfile(null);
    };
  
    const handleUpdate = () => {
      // Your update logic goes here (e.g., API call to update the profile)
      console.log("Updated Profile:", updatedProfile);
      setIsModalOpen(false); // Close the modal
    };
  
    const handleCancel = () => {
      setUpdatedProfile(selectedProfile); // Reset to original data if canceled
      setIsModalOpen(false); // Close the modal
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    // Fetch User Data from Session
    useEffect(() => {
        const storedUser = sessionStorage.getItem('admin');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    // Fetch All Profiles
    useEffect(() => {
        if (user) {
            const fetchAllProfiles = async () => {
                try {
                    const response = await axios.get('/api/auth/get-all');
                    if (response.data.success) {
                        setAllProfiles(response.data.profiles);
                        // Find the current user's profile
                        const currentUserProfile = response.data.profiles.find(profile => profile.userid === user?.id);
                        setMyProfile(currentUserProfile);
                    }
                } catch (error) {
                    console.error('Error fetching all profiles:', error);
                }
            };
            fetchAllProfiles();
        }
    }, [user]);

    // Handle Input Change for New Profile
    const handleInputChange = (field, value) => {
        setNewProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle Password Change Input
    const handlePasswordChange = (field, value) => {
        setPasswordData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Handle Profile Update
    const handleProfileUpdate = async () => {
        try {
            const response = await axios.put('/api/auth/updateuser', {

                myProfile

            });
            if (response.data.success) {
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Handle Password Update
    const handlePasswordUpdate = async () => {
        const { oldPassword, newPassword, confirmNewPassword } = passwordData;
        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            const id = user.id;
            const response = await axios.put('/api/auth/change-password', {
                oldPassword,
                newPassword,
                id
            });
            if (response.data.success) {
                alert('Password changed successfully!');
                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                });
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    // Handle New Profile Submission
    const handleAddProfile = async () => {
        try {
            const response = await axios.post('/api/auth/createuser', newProfile);
            if (response.data.success) {
                alert('Profile created successfully!');
                setNewProfile({
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    isActive: true,
                    role: '',
                });
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    return (

        <><NavBar />
            <div className="flex flex-col md:flex-row h-[1000px]">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/6 h-auto md:h-full bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold mb-6">Profile</h2>
                    <ul>
                        <li className="mb-4">
                            <button
                                className={`w-full text-left ${activeTab === 'myProfile' ? 'text-teal-300' : ''}`}
                                onClick={() => setActiveTab('myProfile')}
                            >
                                My Profile
                            </button>
                        </li>
                        {user && user.subrole === 'admin' && (
                        <li className="mb-4">
                            <button
                                className={`w-full text-left ${activeTab === 'showProfiles' ? 'text-teal-300' : ''}`}
                                onClick={() => setActiveTab('showProfiles')}
                            >
                                Show Profiles
                            </button>
                        </li>
                        )}
                        {user && user.subrole === 'admin' && (
                            <li className="mb-4">
                                <button
                                    className={`w-full text-left ${activeTab === 'addProfile' ? 'text-teal-300' : ''}`}
                                    onClick={() => setActiveTab('addProfile')}
                                >
                                    Add Profile
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-full  ">
                    {activeTab === 'myProfile' && (
                        <div className=' ml-5'>
                            <h2 className="text-2xl font-bold mb-4 mt-5 sm:mt-20">My Profile</h2>
                            {myProfile ? (
                                <div>
                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col space-y-2">
                                            <label className="font-semibold">Name:</label>
                                            <input
                                                className="border p-2 rounded"
                                                value={myProfile.name}
                                                onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="font-semibold">Email:</label>
                                            <input
                                                className="border p-2 rounded"
                                                value={myProfile.email}
                                                onChange={(e) => setMyProfile({ ...myProfile, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="font-semibold">Phone:</label>
                                            <input
                                                className="border p-2 rounded"
                                                value={myProfile.phone}
                                                onChange={(e) => setMyProfile({ ...myProfile, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="font-semibold">Role:</label>
                                            <input
                                                className="border p-2 rounded"
                                                value={myProfile.role}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* Password Change Section */}
                                    <div className="mt-8 space-y-4">
                                        <h3 className="font-bold text-lg mb-4">Change Password</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col space-y-2">
                                                <label className="font-semibold">Enter Old Password:</label>
                                                <div className="relative">
                                                    <input
                                                        className="border p-2 rounded w-full"
                                                        type={showPassword.oldPassword ? 'text' : 'password'}
                                                        value={passwordData.oldPassword}
                                                        onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('oldPassword')}
                                                        className="absolute right-2 top-2 text-gray-500"
                                                    >
                                                        {showPassword.oldPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <label className="font-semibold">New Password:</label>
                                                <div className="relative">
                                                    <input
                                                        className="border p-2 rounded w-full"
                                                        type={showPassword.newPassword ? 'text' : 'password'}
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('newPassword')}
                                                        className="absolute right-2 top-2 text-gray-500"
                                                    >
                                                        {showPassword.newPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <label className="font-semibold">Confirm New Password:</label>
                                                <div className="relative">
                                                    <input
                                                        className="border p-2 rounded w-full"
                                                        type={showPassword.confirmNewPassword ? 'text' : 'password'}
                                                        value={passwordData.confirmNewPassword}
                                                        onChange={(e) => handlePasswordChange('confirmNewPassword', e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                                        className="absolute right-2 top-2 text-gray-500"
                                                    >
                                                        {showPassword.confirmNewPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="bg-teal-500 text-white px-4 py-2 rounded mt-4"
                                            onClick={handlePasswordUpdate}
                                        >
                                            Change Password
                                        </button>
                                    </div>

                                    {/* Update Profile Button */}
                                    <div className="mt-6">
                                        <button
                                            className="bg-teal-500 text-white px-4 py-2 rounded"
                                            onClick={handleProfileUpdate}
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading profile...</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'showProfiles' && (
                    <div className="p-6 bg-purple-50 sm:mt-10 min-h-screen">
                    <h2 className="text-2xl font-bold text-teal-950 mb-6">Show Profiles</h2>
                    <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                      <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="border px-4 py-2">Sr. No.</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Active</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProfiles.length > 0 ? (
                            allProfiles.map((profile, index) => (
                              <tr key={profile.id} className="hover:bg-gray-50 transition-all duration-200">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{profile.name}</td>
                                <td className="border px-4 py-2">{profile.email}</td>
                                <td className="border px-4 py-2">{profile.phone}</td>
                                <td className="border px-4 py-2">{profile.subrole}</td>
                                <td className="border px-4 py-2">{profile.isActive === "true" ? 'Yes' : 'No'}</td>
                                <td className="border px-4 py-2">{profile.status ? profile.status : 'N/A'}</td>
                                <td className="border px-4 py-2 flex justify-center space-x-2">
                                  <button
                                    onClick={() => handleEdit(profile.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="border px-4 py-2 text-center">
                                No profiles found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
              
                    {/* Edit Profile Modal */}
                    {isModalOpen && selectedProfile && (
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="font-semibold">Name:</label>
                              <input
                                type="text"
                                name="name"
                                className="border p-2 w-full rounded"
                                value={updatedProfile.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label className="font-semibold">Email:</label>
                              <input
                                type="email"
                                name="email"
                                className="border p-2 w-full rounded"
                                value={updatedProfile.email}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label className="font-semibold">Phone:</label>
                              <input
                                type="text"
                                name="phone"
                                className="border p-2 w-full rounded"
                                value={updatedProfile.phone}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label className="font-semibold">Role:</label>
                              <select
                                name="subrole"
                                className="border p-2 w-full rounded"
                                value={updatedProfile.subrole}
                                onChange={handleChange}
                              >
                                <option value="admin">Admin</option>
                                <option value="hr">HR</option>
                                <option value="manager">Manager</option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-end space-x-4">
                            <button
                              onClick={handleCancel}
                              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdate}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                    
                    )}

                    {activeTab === 'addProfile' &&  user?.subrole === 'admin' && (
                        <div className="p-6 bg-white rounded-lg shadow-lg sm:mt-16">
                        <h2 className="text-2xl font-bold text-center mb-6 ">Add Profile</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col space-y-4">
                                <label className="font-semibold text-gray-700">Name:</label>
                                <input
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={newProfile.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                    
                            <div className="flex flex-col space-y-4">
                                <label className="font-semibold text-gray-700">Email:</label>
                                <input
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={newProfile.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                    
                            <div className="flex flex-col space-y-4">
                                <label className="font-semibold text-gray-700">Phone:</label>
                                <input
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={newProfile.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                    
                            <div className="flex flex-col space-y-4 relative">
                                <label className="font-semibold text-gray-700">Password:</label>
                                <input
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    type={showPassword.password ? 'text' : 'password'}
                                    value={newProfile.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-teal-500 font-medium"
                                >
                                    {showPassword.password ? 'Hide' : 'Show'}
                                </button>
                            </div>
                    
                            <div className="flex flex-col space-y-4">
                                <label className="font-semibold text-gray-700">Role:</label>
                                <select
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={newProfile.subrole}
                                    onChange={(e) => handleInputChange('subrole', e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="hr">HR</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                        </div>
                    
                        <button
                            className="w-full sm:w-auto bg-teal-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onClick={handleAddProfile}
                        >
                            Add Profile
                        </button>
                    </div>
                    
                    )}
                </div>
            </div>



        </>
    );
};

export default ProfilePage;
