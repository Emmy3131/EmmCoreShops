import {
  FaEdit,
  FaTrash,
  FaFire,
  FaBolt,
} from "react-icons/fa";

const ProductTable = ({
  products,
  loading,
  onDelete,
  onEdit,
  onToggleTrending,
  onToggleFlashSale,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-20 text-center">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-white rounded-2xl p-20 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-gray-600 text-sm">

              <th className="px-6 py-4">Product</th>

              <th className="px-4 py-4">Category</th>

              <th className="px-4 py-4">Price</th>

              <th className="px-4 py-4">Stock</th>

              <th className="px-4 py-4">Status</th>

              <th className="px-4 py-4">Created</th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>

                    </div>

                  </div>

                </td>

                {/* CATEGORY */}

                <td className="px-4 py-5">

                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">

                    {product.category?.name || "N/A"}

                  </span>

                </td>

                {/* PRICE */}

                <td className="px-4 py-5">

                  <div>

                    <p className="font-bold text-green-600">
                      ₦{product.price?.toLocaleString()}
                    </p>

                    {product.oldPrice && (
                      <p className="text-xs line-through text-gray-400">
                        ₦{product.oldPrice.toLocaleString()}
                      </p>
                    )}

                  </div>

                </td>

                {/* STOCK */}

                <td className="px-4 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      product.stock <= 5
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock}
                  </span>

                </td>

                {/* STATUS */}

                <td className="px-4 py-5">

                  <div className="flex flex-wrap gap-2">

                    {product.isTrending && (
                      <span className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                        <FaFire />
                        Trending
                      </span>
                    )}

                    {product.isFlashSale && (
                      <span className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                        <FaBolt />
                        Flash
                      </span>
                    )}

                  </div>

                </td>

                {/* DATE */}

                <td className="px-4 py-5 text-sm text-gray-500">

                  {new Date(
                    product.createdAt
                  ).toLocaleDateString()}

                </td>

                {/* ACTIONS */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onToggleTrending(product._id)
                      }
                      className={`p-2 rounded-lg ${
                        product.isTrending
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100"
                      }`}
                      title="Toggle Trending"
                    >
                      <FaFire />
                    </button>

                    <button
                      onClick={() =>
                        onToggleFlashSale(product._id)
                      }
                      className={`p-2 rounded-lg ${
                        product.isFlashSale
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                      }`}
                      title="Toggle Flash Sale"
                    >
                      <FaBolt />
                    </button>

                    <button
                      onClick={() => onEdit(product._id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(product._id)
                      }
                      className="p-2 bg-red-100 text-red-600 rounded-lg"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ProductTable;
