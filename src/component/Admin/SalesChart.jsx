const SalesChart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get("/stats/sales-overview");

        console.log("Sales API:", res.data);

        if (res.data.status === "success") {
          setSales(res.data.sales || []);
        }
      } catch (err) {
        console.error("Failed to load sales overview:", err);
        setSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p>Loading chart...</p>;

  if (!sales.length) return <p>No sales data</p>;

  const chartData = {
    labels: sales.map((item) => item._id),

    datasets: [
      {
        label: "Revenue (₦)",
        data: sales.map((item) => item.totalSales),
        borderColor: "green",
        tension: 0.3,
      },
      {
        label: "Orders",
        data: sales.map((item) => item.totalOrders),
        borderColor: "blue",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Line data={chartData} />
    </div>
  );
};