// LoginForm.js
import { useState } from 'react';
import City from "../homepage/city.jpeg";
import { IoClose } from 'react-icons/io5'; // Importing React icon for close
import axios from "axios"
const LoginForm = ({ onClose }) => {
  const [formDatanew, setFormData] = useState({
    fullName: '',
    emailId: '',
    contactNumber: '',
    message: "Want to post property",

  });

  const [errors, setErrors] = useState({
    fullName: '',
    emailId: '',
    contactNumber: ''
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formDatanew,
      [name]: value
    });
  };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   if (validateForm2()) {
  //     // Submit form data
  //     // console.log('Form submitted:', formDatanew);
  //   }
  // };


  const handleSubmit2 = async (e) => {
    e.preventDefault();
    localStorage.setItem("submit", "true");

    // Validate phone number before submitting
    // if (!validatePhoneNumber(formDatanew.contactNumber)) {
    //   alert("Please enter a valid contactNumber number.");
    //   return;
    // }

    try {
      // window.location.reload();
      // Send the form data to the backend
      const response = await axios
        .post("/api/property/leads", formDatanew)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message); // Show success alert
            setFormData({
              // Reset the form data
              fullName: "",
              emailId: "",
              contactNumber: "",
              subject: "",
              message: "",
              Refer: "",
              preferredLocation: "",
              visitDate: "",
              budget: "",
              configuration: "",
              area: "",
            });
            onClose();
          } else {
            // If success is false, show an error alert
            alert("Error submitting the lead. Please try again.");
          }
        });
    } catch (error) {
      console.error("There was an error submitting the lead:", error);
      alert("Error submitting the lead. Please try again.");
    }
  };


  const validateForm2 = () => {
    let valid = true;
    const newErrors2 = { ...errors };

    if (formDatanew.contactNumber.charAt(0) === '0') {
      setErrors(prevErrors1 => ({
        ...prevErrors1,
        contactNumber: 'Mobile number should not start with 0.'
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
    if (!emailRegex.test(formDatanew.emailId)) {
      newErrors2.emailId = 'Please enter a valid email address.';
      valid = false;
    } else {
      newErrors2.emailId = '';
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formDatanew.contactNumber)) {
      newErrors2.contactNumber = 'Please enter a valid 10-digit mobile number.';
      valid = false;
    } else {
      newErrors2.contactNumber = '';
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
        <img src={City} alt="Image 2" className="sm:h-[460px] w-[480px] mt-3" />
      </div>
      {/* Image Section */}
      {/* Text Content and Form Section */}
      <div className="w-full md:w-1/2 md:ml-4">
        <h1 className="text-2xl font-bold mb-4">We Have Over 1 Lakh Buyers For You </h1>
        <p className="text-gray-600 mb-4">
          <strong className='text-black'>Reality One</strong> provides you with the best real estate options. Whether you are looking for a flat, house, land, or commercial property, we've got you covered.
        </p>
        {/* Form Section */}
        <form onSubmit={handleSubmit2}>
          <label htmlFor="fullName" className="block text-black mb-2">
            Your Name:
          </label>
          <input
            placeholder='Enter Your fullName'
            type="text"
            id="fullName"
            name="fullName"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.fullName}
            onChange={handleChange2}
            required
          />
          {errors.fullName && <div className="text-red-500">{errors.fullName}</div>}
          <label htmlFor="emailId" className="block text-black mb-2">
            Your Email:
          </label>
          <input
            placeholder='Write Your Email Id Please'
            type="email"
            id="emailId"
            name="emailId"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.emailId}
            onChange={handleChange2}
            required
          />
          {errors.emailId && <div className="text-red-500">{errors.emailId}</div>}
          <label htmlFor="contactNumber" className="block text-black mb-2">
            Your Mobile Number:
          </label>
          <input
            placeholder="Write Mobile Number"
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="w-full h-10 border rounded-md mb-4 px-3"
            value={formDatanew.contactNumber}
            onChange={handleChange2}
            pattern="[0-9]{10}"
            required
          />
          {errors.contactNumber && <div className="text-red-500">{errors.contactNumber}</div>}
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
