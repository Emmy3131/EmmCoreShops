import {
  FaClock,
  FaCog,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const statusConfig = {
  pending: {
    icon: <FaClock />,
    color: "bg-yellow-100 text-yellow-700",
  },

  processing: {
    icon: <FaCog />,
    color: "bg-blue-100 text-blue-700",
  },

  shipped: {
    icon: <FaTruck />,
    color: "bg-indigo-100 text-indigo-700",
  },

  delivered: {
    icon: <FaCheckCircle />,
    color: "bg-green-100 text-green-700",
  },

  cancelled: {
    icon: <FaTimesCircle />,
    color: "bg-red-100 text-red-700",
  },
};

const OrderStatusBadge = ({ status }) => {
  const badge =
    statusConfig[status] ||
    statusConfig.pending;

  return (
    <span
      className={`${badge.color} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold`}
    >
      {badge.icon}
      {status}
    </span>
  );
};

export default OrderStatusBadge;