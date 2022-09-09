import axios from "axios";

const apiCall = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiCall;
