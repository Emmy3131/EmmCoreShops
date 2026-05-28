import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../../../library/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* FETCH PRODUCTS */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Product fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  /* SEARCH */
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-2 w-full md:w-80 mb-6"
      />

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className=" w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{product.name}</h2>

              <p className="text-gray-500 text-sm">
                Category: {product.category?.name}
              </p>

              <p className="font-bold text-green-600">
                ₦{product.price?.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                Stock: {product.stock}
              </p>

              <div className="flex justify-between pt-3">
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="flex items-center gap-1 text-blue-600 text-sm"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center gap-1 text-red-500 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;