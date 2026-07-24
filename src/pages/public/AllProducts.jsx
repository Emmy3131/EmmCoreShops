import api from "../../library/api";
import { useState, useEffect } from "react";

import ProductGrid from "../../component/Products/ProductGrid";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

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
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* =====================================
          PAGE HEADER
      ===================================== */}


      <section
        className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[var(--color-primary)]
                via-[var(--color-primary-dark)]
                to-[var(--color-accent-dark)]
                text-white
              "
      >
        {/* Decorative Background */}
        <div
          className="
                  absolute
                  -right-20
                  -top-20
                  h-72
                  w-72
                  rounded-full
                  bg-white/10
                  blur-3xl
                "
        />

        <div
          className="
                  absolute
                  -bottom-32
                  left-1/3
                  h-72
                  w-72
                  rounded-full
                  bg-cyan-300/10
                  blur-3xl
                "
        />

        <div
          className="
                  relative
                  mx-auto
                  max-w-7xl
                  px-4
                  py-10
                  md:px-8
                  md:py-16
                "
        >
          {/* BACK LINK */}
          <Link
            to="/"
            className="
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-blue-100
                    transition
                    hover:text-white
                  "
          >
            <FaArrowLeft size={13} />

            Back to Home Page
          </Link>

          {/* LABEL */}
          <p
            className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-cyan-200
                  "
          >
            <FaShoppingBag />

            Explore our collection
          </p>

          {/* CATEGORY NAME */}
          <h1
            className="
                    max-w-3xl
                    text-3xl
                    font-extrabold
                    tracking-tight
                    md:text-5xl
                  "
          >
            All Products
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-cyan-200
            "
          >
            Discover products you'll love.
          </p>

          {/* PRODUCT COUNT */}
          <div
            className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-blue-50
                    backdrop-blur-md
                  "
          >
            <FaShoppingBag className="text-cyan-300" />

            {loading
              ? "Loading products..."
              : `${products.length} Products Available`}
          </div>
        </div>
      </section>

      {/* <div
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

      </div> */}

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