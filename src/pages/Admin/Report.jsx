import { useEffect, useState } from "react";
import {
  FaDownload,
  FaMoneyBill,
  FaUsers,
  FaBox,
  FaShoppingCart,
} from "react-icons/fa";

import api from "../../library/api";

import ReportChart from "../../component/Admin/Reports/ReportChart";
import ReportSummaryCard from "../../component/Admin/Reports/ReportSummaryCard";
import ReportTable from "../../component/Admin/Reports/ReportTable";
import ReportDownloadModal from "../../component/Admin/Reports/ReportDownloadModel";
import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";

const Report = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(true);

  /*
  =================================
  FETCH REPORT DATA
  =================================
  */

  const fetchReports = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/reports/top-products"),
        api.get("/reports/orders"),
      ]);

      setTopProducts(productsRes.data.data || []);
      setOrderStatus(ordersRes.data.data || []);
    } catch (error) {
      console.error("REPORT ERROR:", error);
    }
  };

  /*
  =================================
  FETCH DASHBOARD STATS
  =================================
  */

  const handleStats = async () => {
    try {
      const res = await api.get("/stats/dashboard-stats");

      if (res.data.status === "success") {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error("STATS ERROR:", error);
    }
  };

  /*
  =================================
  FETCH SALES OVERVIEW
  =================================
  */

  const handleSalesData = async () => {
    try {
      const res = await api.get("/stats/sales-overview");

      if (res.data.status === "success") {
        setSalesData(res.data.data || []);
      }
    } catch (error) {
      console.error("SALES ERROR:", error);
    }
  };

  /*
  =================================
  LOAD EVERYTHING
  =================================
  */

  const loadReports = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchReports(),
        handleStats(),
        handleSalesData(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const cards = [
    {
      title: "Revenue",
      value: `₦${Number(stats.totalRevenue || 0).toLocaleString()}`,
      icon: <FaMoneyBill />,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: Number(stats.totalOrders || 0).toLocaleString(),
      icon: <FaShoppingCart />,
      color: "text-blue-600",
    },
    {
      title: "Customers",
      value: Number(stats.totalUsers || 0).toLocaleString(),
      icon: <FaUsers />,
      color: "text-purple-600",
    },
    {
      title: "Products",
      value: Number(stats.totalProducts || 0).toLocaleString(),
      icon: <FaBox />,
      color: "text-pink-600",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER */}
      <PageHeader
        title="Reports & Analytics"
        subtitle="Business performance overview"
        buttonText="Download Report"
        buttonIcon={<FaDownload />}
        onButtonClick={() => setShowDownload(true)}
      />

      {/* SUMMARY CARDS */}
      {loading ? (
        <PageLoader text="Loading reports..." />
      ) : cards.length === 0 ? (
        <div className="p-6 text-gray-500">No report data available</div>
      ) : (
        <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card, index) => (
          <ReportSummaryCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* SALES CHART */}
      <ReportChart data={salesData} />

      {/* TABLES */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* TOP PRODUCTS */}
        <ReportTable data={topProducts} />

        {/* ORDER STATUS */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-5">
            Order Status
          </h2>

          {orderStatus.length === 0 ? (
            <div className="text-gray-500 text-center py-6">
              No order status available.
            </div>
          ) : (
            <div className="space-y-3">
              {orderStatus.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                >
                  <span className="capitalize font-medium">
                    {item._id}
                  </span>

                  <span className="font-bold text-purple-600">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </>
      )}
      

      {/* DOWNLOAD MODAL */}
      {showDownload && (
        <ReportDownloadModal
          closeModal={() => setShowDownload(false)}
        />
      )}
    </div>
  );
};

export default Report;