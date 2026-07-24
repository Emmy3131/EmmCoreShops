import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";

import ProductPrice from "./ProductPrice";

const ProductDetailsCard = ({
  product,
  loading,
  onAddToCart,
  onBuyNow,
  onReviewClick,
}) => {
  const [quantity, setQuantity] =
    useState(1);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const handleBuyNow = () => {
    onBuyNow(quantity);
  };

  /*
  ===============================
  FLASH SALE STATUS
  ===============================
  */

  const isFlashSale =
    product?.isFlashSale &&
    product?.flashSalePrice &&
    product?.flashSaleEndAt &&
    new Date(
      product.flashSaleEndAt
    ) > new Date();

  /*
  ===============================
  STOCK
  ===============================
  */

  const stock =
    Number(product?.stock) || 0;

  const isOutOfStock =
    stock <= 0;

  /*
  ===============================
  RATING
  ===============================
  */

  const rating = Math.round(
    Number(
      product?.ratingsAverage
    ) || 0
  );

  const reviews =
    product?.ratingsQuantity || 0;

  /*
  ===============================
  QUANTITY
  ===============================
  */

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  /*
  ===============================
  ADD TO CART
  ===============================
  */

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-slate-200
        shadow-sm
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >

        {/* =================================
            PRODUCT IMAGE
        ================================= */}

        <div
          className="
            relative
            min-h-[360px]
            sm:min-h-[500px]
            flex
            items-center
            justify-center
            bg-slate-50
            p-6
            sm:p-10
          "
        >

          {/* FLASH SALE BADGE */}

          {isFlashSale && (
            <div
              className="
                absolute
                top-5
                left-5
                z-10
                flex
                items-center
                gap-2
                rounded-full
                bg-blue-600
                px-4
                py-2
                text-xs
                font-bold
                text-white
                shadow-lg
              "
            >
              <FaBolt size={11} />

              FLASH SALE
            </div>
          )}

          {/* WISHLIST */}

          <button
            onClick={() =>
              setIsFavorite(
                !isFavorite
              )
            }
            className={`
              absolute
              top-5
              right-5
              z-10
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition
              ${isFavorite
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaHeart size={16} />
          </button>

          {/* IMAGE */}

          <img
            src={product?.image}
            alt={product?.name}
            className="
              max-h-[420px]
              w-full
              object-contain
              transition-transform
              duration-500
              hover:scale-105
            "
          />

        </div>

        {/* =================================
            PRODUCT INFORMATION
        ================================= */}

        <div
          className="
            flex
            flex-col
            p-5
            sm:p-8
            lg:p-10
          "
        >

          {/* CATEGORY */}

          <div className="mb-3">

            <span
              className="
                inline-flex
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-600
              "
            >
              {product?.category?.name ||
                "General"}
            </span>

          </div>

          {/* PRODUCT NAME */}

          <h1
            className="
              text-2xl
              font-extrabold
              leading-tight
              text-slate-900
              sm:text-3xl
            "
          >
            {product?.name}
          </h1>

          {/* RATING */}

          <button
            onClick={onReviewClick}
            className="
              mt-4
              flex
              w-fit
              items-center
              gap-2
            "
          >
            <div className="flex gap-1">

              {[...Array(5)].map(
                (_, index) => (
                  <FaStar
                    key={index}
                    size={14}
                    className={
                      index < rating
                        ? "text-amber-400"
                        : "text-slate-200"
                    }
                  />
                )
              )}

            </div>

            <span
              className="
                text-sm
                text-slate-500
                hover:text-blue-600
              "
            >
              {reviews} reviews
            </span>

          </button>

          {/* PRICE */}

          <div className="mt-6">

            <ProductPrice
              product={product}
              large
            />

          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mt-6
              border-t
              border-slate-100
              pt-6
            "
          >
            <h2
              className="
                mb-2
                text-sm
                font-bold
                text-slate-900
              "
            >
              Product Description
            </h2>

            <p
              className="
                text-sm
                leading-7
                text-slate-600
              "
            >
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* STOCK */}

          <div className="mt-6">

            {isOutOfStock ? (
              <p
                className="
                  font-semibold
                  text-red-500
                "
              >
                Out of stock
              </p>
            ) : (
              <p
                className="
                  text-sm
                  font-semibold
                  text-emerald-600
                "
              >
                {stock} items available
              </p>
            )}

          </div>

          {/* QUANTITY */}

          {!isOutOfStock && (
            <div
              className="
                mt-5
                flex
                items-center
                gap-4
              "
            >

              <span
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Quantity
              </span>

              <div
                className="
                  flex
                  items-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                "
              >

                <button
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    quantity <= 1
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-blue-50
                    disabled:opacity-40
                  "
                >
                  <FaMinus size={11} />
                </button>

                <span
                  className="
                    flex
                    h-10
                    w-12
                    items-center
                    justify-center
                    border-x
                    border-slate-200
                    text-sm
                    font-bold
                  "
                >
                  {quantity}
                </span>

                <button
                  onClick={
                    increaseQuantity
                  }
                  disabled={
                    quantity >= stock
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-blue-50
                    disabled:opacity-40
                  "
                >
                  <FaPlus size={11} />
                </button>

              </div>

            </div>
          )}

          {/* ACTIONS */}

          <div
            className="
    mt-6
    grid
    grid-cols-1
    gap-3
    sm:grid-cols-2
  "
          >
            {/* ADD TO CART */}

            <button
              onClick={handleAddToCart}
              disabled={loading || isOutOfStock}
              className="
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-blue-600
      px-5
      py-3.5
      text-sm
      font-bold
      text-blue-600
      transition
      hover:bg-blue-50
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              <FaShoppingCart />

              {loading
                ? "Adding..."
                : isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
            </button>

            {/* BUY NOW */}

            <button
              onClick={handleBuyNow}
              disabled={loading || isOutOfStock}
              className="
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      px-5
      py-3.5
      text-sm
      font-bold
      text-white
      shadow-lg
      shadow-blue-200
      transition
      hover:from-blue-700
      hover:to-cyan-600
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              <FaBolt />

              Buy Now
            </button>
          </div>

          {/* BENEFITS */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-4
              border-t
              border-slate-100
              pt-6
              sm:grid-cols-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <FaTruck
                className="text-blue-600"
              />

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-800
                  "
                >
                  Fast Delivery
                </p>

                <p
                  className="
                    text-[10px]
                    text-slate-500
                  "
                >
                  Delivered to your door
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <FaShieldAlt
                className="text-blue-600"
              />

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-800
                  "
                >
                  Secure Payment
                </p>

                <p
                  className="
                    text-[10px]
                    text-slate-500
                  "
                >
                  Safe and secure checkout
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <FaUndo
                className="text-blue-600"
              />

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-800
                  "
                >
                  Easy Returns
                </p>

                <p
                  className="
                    text-[10px]
                    text-slate-500
                  "
                >
                  Shop with confidence
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDetailsCard;