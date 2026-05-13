import { useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  // SAMPLE DATA (replace with API later)
  const orders = {
    ongoing: [
      {
        id: "ORD-1023",
        product: "Samsung Galaxy A54",
        price: "₦280,000",
        status: "Processing",
      },
    ],
    delivered: [
      {
        id: "ORD-1020",
        product: "Wireless Headset",
        price: "₦18,500",
        status: "Delivered",
      },
    ],
    cancelled: [],
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* HEADER */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          My Orders
        </h1>
      </div>

      {/* TABS */}
      <div className="flex bg-white border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

            {/* COUNT BADGE */}
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
              key={order.id}
              className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  {order.product}
                </h2>

                <p className="text-sm text-gray-500">
                  Order ID: {order.id}
                </p>

                <p className="text-[#ED017F] font-bold mt-1">
                  {order.price}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  activeTab === "ongoing"
                    ? "bg-yellow-100 text-yellow-600"
                    : activeTab === "delivered"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;