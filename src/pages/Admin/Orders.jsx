import { useState } from "react";
import { FaSearch, FaEye, FaTruck, FaTrash } from "react-icons/fa";

const Orders = () => {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "#1001",
      customer: "Emmanuel Nnaemeka",
      email: "emmanuel@mail.com",
      amount: "₦45,000",
      status: "Pending",
      date: "2026-05-10",
    },
    {
      id: "#1002",
      customer: "John Doe",
      email: "john@mail.com",
      amount: "₦120,000",
      status: "Shipped",
      date: "2026-05-09",
    },
    {
      id: "#1003",
      customer: "Sarah James",
      email: "sarah@mail.com",
      amount: "₦8,500",
      status: "Delivered",
      date: "2026-05-08",
    },
  ];

  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" space-y-6">

      {/* ================= HEADER ================= */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-500">
          Manage all customer orders
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search orders by customer..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b">

                <td className="p-3 font-medium">
                  {order.id}
                </td>

                <td>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-500">
                      {order.email}
                    </p>
                  </div>
                </td>

                <td>{order.amount}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>{order.date}</td>

                <td className="flex gap-3 p-3 text-gray-600">

                  <button className="hover:text-blue-500">
                    <FaEye />
                  </button>

                  <button className="hover:text-green-500">
                    <FaTruck />
                  </button>

                  <button className="hover:text-red-500">
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">

        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow space-y-2"
          >

            <div className="flex justify-between">
              <h2 className="font-semibold">{order.id}</h2>

              <span
                className={`text-xs px-2 py-1 rounded-full
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm font-medium">
              {order.customer}
            </p>

            <p className="text-sm text-gray-500">
              {order.email}
            </p>

            <div className="flex justify-between text-sm">
              <span>{order.amount}</span>
              <span>{order.date}</span>
            </div>

            <div className="flex justify-end gap-4 text-gray-600 pt-2">

              <FaEye className="cursor-pointer hover:text-blue-500" />
              <FaTruck className="cursor-pointer hover:text-green-500" />
              <FaTrash className="cursor-pointer hover:text-red-500" />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Orders;