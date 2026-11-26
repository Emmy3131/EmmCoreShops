
import { useState } from "react";
import {
  FaShoppingCart,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../library/api";
import ProductPrice from "./ProductPrice";
import { addGuestItem } from "../../library/guestCart";
import { useAuth } from "../../Context/AuthContext";

import WishListButton from "./WishListButton";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* =========================================
     FLASH SALE STATUS
  ========================================= */

  const isFlashSale =
    product?.isFlashSale &&
    Number(product?.flashSalePrice) > 0 &&
    product?.flashSaleEndAt &&
    new Date(product.flashSaleEndAt) > new Date();

  /* =========================================
     PRICES
  ========================================= */

  const originalPrice = Number(
    product?.oldPrice || product?.price || 0
  );

  const activePrice = isFlashSale
    ? Number(product.flashSalePrice)
    : Number(product?.price || 0);

  /* =========================================
     DISCOUNT
  ========================================= */

  const discountPercentage =
    isFlashSale && originalPrice > activePrice
      ? Math.round(
        ((originalPrice - activePrice) / originalPrice) * 100
      )
      : 0;

  /* =========================================
     STOCK
  ========================================= */

  const stock = Number(product?.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = async () => {
    if (!product?._id) {
      toast.error("Product not found");
      return;
    }

    if (isOutOfStock) {
      toast.error("Product is out of stock");
      return;
    }

    try {
      setLoading(true);

      // GUEST USER
      if (!user) {
        const guestProduct = {
          ...product,
          price: activePrice,
        };

        const saved = addGuestItem(guestProduct, 1);

        if (saved) {
          toast.success("Added to cart 🛒");
        } else {
          toast.error("Unable to save product to cart");
        }

        return;
      }

      // LOGGED-IN USER
      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      if (res.data?.status === "success") {
        toast.success("Added to cart 🛒");
      } else {
        toast.error(
          res.data?.message || "Unable to add product to cart"
        );
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
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
        group flex h-full flex-col overflow-hidden
        rounded-2xl border border-slate-200 bg-white
        transition-all duration-300
        hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <div className="relative h-40 overflow-hidden bg-slate-50 md:h-64">
        <Link
          to={`/product/${product?._id}`}
          className="block h-full w-full"
        >
          <img
            src={product?.image || "/placeholder-product.png"}
            alt={product?.name || "Product"}
            loading="lazy"
            className="
              h-full w-full object-contain p-2 md:p-3
              transition-transform duration-500
              group-hover:scale-110
            "
          />
        </Link>

        {/* DISCOUNT BADGE */}

        {isFlashSale && discountPercentage > 0 && (
          <span
            className="
              absolute bottom-3 left-3 rounded-md
              bg-amber-400 px-2 py-1
              text-[10px] font-extrabold text-slate-900
            "
          >
            -{discountPercentage}%
          </span>
        )}

        {/* WISHLIST */}

        <div className="absolute right-3 top-3 z-10">
          <WishListButton productId={product?._id} />
        </div>

        {/* QUICK VIEW */}

        <Link
          to={`/product/${product?._id}`}
          className="
            absolute bottom-3 left-1/2 hidden
            -translate-x-1/2 translate-y-12
            items-center gap-2 rounded-full bg-white
            px-4 py-2 text-xs font-semibold text-blue-600
            opacity-0 shadow-lg transition-all duration-300
            group-hover:translate-y-0 group-hover:opacity-100
            md:flex
          "
        >
          <FaEye />
          Quick View
        </Link>
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* CATEGORY + STOCK */}

        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className="
              max-w-[65%] truncate rounded-full
              bg-blue-50 px-2 py-1
              text-[9px] font-semibold text-blue-600 sm:text-xs
            "
          >
            {product?.category?.name || "General"}
          </span>

          {isOutOfStock ? (
            <span className="text-[9px] font-semibold text-red-500 sm:text-xs">
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="text-[9px] font-semibold text-amber-500 sm:text-xs">
              {stock} left
            </span>
          ) : (
            <span className="text-[9px] font-semibold text-emerald-500 sm:text-xs">
              In stock
            </span>
          )}
        </div>

        {/* PRODUCT NAME */}

        <Link to={`/product/${product?._id}`}>
          <h3
            className="
              line-clamp-2 text-sm font-semibold
              leading-5 text-slate-800
              hover:text-blue-600 sm:text-base
            "
          >
            {product?.name}
          </h3>
        </Link>

        {/* PRICE */}

        <div className="mt-2">
          <ProductPrice product={product} />
        </div>

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading || isOutOfStock}
          className="mt-auto w-full pt-3 sm:pt-4"
        >
          <span
            className="
              flex w-full items-center justify-center gap-1.5
              rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500
              py-2.5 text-xs font-bold text-white
              transition-all duration-300
              hover:from-blue-700 hover:to-cyan-600
              disabled:opacity-50 sm:py-3 sm:text-sm
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
