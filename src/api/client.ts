import axios from "axios";
// import { BASE_URL } from "../environment";

const apiClient = axios.create({
    baseURL: "https://bnc-be.onrender.com"
})


apiClient.interceptors.response.use(response => {
    return response
}, error => {
    if (error.status === 401) {
        console.log("unauthorized")
        // clear cookies
        // redirect window
    }
    return Promise.reject(error)
})

export default apiClient;