import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://carstorepk.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiCall;
