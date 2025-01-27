// LoginForm.js
import { useState } from 'react';
import City from "../homepage/city.jpeg";
import { IoClose } from 'react-icons/io5'; // Importing React icon for close

const LoginForm = ({ onClose }) => {
  const [formDatanew, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formDatanew,
      [name]: value
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (validateForm2()) {
      // Submit form data
      // console.log('Form submitted:', formDatanew);
    }
  };

  const validateForm2 = () => {
    let valid = true;
    const newErrors2 = { ...errors };

    if (formDatanew.mobile.charAt(0) === '0') {
      setErrors(prevErrors1 => ({
        ...prevErrors1,
        mobile: 'Mobile number should not start with 0.'
      }));
    } else {
      // console.log('Form submitted:', formDatanew);
    }

    // Name validation (only alphabets and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formDatanew.name)) {
      newErrors2.name = 'Please enter a valid name.';
      valid = false;
    } else {
      newErrors2.name = '';
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formDatanew.email)) {
      newErrors2.email = 'Please enter a valid email address.';
      valid = false;
    } else {
      newErrors2.email = '';
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formDatanew.mobile)) {
      newErrors2.mobile = 'Please enter a valid 10-digit mobile number.';
      valid = false;
    } else {
      newErrors2.mobile = '';
    }

    setErrors(newErrors2);
    return valid;
  };

  return (
    <div className="bg-white p-8 rounded-mt w-[85%] h-[90vh] overflow-auto shadow-xl mx-auto mt-8 flex flex-col items-center md:flex-row gap-10 relative">
      
      <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900">
        <IoClose />
      </button>
      <div className='flex flex-col items-center'>
        <h1 className="text-2xl m-2 font-bold text-left animate__animated animate__slideInLeft" style={{ animationDelay: '0.5s' }}>Login to get this property details</h1>
        <img src={City} alt="Image 2" className="h-[460px] w-[480px] mt-3" />
      </div>
      {/* Image Section */}
      {/* Text Content and Form Section */}
      <div className="w-full md:w-1/2 md:ml-4">
        <h1 className="text-2xl font-bold mb-4">We Have Over 1 Lakh Buyers For You </h1>
        <p className="text-gray-600 mb-4">
          HomiGrow Reality provides you with the best real estate options. Whether you are looking for a flat, house, land, or commercial property, we've got you covered.
        </p>
        {/* Form Section */}
        <form onSubmit={handleSubmit2}>
          <label htmlFor="name" className="block text-black mb-2">
            Your Name:
          </label>
          <input
            placeholder='Enter Your Name'
            type="text"
            id="name"
            name="name"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.name}
            onChange={handleChange2}
            required
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
          <label htmlFor="email" className="block text-black mb-2">
            Your Email:
          </label>
          <input
            placeholder='Write Your Email Id Please'
            type="email"
            id="email"
            name="email"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.email}
            onChange={handleChange2}
            required
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
          <label htmlFor="mobile" className="block text-black mb-2">
            Your Mobile Number:
          </label>
          <input
            placeholder="Write Mobile Number"
            type="tel"
            id="mobile"
            name="mobile"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.mobile}
            onChange={handleChange2}
            pattern="[0-9]{10}"
            required
          />
          {errors.mobile && <div className="text-red-500">{errors.mobile}</div>}
          {/* Button Section */}
          <div>
            <button type="submit" className="bg-yellow-600 hover:bg-purple-900 text-white h-12 w-full rounded-md mb-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
