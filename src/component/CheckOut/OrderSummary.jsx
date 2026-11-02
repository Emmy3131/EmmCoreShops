import {
    FaCreditCard,
    FaLock,
    FaShoppingBag,
    FaShieldAlt,
    FaTruck,
    FaCheckCircle,
} from "react-icons/fa";

import Button from "../UI/Button";

const OrderSummary = ({
    cartItems = [],
    total = 0,
    loading = false,
    onCheckout,
}) => {
    const subtotal = Number(total);
    const delivery = 0;
    const grandTotal = subtotal + delivery;

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden lg:sticky lg:top-6">

            {/* ======================================
          HEADER
      ====================================== */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                            <FaShoppingBag className="text-2xl" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Order Summary
                            </h2>

                            <p className="text-blue-100">
                                Review your order
                            </p>
                        </div>

                    </div>

                    <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">
                        {cartItems.length}
                    </div>

                </div>

            </div>

            <div className="p-6">

                {/* ======================================
            PRODUCTS
        ====================================== */}

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">

                    {cartItems.length === 0 ? (
                        <div className="text-center py-10">

                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                                <FaShoppingBag className="text-4xl text-blue-500" />
                            </div>

                            <h3 className="font-bold text-lg">
                                Cart is Empty
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Add products to continue.
                            </p>

                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-4 rounded-2xl border border-gray-100 p-4 hover:shadow-md transition"
                            >

                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                <div className="flex-1">

                                    <h3 className="font-semibold line-clamp-2">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center justify-between mt-3">

                                        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                                            Qty: {item.quantity}
                                        </span>

                                        <span className="font-bold text-blue-600">
                                            ₦
                                            {(
                                                Number(item.price) *
                                                Number(item.quantity)
                                            ).toLocaleString()}
                                        </span>

                                    </div>

                                </div>

                            </div>
                        ))
                    )}

                </div>

                {/* ======================================
            PRICE DETAILS
        ====================================== */}

                <div className="mt-8 border-t pt-6 space-y-4">

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <span className="font-semibold">
                            ₦{subtotal.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Delivery
                        </span>

                        <span className="font-semibold text-green-600">
                            FREE
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Savings
                        </span>

                        <span className="font-semibold text-green-600">
                            ₦0
                        </span>
                    </div>

                    <div className="flex items-center justify-between py-5 border-t">

                        <div>

                            <p className="text-gray-500">
                                Total
                            </p>

                            <p className="text-xs text-gray-400">
                                VAT Included
                            </p>

                        </div>

                        <div className="text-right">

                            <h2 className="text-3xl font-bold text-blue-600">
                                ₦{grandTotal.toLocaleString()}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* ======================================
            DELIVERY INFO
        ====================================== */}

                <div className="mt-6 rounded-2xl bg-blue-50 p-4 flex gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FaTruck />
                    </div>

                    <div>

                        <p className="font-semibold">
                            Estimated Delivery
                        </p>

                        <p className="text-sm text-gray-600">
                            2 - 5 business days
                        </p>

                    </div>

                </div>

                {/* ======================================
            PAYMENT
        ====================================== */}

                <div className="mt-8">

                    <Button
                        variant="gradient"
                        fullWidth
                        size="lg"
                        loading={loading}
                        disabled={loading || cartItems.length === 0}
                        onClick={onCheckout}
                        icon={<FaCreditCard />}
                    >
                        {loading
                            ? "Redirecting..."
                            : "Proceed to Paystack"}
                    </Button>

                </div>

                {/* ======================================
            SECURITY
        ====================================== */}

                <div className="mt-6 space-y-4">

                    <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">

                        <div className="text-green-600">
                            <FaShieldAlt />
                        </div>

                        <div>

                            <p className="font-semibold text-sm">
                                Secure Checkout
                            </p>

                            <p className="text-xs text-gray-500">
                                256-bit SSL encryption protects every payment.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">

                        <FaLock />

                        <span>
                            Payments secured by <strong>Paystack</strong>
                        </span>

                        <FaCheckCircle className="text-green-600" />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderSummary;