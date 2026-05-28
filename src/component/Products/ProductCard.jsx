import { FaStar, FaShoppingCart } from "react-icons/fa";
import api from "../../library/api";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart 🛒");
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STARS ================= */
  const renderStars = (rating = 0) => {
    const safeRating = Math.round(Number(rating) || 0);

    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < safeRating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3">

      {/* IMAGE */}
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* NAME */}
      <h3 className="text-sm font-medium mt-2 line-clamp-2">
        {product?.name}
      </h3>

      {/* PRICE */}
      <p className="text-[#ED017F] font-bold mt-1">
        ₦{product?.price}
      </p>

      {/* RATING */}
      <div className="flex items-center gap-1 text-yellow-400 text-xs">
        {renderStars(product?.rating)}
        <span className="text-gray-600 ml-1">
          ({product?.rating || 0})
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-3 w-full bg-[#ED017F] text-white py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FaShoppingCart />
        {loading ? "Adding..." : "Add"}
      </button>

    </div>
  );
};

export default ProductCard;