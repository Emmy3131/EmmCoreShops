import PropTypes from "prop-types";

const Badge = ({
  children,
  variant = "primary",
  size = "md",
}) => {
  const variants = {
    primary: "bg-blue-100 text-blue-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    neutral: "bg-slate-100 text-slate-700",
    cyan: "bg-cyan-100 text-cyan-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        font-semibold
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "success",
    "warning",
    "danger",
    "neutral",
    "cyan",
  ]),
  size: PropTypes.oneOf(["sm", "md"]),
};

export default Badge;