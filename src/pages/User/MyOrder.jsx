import { useState, useEffect } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingBag,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../component/UI/Button";

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
    {
      key: "ongoing",
      label: "Ongoing",
      icon: <FaClock />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: <FaCheckCircle />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      icon: <FaTimesCircle />,
      color: "text-red-500",
      bg: "bg-red-50",
    },
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
          (order) =>
            order.paymentStatus === "paid" &&
            order.orderStatus !== "delivered" &&
            order.orderStatus !== "cancelled",
        ),

        delivered: data.filter(
          (order) => order.orderStatus === "delivered",
        ),

        cancelled: data.filter(
          (order) => order.orderStatus === "cancelled",
        ),
      });
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  /* ================= LOADING ================= */

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-[var(--color-text-secondary)] font-medium">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  const activeOrders = orders[activeTab];

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">

      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <FaShoppingBag className="text-xl" />
            </div>

            <div>
              <p className="text-blue-100 text-sm">
                Your shopping activity
              </p>

              <h1 className="text-2xl md:text-3xl font-bold">
                My Orders
              </h1>
            </div>
          </div>

          <p className="text-blue-100 text-sm max-w-xl mt-4">
            Track your purchases, view order history, and stay updated
            throughout your delivery journey.
          </p>

        </div>

      </div>

      {/* ================= TABS ================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-5 relative z-10">

        <div className="bg-white rounded-2xl shadow-[var(--shadow-lg)] p-2 grid grid-cols-3 gap-2">

          {tabs.map((tab) => {

            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  rounded-xl
                  p-3
                  md:p-4
                  transition-all
                  duration-300
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-[var(--shadow-primary)]"
                      : "text-[var(--color-text-muted)] hover:bg-slate-50"
                  }
                `}
              >

                <span className="text-lg">
                  {tab.icon}
                </span>

                <span className="text-xs md:text-sm font-semibold">
                  {tab.label}
                </span>

                <span
                  className={`
                    text-xs
                    font-bold
                    ${
                      isActive
                        ? "text-blue-100"
                        : "text-[var(--color-text-light)]"
                    }
                  `}
                >
                  {orders[tab.key].length}
                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* ================= ORDER LIST ================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {activeOrders.length === 0 ? (

          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-10 md:p-16 text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center mb-5">

              {activeTab === "ongoing" && (
                <FaBox className="text-3xl" />
              )}

              {activeTab === "delivered" && (
                <FaCheckCircle className="text-3xl text-emerald-500" />
              )}

              {activeTab === "cancelled" && (
                <FaTimesCircle className="text-3xl text-red-400" />
              )}

            </div>

            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              No {activeTab} orders
            </h2>

            <p className="text-[var(--color-text-muted)] mt-2 mb-6">
              You don't have any orders in this section yet.
            </p>

            {activeTab === "ongoing" && (
              <Button
                variant="gradient"
                icon={<FaShoppingBag />}
                onClick={() => navigate("/products")}
              >
                Start Shopping
              </Button>
            )}

          </div>

        ) : (

          <div className="space-y-5">

            {activeOrders.map((order) => (

              <div
                key={order._id}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[var(--color-border)]
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:shadow-[var(--shadow-lg)]
                "
              >

                {/* ORDER HEADER */}

                <div className="p-4 md:p-5 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  <div>

                    <div className="flex items-center gap-2">

                      <FaBox className="text-blue-600" />

                      <h2 className="font-bold text-[var(--color-text-primary)]">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>

                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                  </div>

                  <span
                    className={`
                      self-start
                      md:self-auto
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      capitalize
                      ${
                        order.orderStatus === "delivered"
                          ? "bg-emerald-50 text-emerald-600"
                          : order.orderStatus === "cancelled"
                            ? "bg-red-50 text-red-600"
                            : "bg-blue-50 text-blue-600"
                      }
                    `}
                  >
                    {order.orderStatus}
                  </span>

                </div>

                {/* PRODUCTS */}

                <div className="p-4 md:p-5 space-y-4">

                  {order.orderItems.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between gap-4"
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                            {item.name}
                          </p>

                          <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                      </div>

                      <p className="font-bold text-sm text-[var(--color-text-primary)] whitespace-nowrap">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>

                    </div>

                  ))}

                </div>

                {/* FOOTER */}

                <div className="bg-slate-50 px-4 md:px-5 py-4 flex items-center justify-between">

                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Order Total
                  </span>

                  <span className="text-lg font-bold text-blue-600">
                    ₦{order.totalPrice.toLocaleString()}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyOrder;