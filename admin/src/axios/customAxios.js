import axios from "axios";
import { toast } from "react-toastify";

const customAxios = axios.create({
    baseURL: 'http://localhost:8000'
});


customAxios.defaults.withCredentials = true;

// if (typeof localStorage !== 'undefined') {
//     const accessToken = localStorage.getItem('accessToken');
//     const storedJWT = JSON.parse(accessToken);
//     if (storedJWT) {
//         customAxios.defaults.headers.common['Authorization'] = `Bearer ${storedJWT}`;
//     }

// }

customAxios.interceptors.request.use(function (config) {

    if (typeof localStorage !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        const storedJWT = JSON.parse(accessToken);
        if (storedJWT) {
            config.headers['Authorization'] = `Bearer ${storedJWT}`;
        }
    
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
customAxios.interceptors.response.use(function (response) {
    // return response.data;
    return response;
}, function (error) {
    const status = error.response?.status || 500;

    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error(error.response.data.message);
            break;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error(error.response.data.message);
            break;
        }

        // bad request
        case 400: {
            toast.error(error.response.data.message);
            break;
        }

        // not found
        case 404: {
            toast.error(error.response.data.message);
            break;
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }
});

export default customAxios;
