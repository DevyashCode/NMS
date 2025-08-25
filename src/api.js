import axios from "axios";
import { ACCESS_TOKEN } from "./token";

const apiUrl = "/choreo-api/awbo/backend/rest-api-be2/v1.0/";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;  
        }
        
        const google_access_token = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
        if (google_access_token){
            config.headers["X-Google-Access-Token"] = google_access_token;
        }
        return config;   
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;