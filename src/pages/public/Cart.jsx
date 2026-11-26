
import api from "../../library/api";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
  FaBoxOpen,
  FaShieldAlt,
  FaTruck,
  FaLock,
  FaShoppingBag,
  FaCheckCircle,
} from "react-icons/fa";

import Button from "../../component/UI/Button";
import { useAuth } from "../../Context/AuthContext";

import {
  getGuestCart,
  getGuestCartTotal,
  updateGuestQuantity,
  removeGuestItem,
  clearGuestCart,
} from "../../library/guestCart";

const formatPrice = (amount) =>
  `₦${Number(amount || 0).toLocaleString("en-NG")}`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  /*
  =====================================================
  FETCH CART
  =====================================================
  */

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      if (!user) {
        const guestItems = getGuestCart();

        setCartItems(guestItems);
        setTotal(getGuestCartTotal());

        return;
      }

      const res = await api.get("/cart");

      const data = res.data.data;
      const items = data?.items || [];

      setCartItems(items);

      const sum = items.reduce((acc, item) => {
        return (
          acc +
          Number(item.price || item.product?.price || 0) *
          Number(item.quantity || 1)
        );
      }, 0);

      setTotal(sum);
    } catch (err) {
      console.error(
        "Cart fetch error:",
        err.response?.data || err.message
      );

      setCartItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  /*
  =====================================================
  GUEST CART LISTENER
  =====================================================
  */

  useEffect(() => {
    if (user) return;

    const updateCart = () => {
      setCartItems(getGuestCart());
      setTotal(getGuestCartTotal());
    };

    window.addEventListener("guest-cart-updated", updateCart);

    return () => {
      window.removeEventListener("guest-cart-updated", updateCart);
    };
  }, [user]);

  /*
  =====================================================
  CHECKOUT
  =====================================================
  */

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
      return;
    }

    navigate("/checkout");
  };

  /*
  =====================================================
  UPDATE QUANTITY
  =====================================================
  */

  const handleQuantityChange = async (productId, type) => {
    try {
      setUpdatingId(productId);

      if (!user) {
        const item = cartItems.find((i) => {
          const id =
            typeof i.product === "object"
              ? i.product?._id
              : i.product;

          return String(id) === String(productId);
        });

        if (!item) return;

        const newQuantity =
          type === "increase"
            ? item.quantity + 1
            : item.quantity - 1;

        if (newQuantity < 1) return;

        updateGuestQuantity(productId, newQuantity);

        setCartItems(getGuestCart());
        setTotal(getGuestCartTotal());

        return;
      }

      const quantity = type === "increase" ? 1 : -1;

      const res = await api.patch("/cart/update", {
        productId,
        quantity,
      });

      if (res.data.status === "success") {
        await fetchCart();
      }
    } catch (err) {
      console.error(
        "Quantity update error:",
        err.response?.data || err.message
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
  =====================================================
  REMOVE ITEM
  =====================================================
  */

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      if (!user) {
        removeGuestItem(productId);

        setCartItems(getGuestCart());
        setTotal(getGuestCartTotal());

        return;
      }

      const res = await api.delete(`/cart/${productId}`);

      if (res.data.status === "success") {
        await fetchCart();
      }
    } catch (err) {
      console.error(
        "Remove cart item error:",
        err.response?.data || err.message
      );
    } finally {
      setRemovingId(null);
    }
  };

  /*
  =====================================================
  CLEAR CART
  =====================================================
  */

  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) return;

    try {
      setClearing(true);

      if (!user) {
        clearGuestCart();

        setCartItems([]);
        setTotal(0);

        return;
      }

      const res = await api.delete("/cart");

      if (res.data.status === "success") {
        await fetchCart();
      }
    } catch (err) {
      console.error(
        "Clear cart error:",
        err.response?.data || err.message
      );
    } finally {
      setClearing(false);
    }
  };

  /*
  =====================================================
  LOADING STATE
  =====================================================
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-10 w-56 animate-pulse rounded-xl bg-slate-200" />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse gap-5 rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <div className="h-36 w-36 rounded-2xl bg-slate-200" />

                  <div className="flex-1 space-y-4 py-2">
                    <div className="h-5 w-1/2 rounded bg-slate-200" />
                    <div className="h-4 w-1/3 rounded bg-slate-200" />
                    <div className="h-9 w-32 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  /*
  =====================================================
  EMPTY CART
  =====================================================
  */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-28">
        <div className="mx-auto flex min-h-[580px] max-w-4xl flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white px-6 text-center shadow-sm">
          <div className="mb-7 flex h-28 w-28 items-center justify-center rounded-[30px] bg-blue-50 text-5xl text-blue-600">
            <FaShoppingBag />
          </div>

          <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            EmmCore Shopping
          </span>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Your cart is waiting.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            You haven't added anything yet. Discover smartphones,
            gadgets and accessories selected to make everyday
            technology better.
          </p>

          <Button
            variant="gradient"
            size="lg"
            className="mt-8"
            icon={<FaArrowRight />}
            iconPosition="right"
            onClick={() => navigate("/products")}
          >
            Explore products
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-2">
              <FaShieldAlt className="text-blue-500" />
              Secure shopping
            </span>

            <span className="flex items-center gap-2">
              <FaTruck className="text-blue-500" />
              Reliable delivery
            </span>
          </div>
        </div>
      </div>
    );
  }

  /*
  =====================================================
  MAIN CART
  =====================================================
  */

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 pb-20 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Your EmmCore selection
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Shopping cart
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review your items and get ready for checkout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs text-slate-400">Cart items</p>
              <p className="text-xl font-black text-slate-900">
                {cartItems.length}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<FaTrash />}
              onClick={handleClearCart}
              loading={clearing}
              disabled={clearing}
              className="border-red-100 text-red-500 hover:bg-red-50"
            >
              Clear cart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

          {/* CART ITEMS */}

          <div className="space-y-5 lg:col-span-2">
            {cartItems.map((item) => {
              const product =
                typeof item.product === "object"
                  ? item.product
                  : null;

              const productId =
                product?._id ||
                item.product?._id ||
                item.product ||
                item._id;

              const name =
                item.name ||
                product?.name ||
                "Product";

              const image =
                item.image?.url ||
                item.image ||
                product?.image?.url ||
                product?.image ||
                product?.images?.[0]?.url ||
                product?.images?.[0] ||
                "/placeholder.png";

              const price = Number(
                item.price || product?.price || 0
              );

              const quantity = Number(item.quantity || 1);
              const itemTotal = price * quantity;

              const isUpdating = updatingId === productId;
              const isRemoving = removingId === productId;

              return (
                <article
                  key={productId}
                  className="group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* PRODUCT IMAGE */}

                    <div className="relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100 sm:h-48 sm:w-48 md:h-52 md:w-52">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06),transparent_70%)]" />

                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.png";
                        }}
                        className="relative z-10 h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-5"
                      />

                      <span className="absolute bottom-3 left-3 z-20 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">
                        EmmCore
                      </span>
                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="mb-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                              Selected item
                            </span>

                            <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                              {name}
                            </h2>

                            <p className="mt-2 text-xs text-slate-400">
                              Unit price
                            </p>

                            <p className="mt-1 text-lg font-extrabold text-blue-600">
                              {formatPrice(price)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemove(productId)}
                            disabled={isRemoving}
                            title="Remove product"
                            aria-label={`Remove ${name}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                          >
                            {isRemoving ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                            ) : (
                              <FaTrash size={13} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
                        {/* QUANTITY */}

                        <div>
                          <p className="mb-2 text-xs font-semibold text-slate-400">
                            Quantity
                          </p>

                          <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(productId, "decrease")
                              }
                              disabled={isUpdating || quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <FaMinus size={11} />
                            </button>

                            <span className="flex h-full min-w-11 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-900">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(productId, "increase")
                              }
                              disabled={isUpdating}
                              aria-label="Increase quantity"
                              className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                            >
                              <FaPlus size={11} />
                            </button>
                          </div>

                          {isUpdating && (
                            <p className="mt-1 text-[10px] text-blue-500">
                              Updating...
                            </p>
                          )}
                        </div>

                        {/* ITEM TOTAL */}

                        <div className="text-left sm:text-right">
                          <p className="text-xs font-medium text-slate-400">
                            Item total
                          </p>

                          <p className="mt-1 text-xl font-black text-slate-900">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-4 text-sm font-bold text-slate-500 transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
            >
              <FaArrowRight className="rotate-180" size={12} />
              Continue shopping
            </button>
          </div>

          {/* ORDER SUMMARY */}

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

              {/* SUMMARY HEADER */}

              <div className="relative overflow-hidden bg-slate-950 p-6 text-white">
                <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-blue-600/30 blur-3xl" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-blue-300">
                    <FaShoppingCart />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Order summary
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Your order at a glance
                    </p>
                  </div>
                </div>
              </div>

              {/* SUMMARY CONTENT */}

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal ({cartItems.length} items)
                  </span>

                  <span className="font-bold text-slate-900">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="mb-5 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="font-bold text-emerald-600">
                    FREE
                  </span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-black tracking-tight text-blue-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-slate-400">
                    Delivery fees and any applicable charges will be
                    confirmed during checkout.
                  </p>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  fullWidth
                  icon={<FaArrowRight />}
                  iconPosition="right"
                  onClick={handleCheckout}
                  className="mt-7"
                >
                  Proceed to checkout
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
                  <FaLock className="text-emerald-500" />
                  Secure checkout experience
                </div>

                {/* BENEFITS */}

                <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FaTruck />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Reliable delivery
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Convenient order delivery
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <FaShieldAlt />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Secure payment
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Protected checkout process
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Quality products
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Shop with confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Thank you for shopping with EmmCoreShops.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
