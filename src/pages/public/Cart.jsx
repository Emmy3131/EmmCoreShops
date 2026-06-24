import api from "../../library/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  // loading states
  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  /* ================= CHECKOUT ================= */
  const handleCheckout = () => {
    navigate("/checkout");
  };

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await api.get("/cart");

      console.log("Cart response:", res.data);

      const data = res.data.data;

      const items = data?.items || [];

      setCartItems(items);

      // safe total calculation
      const sum = items.reduce((acc, item) => {
        return acc + (item.price || 0) * (item.quantity || 1);
      }, 0);

      setTotal(sum);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD CART ================= */
  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= UPDATE QUANTITY ================= */
 const handleQuantityChange = async (productId, type) => {
  try {
    const quantity = type === "increase" ? 1 : -1;

    const res = await api.patch("/cart/update", {
      productId,
      quantity,
    });

    if (res.data.status === "success") {
      fetchCart();
    }
  } catch (err) {
    console.error(
      "Quantity update error:",
      err.response?.data || err.message
    );
  }
};

  /* ================= REMOVE ITEM ================= */
  const handleRemove = async (id) => {
    try {
      setRemovingId(id);

      const res = await api.delete(`/cart/${id}`);

      if (res.data.status === "success") {
        fetchCart();
      } else {
        console.error("Failed to remove item:", res.data);
      }
    } catch (err) {
      console.error(
        "Remove cart item error:",
        err.response?.data || err.message,
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* ================= CLEAR CART ================= */
  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the cart?",
    );

    if (!confirmClear) return;

    try {
      setClearing(true);

      const res = await api.delete("/cart");

      if (res.data.status === "success") {
        fetchCart();
      } else {
        console.error("Failed to clear cart:", res.data);
      }
    } catch (err) {
      console.error("Clear cart error:", err.response?.data || err.message);
    } finally {
      setClearing(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 pt-14">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ================= CART ITEMS ================= */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-12 min-h-[400px]">
              <div className="text-6xl mb-4">🛒</div>

              <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>

              <p className="text-gray-500 mb-6">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between"
              >
                {/* PRODUCT INFO */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>

                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, "decrease")
                          }
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          -
                        </button>
                          <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, "increase")
                          }
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="font-bold text-green-600 mt-1">
                      ₦{(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    disabled={removingId === item.product._id}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {removingId === item.product._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* ================= SUMMARY ================= */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 space-y-4">
            {/* ORDER SUMMARY */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Delivery</span>
                <span>₦0</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* CLEAR CART */}
            <div className="bg-white p-5 rounded-lg shadow">
              <button
                onClick={handleClearCart}
                disabled={clearing}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition disabled:opacity-50"
              >
                {clearing ? "Clearing..." : "Clear Cart"}
              </button>
            </div>
          </div>
        )}{" "}
        {/* ✅ THIS CLOSES THE CONDITION PROPERLY */}
      </div>
    </div>
  );
};

export default Cart;
