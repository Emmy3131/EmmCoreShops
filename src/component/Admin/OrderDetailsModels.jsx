import {
  FaUser,
  FaMapMarkerAlt,
  FaBox,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

import OrderStatusBadge from "./OrderStatuseBadge";
import PaymentBadge from "./PaymentBadget";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">
            Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
          >
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* CUSTOMER */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <FaUser className="text-pink-500" />
              <h3 className="font-semibold">Customer</h3>
            </div>

            <p className="font-medium text-gray-800">
              {order.user
                ? `${order.user.firstName} ${order.user.lastName}`
                : "Deleted User"}
            </p>

            <p className="text-sm text-gray-500">
              {order.user?.email}
            </p>
          </div>

          {/* SHIPPING */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <h3 className="font-semibold">Shipping Address</h3>
            </div>

            <p className="text-gray-700">
              {order.shippingAddress?.address}
            </p>

            <p className="text-gray-700">
              {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state}
            </p>

            <p className="text-gray-500 text-sm">
              {order.shippingAddress?.phone}
            </p>
          </div>

          {/* STATUS */}
          <div className="flex flex-wrap gap-3">
            <PaymentBadge status={order.paymentStatus} />
            <OrderStatusBadge status={order.orderStatus} />
          </div>

          {/* ITEMS */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <FaBox className="text-green-500" />
              <h3 className="font-semibold">Items</h3>
            </div>

            <div className="space-y-3">
              {order.orderItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    ₦{item.price?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center bg-pink-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-pink-600">
              <FaMoneyBillWave />
              <span className="font-semibold">Total</span>
            </div>

            <span className="text-xl font-bold text-gray-800">
              ₦{order.totalPrice?.toLocaleString()}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;