import OrderStatusBadge from "./OrderStatuseBadge";
import PaymentBadge from "./PaymentBadget";

const OrderTable = ({
  orders,
  setSelectedOrder,
  updateOrderStatus,
}) => {
  return (
    <div className="bg-white rounded-2xl hidden md:block shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-4 shadow-sm bg-gray-50">
        <h2 className="font-semibold text-gray-700">
          Orders List
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-left bg-white sticky top-0 z-10">
            <tr className="text-gray-500 border-b">
              <th className="p-4">Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-10 text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order._id}
                className=" shadow-sm hover:bg-gray-50 transition"
              >

                {/* Customer */}
                <td className="p-4">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      {order.user
                        ? order.user.firstName?.charAt(0)
                        : "U"}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {order.user
                          ? `${order.user.firstName} ${order.user.lastName}`
                          : "Deleted User"}
                      </p>

                      <p className="text-xs text-gray-400">
                        {order.user?.email}
                      </p>
                    </div>

                  </div>
                </td>

                {/* Total */}
                <td className="font-semibold text-gray-700">
                  ₦{order.totalPrice?.toLocaleString()}
                </td>

                {/* Payment */}
                <td>
                  <PaymentBadge status={order.paymentStatus} />
                </td>

                {/* Status */}
                <td>
                  <OrderStatusBadge status={order.orderStatus} />
                </td>

                {/* Date */}
                <td className="text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OrderTable;