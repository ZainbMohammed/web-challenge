import axios from 'axios';
import { BASE_URL } from './constants';

// Create an Axios instance with a predefined base URL, timeout, and default headers for JSON content.
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
    },
});

// Add a request interceptor to include the token from localStorage in the Authorization header if it exists.
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance