import axios from "axios";

const API = "/api/auth";

const login = (email, password) =>
  axios.post(`${API}/login`, { email, password }).then((res) => {
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("userId", res.data.userId);

    return res.data;
  });

const register = (name, email, password) =>
  axios.post(`${API}/register`, { name, email, password });

export default { login, register };
