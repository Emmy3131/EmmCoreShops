import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://emmcore-shops-api.vercel.app/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach the saved authentication token when available */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;