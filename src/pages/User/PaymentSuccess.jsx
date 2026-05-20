import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../library/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await api.get(`/orders/verify-payment?reference=${reference}`);

        // redirect after success
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p>Verifying your order...</p>
    </div>
  );
};

export default PaymentSuccess;