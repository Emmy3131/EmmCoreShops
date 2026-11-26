
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
  removeGuestItem,
} from "../library/guestCart";

const AuthContext = createContext(null);

/* =====================================================
   GET PRODUCT ID FROM GUEST CART ITEM
===================================================== */

const getGuestProductId = (item) => {
  const product = item?.product;

  if (!product) return null;

  if (typeof product === "string") {
    return product;
  }

  return product._id || product.id || null;
};

/* =====================================================
   MERGE GUEST CART AFTER LOGIN
===================================================== */

const mergeGuestCart = async () => {
  const guestItems = getGuestCartItems();

  if (!Array.isArray(guestItems) || guestItems.length === 0) {
    return {
      successCount: 0,
      failedCount: 0,
    };
  }

  let successCount = 0;
  let failedCount = 0;

  for (const item of guestItems) {
    const productId = getGuestProductId(item);
    const quantity = Number(item?.quantity);

    if (
      !productId ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      console.warn("Invalid guest cart item:", item);
      failedCount++;
      continue;
    }

    try {
      // Send the guest item to the authenticated user's database cart.
      await api.post("/cart", {
        productId: String(productId),
        quantity,
      });

      // Remove this guest item only after the backend confirms success.
      removeGuestItem(String(productId));

      successCount++;
    } catch (error) {
      failedCount++;

      console.error(
        `Could not merge product ${productId}:`,
        error.response?.data?.message || error.message
      );
    }
  }

  // Notify components that display cart information.
  window.dispatchEvent(new Event("cart-updated"));
  window.dispatchEvent(new Event("guest-cart-updated"));

  return {
    successCount,
    failedCount,
  };
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
        const freshUser = responseData?.user || responseData;

        if (!freshUser || typeof freshUser !== "object") {
          throw new Error("Invalid authentication response.");
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

        // Retry any guest cart items left from a previous failed merge.
        await mergeGuestCart();
      } else {
        setUser(null);
      }
    } catch (error) {
      const statusCode = error.response?.status;

      if (statusCode === 401 || statusCode === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } else {
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
      throw new Error("Login requires user data and a token.");
    }

    const authenticatedUser = {
      ...userData,
      token,
    };

    // Save token before making cart requests.
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(authenticatedUser)
    );

    setUser(authenticatedUser);

    // Login remains successful even if cart merging fails.
    const mergeResult = await mergeGuestCart();

    return mergeResult;
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    api.post("/users/logout").catch((error) => {
      console.warn(
        "Backend logout request failed:",
        error.response?.data?.message || error.message
      );
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.dispatchEvent(new Event("cart-updated"));
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
