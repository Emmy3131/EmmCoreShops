import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
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
        className={`${
          i < safeRating ? "text-yellow-400" : "text-gray-300"
        } text-sm`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* IMAGE CONTAINER */}
      <div className="relative bg-gray-100 overflow-hidden h-64">

        {/* WISHLIST */}
        <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-[#ED017F] hover:text-white transition">
          <FaHeart size={14} />
        </button>

        {/* DISCOUNT BADGE */}
        <span className="absolute top-3 left-3 z-10 bg-[#ED017F] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          New
        </span>

        {/* PRODUCT IMAGE */}
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        {/* CATEGORY */}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-pink-100 text-[#ED017F] px-3 py-1 rounded-full font-medium">
            {product?.category?.name || "General"}
          </span>

          <span className="text-xs text-gray-500">
            Stock: {product?.stock || 0}
          </span>
        </div>

        {/* PRODUCT NAME */}
        <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-6 min-h-[48px]">
          {product?.name}
        </h3>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-[#ED017F]">
              ₦{product?.price?.toLocaleString()}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₦{(product?.price * 1.2)?.toLocaleString()}
            </p>
          </div>

          {/* RATING */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              {renderStars(product?.rating)}
            </div>

            <span className="text-xs text-gray-500 mt-1">
              ({product?.rating || 0})
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full mt-4 bg-[#ED017F] hover:bg-pink-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
        >
          <FaShoppingCart />

          {loading ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;