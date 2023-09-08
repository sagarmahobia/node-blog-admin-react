import axios from "axios";
import {AxiosResponse} from "axios/index";
import {GenericResponse} from "./CommonResponses";

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

class MyError extends Error {
}

export function catchError(promise: Promise<AxiosResponse<GenericResponse<any>>>) {

    return promise.then(
        (response) => {
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new MyError(response.data.message);
            }
        }
    ).catch(
        (error) => {
            throw new MyError(error.message);
        }
    );
}
