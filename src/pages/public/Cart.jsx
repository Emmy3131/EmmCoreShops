import api from "../../library/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  /* ================= REMOVE ITEM ================= */
  const handleRemove = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 pt-14">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ================= CART ITEMS ================= */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty 🛒
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity || 1}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="font-bold text-green-600">
                    ₦{(item.price || 0).toLocaleString()}
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="w-full lg:w-1/3 bg-white p-5 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

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
      </div>
    </div>
  );
};

export default Cart;