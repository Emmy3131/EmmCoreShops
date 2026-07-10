import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFire,
  FaBolt,
} from "react-icons/fa";

import api from "../../../library/api";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products");

      if (res.data.status === "success") {
        setProducts(res.data.data || []);
      }
    } catch (error) {
      console.error("Products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE =================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ================= SEARCH =================

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-8
"
    >
      {/* HEADER */}

      <div
        className="
flex
justify-between
items-center
mb-8
flex-wrap
gap-4
"
      >
        <div>
          <h1
            className="
text-3xl
font-bold
"
          >
            Products
          </h1>

          <p
            className="
text-gray-500
"
          >
            Manage your store products
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="
bg-green-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* SEARCH */}

      <div
        className="
bg-white
rounded-xl
p-4
mb-6
shadow
"
      >
        <div
          className="
relative
max-w-md
"
        >
          <FaSearch
            className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="
Search products...
"
            className="
w-full
border
rounded-xl
py-3
pl-12
"
          />
        </div>
      </div>

      {/* LOADING */}

      {loading && <p>Loading products...</p>}

      {/* PRODUCTS */}

      <div
        className="
grid
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-6
"
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="
bg-white
rounded-3xl
shadow
overflow-hidden
"
          >
            {/* IMAGE */}

            <div
              className="
h-60
bg-gray-100
"
            >
              <img
                src={product.image}
                alt={product.name}
                className="
w-full
h-full
object-contain
"
              />
            </div>

            <div
              className="
p-5
space-y-3
"
            >
              <div
                className="
flex
justify-between
"
              >
                <span
                  className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
"
                >
                  {product.category?.name}
                </span>

                {product.isTrending && (
                  <FaFire
                    className="
text-red-500
"
                  />
                )}

                {product.isFlashSale && (
                  <FaBolt
                    className="
text-yellow-500
"
                  />
                )}
              </div>

              <h2
                className="
font-bold
text-lg
"
              >
                {product.name}
              </h2>

              <p
                className="
text-green-600
font-bold
text-xl
"
              >
                ₦{product.price?.toLocaleString()}
              </p>

              <p>
                Stock:
                <b>{product.stock}</b>
              </p>

              <div
                className="
flex
justify-between
pt-4
"
              >
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="
text-blue-600
flex
items-center
gap-1
"
                >
                  <FaEdit />
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="
text-red-600
flex
items-center
gap-1
"
                >
                  <FaTrash />
                  Delete
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
