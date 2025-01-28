import React, { useState, useEffect } from 'react';
import axiosinstance from '../../../axiosConfig'; // Your axios instance for API calls
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
                    const response = await axiosinstance.get('/api/auth/get-all');
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
            const response = await axiosinstance.put('/api/auth/updateuser', {

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
            const response = await axiosinstance.put('/api/auth/change-password', {
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
            const response = await axiosinstance.post('/api/auth/createuser', newProfile);
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
            <div className="flex flex-col md:flex-row h-screen">
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
                        <li className="mb-4">
                            <button
                                className={`w-full text-left ${activeTab === 'showProfiles' ? 'text-teal-300' : ''}`}
                                onClick={() => setActiveTab('showProfiles')}
                            >
                                Show Profiles
                            </button>
                        </li>
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
                <div className="w-full md:w-3/4 p-6 ">
                    {activeTab === 'myProfile' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
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
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Show Profiles</h2>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2">Sr. No.</th>
                                            <th className="border px-4 py-2">Name</th>
                                            <th className="border px-4 py-2">Email</th>
                                            <th className="border px-4 py-2">Phone</th>
                                            <th className="border px-4 py-2">Role</th>
                                            <th className="border px-4 py-2">Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProfiles.length > 0 ? (
                                            allProfiles.map((profile, index) => (
                                                <tr key={profile.id}>
                                                    <td className="border px-4 py-2">{index + 1}</td>
                                                    <td className="border px-4 py-2">{profile.name}</td>
                                                    <td className="border px-4 py-2">{profile.email}</td>
                                                    <td className="border px-4 py-2">{profile.phone}</td>
                                                    <td className="border px-4 py-2">{profile.subrole}</td>
                                                    <td className="border px-4 py-2">{profile.isActive==="true" ? 'Yes' : 'No'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="border px-4 py-2 text-center">
                                                    No profiles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'addProfile' &&  user?.subrole === 'admin' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Add Profile</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Name:</label>
                                    <input
                                        className="border p-2 rounded"
                                        value={newProfile.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Email:</label>
                                    <input
                                        className="border p-2 rounded"
                                        value={newProfile.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Phone:</label>
                                    <input
                                        className="border p-2 rounded"
                                        value={newProfile.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Password:</label>
                                    <input
                                        className="border p-2 rounded"
                                        // type="password"
                                        type={showPassword.password ? 'text' : 'password'}

                                        value={newProfile.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('password')}
                                        className="absolute text-black "
                                        style={{ marginTop: "40px", marginLeft: "300px" }}
                                    >
                                        {showPassword.password ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Role:</label>
                                    <select
                                        className="border p-2 rounded"
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
                                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
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
