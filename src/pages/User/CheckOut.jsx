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
  });

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [error, setError] = useState("");

  /* ======================================
  AUTH
  ====================================== */

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  /* ======================================
  LOAD CHECKOUT DATA
  ====================================== */

  useEffect(() => {
    if (!user) return;

    const loadCheckout = async () => {
      try {
        setPageLoading(true);

        const [cartRes, addressRes] = await Promise.all([
          api.get("/cart"),

          api.get("/users/addresses"),
        ]);

        // CART

        const cart = cartRes.data?.data;

        setCartItems(cart?.items || []);

        setTotal(Number(cart?.totalPrice || 0));

        // ADDRESSES

        const addresses = addressRes.data?.data?.addresses || [];

        setSavedAddresses(addresses);

        const defaultAddress = addresses.find((item) => item.isDefault);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (err) {
        console.error(err);

        setError(err.response?.data?.message || "Unable to load checkout");
      } finally {
        setPageLoading(false);
      }
    };

    loadCheckout();
  }, [user]);

  /* ======================================
  FORM CHANGE
  ====================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,

      [name]: value,
    }));

    if (error) setError("");
  };

  /* ======================================
  VALIDATE ADDRESS
  ====================================== */

  const validateAddress = () => {
    const fields = ["fullName", "phone", "address", "city", "state"];

    const valid = fields.every((field) => address[field].trim());

    if (!valid) {
      setError("Please complete delivery information");

      return false;
    }

    return true;
  };

  /* ======================================
  CHECKOUT
  ====================================== */

  const handleCheckout = async () => {
    setError("");

    let shippingAddress;

    if (selectedAddress) {
      shippingAddress = selectedAddress;
    } else {
      if (!validateAddress()) return;

      shippingAddress = address;

      if (saveAddress) {
        try {
          await api.post("/users/addresses", address);
        } catch (err) {
          console.error("Saving address failed", err);
        }
      }
    }

    try {
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

          <p>Preparing checkout...</p>
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
      {/* HEADER */}

      <div
        className="
bg-white
border-b
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-4
py-5
"
        >
          <button
            onClick={() => navigate("/cart")}
            className="
flex
items-center
gap-2
font-semibold
text-gray-600
"
          >
            <FaArrowLeft />
            Back to Cart
          </button>

          <div
            className="
flex
items-center
gap-3
mt-5
"
          >
            <div
              className="
w-12
h-12
rounded-xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
"
            >
              <FaShoppingBag />
            </div>

            <div>
              <h1
                className="
text-3xl
font-bold
"
              >
                Checkout
              </h1>

              <p
                className="
text-gray-500
"
              >
                Complete your order securely
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
max-w-7xl
mx-auto
px-4
py-8
"
      >
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

        <div
          className="
grid
grid-cols-1
lg:grid-cols-[1fr_420px]
gap-8
"
        >
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
                <h3 className="font-bold">Delivery Information</h3>

                <p className="text-sm text-gray-500">
                  Choose your delivery address
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
              onAddNew={() => {
                setSelectedAddress(null);

                setShowForm(true);
              }}
              onDelete={(id) => {
                console.log("delete address", id);
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
rounded-xl
p-5
flex
gap-3
"
            >
              <FaShieldAlt className="text-blue-600 mt-1" />

              <p className="text-sm">
                Your payment is secured by Paystack. We never store your card
                details.
              </p>
            </div>
          </div>

          <OrderSummary
            cartItems={cartItems}
            total={total}
            loading={loading}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
