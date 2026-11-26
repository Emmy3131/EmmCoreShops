
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

/* =====================================================
   HANDLE EXPIRED AUTHENTICATION
===================================================== */

let isRedirectingToLogin = false;

const handleExpiredSession = () => {
  if (isRedirectingToLogin) return;

  const currentPath =
    window.location.pathname + window.location.search;

  // Do not redirect repeatedly when already on login.
  if (window.location.pathname === "/login") return;

  isRedirectingToLogin = true;

  // Remove expired authentication information.
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Notify AuthContext and other components.
  window.dispatchEvent(new Event("auth:session-expired"));

  // Preserve the page the user was trying to access.
  const redirect =
    window.location.pathname !== "/"
      ? `&redirect=${encodeURIComponent(currentPath)}`
      : "";

  window.location.replace(
    `/login?reason=session-expired${redirect}`
  );
};

/* =====================================================
   REQUEST INTERCEPTOR
===================================================== */

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

/* =====================================================
   RESPONSE INTERCEPTOR
===================================================== */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const config = error.config;

    const requestUrl = config?.url || "";

    // Do not treat incorrect login credentials as expired sessions.
    const isLoginRequest =
      requestUrl.includes("/users/login");

    // Only expire a session when an authenticated request fails.
    const hasAuthToken = Boolean(
      config?.headers?.Authorization ||
      config?.headers?.authorization
    );

    if (
      status === 401 &&
      hasAuthToken &&
      !isLoginRequest
    ) {
      handleExpiredSession();
    }

    return Promise.reject(error);
  }
);

export default api;
