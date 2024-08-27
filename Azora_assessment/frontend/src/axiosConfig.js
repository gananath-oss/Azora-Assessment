import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",

    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))?.token || ""
    }`,
  },
  withCredentials: true,
});

export default axiosInstance;
