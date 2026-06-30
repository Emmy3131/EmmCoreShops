import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../library/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await api.get(
          `/orders/verify-payment?reference=${reference}`
        );

        setPayment(res.data.data);
      } catch (err) {
        console.log(err);
        setError("Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verifyPayment();
    } else {
      setLoading(false);
      setError("Missing payment reference");
    }
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // SAFE ORDER ITEMS PARSING
  const orderItems =
    typeof payment?.metadata?.orderItems === "string"
      ? JSON.parse(payment.metadata.orderItems)
      : payment?.metadata?.orderItems || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✅</div>

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="text-gray-500 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        {/* PAYMENT DETAILS */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Reference:</span>
            <span>{payment?.reference || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Amount:</span>
            <span>
              ₦
              {payment?.amount
                ? (payment.amount / 100).toLocaleString()
                : "0"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Customer:</span>
            <span>{payment?.customer?.email || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="text-green-600">
              {payment?.status || "success"}
            </span>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">Ordered Items</h2>

          {orderItems.length === 0 ? (
            <p className="text-gray-500">No items found</p>
          ) : (
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="border rounded p-3">
                  <p className="font-semibold">{item?.name}</p>
                  <p>Quantity: {item?.quantity}</p>
                  <p>Price: ₦{item?.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;