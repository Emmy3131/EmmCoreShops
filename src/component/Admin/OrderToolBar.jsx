import {
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaFilter,
} from "react-icons/fa";
import { exportExcel, exportPDF } from "../../helpers/orderHelpers";

const OrderToolbar = ({
  orders,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Search */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer, email or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">

          {/* Order Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

        </div>

        {/* Export */}
        <div className="flex gap-3">

          <button
            onClick={() => exportExcel(orders)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FaFileExcel />
            Excel
          </button>

          <button
            onClick={() => exportPDF(orders)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FaFilePdf />
            PDF
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderToolbar;