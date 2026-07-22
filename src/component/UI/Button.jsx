import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  onClick,
  className = "",
}) => {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-semibold
    transition-all
    duration-300
    focus:outline-none
    focus:ring-4
    disabled:opacity-60
    disabled:cursor-not-allowed
    disabled:pointer-events-none
  `;

  const variants = {
    primary: `
      bg-blue-600
      text-white
      hover:bg-blue-700
      focus:ring-blue-200
      shadow-sm
      hover:shadow-md
    `,

    gradient: `
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      text-white
      hover:from-blue-700
      hover:to-cyan-600
      focus:ring-blue-200
      shadow-md
      hover:shadow-lg
    `,

    secondary: `
      bg-slate-100
      text-slate-800
      hover:bg-slate-200
      focus:ring-slate-200
    `,

    outline: `
      border
      border-blue-600
      text-blue-600
      bg-white
      hover:bg-blue-50
      focus:ring-blue-200
    `,

    ghost: `
      text-slate-600
      hover:bg-slate-100
      hover:text-blue-600
      focus:ring-slate-200
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-200
    `,

    success: `
      bg-emerald-600
      text-white
      hover:bg-emerald-700
      focus:ring-emerald-200
    `,
  };

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-5 py-3 text-sm rounded-xl",
    lg: "px-6 py-4 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}

          {children}

          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "gradient",
    "secondary",
    "outline",
    "ghost",
    "danger",
    "success",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;