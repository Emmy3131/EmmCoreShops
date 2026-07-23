import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaBolt,
} from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../../library/api";

import CountdownTimer from "./CountDownTimer";
import ProductPrice from "./ProductPrice";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  /* =========================================
     FLASH SALE STATUS
  ========================================= */

  const isFlashSale =
    product?.isFlashSale &&
    product?.flashSalePrice &&
    product?.flashSaleEndAt &&
    new Date(product.flashSaleEndAt) >
    new Date();

  /* =========================================
     PRICES
  ========================================= */

  const originalPrice =
    Number(
      product?.oldPrice ||
      product?.price ||
      0
    );

  const salePrice = Number(
    product?.flashSalePrice || 0
  );

  const displayPrice = isFlashSale
    ? salePrice
    : Number(product?.price || 0);

  /* =========================================
     DISCOUNT
  ========================================= */

  const discountPercentage =
    isFlashSale && originalPrice > salePrice
      ? Math.round(
        ((originalPrice - salePrice) /
          originalPrice) *
        100
      )
      : 0;

  /* =========================================
     STOCK
  ========================================= */

  const stock =
    Number(product?.stock) || 0;

  const isOutOfStock = stock <= 0;

  const isLowStock =
    stock > 0 && stock <= 5;

  /* =========================================
     RATING
  ========================================= */

  const rating = Math.round(
    Number(product?.ratingsAverage) || 0
  );

  const reviewCount =
    product?.ratingsQuantity || 0;

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = async () => {
    if (!product?._id) {
      alert("Product ID not found");
      return;
    }

    if (isOutOfStock) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      if (res.data.status === "success") {
        alert("Added to cart 🛒");
      }
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to add product to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className="
        group
        flex
        flex-col
        h-full
        overflow-hidden
        bg-white
        border
        border-slate-200
        rounded-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      {/* =====================================
          IMAGE
      ===================================== */}

      <div
        className="
          relative
          h-40
          sm:h-56
          md:h-64
          overflow-hidden
          bg-slate-50
        "
      >
        <Link
          to={`/product/${product?._id}`}
          className="block w-full h-full"
        >
          <img
            src={
              product?.image ||
              "/placeholder-product.png"
            }
            alt={product?.name || "Product"}
            loading="lazy"
            className="
              w-full
              h-full
              object-contain
              p-3
              sm:p-5
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </Link>

        {/* TOP BADGES */}

        <div
          className="
            absolute
            top-2
            sm:top-3
            left-2
            sm:left-3
            right-2
            sm:right-3
            flex
            items-start
            justify-between
          "
        >
          {/* FLASH SALE BADGE */}

          {isFlashSale ? (
            <span
              className="
                flex
                items-center
                gap-1
                px-2
                sm:px-2.5
                py-1
                rounded-full
                bg-blue-600
                text-white
                text-[9px]
                sm:text-xs
                font-bold
                shadow-sm
              "
            >
              <FaBolt size={9} />

              FLASH SALE
            </span>
          ) : (
            <span
              className="
                px-2
                sm:px-2.5
                py-1
                rounded-full
                bg-blue-600
                text-white
                text-[9px]
                sm:text-xs
                font-bold
              "
            >
              New
            </span>
          )}

          {/* WISHLIST */}

          <button
            onClick={() =>
              setIsFavorite(!isFavorite)
            }
            aria-label="Add to wishlist"
            className={`
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              flex
              items-center
              justify-center
              backdrop-blur-md
              shadow-sm
              transition-all
              duration-200
              ${isFavorite
                ? "bg-blue-600 text-white"
                : "bg-white/90 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            {isFavorite ? (
              <FaHeart size={13} />
            ) : (
              <FaRegHeart size={13} />
            )}
          </button>
        </div>

        {/* DISCOUNT BADGE */}

        {isFlashSale &&
          discountPercentage > 0 && (
            <span
              className="
                absolute
                bottom-3
                left-3
                px-2
                py-1
                rounded-md
                bg-amber-400
                text-slate-900
                text-[10px]
                font-extrabold
              "
            >
              -{discountPercentage}%
            </span>
          )}

        {/* QUICK VIEW */}

        <Link
          to={`/product/${product?._id}`}
          className="
            hidden
            md:flex
            absolute
            bottom-3
            left-1/2
            -translate-x-1/2
            translate-y-12
            group-hover:translate-y-0
            opacity-0
            group-hover:opacity-100
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white
            text-blue-600
            text-xs
            font-semibold
            shadow-lg
            transition-all
            duration-300
          "
        >
          <FaEye />

          Quick View
        </Link>
      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          flex
          flex-col
          flex-1
          p-3
          sm:p-4
        "
      >
        {/* CATEGORY + STOCK */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            mb-2
          "
        >
          <span
            className="
              max-w-[65%]
              truncate
              px-2
              py-1
              rounded-full
              bg-blue-50
              text-blue-600
              text-[9px]
              sm:text-xs
              font-semibold
            "
          >
            {product?.category?.name ||
              "General"}
          </span>

          {isOutOfStock ? (
            <span className="text-[9px] sm:text-xs font-semibold text-red-500">
              Out
            </span>
          ) : isLowStock ? (
            <span className="text-[9px] sm:text-xs font-semibold text-amber-500">
              {stock} left
            </span>
          ) : (
            <span className="text-[9px] sm:text-xs font-semibold text-emerald-500">
              In stock
            </span>
          )}
        </div>

        {/* PRODUCT NAME */}

        <Link
          to={`/product/${product?._id}`}
        >
          <h3
            className="
              min-h-[40px]
              sm:min-h-[42px]
              line-clamp-2
              text-sm
              sm:text-base
              font-semibold
              leading-5
              text-slate-800
              hover:text-blue-600
            "
          >
            {product?.name}
          </h3>
        </Link>

        {/* RATING */}

        <div
          className="
            flex
            items-center
            gap-1
            mt-2
          "
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map(
              (_, index) => (
                <FaStar
                  key={index}
                  size={10}
                  className={
                    index < rating
                      ? "text-amber-400"
                      : "text-slate-200"
                  }
                />
              )
            )}
          </div>

          <span className="text-[10px] text-slate-400">
            ({reviewCount})
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-3">
          <ProductPrice product={product} />
        </div>

        {/* COUNTDOWN */}

        {isFlashSale && (
          <div
            className="
              flex
              items-center
              justify-between
              mt-3
              px-2
              py-1.5
              rounded-lg
              bg-blue-50
              text-blue-700
            "
          >
            <span className="text-[9px] sm:text-xs font-medium">
              Ends in
            </span>

            <CountdownTimer
              endDate={
                product.flashSaleEndAt
              }
            />
          </div>
        )}

        {/* ADD TO CART */}

        <button
          onClick={handleAddToCart}
          disabled={
            loading ||
            isOutOfStock
          }
          className="
            w-full
            mt-auto
            pt-3
            sm:pt-4
          "
        >
          <span
            className="
              w-full
              flex
              items-center
              justify-center
              gap-1.5
              py-2.5
              sm:py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              text-xs
              sm:text-sm
              font-bold
              hover:from-blue-700
              hover:to-cyan-600
              transition-all
              duration-300
            "
          >
            <FaShoppingCart size={12} />

            {loading
              ? "Adding..."
              : isOutOfStock
                ? "Out of Stock"
                : "Add to Cart"}
          </span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;