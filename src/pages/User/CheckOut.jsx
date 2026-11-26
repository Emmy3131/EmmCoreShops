
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaLock,
  FaMapMarkerAlt,
  FaPlus,
  FaShieldAlt,
  FaShoppingBag,
  FaTruck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";

import SavedAddressCard from "../../component/CheckOut/SavedAddressCard";
import AddressModal from "../../component/CheckOut/AddressModel";
import OrderSummary from "../../component/CheckOut/OrderSummary";

const CheckOut = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const initCheckout = async () => {
      try {
        setPageLoading(true);
        setError("");

        await Promise.all([loadCart(), loadAddresses()]);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Unable to load checkout."
        );
      } finally {
        setPageLoading(false);
      }
    };

    initCheckout();
  }, [user]);

  const loadCart = async () => {
    const res = await api.get("/cart");
    const cart = res.data.data;

    setCartItems(cart?.items || []);
    setTotal(Number(cart?.totalPrice || 0));
  };

  const loadAddresses = async () => {
    const res = await api.get("/users/addresses");
    const addresses = res.data.data.addresses || [];

    setSavedAddresses(addresses);

    setSelectedAddress((current) => {
      if (current) {
        const stillExists = addresses.find(
          (item) => item._id === current._id
        );

        if (stillExists) return stillExists;
      }

      return (
        addresses.find((item) => item.isDefault) ||
        addresses[0] ||
        null
      );
    });

    return addresses;
  };

  const saveNewAddress = async (address) => {
    try {
      setSavingAddress(true);
      setError("");

      const res = await api.post("/users/addresses", address);

      const newAddress =
        res.data?.data?.address || res.data?.address || address;

      await loadAddresses();

      setSelectedAddress(newAddress);
      setShowAddressModal(false);

      return newAddress;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setSavingAddress(false);
    }
  };

  const deleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await api.delete(`/users/addresses/${id}`);
      await loadAddresses();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to delete address."
      );
    }
  };

  const handleCheckout = async () => {
    setError("");

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!selectedAddress) {
      setError("Please add or select a delivery address.");
      setShowAddressModal(true);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/orders/checkout", {
        shippingAddress: selectedAddress,
      });

      const paymentUrl = res.data?.data?.authorizationUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL was not returned.");
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Checkout failed. Please try again."
      );

      setLoading(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            Preparing your checkout...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] pb-16">
      {/* Header */}
      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaArrowLeft className="text-xs" />
            Back to cart
          </button>

          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                <FaLock />
                Secure payment
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Checkout<span className="text-cyan-400">.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Almost there. Confirm your delivery details and complete
                your order securely.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-xl text-cyan-300">
                <FaShoppingBag />
              </div>

              <div>
                <p className="text-xs text-slate-400">Items in your cart</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout progress */}
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { label: "Delivery", number: "01", active: true },
              { label: "Review", number: "02", active: true },
              { label: "Payment", number: "03", active: false },
            ].map((step, index) => (
              <div key={step.number}>
                <div className="mb-3 flex items-center gap-2 sm:gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step.active
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-white/20 text-slate-400"
                      }`}
                  >
                    {step.active ? <FaCheck /> : step.number}
                  </span>

                  <span
                    className={`text-xs font-semibold sm:text-sm ${step.active ? "text-white" : "text-slate-500"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>

                <div
                  className={`h-1 rounded-full ${index === 0
                      ? "bg-cyan-400"
                      : step.active
                        ? "bg-cyan-400/60"
                        : "bg-white/10"
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
            <span className="mt-0.5 font-bold">!</span>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* Delivery section */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg text-blue-600">
                    <FaTruck />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                      Step 01
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Delivery address
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Choose where your order should go.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setShowAddressModal(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <FaPlus className="text-xs" />
                  Add address
                </button>
              </div>

              <div className="my-6 h-px bg-slate-100" />

              {savedAddresses.length > 0 ? (
                <SavedAddressCard
                  addresses={savedAddresses}
                  selectedAddress={selectedAddress}
                  onSelect={(item) => {
                    setSelectedAddress(item);
                    setError("");
                  }}
                  onDelete={deleteAddress}
                  onAddNew={() => {
                    setError("");
                    setShowAddressModal(true);
                  }}
                />
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl text-blue-500 shadow-sm">
                    <FaMapMarkerAlt />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    No delivery address yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Add your delivery details to continue with your order.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    <FaPlus />
                    Add your first address
                  </button>
                </div>
              )}
            </div>

            {/* Payment reassurance */}
            <div className="overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <FaShieldAlt />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Your payment stays protected
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Payments are processed securely through Paystack. Your
                    card details are handled by the payment provider and
                    are not stored by EmmCoreShops.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="rounded-full bg-white px-3 py-1.5">
                      <FaLock className="mr-1 inline text-blue-600" />
                      Secure checkout
                    </span>
                    <span className="rounded-full bg-white px-3 py-1.5">
                      Encrypted payment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <FaArrowLeft className="text-xs" />
              Return to cart
            </button>
          </section>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-6">
            <div className="mb-4 flex items-center gap-2 px-1">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Step 02 · Review your order
              </p>
            </div>

            <OrderSummary
              cartItems={cartItems}
              total={total}
              loading={loading}
              onCheckout={handleCheckout}
            />

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to complete your purchase
              through our secure payment provider.
            </p>
          </aside>
        </div>
      </main>

      {/* Separate address modal */}
      {showAddressModal && (
        <AddressModal
          onClose={() => {
            if (!savingAddress) {
              setShowAddressModal(false);
            }
          }}
          onSave={saveNewAddress}
          saving={savingAddress}
        />
      )}
    </div>
  );
};

export default CheckOut;
