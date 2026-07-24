import api from "../../library/api";
import { useState, useEffect } from "react";
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
} from "react-icons/fa";

import Button from "../../component/UI/Button";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  /* =====================================================
     FETCH CART
  ===================================================== */

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await api.get("/cart");

      const data = res.data.data;

      const items = data?.items || [];

      setCartItems(items);

      const sum = items.reduce((acc, item) => {
        return (
          acc +
          Number(item.price || 0) *
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
  };

  /* =====================================================
     LOAD CART
  ===================================================== */

  useEffect(() => {
    fetchCart();
  }, []);

  /* =====================================================
     CHECKOUT
  ===================================================== */

  const handleCheckout = () => {
    navigate("/checkout");
  };

  /* =====================================================
     UPDATE QUANTITY
  ===================================================== */

  const handleQuantityChange = async (
    productId,
    type
  ) => {
    try {
      setUpdatingId(productId);

      const quantity =
        type === "increase" ? 1 : -1;

      const res = await api.patch(
        "/cart/update",
        {
          productId,
          quantity,
        }
      );

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

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const handleRemove = async (id) => {
    try {
      setRemovingId(id);

      const res = await api.delete(
        `/cart/${id}`
      );

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

  /* =====================================================
     CLEAR CART
  ===================================================== */

  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) return;

    try {
      setClearing(true);

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

  /* =====================================================
     LOADING STATE
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-24 px-4 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    bg-white
                    rounded-[var(--radius-lg)]
                    p-5
                    border
                    border-[var(--color-border)]
                    animate-pulse
                  "
                >
                  <div className="flex gap-4">

                    <div className="w-24 h-24 bg-slate-200 rounded-xl" />

                    <div className="flex-1 space-y-3">

                      <div className="h-5 bg-slate-200 rounded w-1/2" />

                      <div className="h-4 bg-slate-200 rounded w-1/3" />

                      <div className="h-8 bg-slate-200 rounded w-32" />

                    </div>

                  </div>
                </div>
              ))}

            </div>

            <div className="h-80 bg-white rounded-2xl animate-pulse" />

          </div>

        </div>

      </div>
    );
  }

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-24 px-4">

        <div className="max-w-4xl mx-auto">

          <div
            className="
              bg-white
              border
              border-[var(--color-border)]
              rounded-[var(--radius-xl)]
              shadow-[var(--shadow-md)]
              min-h-[520px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-6
            "
          >

            <div
              className="
                w-24
                h-24
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
              <FaShoppingCart />
            </div>

            <h1
              className="
                text-2xl
                md:text-3xl
                font-bold
                text-[var(--color-text-primary)]
              "
            >
              Your Cart is Empty
            </h1>

            <p
              className="
                text-[var(--color-text-muted)]
                mt-3
                max-w-md
              "
            >
              Looks like you haven't added anything
              to your cart yet. Explore our products
              and find something you love.
            </p>

            <Button
              variant="gradient"
              size="lg"
              className="mt-8"
              icon={<FaArrowRight />}
              iconPosition="right"
              onClick={() =>
                navigate("/products")
              }
            >
              Browse Products
            </Button>

          </div>

        </div>

      </div>
    );
  }

  /* =====================================================
     MAIN CART
  ===================================================== */

  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-background)]
        pt-24
        pb-16
        px-4
        md:px-8
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            justify-between
            gap-4
            mb-8
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[var(--color-primary-light)]
                  text-[var(--color-primary)]
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                <FaShoppingCart />
              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  Shopping Cart
                </h1>

                <p
                  className="
                    text-sm
                    text-[var(--color-text-muted)]
                    mt-1
                  "
                >
                  {cartItems.length}{" "}
                  {cartItems.length === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>

              </div>

            </div>

          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<FaTrash />}
            onClick={handleClearCart}
            loading={clearing}
          >
            Clear Cart
          </Button>

        </div>

        {/* ================= CONTENT ================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
            items-start
          "
        >

          {/* ================= CART ITEMS ================= */}

          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => {

              const productId =
                item.product?._id ||
                item.product;

              const itemTotal =
                Number(item.price || 0) *
                Number(item.quantity || 1);

              return (
                <div
                  key={item._id}
                  className="
                    bg-white
                    border
                    border-[var(--color-border)]
                    rounded-[var(--radius-lg)]
                    p-4
                    md:p-5
                    shadow-[var(--shadow-sm)]
                    hover:shadow-[var(--shadow-md)]
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-5
                    "
                  >

                    {/* PRODUCT IMAGE */}

                    <div
                      className="
                        w-full
                        sm:w-28
                        h-28
                        flex-shrink-0
                        bg-slate-50
                        rounded-xl
                        overflow-hidden
                        border
                        border-[var(--color-border)]
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          hover:scale-105
                          transition-transform
                          duration-300
                        "
                      />

                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="flex-1">

                      <div
                        className="
                          flex
                          justify-between
                          gap-4
                        "
                      >

                        <div>

                          <h2
                            className="
                              font-semibold
                              text-[var(--color-text-primary)]
                              text-base
                              md:text-lg
                              line-clamp-2
                            "
                          >
                            {item.name}
                          </h2>

                          <p
                            className="
                              text-sm
                              text-[var(--color-text-muted)]
                              mt-1
                            "
                          >
                            Unit price
                          </p>

                          <p
                            className="
                              font-bold
                              text-[var(--color-primary)]
                              mt-1
                            "
                          >
                            ₦
                            {Number(
                              item.price || 0
                            ).toLocaleString()}
                          </p>

                        </div>

                        {/* REMOVE */}

                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<FaTrash />}
                          loading={
                            removingId === productId
                          }
                          disabled={
                            removingId === productId
                          }
                          onClick={() =>
                            handleRemove(productId)
                          }
                          className="
                            text-[var(--color-danger)]
                            hover:bg-[var(--color-danger-light)]
                            hover:text-[var(--color-danger)]
                          "
                        >
                          <span className="hidden md:inline">
                            Remove
                          </span>
                        </Button>

                      </div>

                      {/* BOTTOM ROW */}

                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          justify-between
                          gap-4
                          mt-5
                        "
                      >

                        {/* QUANTITY */}

                        <div>

                          <p
                            className="
                              text-xs
                              text-[var(--color-text-muted)]
                              mb-2
                            "
                          >
                            Quantity
                          </p>

                          <div
                            className="
                              inline-flex
                              items-center
                              border
                              border-[var(--color-border)]
                              rounded-xl
                              overflow-hidden
                            "
                          >

                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<FaMinus />}
                              disabled={
                                updatingId === productId ||
                                item.quantity <= 1
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  productId,
                                  "decrease"
                                )
                              }
                              className="
                                rounded-none
                                px-3
                                text-[var(--color-primary)]
                              "
                            />

                            <span
                              className="
                                min-w-10
                                text-center
                                font-semibold
                                text-[var(--color-text-primary)]
                              "
                            >
                              {item.quantity}
                            </span>

                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<FaPlus />}
                              disabled={
                                updatingId === productId
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  productId,
                                  "increase"
                                )
                              }
                              className="
                                rounded-none
                                px-3
                                text-[var(--color-primary)]
                              "
                            />

                          </div>

                        </div>

                        {/* ITEM TOTAL */}

                        <div className="sm:text-right">

                          <p
                            className="
                              text-xs
                              text-[var(--color-text-muted)]
                            "
                          >
                            Item Total
                          </p>

                          <p
                            className="
                              text-lg
                              font-bold
                              text-[var(--color-text-primary)]
                              mt-1
                            "
                          >
                            ₦
                            {itemTotal.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ================= SUMMARY ================= */}

          <div className="lg:sticky lg:top-24">

            <div
              className="
                bg-white
                border
                border-[var(--color-border)]
                rounded-[var(--radius-xl)]
                shadow-[var(--shadow-md)]
                overflow-hidden
              "
            >

              {/* SUMMARY HEADER */}

              <div
                className="
                  bg-gradient-to-r
                  from-[var(--color-primary)]
                  to-[var(--color-accent)]
                  text-white
                  p-6
                "
              >

                <h2 className="text-xl font-bold">
                  Order Summary
                </h2>

                <p className="text-sm text-white/80 mt-1">
                  Review your order before checkout
                </p>

              </div>

              {/* SUMMARY BODY */}

              <div className="p-6">

                <div
                  className="
                    flex
                    justify-between
                    text-[var(--color-text-secondary)]
                    mb-4
                  "
                >
                  <span>
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-[var(--color-text-secondary)]
                    mb-4
                  "
                >
                  <span>
                    Delivery
                  </span>

                  <span
                    className="
                      text-[var(--color-success)]
                      font-semibold
                    "
                  >
                    FREE
                  </span>
                </div>

                <div
                  className="
                    border-t
                    border-[var(--color-border)]
                    pt-5
                    mt-5
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span
                      className="
                        text-lg
                        font-semibold
                        text-[var(--color-text-primary)]
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-2xl
                        font-bold
                        text-[var(--color-primary)]
                      "
                    >
                      ₦{total.toLocaleString()}
                    </span>

                  </div>

                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  fullWidth
                  icon={<FaArrowRight />}
                  iconPosition="right"
                  onClick={handleCheckout}
                  className="mt-6"
                >
                  Proceed to Checkout
                </Button>

                {/* BENEFITS */}

                <div className="mt-6 space-y-4">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-[var(--color-text-secondary)]
                    "
                  >

                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-[var(--color-accent-light)]
                        text-[var(--color-accent-dark)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaTruck />
                    </div>

                    <span>
                      Fast and reliable delivery
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-[var(--color-text-secondary)]
                    "
                  >

                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-[var(--color-primary-light)]
                        text-[var(--color-primary)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaShieldAlt />
                    </div>

                    <span>
                      Secure and protected checkout
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-[var(--color-text-secondary)]
                    "
                  >

                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-[var(--color-success-light)]
                        text-[var(--color-success)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaBoxOpen />
                    </div>

                    <span>
                      Quality products guaranteed
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;