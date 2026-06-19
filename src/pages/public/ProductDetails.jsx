import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../../component/Products/ProductDetailsCard";
import api from "../../library/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products/${id}`);

      console.log("API RESPONSE:", res.data);

      if (res.data.status === "success") {
        setProduct(res.data.data);
      }

    } catch (error) {
      console.log(
        "Fetch product error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      await api.post("/cart", {
        productId: product?._id,
        quantity: 1,
      });

      alert("Added to cart 🛒");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="mt-19 bg-amber-500 p-6">

      {/* MODERN PRODUCT CARD */}
      <ProductDetailsCard
        product={product}
        loading={cartLoading}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
};

export default ProductDetails;