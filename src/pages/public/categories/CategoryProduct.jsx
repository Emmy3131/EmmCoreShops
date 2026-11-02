import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaShoppingBag,
  FaArrowLeft,
  FaSlidersH,
} from "react-icons/fa";

import api from "../../../library/api";
import ProductCard from "../../../component/Products/ProductCard";

const CategoryProducts = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Category");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/category/${id}`);

        const fetchedProducts = res.data.data || [];

        setProducts(fetchedProducts);

        if (fetchedProducts.length > 0) {
          setCategoryName(
            fetchedProducts[0]?.category?.name || "Category",
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch category products:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* =====================================================
          CATEGORY HERO
      ====================================================== */}
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
            to="/products"
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

            Back to Products
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

            Shop by Category
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
            {categoryName}
          </h1>

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

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8
          md:px-8
          md:py-12
        "
      >
        {/* =====================================================
            LOADING STATE
        ====================================================== */}
        {loading ? (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              md:gap-5
            "
          >
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-[var(--radius-lg)]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  shadow-[var(--shadow-sm)]
                "
              >
                <div
                  className="
                    h-44
                    animate-pulse
                    bg-slate-200
                    md:h-60
                  "
                />

                <div className="space-y-3 p-3">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />

                  <div className="h-9 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* =====================================================
              EMPTY STATE
          ====================================================== */
          <div
            className="
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center
              rounded-[var(--radius-xl)]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-6
              text-center
              shadow-[var(--shadow-sm)]
            "
          >
            <div
              className="
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[var(--color-primary-light)]
                text-[var(--color-primary)]
              "
            >
              <FaBoxOpen size={38} />
            </div>

            <h2
              className="
                text-xl
                font-bold
                text-[var(--color-text-primary)]
                md:text-2xl
              "
            >
              No Products Found
            </h2>

            <p
              className="
                mt-2
                max-w-md
                text-sm
                text-[var(--color-text-muted)]
              "
            >
              This category does not contain any products yet. Check back
              later for new products.
            </p>

            <Link
              to="/products"
              className="
                mt-6
                inline-flex
                items-center
                justify-center
                rounded-[var(--radius-md)]
                bg-[var(--color-primary)]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[var(--shadow-primary)]
                transition
                hover:bg-[var(--color-primary-dark)]
              "
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* =====================================================
                PRODUCTS HEADER
            ====================================================== */}
            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-[var(--color-accent-dark)]
                  "
                >
                  Explore Collection
                </p>

                <h2
                  className="
                    mt-1
                    text-2xl
                    font-bold
                    text-[var(--color-text-primary)]
                    md:text-3xl
                  "
                >
                  {categoryName} Products
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {/* PRODUCT COUNT */}
                <div
                  className="
                    rounded-full
                    bg-[var(--color-primary-light)]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[var(--color-primary)]
                  "
                >
                  {products.length} Items
                </div>

                {/* FILTER BUTTON */}
                <button
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-[var(--radius-md)]
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[var(--color-text-secondary)]
                    transition
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                  "
                >
                  <FaSlidersH size={13} />

                  Filter
                </button>
              </div>
            </div>

            {/* =====================================================
                PRODUCT GRID
            ====================================================== */}
            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                md:gap-5
              "
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryProducts;