import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error.response || error);
        
        // Handle specific error cases
        if (error.response) {
            if (error.response.status === 401) {
                // Only redirect to login if not already on login page
                if (!window.location.pathname.includes('/login')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            } else if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
            } else if (error.response.status === 429) {
                console.error('Rate limit exceeded:', error.response.data);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api; 