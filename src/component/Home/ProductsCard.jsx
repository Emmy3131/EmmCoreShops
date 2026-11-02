const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover rounded"
      />

      <h3 className="mt-3 font-semibold">
        {product.name}
      </h3>

      <div className="mt-2">

        <span className="text-pink-600 font-bold text-lg">
          ₦{product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <span className="ml-2 text-gray-400 line-through">
            ₦{product.oldPrice.toLocaleString()}
          </span>
        )}

      </div>

      <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded">
        Add To Cart
      </button>

    </div>
  );
};

export default ProductCard;