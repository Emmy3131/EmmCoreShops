
import { useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaMinus,
  FaPlus,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

import ProductPrice from "./ProductPrice";
import WishListButton from "./WishListButton";

import { addGuestItem } from "../../library/guestCart";
import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";

const getProductId = (product) =>
  product?._id || product?.id;

const ProductDetailsCard = ({
  product,
  loading,
  onAddToCart,
  onBuyNow,
  onReviewClick,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  const productId = getProductId(product);

  /* =========================================
     FLASH SALE
  ========================================= */

  const isFlashSale =
    product?.isFlashSale &&
    Number(product?.flashSalePrice) > 0 &&
    product?.flashSaleEndAt &&
    new Date(product.flashSaleEndAt) > new Date();

  const activePrice = isFlashSale
    ? Number(product.flashSalePrice)
    : Number(product?.price || 0);

  /* =========================================
     STOCK
  ========================================= */

  const stock = Number(product?.stock) || 0;
  const isOutOfStock = stock <= 0;

  /* =========================================
     RATING
  ========================================= */

  const rating = Math.min(
    5,
    Math.max(0, Math.round(Number(product?.ratingsAverage) || 0))
  );

  const reviews = Number(product?.ratingsQuantity) || 0;

  /* =========================================
     QUANTITY
  ========================================= */

  const increaseQuantity = () => {
    setQuantity((previous) =>
      previous < stock ? previous + 1 : previous
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      previous > 1 ? previous - 1 : previous
    );
  };

  /* =========================================
     ADD TO CART
  ========================================= */

 
const handleAddToCart = async () => {
  if (!product?._id && !product?.id) {
    toast.error("Product not found");
    return;
  }

  if (isOutOfStock) {
    toast.error("Product is out of stock");
    return;
  }

  try {
    // GUEST USER: Save directly to localStorage
    if (!user) {
      const guestProduct = {
        ...product,
        price: activePrice,
      };

      const saved = addGuestItem(guestProduct, quantity);

      if (saved) {
        toast.success("Product added to your cart!");
      } else {
        toast.error("Could not save product to cart");
      }

      return;
    }

    // LOGGED-IN USER: Use existing backend callback
    if (onAddToCart) {
      await onAddToCart(quantity);
      return;
    }

    // FALLBACK: Call cart API directly
    const response = await api.post("/cart", {
      productId,
      quantity,
    });

    if (response.data?.status === "success") {
      toast.success("Product added to your cart!");
    } else {
      toast.error(
        response.data?.message || "Unable to add product"
      );
    }
  } catch (error) {
    console.error("Add to cart error:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to add product to cart"
    );
  }
};


  /* =========================================
     BUY NOW
  ========================================= */

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock");
      return;
    }

    if (onBuyNow) {
      onBuyNow(quantity);
    }
  };

  return (
    <section className="mx-auto mt-5 max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* PRODUCT VISUAL */}

        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 sm:min-h-[520px] lg:min-h-[650px]">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

          {/* TOP LABELS */}

          <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2 sm:left-7 sm:top-7">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-200 backdrop-blur-md">
              EmmCore Select
            </span>

            {isFlashSale && (
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-600/30">
                <FaBolt />
                Flash sale
              </span>
            )}
          </div>

          {/* WISHLIST */}

          <div className="absolute right-5 top-5 z-20 sm:right-7 sm:top-7">
            <WishListButton productId={productId} />
          </div>

          {/* PRODUCT IMAGE */}

          <div className="relative z-10 flex w-full items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80" />

            <div className="absolute h-48 w-48 rounded-full border border-white/10 sm:h-64 sm:w-64" />

            <img
              src={product?.image || "/placeholder-product.png"}
              alt={product?.name || "Product image"}
              className="relative z-10 max-h-[380px] w-full max-w-[90%] object-contain drop-shadow-2xl transition duration-700 hover:scale-105 sm:max-h-[460px]"
            />
          </div>

          {/* BOTTOM LABEL */}

          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between sm:bottom-7 sm:left-7 sm:right-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Discover
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Technology that moves you.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
              <FaArrowRight />
            </div>
          </div>
        </div>

        {/* PRODUCT INFORMATION */}

        <div className="flex flex-col p-5 sm:p-8 lg:p-10">

          {/* CATEGORY */}

          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {product?.category?.name || "General"}
            </span>
          </div>

          {/* PRODUCT NAME */}

          <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {product?.name}
          </h1>

          {/* RATING */}

          <button
            type="button"
            onClick={onReviewClick}
            className="mt-4 flex w-fit items-center gap-2 rounded-lg transition hover:opacity-80"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  size={13}
                  className={
                    index < rating
                      ? "text-amber-400"
                      : "text-slate-200"
                  }
                />
              ))}
            </div>

            <span className="text-sm font-medium text-slate-500">
              {reviews} {reviews === 1 ? "review" : "reviews"}
            </span>
          </button>

          {/* PRICE */}

          <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Price
            </p>

            <ProductPrice product={product} large />
          </div>

          {/* STOCK STATUS */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {isOutOfStock ? (
              <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                Currently unavailable
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In stock · {stock} available
              </span>
            )}

            {isFlashSale && (
              <span className="text-xs font-bold text-blue-600">
                Limited-time offer
              </span>
            )}
          </div>

          {/* QUANTITY */}

          {!isOutOfStock && (
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Quantity
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Choose how many you need
                </p>
              </div>

              <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                >
                  <FaMinus size={10} />
                </button>

                <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={loading || isOutOfStock}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-5 py-3.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaShoppingCart />

              {loading
                ? "Adding..."
                : isOutOfStock
                  ? "Out of stock"
                  : "Add to cart"}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={loading || isOutOfStock || !onBuyNow}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy now
              <FaArrowRight size={12} />
            </button>
          </div>

          {/* SHOPPING ASSURANCES */}

          <div className="mt-6 grid grid-cols-3 gap-2 border-y border-slate-100 py-5">
            <div className="text-center">
              <FaTruck className="mx-auto text-lg text-blue-600" />
              <p className="mt-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                Delivery
              </p>
            </div>

            <div className="text-center">
              <FaShieldAlt className="mx-auto text-lg text-blue-600" />
              <p className="mt-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                Secure payment
              </p>
            </div>

            <div className="text-center">
              <FaCheck className="mx-auto text-lg text-blue-600" />
              <p className="mt-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                Quality products
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-900">
              Product details
            </h2>

            <p className="text-sm leading-7 text-slate-600">
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCard;
