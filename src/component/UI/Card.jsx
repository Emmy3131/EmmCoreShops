import PropTypes from "prop-types";

const Card = ({
  children,
  padding = "md",
  hover = false,
  className = "",
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={`
        bg-white
        border
        border-slate-200
        rounded-2xl
        ${paddingStyles[padding]}
        ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOf(["none", "sm", "md", "lg"]),
  hover: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;