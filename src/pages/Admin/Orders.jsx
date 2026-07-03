import { useEffect, useState } from "react";
import api from "../../library/api";
import OrderToolbar from "../../component/Admin/OrderToolBar";
import Pagination from "../../component/Admin/Pagination";
import OrderTable from "../../component/Admin/OrderTable";
import OrderCard from "../../component/Admin/OrderCard";
import OrderDetailsModal from "../../component/Admin/OrderDetailsModels";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [paymentFilter, setPaymentFilter] = useState("");

  const [sortOrder, setSortOrder] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

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
      await api.patch(`/orders/${id}`, { orderStatus });
      fetchOrders();
    } catch (err) {
      console.error("Update order error:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">Loading orders...</div>
    );
  }

  const filteredOrders = [...orders]
    .filter((order) => {
      const customer = order.user
        ? `${order.user.firstName} ${order.user.lastName}`
        : "";

      return (
        customer.toLowerCase().includes(search.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter((order) =>
      statusFilter ? order.orderStatus === statusFilter : true,
    )
    .filter((order) =>
      paymentFilter ? order.paymentStatus === paymentFilter : true,
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-500">Manage all customer orders</p>
      </div>

      <OrderToolbar
        orders={orders}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* ================= DESKTOP TABLE ================= */}

      <OrderTable
        orders={paginatedOrders}
        setSelectedOrder={setSelectedOrder}
        updateOrderStatus={updateOrderStatus}
      />

     
      {/* ================= MOBILE CARDS ================= */}
      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {paginatedOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            setSelectedOrder={setSelectedOrder}
            updateOrderStatus={updateOrderStatus}
          />
        ))}
      </div>

       <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* ================= MODAL ================= */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default AdminOrders;
