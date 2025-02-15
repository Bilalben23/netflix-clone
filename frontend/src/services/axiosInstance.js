import axios from "axios";


console.log(import.meta.env.VITE_REACT_APP_BACKEND_BASEURL);


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
    withCredentials: true
})

export default axiosInstance;

