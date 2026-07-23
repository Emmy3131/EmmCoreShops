import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../library/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /* =========================================
     FETCH CART COUNT
  ========================================= */

  const fetchCartCount = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/cart");

      const items = res.data?.data?.items || [];

      const count = items.reduce(
        (total, item) => total + (item.quantity || 0),
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
     AUTO FETCH WHEN USER CHANGES
  ========================================= */

  useEffect(() => {
    fetchCartCount();
  }, [user]);

  /* =========================================
     REFRESH AFTER CART CHANGES
  ========================================= */

  const refreshCartCount = async () => {
    await fetchCartCount();
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        refreshCartCount,
        loading,
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