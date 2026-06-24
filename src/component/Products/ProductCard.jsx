import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import api from "../../library/api";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [addToCart, setAddToCart] = useState([]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    if (!product?._id) {
      alert("Product ID not found");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      if (res.data.status === "success") {
        alert("Added to cart 🛒");
      }
    } catch (err) {
      console.error(err);
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
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative bg-gray-50 overflow-hidden h-44 md:h-64">
        {/* WISHLIST */}
        <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-[#ED017F] hover:text-white transition">
          <FaHeart size={14} />
        </button>

        {/* DISCOUNT BADGE */}
        <span className="absolute top-3 left-3 z-10 bg-[#ED017F] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          New
        </span>

        {/* PRODUCT IMAGE */}

        <Link to={`/product/${product.id}`}>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {/* CATEGORY */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-xs bg-pink-100 text-[#ED017F] px-2 py-1 rounded-full font-medium truncate max-w-[90px]">
            {product?.category?.name || "General"}
          </span>

          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {product?.stock} left
          </span>
        </div>

        {/* PRODUCT NAME */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 min-h-[40px] hover:text-[#ED017F] transition">
            {product?.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg md:text-2xl font-bold text-[#ED017F]">
              ₦{product?.price?.toLocaleString()}
            </p>

            <p className="text-xs text-gray-400 line-through">
              ₦{(product?.price * 1.2)?.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex gap-0.5">{renderStars(product?.rating)}</div>

            <span className="text-[10px] text-gray-500">
              {product?.rating || 0}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-[#ED017F] hover:bg-pink-700 text-white py-2.5 md:py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <FaShoppingCart size={14} />
          {loading ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
