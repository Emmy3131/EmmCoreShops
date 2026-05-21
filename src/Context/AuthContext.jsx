import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
      RESTORE SESSION
  =========================*/
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        setUser({
          token,
        });
      } catch (err) {
        console.log("Invalid token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  /* =========================
      LOGIN
  =========================*/
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser({
      ...userData,
      token,
    });
  };

  /* =========================
      LOGOUT
  =========================*/
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);