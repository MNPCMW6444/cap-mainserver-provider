import axios from "axios";
import domain from "../config/domain";
import { createContext } from "react";
var axiosInstance = axios.create({
    baseURL: domain,
    timeout: 4000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
var MainServerContext = createContext(axiosInstance);
export { MainServerContext };
