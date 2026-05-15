import {
  FaUsers,
  FaShoppingCart,
  FaStore,
  FaMoneyBillWave,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className=" space-y-6">

      {/* ================= HEADER ================= */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Users"
          value="1,240"
          icon={<FaUsers />}
          color="bg-blue-500"
        />

        <StatCard
          title="Orders"
          value="560"
          icon={<FaShoppingCart />}
          color="bg-green-500"
        />

        <StatCard
          title="Vendors"
          value="85"
          icon={<FaStore />}
          color="bg-purple-500"
        />

        <StatCard
          title="Revenue"
          value="$12,450"
          icon={<FaMoneyBillWave />}
          color="bg-pink-500"
        />
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* SALES CHART PLACEHOLDER */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Sales Overview
          </h2>

          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart goes here (Recharts / Chart.js)
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button className="w-full bg-[#ED017F] text-white py-2 rounded">
              Manage Users
            </button>

            <button className="w-full bg-green-600 text-white py-2 rounded">
              View Orders
            </button>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      {/* ================= RECENT TABLE ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">
          Recent Orders
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left">Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td>#1234</td>
              <td>Emmanuel</td>
              <td className="text-green-600">Completed</td>
              <td>$120</td>
            </tr>

            <tr className="border-b">
              <td>#1235</td>
              <td>John</td>
              <td className="text-yellow-600">Pending</td>
              <td>$80</td>
            </tr>

            <tr>
              <td>#1236</td>
              <td>Sarah</td>
              <td className="text-red-600">Cancelled</td>
              <td>$45</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;


/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>

      <div
        className={`${color} text-white p-3 rounded-lg text-xl`}
      >
        {icon}
      </div>

    </div>
  );
};