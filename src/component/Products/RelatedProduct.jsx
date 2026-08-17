import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import api from "../../library/api";

const RelatedProduct = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH RELATED PRODUCTS
  ===================================================== */
  useEffect(() => {
    if (!productId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/products/related/${productId}`
        );

        console.log("Related products:", res.data);

        const responseData = res?.data?.data;

        let relatedProducts = [];

        if (Array.isArray(responseData)) {
          relatedProducts = responseData;
        } else if (Array.isArray(responseData?.products)) {
          relatedProducts = responseData.products;
        } else if (Array.isArray(res?.data?.products)) {
          relatedProducts = res.data.products;
        }

        setProducts(relatedProducts);
      } catch (err) {
        console.error(
          "Failed to fetch related products:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load related products."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  /* =====================================================
     NOTHING TO SHOW
  ===================================================== */
  if (!loading && !error && products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-16">
      {/* =================================================
          SECTION HEADER
      ================================================= */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />

            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              You may also like
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Related Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Discover products similar to this one.
          </p>
        </div>

        {/* DESKTOP VIEW ALL */}
        {products.length > 4 && (
          <Link
            to="/products"
            className="
              hidden
              sm:flex
              items-center
              gap-2
              text-sm
              font-bold
              text-blue-600
              hover:text-cyan-600
              transition-colors
            "
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>
        )}
      </div>

      {/* =================================================
          ERROR
      ================================================= */}
      {error && !loading && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          LOADING SKELETON
      ================================================= */}
      {loading && (
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3
            sm:gap-5
          "
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                bg-white
                rounded-2xl
                border
                border-slate-100
                overflow-hidden
                animate-pulse
              "
            >
              <div className="aspect-square bg-slate-200" />

              <div className="p-3 sm:p-4 space-y-3">
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-5 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================
          PRODUCTS
      ================================================= */}
      {!loading && !error && products.length > 0 && (
        <>
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-3
              sm:gap-5
            "
          >
            {products.map((product) => {
              /* =========================================
                 PRODUCT ID
              ========================================= */
              const id = product._id || product.id;

              /* =========================================
                 IMAGE
              ========================================= */
              const image =
                product.image ||
                product.images?.[0] ||
                product.imageCover ||
                "/images/product-placeholder.png";

              /* =========================================
                 PRICE LOGIC
              ========================================= */
              const regularPrice = Number(
                product.price || 0
              );

              const flashSalePrice = Number(
                product.flashSalePrice || 0
              );

              /*
               * flashSalePrice = 0 means there is
               * no active sale price.
               */
              const hasFlashSale =
                product.isFlashSale === true &&
                flashSalePrice > 0 &&
                flashSalePrice < regularPrice;

              const displayPrice = hasFlashSale
                ? flashSalePrice
                : regularPrice;

              const originalPrice = hasFlashSale
                ? Number(
                    product.oldPrice || regularPrice
                  )
                : 0;

              /* =========================================
                 DISCOUNT
              ========================================= */
              const discount =
                hasFlashSale &&
                originalPrice > displayPrice
                  ? Math.round(
                      ((originalPrice -
                        displayPrice) /
                        originalPrice) *
                        100
                    )
                  : 0;

              /* =========================================
                 RATING
              ========================================= */
              const rating =
                Number(product.ratingsAverage) || 0;

              const ratingsQuantity =
                Number(product.ratingsQuantity) || 0;

              return (
                <Link
                  key={id}
                  to={`/product/${id}`}
                  className="
                    group
                    relative
                    flex
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-xl
                    hover:shadow-blue-500/10
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  {/* =====================================
                      PRODUCT IMAGE
                  ===================================== */}
                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      bg-slate-50
                    "
                  >
                    <img
                      src={image}
                      alt={product.name || "Product"}
                      className="
                        w-full
                        h-full
                        object-contain
                        p-3
                        sm:p-4
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/product-placeholder.png";
                      }}
                    />

                    {/* SALE BADGE */}
                    {hasFlashSale && (
                      <span
                        className="
                          absolute
                          top-2
                          left-2
                          sm:top-3
                          sm:left-3
                          px-2
                          py-1
                          rounded-lg
                          bg-red-500
                          text-white
                          text-[9px]
                          sm:text-[10px]
                          font-black
                          uppercase
                          shadow-sm
                        "
                      >
                        -{discount}%
                      </span>
                    )}

                    {/* FEATURED BADGE */}
                    {!hasFlashSale &&
                      (product.isFeatured ||
                        product.featured) && (
                        <span
                          className="
                            absolute
                            top-2
                            left-2
                            sm:top-3
                            sm:left-3
                            px-2
                            py-1
                            rounded-lg
                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500
                            text-white
                            text-[9px]
                            sm:text-[10px]
                            font-black
                            uppercase
                            shadow-sm
                          "
                        >
                          Featured
                        </span>
                      )}

                    {/* WISHLIST */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="
                        absolute
                        top-2
                        right-2
                        sm:top-3
                        sm:right-3
                        w-8
                        h-8
                        sm:w-9
                        sm:h-9
                        rounded-full
                        bg-white/90
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        text-slate-400
                        hover:text-red-500
                        hover:bg-white
                        shadow-sm
                        transition-all
                      "
                      aria-label="Add to wishlist"
                    >
                      <FaHeart className="text-xs sm:text-sm" />
                    </button>
                  </div>

                  {/* =====================================
                      PRODUCT CONTENT
                  ===================================== */}
                  <div className="flex flex-col flex-1 p-3 sm:p-4">
                    {/* CATEGORY */}
                    {product.category?.name && (
                      <p
                        className="
                          mb-1
                          text-[9px]
                          sm:text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-blue-600
                          truncate
                        "
                      >
                        {product.category.name}
                      </p>
                    )}

                    {/* PRODUCT NAME */}
                    <h3
                      className="
                        text-sm
                        sm:text-[15px]
                        font-bold
                        leading-5
                        text-slate-800
                        line-clamp-2
                        min-h-[40px]
                        group-hover:text-blue-600
                        transition-colors
                      "
                    >
                      {product.name}
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mt-2">
                      <FaStar
                        className="
                          text-yellow-400
                          text-[10px]
                          sm:text-xs
                        "
                      />

                      <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                        {rating > 0
                          ? rating.toFixed(1)
                          : "No rating"}
                      </span>

                      {ratingsQuantity > 0 && (
                        <span className="text-[9px] sm:text-[10px] text-slate-400">
                          ({ratingsQuantity})
                        </span>
                      )}
                    </div>

                    {/* =================================
                        PRICE
                    ================================= */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span
                        className={`
                          text-base
                          sm:text-lg
                          font-black
                          ${
                            hasFlashSale
                              ? "text-red-500"
                              : "text-slate-900"
                          }
                        `}
                      >
                        ₦
                        {displayPrice.toLocaleString(
                          "en-NG"
                        )}
                      </span>

                      {hasFlashSale &&
                        originalPrice >
                          displayPrice && (
                          <span
                            className="
                              text-[10px]
                              sm:text-xs
                              text-slate-400
                              line-through
                            "
                          >
                            ₦
                            {originalPrice.toLocaleString(
                              "en-NG"
                            )}
                          </span>
                        )}
                    </div>

                    {/* =================================
                        VIEW DETAILS
                    ================================= */}
                    <div
                      className="
                        mt-auto
                        pt-4
                        flex
                        items-center
                        justify-between
                        text-xs
                        sm:text-sm
                        font-bold
                        text-blue-600
                        group-hover:text-cyan-600
                        transition-colors
                      "
                    >
                      <span>View Details</span>

                      <span
                        className="
                          flex
                          items-center
                          justify-center
                          w-7
                          h-7
                          rounded-full
                          bg-blue-50
                          group-hover:bg-blue-600
                          group-hover:text-white
                          transition-all
                          duration-300
                        "
                      >
                        <FaArrowRight className="text-[10px]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ===========================================
              MOBILE VIEW ALL
          =========================================== */}
          {products.length > 4 && (
            <div className="flex sm:hidden justify-center mt-6">
              <Link
                to="/product/:id"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  text-sm
                  font-bold
                  hover:bg-blue-100
                  transition-colors
                "
              >
                View All Products
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RelatedProduct;