import axios from "axios";
import { BASE_URL } from "../environment";

const apiClient = axios.create({
    baseURL: BASE_URL
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