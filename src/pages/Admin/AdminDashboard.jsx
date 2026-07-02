import {
  FaUsers,
  FaShoppingCart,
  FaStore,
  FaMoneyBillWave,
  FaClock,
  FaCog,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import SalesChart from "../../component/Admin/SalesChart";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrder = () => navigate("/admin/orders");
  const handleUser = () => navigate("/admin/users");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  });

  /* ================= STATS ================= */
  const handleStats = async () => {
    try {
      const res = await api.get("/stats/dashboard-stats");
      setStats(res.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleStats();
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="bg-blue-500"
        />
        <StatCard
          title="Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
          color="bg-green-500"
        />
        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={<FaStore />}
          color="bg-purple-500"
        />
        <StatCard
          title="Revenue"
          value={stats.totalRevenue}
          icon={<FaMoneyBillWave />}
          color="bg-pink-500"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<FaClock />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Processing Orders"
          value={stats.processingOrders}
          icon={<FaCog />}
          color="bg-blue-500"
        />

        <StatCard
          title="Shipped Orders"
          value={stats.shippedOrders}
          icon={<FaTruck />}
          color="bg-indigo-500"
        />

        <StatCard
          title="Delivered Orders"
          value={stats.deliveredOrders}
          icon={<FaCheckCircle />}
          color="bg-green-600"
        />

        <StatCard
          title="Cancelled Orders"
          value={stats.cancelledOrders}
          icon={<FaTimesCircle />}
          color="bg-red-500"
        />
      </div>

      {/* CHART + ACTIONS */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Sales Overview</h2>
          <SalesChart />
        </div>

        <div className="bg-white p-5 rounded-xl shadow space-y-3">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <button
            onClick={handleUser}
            className="w-full bg-pink-600 text-white py-2 rounded"
          >
            Manage Users
          </button>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            View Orders
          </button>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 shadow-sm flex justify-between">
          <h2 className="font-semibold">Recent Orders</h2>
          <button onClick={handleOrder} className="text-pink-600 text-sm">
            View All
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id} className=" shadow  hover:bg-gray-50">
                <td className="p-3 font-medium">#{order._id.slice(-6)}</td>

                <td className="p-3">
                  {order.user
                    ? `${order.user.firstName} ${order.user.lastName}`
                    : "Deleted User"}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {order.orderStatus}
                  </span>
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="font-semibold p-3">
                  ₦{order.totalPrice?.toLocaleString()}
                </td>

                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (optional future use) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <h2 className="font-bold">Order Details</h2>
            <p>ID: {selectedOrder._id}</p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

/* ================= CARD ================= */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
    </div>
  );
};
