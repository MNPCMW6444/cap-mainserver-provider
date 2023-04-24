import axios from "axios";
import domain from "../config/domain.js";
import { createContext } from "react";

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const MainServerContext = createContext(axiosInstance);

export { MainServerContext };
