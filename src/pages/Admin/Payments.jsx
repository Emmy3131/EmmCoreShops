import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const Payments = () => {
  const [payments] = useState([
    {
      id: "PAY-001",
      user: "John Doe",
      amount: 45000,
      method: "Card",
      status: "success",
      date: "2026-05-12",
    },
    {
      id: "PAY-002",
      user: "Mary Smith",
      amount: 12000,
      method: "Transfer",
      status: "pending",
      date: "2026-05-11",
    },
    {
      id: "PAY-003",
      user: "David Mark",
      amount: 8900,
      method: "Card",
      status: "failed",
      date: "2026-05-10",
    },
  ]);

  const getStatusUI = (status) => {
    switch (status) {
      case "success":
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
            <FaCheckCircle /> Success
          </span>
        );

      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs">
            <FaClock /> Pending
          </span>
        );

      case "failed":
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">
            <FaTimesCircle /> Failed
          </span>
        );

      default:
        return null;
    }
  };

  const totalRevenue = payments
    .filter((p) => p.status === "success")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className=" md:p-6 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Payments Overview
        </h1>

        <input
          type="text"
          placeholder="Search payment ID or user..."
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Payments</h3>
          <p className="text-xl font-bold">{payments.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Successful Revenue</h3>
          <p className="text-xl font-bold text-green-600">
            ₦{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Pending Payments</h3>
          <p className="text-xl font-bold text-yellow-600">
            {payments.filter((p) => p.status === "pending").length}
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full min-w-[700px] text-sm">

          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-3">Payment ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">{pay.id}</td>
                <td className="p-3">{pay.user}</td>
                <td className="p-3">₦{pay.amount.toLocaleString()}</td>
                <td className="p-3">{pay.method}</td>
                <td className="p-3">{getStatusUI(pay.status)}</td>
                <td className="p-3 text-gray-500">{pay.date}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Payments;