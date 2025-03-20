// axiosConfig.js
import axios from "axios";

// Create an Axios instance
const axiosinstance = axios.create({
    baseURL: "http://localhost:8080/", // Replace with your API base URL
    timeout: 300000, // Request timeout
});

// Add an interceptor to include the token
axiosinstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosinstance;
