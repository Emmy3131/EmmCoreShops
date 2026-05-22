import { useState, useEffect } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState("ongoing");

  const [orders, setOrders] = useState({
    ongoing: [],
    delivered: [],
    cancelled: [],
  });

  /* ================= TABS ================= */
  const tabs = [
    {
      key: "ongoing",
      label: "Ongoing",
      icon: <FaBox />,
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: <FaCheckCircle />,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      icon: <FaTimesCircle />,
    },
  ];

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orders/my-orders");

      if (res.data.status !== "success") {
        console.error(
          "Failed to fetch orders:",
          res.data
        );
        return;
      }

      const data = res.data.data || [];

      setOrders({
        ongoing: data.filter(
          (order) =>
            order.status === "processing" ||
            order.status === "shipped" ||
            order.status === "ongoing"
        ),

        delivered: data.filter(
          (order) =>
            order.status === "delivered"
        ),

        cancelled: data.filter(
          (order) =>
            order.status === "cancelled"
        ),
      });
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD ORDERS ================= */
  useEffect(() => {
    if (!user) return;

    fetchOrders();
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
      {/* HEADER */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          My Orders
        </h1>
      </div>

      {/* TABS */}
      <div className="flex bg-white border-b sticky top-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key)
            }
            className={`flex-1 py-3 flex flex-col items-center text-sm transition ${
              activeTab === tab.key
                ? "text-[#ED017F] border-b-2 border-[#ED017F]"
                : "text-gray-500"
            }`}
          >
            {tab.icon}

            <span className="mt-1">
              {tab.label}
            </span>

            {/* COUNT */}
            <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full mt-1">
              {orders[tab.key].length}
            </span>
          </button>
        ))}
      </div>

      {/* ORDER LIST */}
      <div className="p-4 space-y-4">
        {orders[activeTab].length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No orders available
          </div>
        ) : (
          orders[activeTab].map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    order.status ===
                    "processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status ===
                        "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status ===
                        "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="mt-4 space-y-2">
                {order.orderItems?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="text-gray-500">
                          Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-[#ED017F]">
                        ₦
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* TOTAL */}
              <div className="border-t mt-4 pt-3 flex justify-between font-bold">
                <span>Total</span>

                <span>
                  ₦
                  {order.totalPrice?.toLocaleString()}
                </span>
              </div>

              {/* PAYMENT */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Payment:
                </span>

                <span
                  className={`text-sm font-medium ${
                    order.paymentStatus ===
                    "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {order.paymentStatus ||
                    "pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;