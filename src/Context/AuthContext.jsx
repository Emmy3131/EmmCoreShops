import { createContext, useContext, useEffect, useState } from "react";
import api from "../library/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= INIT AUTH ================= */
  const initAuth = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // 🚨 If no token, stop immediately
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // ⚡ STEP 1: show cached user immediately (prevents flicker)
    if (storedUser) {
      try {
        setUser({
          ...JSON.parse(storedUser),
          token,
        });
      } catch (e) {
        console.log("Invalid cached user");
      }
    }

    // ⚡ STEP 2: verify with backend
    try {
      const res = await api.get("/user/me");

      if (res.data.status === "success") {
        const freshUser = {
          ...res.data.data.user,
          token,
        };

        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Auth failed:", err);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RUN ON START ================= */
  useEffect(() => {
    initAuth();
  }, []);

  /* ================= LOGIN ================= */
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser({
      ...userData,
      token,
    });
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);