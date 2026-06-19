import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductDetailsCard = ({ product, onAddToCart, loading }) => {
  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={
          i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }
      />
    ));

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-0">

      {/* LEFT - IMAGE SECTION */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-10">

        {/* Badge */}
        <span className="absolute top-5 left-5 bg-[#ED017F] text-white text-xs px-4 py-1 rounded-full shadow">
          New Arrival
        </span>

        {/* Wishlist */}
        <button className="absolute top-5 right-5 bg-white shadow-md p-2 rounded-full hover:bg-[#ED017F] hover:text-white transition">
          <FaHeart />
        </button>

        <img
          src={product?.image}
          alt={product?.name}
          className="w-full max-h-[420px] object-contain hover:scale-105 transition duration-500"
        />
      </div>

      {/* RIGHT - DETAILS SECTION */}
      <div className="p-8 space-y-5">

        {/* Category */}
        <span className="inline-block text-xs bg-pink-100 text-[#ED017F] px-3 py-1 rounded-full">
          {product?.category?.name || "General"}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {product?.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product?.rating)}</div>
          <span className="text-sm text-gray-500">
            ({product?.rating || 0} reviews)
          </span>
        </div>

        {/* Price Box */}
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-[#ED017F]">
              ₦{product?.price?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ₦{(product?.price * 1.2)?.toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Stock</p>
            <p
              className={
                product?.stock > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-7">
          {product?.description}
        </p>

        {/* Actions */}
        <div className="flex gap-4 pt-4">

          <button
            onClick={onAddToCart}
            disabled={loading}
            className="flex-1 bg-[#ED017F] hover:bg-pink-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition shadow-md"
          >
            <FaShoppingCart />
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <button className="px-5 border rounded-2xl hover:bg-gray-100 transition">
            <FaHeart />
          </button>
        </div>

        {/* Extra Info */}
        <div className="pt-4 text-xs text-gray-400 flex gap-4">
          <span>✔ Fast Delivery</span>
          <span>✔ Secure Payment</span>
          <span>✔ Return Policy</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;