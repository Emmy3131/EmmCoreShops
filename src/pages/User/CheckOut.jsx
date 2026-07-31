import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaShoppingBag,
  FaShieldAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";

import SavedAddressCard from "../../component/CheckOut/SavedAddressCard";
import AddressForm from "../../component/CheckOut/AddressForm";
import OrderSummary from "../../component/CheckOut/OrderSummary";

const CheckOut = () => {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  /* ===============================
     STATES
  =============================== */

  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

  const [savedAddresses, setSavedAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [saveAddress, setSaveAddress] = useState(true);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===============================
      AUTH CHECK
  =============================== */

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  /* ===============================
      LOAD CHECKOUT DATA
  =============================== */

  useEffect(() => {
    if (!user) return;

    const initCheckout = async () => {
      try {
        setPageLoading(true);

        await Promise.all([loadCart(), loadAddresses()]);
      } catch (err) {
        console.error(err);

        setError(err.response?.data?.message || "Unable to load checkout");
      } finally {
        setPageLoading(false);
      }
    };

    initCheckout();
  }, [user]);

  /* ===============================
       LOAD CART
  =============================== */

  const loadCart = async () => {
    try {
      const res = await api.get("/cart");

      const cart = res.data.data;

      setCartItems(cart?.items || []);

      setTotal(Number(cart?.totalPrice || 0));
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  /* ===============================
       LOAD ADDRESSES
  =============================== */

  const loadAddresses = async () => {
    try {
      const res = await api.get("/users/addresses");

      const addresses = res.data.data.addresses || [];

      setSavedAddresses(addresses);

      if (addresses.length) {
        const defaultAddress =
          addresses.find((item) => item.isDefault) || addresses[0];

        setSelectedAddress(defaultAddress);
      }
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  /* ===============================
       SAVE NEW ADDRESS
  =============================== */

  const saveNewAddress = async () => {
    try {
      const res = await api.post("/users/addresses", address);

      await loadAddresses();

      setShowForm(false);

      return res.data.data.address;
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Unable to save address");

      throw err;
    }
  };

  /* ===============================
       DELETE ADDRESS
  =============================== */

  const deleteAddress = async (id) => {
    const confirmDelete = window.confirm("Delete this address?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/addresses/${id}`);

      await loadAddresses();
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Unable to delete address");
    }
  };

  /* ===============================
       FORM CHANGE
  =============================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddress((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  };

  /* ===============================
       VALIDATE ADDRESS
  =============================== */

  const validateAddress = () => {
    const required = ["fullName", "phone", "address", "city", "state"];

    const valid = required.every((field) => address[field]?.trim());

    if (!valid) {
      setError("Please complete delivery information");

      return false;
    }

    return true;
  };

  /* ===============================
       CHECKOUT
  =============================== */

  const handleCheckout = async () => {
    setError("");

    if (!cartItems.length) {
      setError("Your cart is empty");

      return;
    }

    let shippingAddress;

    try {
      if (selectedAddress) {
        shippingAddress = selectedAddress;
      } else {
        if (!validateAddress()) return;

        if (saveAddress) {
          const newAddress = await saveNewAddress();

          shippingAddress = newAddress || address;
        } else {
          shippingAddress = address;
        }
      }

      setLoading(true);

      const res = await api.post("/orders/checkout", {
        shippingAddress,
      });

      const paymentUrl = res.data?.data?.authorizationUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL missing");
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || err.message || "Checkout failed");

      setLoading(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
      "
      >
        <div className="text-center">
          <div
            className="
            w-14
            h-14
            border-4
            border-blue-200
            border-t-blue-600
            rounded-full
            animate-spin
            mx-auto
            mb-4
          "
          />

          <p className="text-gray-600">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      pb-20
    "
    >
      {/* ===============================
          HEADER
      =============================== */}

      <section
        className="
        bg-gradient-to-r
        from-blue-700
        via-blue-600
        to-cyan-500
        text-white
      "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-5
          py-10
        "
        >
          <button
            onClick={() => navigate("/cart")}
            className="
              flex
              items-center
              gap-2
              text-blue-100
              hover:text-white
              transition
            "
          >
            <FaArrowLeft />
            Back to Cart
          </button>

          <div
            className="
            mt-8
            flex
            items-center
            gap-5
          "
          >
            <div
              className="
              w-20
              h-20
              rounded-3xl
              bg-white/20
              flex
              items-center
              justify-center
            "
            >
              <FaShoppingBag className="text-4xl" />
            </div>

            <div>
              <h1
                className="
                text-3xl
                md:text-4xl
                font-bold
              "
              >
                Secure Checkout
              </h1>

              <p
                className="
                text-blue-100
                mt-2
              "
              >
                Complete your order safely with Paystack payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main
        className="
        max-w-7xl
        mx-auto
        px-5
        py-8
      "
      >
        {/* ERROR MESSAGE */}

        {error && (
          <div
            className="
            bg-red-50
            border
            border-red-200
            text-red-600
            rounded-xl
            p-4
            mb-6
          "
          >
            {error}
          </div>
        )}

        {/* CHECKOUT STEPS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          mb-8
        "
        >
          {[
            {
              number: "1",
              title: "Delivery",
              text: "Choose address",
            },
            {
              number: "2",
              title: "Review",
              text: "Confirm order",
            },
            {
              number: "3",
              title: "Payment",
              text: "Pay securely",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                border
                p-5
                flex
                gap-4
                items-center
              "
            >
              <div
                className="
                w-12
                h-12
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
              >
                {step.number}
              </div>

              <div>
                <h3
                  className="
                  font-bold
                "
                >
                  {step.title}
                </h3>

                <p
                  className="
                  text-sm
                  text-gray-500
                "
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-[1fr_420px]
          gap-8
        "
        >
          {/* LEFT SIDE */}

          <div
            className="
            space-y-6
          "
          >
            <div
              className="
              bg-white
              rounded-2xl
              border
              p-5
              flex
              items-center
              gap-3
            "
            >
              <div
                className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
              "
              >
                1
              </div>

              <div>
                <h2
                  className="
                  font-bold
                "
                >
                  Delivery Information
                </h2>

                <p
                  className="
                  text-sm
                  text-gray-500
                "
                >
                  Select where your order will be delivered
                </p>
              </div>

              <FaCheckCircle
                className="
                  ml-auto
                  text-blue-600
                "
              />
            </div>

            <SavedAddressCard
              addresses={savedAddresses}
              selectedAddress={selectedAddress}
              onSelect={(item) => {
                setSelectedAddress(item);

                setShowForm(false);
              }}
              onDelete={deleteAddress}
              onAddNew={() => {
                setSelectedAddress(null);

                setShowForm(true);
              }}
            />

            {showForm && (
              <AddressForm
                address={address}
                onChange={handleChange}
                saveAddress={saveAddress}
                setSaveAddress={setSaveAddress}
              />
            )}

            <div
              className="
              bg-blue-50
              border
              border-blue-100
              rounded-2xl
              p-5
              flex
              gap-3
              items-start
            "
            >
              <FaShieldAlt
                className="
                  text-blue-600
                  mt-1
                "
              />

              <p
                className="
                text-sm
                text-gray-700
              "
              >
                Your payment is protected by Paystack. Your card information is
                never stored.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <OrderSummary
            cartItems={cartItems}
            total={total}
            loading={loading}
            onCheckout={handleCheckout}
          />
        </div>
      </main>
    </div>
  );
};
export default CheckOut;
