import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const PaymentBadge = ({ status }) => {
  switch (status) {
    case "paid":
      return (
        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          <FaCheckCircle />
          Paid
        </span>
      );

    case "failed":
      return (
        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
          <FaTimesCircle />
          Failed
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
          <FaClock />
          Pending
        </span>
      );
  }
};

export default PaymentBadge;