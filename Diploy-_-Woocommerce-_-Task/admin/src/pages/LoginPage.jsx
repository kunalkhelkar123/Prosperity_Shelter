import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data.message || "Login Failed");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          className="border w-full p-2 mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-4">
          <input
            className="border w-full p-2"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2 mb-4 hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center text-sm">
          <p>New user? 
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-600 ml-1 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
