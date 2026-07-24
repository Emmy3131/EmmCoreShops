import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingBag,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../component/UI/Button";

const CheckOut = () => {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     AUTH GUARD
  ===================================================== */

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  /* =====================================================
     FETCH CART
  ===================================================== */

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        setCartLoading(true);

        const res = await api.get("/cart");

        const cart = res.data?.data;

        const items = cart?.items || [];

        setCartItems(items);

        const calculatedTotal = items.reduce(
          (sum, item) =>
            sum +
            Number(item.price || 0) *
              Number(item.quantity || 0),
          0,
        );

        setTotal(
          Number(cart?.totalPrice || calculatedTotal),
        );
      } catch (err) {
        console.error("Cart fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your cart",
        );
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =====================================================
     VALIDATE ADDRESS
  ===================================================== */

  const validateAddress = () => {
    const requiredFields = [
      "fullName",
      "phone",
      "state",
      "city",
      "address",
    ];

    const isValid = requiredFields.every(
      (field) => address[field].trim() !== "",
    );

    if (!isValid) {
      setError(
        "Please complete all delivery information before continuing.",
      );

      return false;
    }

    return true;
  };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = async () => {
    setError("");

    if (!validateAddress()) return;

    if (cartItems.length === 0) {
      setError("Your cart is empty.");

      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/orders/checkout", {
        shippingAddress: address,
      });

      const paymentUrl =
        res.data?.data?.authorizationUrl;

      if (!paymentUrl) {
        throw new Error(
          "Payment URL was not returned.",
        );
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Checkout failed. Please try again.",
      );

      setLoading(false);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[var(--color-primary-light)] border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-[var(--color-text-secondary)] font-medium">
            Preparing your checkout...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">

          <button
            onClick={() => navigate("/cart")}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-primary)]
              transition
            "
          >
            <FaArrowLeft />

            Back to Cart
          </button>

          <div className="mt-5">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[var(--color-primary-light)]
                  text-[var(--color-primary)]
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                <FaShoppingBag />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                  Checkout
                </h1>

                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Complete your order securely
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-4
              text-sm
              text-red-600
            "
          >
            <span className="font-bold">!</span>

            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">

          {/* =================================================
              DELIVERY INFORMATION
          ================================================= */}

          <div className="space-y-6">

            {/* PROGRESS */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[var(--color-primary)]
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                  >
                    1
                  </div>

                  <div>
                    <p className="font-bold text-[var(--color-text-primary)]">
                      Delivery Information
                    </p>

                    <p className="text-xs text-[var(--color-text-muted)]">
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                <FaCheckCircle className="text-[var(--color-primary)]" />

              </div>

            </div>

            {/* ADDRESS CARD */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 md:p-7">

              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[var(--color-accent-light)]
                    text-[var(--color-accent-dark)]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="font-bold text-lg text-[var(--color-text-primary)]">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-[var(--color-text-muted)]">
                    Enter your delivery details
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* FULL NAME */}
                <div className="md:col-span-2">

                  <label className="auth-label">
                    Full Name
                  </label>

                  <div className="relative">

                    <FaUser
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-light)]
                      "
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="auth-input pl-11"
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div>

                  <label className="auth-label">
                    Phone Number
                  </label>

                  <div className="relative">

                    <FaPhone
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-light)]
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      placeholder="08012345678"
                      className="auth-input pl-11"
                    />

                  </div>

                </div>

                {/* STATE */}
                <div>

                  <label className="auth-label">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="auth-input"
                  />

                </div>

                {/* CITY */}
                <div>

                  <label className="auth-label">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="auth-input"
                  />

                </div>

                {/* ADDRESS */}
                <div className="md:col-span-2">

                  <label className="auth-label">
                    Full Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="House number, street name, landmark..."
                    className="auth-input resize-none"
                  />

                </div>

              </div>

            </div>

            {/* SECURITY CARD */}
            <div
              className="
                rounded-2xl
                border
                border-[var(--color-accent-light)]
                bg-[var(--color-accent-light)]
                p-5
                flex
                gap-4
              "
            >

              <div className="text-[var(--color-accent-dark)] text-xl">
                <FaShieldAlt />
              </div>

              <div>

                <h3 className="font-bold text-[var(--color-text-primary)]">
                  Secure Checkout
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Your payment is securely processed by Paystack.
                  We never store your card details.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div>

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-[var(--color-border)]
                p-5
                md:p-6
                lg:sticky
                lg:top-6
              "
            >

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[var(--color-primary-light)]
                      text-[var(--color-primary)]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaShoppingBag />
                  </div>

                  <div>

                    <h2 className="font-bold text-lg">
                      Order Summary
                    </h2>

                    <p className="text-sm text-[var(--color-text-muted)]">
                      {cartItems.length} item
                      {cartItems.length !== 1 ? "s" : ""}
                    </p>

                  </div>

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">

                {cartItems.length === 0 ? (

                  <div className="text-center py-8">

                    <FaShoppingBag className="mx-auto text-3xl text-[var(--color-text-light)] mb-3" />

                    <p className="text-sm text-[var(--color-text-muted)]">
                      Your cart is empty
                    </p>

                  </div>

                ) : (

                  cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="
                        flex
                        gap-3
                        pb-4
                        border-b
                        border-[var(--color-border)]
                      "
                    >

                      <div
                        className="
                          w-16
                          h-16
                          rounded-xl
                          bg-[var(--color-background)]
                          overflow-hidden
                          flex-shrink-0
                        "
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-sm truncate">
                          {item.name}
                        </h3>

                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="font-bold text-[var(--color-primary)] mt-1">
                          ₦
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>

              {/* PRICE BREAKDOWN */}
              <div className="space-y-3 mt-6">

                <div className="flex justify-between text-sm">

                  <span className="text-[var(--color-text-muted)]">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₦{total.toLocaleString()}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[var(--color-text-muted)]">
                    Delivery
                  </span>

                  <span className="text-[var(--color-success)] font-semibold">
                    Free
                  </span>

                </div>

                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between">

                  <span className="font-bold text-lg">
                    Total
                  </span>

                  <span className="font-bold text-xl text-[var(--color-primary)]">
                    ₦{total.toLocaleString()}
                  </span>

                </div>

              </div>

              {/* PAYMENT BUTTON */}
              <Button
                variant="gradient"
                size="lg"
                fullWidth
                loading={loading}
                disabled={
                  loading ||
                  cartItems.length === 0
                }
                onClick={handlePlaceOrder}
                icon={<FaCreditCard />}
              >
                Proceed to Secure Payment
              </Button>

              {/* PAYMENT NOTE */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[var(--color-text-muted)]">

                <FaLock />

                <span>
                  Secure payment powered by Paystack
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckOut;