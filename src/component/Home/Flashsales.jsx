import ProductCard from "../Products/ProductCard";
import api from "../../library/api";
import { useState, useEffect } from "react";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashSales = async () => {
    try {
      const res = await api.get("/products/isFlashSale");

      if (res.data.status === "success") {
        setProducts(res.data.data || []);
        console.log("Flash sales data:", res.data.data);
      }
    } catch (error) {
      console.error("Error fetching flash sales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  return (
    <div className="mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          Flash Sales
        </h2>

        <button className="text-pink-600 font-semibold">
          See All
        </button>
      </div>

      {loading ? (
        <p>Loading flash sales...</p>
      ) : products.length === 0 ? (
        <p>No flash sales available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  )
};

export default FlashSales;