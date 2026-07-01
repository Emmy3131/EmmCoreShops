import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../../library/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get("/stats/sales-overview");
        if(res.data.status === "success") {
          setSales(res.data.sales);
        }
      } catch (err) {
        console.error("Failed to load sales overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  const chartData = {
    labels: sales.map((item) => item.date),

    datasets: [
      {
        label: "Revenue (₦)",
        data: sales.map((item) => item.totalSales),
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.3,
      },
      {
        label: "Orders",
        data: sales.map((item) => item.totalOrders),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Sales Overview</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SalesChart;