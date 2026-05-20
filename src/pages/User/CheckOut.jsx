import { useState, useEffect } from "react";
import api from "../../library/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const CheckOut = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");

        const items = res.data.data?.items || [];

        setCartItems(items);

        const sum = items.reduce(
          (acc, item) =>
            acc + Number(item.price || 0) * Number(item.quantity || 1),
          0
        );

        setTotal(sum);
      } catch (err) {
        console.error("Cart error:", err);
      }
    };

    fetchCart();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= VALIDATE ADDRESS ================= */
  const validateAddress = () => {
    return (
      address.fullName &&
      address.phone &&
      address.state &&
      address.city &&
      address.address
    );
  };

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    if (!validateAddress()) {
      return alert("Please fill all delivery details");
    }

    try {
      setLoading(true);

      const res = await api.post("/orders/checkout", {
        shippingAddress: address,
      });

      const paymentUrl = res.data.data.authorizationUrl;

      if (!paymentUrl) {
        throw new Error("No payment URL returned");
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* DELIVERY ADDRESS */}
        <div className="flex-1 bg-white p-5 rounded shadow">
          <h2 className="font-semibold mb-4">Delivery Address</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-3 rounded" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-3 rounded" />
            <input name="state" placeholder="State" onChange={handleChange} className="border p-3 rounded" />
            <input name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded" />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="border p-3 rounded md:col-span-2"
            />
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-5 rounded shadow sticky top-20">

            <h2 className="font-semibold mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 bg-[#ED017F] text-white py-3 rounded"
            >
              {loading ? "Redirecting..." : "Pay with Paystack"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;