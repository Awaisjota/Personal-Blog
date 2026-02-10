import axios from "axios";

const API = axios.create({
  baseURL: "https://devblogbackend-z1lgzmx0.b4a.run/",
});

// Automatically attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

// http://localhost:5000/api
