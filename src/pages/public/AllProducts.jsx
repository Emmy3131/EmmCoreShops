import api from "../../library/api";
import { useState, useEffect } from "react";

import ProductGrid from "../../component/Products/ProductGrid";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(
          res.data?.data || []
        );
      } catch (error) {
        console.error(
          "Product fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-3
        sm:px-5
        lg:px-8
        pt-20
        md:pt-28
        pb-10
      "
    >
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-3
          mb-6
        "
      >
        <div>

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-blue-600
              mb-1
            "
          >
            Explore our collection
          </p>

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-extrabold
              text-slate-900
            "
          >
            All Products
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Discover products you'll love.
          </p>

        </div>

        {!loading && products.length > 0 && (
          <p className="text-sm text-slate-500">
            {products.length} products
          </p>
        )}

      </div>

      {/* =====================================
          PRODUCT GRID
      ===================================== */}

      <ProductGrid
        products={products}
        loading={loading}
        emptyMessage="We couldn't find any products at the moment."
      />

    </main>
  );
};

export default Products;