// src/axiosInstance.js
import axios from "axios";

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default axiosInstance;
