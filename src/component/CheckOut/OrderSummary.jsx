import { FaCreditCard, FaLock, FaShoppingBag } from "react-icons/fa";

import Button from "../UI/Button";

const OrderSummary = ({
  cartItems = [],
  total = 0,
  loading = false,
  onCheckout,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[var(--color-border)]
        p-6
        lg:sticky
        lg:top-6
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center gap-3 mb-6">
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
          <h2 className="font-bold text-xl">Order Summary</h2>

          <p className="text-sm text-gray-500">
            {cartItems.length} item
            {cartItems.length !== 1 && "s"}
          </p>
        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {cartItems.length === 0 ? (
          <div className="py-10 text-center">
            <FaShoppingBag
              className="
                mx-auto
                text-4xl
                text-gray-300
                mb-4
              "
            />

            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="
                flex
                gap-4
                pb-4
                border-b
                border-gray-100
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-xl
                  overflow-hidden
                  bg-gray-100
                  flex-shrink-0
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Qty: {item.quantity}
                </p>

                <p className="font-bold text-blue-600 mt-2">
                  ₦
                  {(
                    Number(item.price) * Number(item.quantity)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =========================
          TOTALS
      ========================= */}

      <div className="space-y-3 mt-6">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>

          <span className="font-semibold">₦{total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>

          <span className="font-semibold text-green-600">Free</span>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <span className="text-lg font-bold">Total</span>

          <span className="text-2xl font-bold text-blue-600">
            ₦{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* =========================
          PAY BUTTON
      ========================= */}

      <Button
        variant="gradient"
        fullWidth
        size="lg"
        loading={loading}
        disabled={loading || cartItems.length === 0}
        onClick={onCheckout}
        icon={<FaCreditCard />}
      >
        Proceed to Secure Payment
      </Button>

      {/* =========================
          SECURITY
      ========================= */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          text-xs
          text-gray-500
        "
      >
        <FaLock />
        Secure payment powered by Paystack
      </div>
    </div>
  );
};

export default OrderSummary;
