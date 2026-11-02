import OrderStatusBadge from "./OrderStatuseBadge";
import PaymentBadge from "./PaymentBadget";

const OrderCard = ({ order, setSelectedOrder, updateOrderStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3 hover:shadow-md transition">

      {/* Top Row */}
      <div className="flex justify-between items-start">

        <div>
          <p className="font-semibold text-gray-800">
            {order.user
              ? `${order.user.firstName} ${order.user.lastName}`
              : "Deleted User"}
          </p>

          <p className="text-xs text-gray-400">
            {order.user?.email}
          </p>
        </div>

        <div className="text-xs text-gray-400">
          {new Date(order.createdAt).toLocaleDateString()}
        </div>

      </div>

      {/* Amount */}
      <div className="text-lg font-bold text-gray-800">
        ₦{order.totalPrice?.toLocaleString()}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <PaymentBadge status={order.paymentStatus} />
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      {/* Status Update */}
      <select
        value={order.orderStatus}
        onChange={(e) =>
          updateOrderStatus(order._id, e.target.value)
        }
        className="w-full mt-2 px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Action */}
      <button
        onClick={() => setSelectedOrder(order)}
        className="w-full mt-2 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"
      >
        View Details
      </button>

    </div>
  );
};

export default OrderCard;