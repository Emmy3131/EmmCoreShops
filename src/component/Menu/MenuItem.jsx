import { NavLink } from "react-router-dom";

const MenuItem = ({ to, icon, title }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded 
        ${isActive ? "bg-pink-100 text-[#ED017F]" : ""}`
      }
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

export default MenuItem;