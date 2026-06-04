import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../library/api";
import ProductCard from "../../../component/Products/ProductCard";

const CategoryProducts = () => {
  // ✅ PUT IT HERE (TOP OF COMPONENT)
  const { id } = useParams();
  console.log("Category ID from URL:", id);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/category/${id}`);

        setProducts(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Category Products
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;