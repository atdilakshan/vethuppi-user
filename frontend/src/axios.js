import axios from "axios";

const instance = axios.create({
  // http://localhost:5000/products/1
  baseURL: "http://localhost:5000/api",

  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  },
});

export default instance;
