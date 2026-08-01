import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../library/api";
import { useAuth } from "./AuthContext";
import { getGuestCartCount } from "../library/guestCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /* =========================================
     FETCH CART COUNT
  ========================================= */

  const fetchCartCount = async () => {
    // ===========================
    // GUEST USER
    // ===========================
    if (!user) {
      setCartCount(getGuestCartCount());
      return;
    }

    // ===========================
    // LOGGED IN USER
    // ===========================
    try {
      setLoading(true);

      const res = await api.get("/cart");

      const items = res.data?.data?.items || [];

      const count = items.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error(
        "Cart count error:",
        error.response?.data || error.message
      );

      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     REFRESH FUNCTION
  ========================================= */

  const refreshCartCount = async () => {
    await fetchCartCount();
  };

  /* =========================================
     AUTO REFRESH
  ========================================= */

  useEffect(() => {
    fetchCartCount();

    const refresh = () => {
      fetchCartCount();
    };

    // Logged-in cart updates
    window.addEventListener(
      "cart-updated",
      refresh
    );

    // Guest cart updates
    window.addEventListener(
      "guest-cart-updated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        refresh
      );

      window.removeEventListener(
        "guest-cart-updated",
        refresh
      );
    };
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        loading,
        refreshCartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};