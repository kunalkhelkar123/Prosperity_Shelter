import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/Logo.png';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return toast.error('Please enter a valid email address');
    }

    // Password validation
    if (
      formData.password.length < 8 ||
      !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      return toast.error(
        'Password should be at least 8 characters long and contain at least one uppercase letter, one number, and one symbol.'
      );
    }

    try {
      const response = await axios.post('/api/auth/register', formData);

      if (response.status == "201") {
        return toast.error('user already present with same mail id');

      }
      console.log('Data:', response.data);

      toast.success('Registration successful!');
      navigate('/admin');

      // Reset form data after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover opacity">
      <div className="bg-[#390255] p-8 rounded-lg shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo" className="h-20 mx-auto w-20 mb-4" />
          <h2 className="text-5xl font-semibold text-white">Register</h2>
          <p className="text-white mt-6 text-lg">Create an account to get started</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg text-white font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobileno" className="block text-lg text-white font-semibold mb-2">
              Mobile No
            </label>
            <input
              type="text"
              id="mobileno"
              placeholder="Enter your Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-white font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-white font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFF848] text-2xl font-semibold text-[#390255] py-2 px-1 rounded-lg hover:bg-white hover:text-[#390255]"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-white">
          Already have an account?{' '}
          <span
            className="text-[#FFF848] text-m hover:underline cursor-pointer"
            onClick={() => navigate('/admin')}
          >
            Login here
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
