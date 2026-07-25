import { useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaArrowRight,
  FaBoxOpen,
  FaBolt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../../library/api";
import Button from "../../component/UI/Button";
import { useAuth } from "../../Context/AuthContext";

const MySavedItems = () => {
  const navigate = useNavigate();

  const { user, loading: authLoading } =
    useAuth();

  const [savedItems, setSavedItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [removingId, setRemovingId] =
    useState(null);

  const [cartLoadingId, setCartLoadingId] =
    useState(null);

  /* =====================================================
     FETCH WISHLIST
  ===================================================== */

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/wishlist",
      );

      setSavedItems(
        res.data?.data || [],
      );
    } catch (error) {
      console.error(
        "Wishlist fetch error:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD WISHLIST
  ===================================================== */

  useEffect(() => {
    if (!authLoading && user) {
      fetchWishlist();
    }
  }, [user, authLoading]);

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      await api.delete(
        `/wishlist/${productId}`,
      );

      setSavedItems((prev) =>
        prev.filter(
          (item) =>
            item._id !== productId,
        ),
      );
    } catch (error) {
      console.error(
        "Remove wishlist error:",
        error,
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* =====================================================
     MOVE TO CART
  ===================================================== */

  const handleMoveToCart = async (
    product,
  ) => {
    try {
      setCartLoadingId(product._id);

      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      await api.delete(
        `/wishlist/${product._id}`,
      );

      setSavedItems((prev) =>
        prev.filter(
          (item) =>
            item._id !== product._id,
        ),
      );

      navigate("/cart");
    } catch (error) {
      console.error(
        "Move to cart error:",
        error,
      );
    } finally {
      setCartLoadingId(null);
    }
  };

  /* =====================================================
     AUTH LOADING
  ===================================================== */

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[var(--color-primary-light)] border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-[var(--color-text-muted)]">
            Loading your saved items...
          </p>

        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white border-b border-[var(--color-border)]">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            {/* TITLE */}
            <div className="flex items-center gap-4">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[var(--color-primary-light)]
                  text-[var(--color-primary)]
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                <FaHeart />
              </div>

              <div>

                <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                  Your Collection
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                  Saved Items
                </h1>

                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Products you want to keep an eye on
                </p>

              </div>

            </div>

            {/* COUNT */}
            <div
              className="
                flex
                items-center
                gap-3
                bg-[var(--color-background)]
                border
                border-[var(--color-border)]
                rounded-2xl
                px-5
                py-3
              "
            >

              <FaHeart className="text-[var(--color-accent)]" />

              <div>

                <p className="text-xs text-[var(--color-text-muted)]">
                  Saved Products
                </p>

                <p className="font-bold text-[var(--color-text-primary)]">
                  {savedItems.length} items
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* LOADING */}
        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {[...Array(8)].map(
              (_, index) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden animate-pulse"
                >

                  <div className="h-52 bg-slate-200" />

                  <div className="p-4 space-y-3">

                    <div className="h-4 bg-slate-200 rounded" />

                    <div className="h-4 bg-slate-200 rounded w-2/3" />

                    <div className="h-10 bg-slate-200 rounded" />

                  </div>

                </div>

              ),
            )}

          </div>

        ) : savedItems.length === 0 ? (

          /* EMPTY STATE */

          <div
            className="
              min-h-[500px]
              bg-white
              rounded-3xl
              border
              border-[var(--color-border)]
              flex
              items-center
              justify-center
              px-6
            "
          >

            <div className="text-center max-w-md">

              <div
                className="
                  w-24
                  h-24
                  mx-auto
                  rounded-full
                  bg-[var(--color-primary-light)]
                  text-[var(--color-primary)]
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mb-6
                "
              >
                <FaHeart />
              </div>

              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Your wishlist is empty
              </h2>

              <p className="text-[var(--color-text-muted)] mt-3">
                Save products you love and come back to them whenever you are ready.
              </p>

              <Button
                variant="gradient"
                size="lg"
                className="mt-6"
                icon={<FaArrowRight />}
                iconPosition="right"
                onClick={() =>
                  navigate("/products")
                }
              >
                Explore Products
              </Button>

            </div>

          </div>

        ) : (

          /* PRODUCT GRID */

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

            {savedItems.map(
              (product) => (

                <div
                  key={product._id}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[var(--shadow-lg)]
                  "
                >

                  {/* IMAGE */}
                  <div className="relative h-48 md:h-60 bg-[var(--color-background)] overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* SAVED BADGE */}
                    <div
                      className="
                        absolute
                        top-3
                        left-3
                        flex
                        items-center
                        gap-1
                        bg-white/95
                        backdrop-blur
                        text-[var(--color-primary)]
                        text-xs
                        font-bold
                        px-3
                        py-1.5
                        rounded-full
                        shadow-sm
                      "
                    >
                      <FaHeart />

                      Saved
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() =>
                        handleRemove(
                          product._id,
                        )
                      }
                      disabled={
                        removingId ===
                        product._id
                      }
                      className="
                        absolute
                        top-3
                        right-3
                        w-9
                        h-9
                        rounded-full
                        bg-white
                        text-[var(--color-danger)]
                        flex
                        items-center
                        justify-center
                        shadow-md
                        hover:bg-[var(--color-danger-light)]
                        transition
                        disabled:opacity-50
                      "
                      title="Remove from wishlist"
                    >

                      <FaTrash className="text-sm" />

                    </button>

                  </div>

                  {/* DETAILS */}
                  <div className="p-4">

                    <h2
                      className="
                        font-semibold
                        text-sm
                        md:text-base
                        text-[var(--color-text-primary)]
                        line-clamp-2
                        min-h-[40px]
                      "
                    >
                      {product.name}
                    </h2>

                    <div className="flex items-center justify-between mt-3">

                      <p className="text-lg font-bold text-[var(--color-primary)]">
                        ₦
                        {Number(
                          product.price || 0,
                        ).toLocaleString(
                          "en-NG",
                        )}
                      </p>

                      {product.stock > 0 && (
                        <span className="text-xs text-[var(--color-success)] font-semibold">
                          In Stock
                        </span>
                      )}

                    </div>

                    {/* ACTION */}
                    <Button
                      variant="gradient"
                      size="sm"
                      fullWidth
                      loading={
                        cartLoadingId ===
                        product._id
                      }
                      disabled={
                        product.stock <= 0 ||
                        cartLoadingId ===
                        product._id
                      }
                      icon={
                        <FaShoppingCart />
                      }
                      className="mt-4"
                      onClick={() =>
                        handleMoveToCart(
                          product,
                        )
                      }
                    >
                      Move to Cart
                    </Button>

                  </div>

                </div>

              ),
            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default MySavedItems;