import ProductCard from "../Products/ProductCard";
import api from "../../library/api";
import { useState, useEffect } from "react";


const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      const res = await api.get("/products/new-arrivals");

      if (res.data.status === "success") {
        setProducts(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          New Arrivals
        </h2>

        <button className="text-pink-600 font-semibold">
          See All
        </button>
      </div>

      {loading ? (
        <p>Loading new arrivals...</p>
      ) : products.length === 0 ? (
        <p>No new arrivals available yet.</p>
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

export default NewArrival;