import axios from "axios";

export const apiRest = axios.create({
    baseURL: "/api",
    
});