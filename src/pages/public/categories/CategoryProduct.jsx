import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";
import api from "../../../library/api";
import ProductCard from "../../../component/Products/ProductCard";

const CategoryProducts = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/category/${id}`);

        setProducts(res.data.data || []);

        if (res.data.data?.length > 0) {
          setCategoryName(
            res.data.data[0]?.category?.name || "Category"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-12 px-6 rounded-b-3xl shadow-lg">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-widest text-sm opacity-90">
            Shop By Category
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            {categoryName}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <FaShoppingBag />
            <span>
              {products.length} Products Available
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>

                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <FaBoxOpen className="text-6xl text-gray-300 mx-auto mb-4" />

            <h2 className="text-2xl font-semibold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              This category does not contain any products yet.
            </p>
          </div>
        ) : (
          <>
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-xl">
                Products
              </h2>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                {products.length} Items
              </span>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="transform transition duration-300 hover:-translate-y-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;