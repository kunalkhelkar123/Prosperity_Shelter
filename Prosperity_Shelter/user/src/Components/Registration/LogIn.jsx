import axios from "axios";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import bgImage from "./loginbg2.jpg"

// ... existing imports and state setup

function LogIn() {
  const navigate = useNavigate();

  // Single formData object for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Loading state to show a loading indicator
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Basic email validation
    if (!email.trim()) {
      return toast.error("Please enter your email");
    }

    // Basic password validation
    if (!password.trim()) {
      return toast.error("Please enter your password");
    }

    try {
      setLoading(true);  // Set loading state to true while the request is being made

      const response = await axios.post("/api/auth/login", formData);

      console.log("Login response:", response.data);
      console.log("Login response accessToken:", response.data.accessToken);

      // Check if login was successful
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("admin", JSON.stringify(response.data.admin));

        console.log("Access token from session ==> ", sessionStorage.getItem("token"));

        // Redirect user to dashboard upon successful login
        navigate("/admin/dashboard");

        // Clear form data
        setFormData({
          email: "",
          password: "",
        });

        // Display success message
        toast.success("Logged in successfully!");
      } else {
        // If response status is not 200, display error message
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle error response
      console.error("Error logging in:", error);

      // Display error message based on response status
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect email or password.");
      } else {
        toast.error("An error occurred during login.");
      }
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { email, password } = formData;
  //   const SECRET_KEY = "kunaljdsdbfhdsbf765havsd78@jhasdvr64646%#%#%^";
  //   // Basic email validation
  //   if (!email.trim()) {
  //     return toast.error("Please enter your email");
  //   }

  //   // Basic password validation
  //   if (!password.trim()) {
  //     return toast.error("Please enter your password");
  //   }

  //   try {
  //     setLoading(true);  // Set loading state to true while the request is being made

  //     const response = await axios.post("/api/auth/login", formData);

  //     console.log("Login response:", response.data);
  //     console.log("Login response accessToken:", response.data.accessToken);

  //     // Check if login was successful
  //     if (response.status === 200) {
  //       sessionStorage.setItem("token", response.data.accessToken);
  //       // sessionStorage.setItem("admin", JSON.stringify(response.data.admin));
  //       const encryptedAdmin = CryptoJS.AES.encrypt(
  //         JSON.stringify(response.data.admin),
  //         SECRET_KEY
  //       ).toString();
  //       sessionStorage.setItem("admin", encryptedAdmin);
  //       console.log("Access token from session ==> ", sessionStorage.getItem("token"));
  //       console.log("Access token from admin ==> ", sessionStorage.getItem("admin"));

  //       // Redirect user to dashboard upon successful login
  //       navigate("/admin/dashboard");

  //       // Clear form data
  //       setFormData({
  //         email: "",
  //         password: "",
  //       });

  //       // Display success message
  //       toast.success("Logged in successfully!");
  //     } else {
  //       // If response status is not 200, display error message
  //       toast.error("Login failed. Please check your credentials.");
  //     }
  //   } catch (error) {
  //     // Handle error response
  //     console.error("Error logging in:", error);

  //     // Display error message based on response status
  //     if (error.response && error.response.status === 401) {
  //       toast.error("Incorrect email or password.");
  //     } else {
  //       toast.error("An error occurred during login.");
  //     }
  //   } finally {
  //     setLoading(false); // Set loading state to false after the request completes
  //   }
  // };

  return (
    <div 
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${bgImage})` }}
>
      <div className="bg-[#390255] p-8 rounded-lg shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <Link to={"/"} ><img src={logo} alt="Logo" className="h-20 mx-auto w-20 mb-4" /></Link>
          <h2 className="text-5xl font-semibold text-white">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-lg text-white font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 mt-6 transform -translate-y-1/2 text-sm text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-[#FFF848] text-2xl font-semibold text-[#390255] py-2 px-1 rounded-lg hover:bg-white hover:text-[#390255] ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}  // Disable button while loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Need to log in as staff?
            <Link
              to="/staff"
              className="ml-2 text-[#FFF848] font-semibold hover:underline"
            >
              Login as Staff
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
