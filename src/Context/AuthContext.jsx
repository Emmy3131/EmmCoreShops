import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import api from "../library/api";

import {
  getGuestCartItems,
  clearGuestCart,
} from "../library/guestCart";

const AuthContext = createContext(null);

/* =====================================================
   MERGE GUEST CART AFTER LOGIN
===================================================== */

const mergeGuestCart = async () => {
  try {
    const guestItems = getGuestCartItems();

    if (!Array.isArray(guestItems) || guestItems.length === 0) {
      return;
    }

    for (const item of guestItems) {
      const productId = item.product?._id;

      if (!productId || !item.quantity) {
        console.warn("Skipping invalid guest cart item:", item);
        continue;
      }

      await api.post("/cart", {
        productId,
        quantity: item.quantity,
      });
    }

    clearGuestCart();

    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error(
      "Guest cart merge failed:",
      error.response?.data?.message || error.message
    );
  }
};

/* =====================================================
   AUTH PROVIDER
===================================================== */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     INITIALIZE AUTHENTICATION
  ===================================================== */

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Display cached user while the backend verifies the token.
    if (storedUser) {
      try {
        setUser({
          ...JSON.parse(storedUser),
          token,
        });
      } catch {
        localStorage.removeItem("user");
      }
    }

    try {
      const response = await api.get("/users/me");

      if (response.data?.status === "success") {
        const responseData = response.data.data;

        // Support either { data: { user } } or { data: user }.
        const freshUser = responseData?.user || responseData;

        if (!freshUser || typeof freshUser !== "object") {
          throw new Error("The authentication response contains no user.");
        }

        const authenticatedUser = {
          ...freshUser,
          token,
        };

        setUser(authenticatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(authenticatedUser)
        );
      } else {
        setUser(null);
      }
    } catch (error) {
      const statusCode = error.response?.status;

      if (statusCode === 401 || statusCode === 403) {
        // The backend rejected the token.
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } else {
        // Network errors and server failures should not automatically
        // erase an otherwise valid cached login.
        console.error(
          "Could not verify authentication:",
          error.response?.data?.message || error.message
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = async (userData, token) => {
    if (!userData || !token) {
      throw new Error("Login requires both user data and a token.");
    }

    const authenticatedUser = {
      ...userData,
      token,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));

    setUser(authenticatedUser);

    // A cart merge failure should not undo a successful login.
    await mergeGuestCart();
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    // Send the logout request before removing the saved token.
    // The client still logs out if the backend is unavailable.
    api.post("/users/logout").catch((error) => {
      console.warn(
        "Backend logout request failed:",
        error.response?.data?.message || error.message
      );
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =====================================================
   AUTH HOOK
===================================================== */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
};