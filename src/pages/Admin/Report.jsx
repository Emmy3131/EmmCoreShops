import { useState } from "react";
import { FaDownload, FaChartLine, FaMoneyBill, FaUsers } from "react-icons/fa";

const Report = () => {
  const [reports] = useState({
    totalSales: 245,
    totalRevenue: 1250000,
    totalUsers: 820,
    totalOrders: 312,
  });

  const summaryCards = [
    {
      title: "Total Sales",
      value: reports.totalSales,
      icon: <FaChartLine />,
      color: "text-blue-600",
    },
    {
      title: "Revenue",
      value: `₦${reports.totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBill />,
      color: "text-green-600",
    },
    {
      title: "Users",
      value: reports.totalUsers,
      icon: <FaUsers />,
      color: "text-purple-600",
    },
    {
      title: "Orders",
      value: reports.totalOrders,
      icon: <FaChartLine />,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="md:p-6 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500">
            Overview of business performance
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          <FaDownload />
          Download Report
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className={`text-xl font-bold ${card.color}`}>
                  {card.value}
                </h2>
              </div>

              <div className="text-2xl text-gray-400">
                {card.icon}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Sales Overview
        </h2>

        <div className="h-64 flex items-center justify-center text-gray-400 border-dashed border-2 rounded-lg">
          📊 Chart will be displayed here (Recharts / Chart.js)
        </div>
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full min-w-[700px] text-sm">

          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="p-3">Metric</th>
              <th className="p-3">Value</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-3">Monthly Growth</td>
              <td className="p-3">+12.5%</td>
              <td className="p-3 text-green-600">Positive</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Customer Retention</td>
              <td className="p-3">78%</td>
              <td className="p-3 text-green-600">Good</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Refund Rate</td>
              <td className="p-3">2.1%</td>
              <td className="p-3 text-yellow-600">Average</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Cart Abandonment</td>
              <td className="p-3">34%</td>
              <td className="p-3 text-red-600">High</td>
            </tr>

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Report;