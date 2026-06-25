import { useEffect, useState } from "react";
import api from "../../library/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE ORDER STATUS ================= */
  const updateOrderStatus = async (id, orderStatus) => {
    try {
      await api.patch(`/orders/${id}`, {
        orderStatus,
      });

      fetchOrders();
    } catch (err) {
      console.error("Update order error:", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="md:p-6 p-3">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">
                  {order.user
                    ? `${order.user.firstName} ${order.user.lastName}`
                    : "Deleted User"}
                </td>

                <td className="p-3">
                  ₦{order.totalPrice?.toLocaleString()}
                </td>

                {/* PAYMENT STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </td>

                {/* ORDER STATUS */}
                <td className="p-3">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {order.user
                  ? `${order.user.firstName} ${order.user.lastName}`
                  : "Deleted User"}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mb-2">
              <span className="font-bold">
                ₦{order.totalPrice?.toLocaleString()}
              </span>
            </div>

            {/* PAYMENT STATUS */}
            <div className="mb-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus || "pending"}
              </span>
            </div>

            {/* ORDER STATUS */}
            <div className="mb-3">
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateOrderStatus(order._id, e.target.value)
                }
                className="border p-2 rounded w-full"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedOrder(order)}
              className="text-blue-500 text-sm"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* CUSTOMER */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Customer Info</h3>

              <p>
                Name:{" "}
                {selectedOrder.user
                  ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}`
                  : "Deleted User"}
              </p>

              <p>Email: {selectedOrder.user?.email}</p>
            </div>

            {/* SHIPPING */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Shipping Address</h3>

              <p>{selectedOrder.shippingAddress?.fullName}</p>
              <p>{selectedOrder.shippingAddress?.phone}</p>
              <p>{selectedOrder.shippingAddress?.address}</p>
              <p>
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state}
              </p>
            </div>

            {/* ITEMS */}
            <div>
              <h3 className="font-semibold mb-3">Ordered Items</h3>

              <div className="space-y-3">
                {selectedOrder.orderItems?.map((item, index) => (
                  <div key={index} className="border rounded p-3">
                    <p className="font-medium">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₦{item.price?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-5 text-right font-bold text-lg">
              Total: ₦{selectedOrder.totalPrice?.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;