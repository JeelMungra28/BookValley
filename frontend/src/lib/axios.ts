import axios from "axios";

// Use environment variables for API URL with fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // Only redirect to login if not already on login page and not trying to login
        if (
          !window.location.pathname.includes("/login") &&
          !error.config.url.includes("/auth/login")
        ) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      // Log other errors
      if (error.response.status === 400) {
        console.error("Bad request:", error.response.data);
      } else if (error.response.status === 429) {
        console.error("Rate limit exceeded:", error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.message);
      if (error.message === "Network Error") {
        console.error("API connection error. Please check network connection");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
