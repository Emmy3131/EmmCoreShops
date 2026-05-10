import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* NAME */}
      <h3 className="text-sm font-medium mt-2 line-clamp-2">
        {product.name}
      </h3>

      {/* PRICE */}
      <p className="text-[#ED017F] font-bold mt-1">
        ₦{product.price}
      </p>

      {/* RATING */}
      <div className="flex items-center gap-1 text-yellow-400 text-xs">
        <FaStar />
        <span>{product.rating}</span>
      </div>

      {/* ADD TO CART */}
      <button className="mt-3 w-full bg-[#ED017F] text-white py-2 rounded-md flex items-center justify-center gap-2">
        <FaShoppingCart />
        Add
      </button>

    </div>
  );
};

export default ProductCard;