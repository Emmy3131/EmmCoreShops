import ProductCard from "./ProductCard";
import api from "../../library/api";
import { useState, useEffect } from "react";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-3 mt-6 pb-24">

      {/* HEADER */}
      <h2 className="font-semibold text-lg mb-3">
        Flash Deals
      </h2>

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-3
        ">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductGrid;