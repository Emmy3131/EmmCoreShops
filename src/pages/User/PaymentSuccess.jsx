import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../library/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const reference = searchParams.get("reference");

  const [payment, setPayment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await api.get(
          `/orders/verify-payment?reference=${reference}`
        );

        setPayment(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Verifying payment...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">
            ✅
          </div>

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="text-gray-500 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">
              Reference:
            </span>

            <span>{payment.reference}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Amount:
            </span>

            <span>
              ₦
              {(payment.amount / 100).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Customer:
            </span>

            <span>{payment.customer.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Status:
            </span>

            <span className="text-green-600">
              {payment.status}
            </span>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">
            Ordered Items
          </h2>

          <div className="space-y-4">
            {payment.metadata.orderItems?.map(
              (item, index) => (
                <div
                  key={index}
                  className="border rounded p-3"
                >
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Price: ₦
                    {item.price?.toLocaleString()}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;