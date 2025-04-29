import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To store error messages
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await AuthService.register(name, email, password);
      navigate('/login');
    } catch (error) {
      // Check if the error is due to existing email
      if (error.response?.data?.message === 'Email already exists') {
        setErrorMessage('Email already exists. Please login.');
      } else {
        setErrorMessage(error.response?.data.message || 'Register Failed');
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Your Account</h1>
        
        {/* Name Input */}
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        
        {/* Email Input */}
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        
        {/* Password Input */}
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full p-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
        
        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Redirect to login if email exists */}
        {errorMessage.includes('Email already exists') && (
          <div className="text-center text-sm">
            <p>
              Already have an account?{' '}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
