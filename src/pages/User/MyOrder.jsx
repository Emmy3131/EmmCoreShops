import { useState, useEffect } from "react";
import { FaBox, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ongoing");

  const [orders, setOrders] = useState({
    ongoing: [],
    delivered: [],
    cancelled: [],
  });

  const tabs = [
    { key: "ongoing", label: "Ongoing", icon: <FaBox /> },
    { key: "delivered", label: "Delivered", icon: <FaCheckCircle /> },
    { key: "cancelled", label: "Cancelled", icon: <FaTimesCircle /> },
  ];

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orders/my-orders");

      const data = res.data?.data || [];

      setOrders({
        ongoing: data.filter(
          (o) => o.orderStatus === "paid"
        ),

        delivered: data.filter(
          (o) => o.isDelivered === true
        ),

        cancelled: data.filter(
          (o) => o.orderStatus === "cancelled"
        ),
      });

    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  /* ================= LOADING ================= */
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      <div className="bg-white p-4 shadow">
        <h1 className="text-xl font-semibold">My Orders</h1>
      </div>

      {/* TABS */}
      <div className="flex bg-white border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-sm ${
              activeTab === tab.key
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500"
            }`}
          >
            {tab.icon}
            <div>{tab.label}</div>
            <div className="text-xs">
              {orders[tab.key].length}
            </div>
          </button>
        ))}
      </div>

      {/* ORDERS */}
      <div className="p-4 space-y-4">
        {orders[activeTab].length === 0 ? (
          <p className="text-center text-gray-400">
            No orders found
          </p>
        ) : (
          orders[activeTab].map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">

              <h2 className="font-semibold">
                Order #{order._id.slice(-6)}
              </h2>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.orderItems.map((item, i) => (
                <div key={i} className="flex justify-between text-sm mt-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="border-t mt-3 pt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>₦{order.totalPrice.toLocaleString()}</span>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;