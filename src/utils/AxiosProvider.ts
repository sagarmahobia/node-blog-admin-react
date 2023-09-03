import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000, // Timeout for requests in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding custom headers
api.interceptors.request.use(config => {
    // Add authentication headers, tokens, etc. here
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
});

//
// api.interceptors.response.use(
//     response => {
//         // Handle success cases here
//         return response;
//     },
//     error => {
//         // Handle error cases here
//         return Promise.reject(error);
//     }
// );


export default api;
