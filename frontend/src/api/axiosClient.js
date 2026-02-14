import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Helper function to get CSRF token from cookies
const getCsrfToken = () => {
  const name = 'XSRF-TOKEN=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

// Request interceptor to add CSRF token
axiosClient.interceptors.request.use(
  (config) => {
    // Add CSRF token for mutating requests (POST, PUT, DELETE, PATCH)
    const method = config.method?.toUpperCase();
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors uniformly
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      // Log errors for debugging
      console.error(`API Error ${response.status}:`, response.data);

      // We could trigger a global toast here if we had access to the toast function
      // For now, we propagate a standardized error message
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request);
    } else {
      // Something happened in setting up the request
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
