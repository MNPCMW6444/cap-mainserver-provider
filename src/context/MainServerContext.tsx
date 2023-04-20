import axios from "axios";
import domain from "../config/domain";
import { createContext } from "react";

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MainServerContext = createContext(axiosInstance);
