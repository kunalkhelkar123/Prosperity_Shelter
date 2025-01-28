import axios from "axios";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StaffLogIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Frontend validation
    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }
    if (!password.trim()) {
      return toast.error("Please enter your password.");
    }

    try {
      setLoading(true);
      // Send login request to the backend
      const response = await axios.post("api/auth/stafflogin", formData);
      // Successful response
      console.log("staff user ==> ", response.data.user);
      toast.success(response.data.message);
      // Redirect and set token
      // Storing the user object in sessionStorage
      sessionStorage.setItem("token", response.data.accessToken);

      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/staff/dashboard");

      // Clear form data
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);

      // Handle errors based on response status
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat opacity px-4 sm:px-6 lg:px-8">
      <div className="bg-[#390255] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-16 sm:h-20 mx-auto w-16 sm:w-20 mb-4"
            />
          </Link>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Staff Login
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-base sm:text-lg text-white font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-base sm:text-lg text-white font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* Show Password Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-black text-sm focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-[#FFF848] text-xl sm:text-2xl font-semibold text-[#390255] py-2 px-1 rounded-lg hover:bg-white hover:text-[#390255] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Need to log in as Admin?
            <Link
              to="/admin"
              className="ml-2 text-[#FFF848] font-semibold hover:underline"
            >
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StaffLogIn;
