import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaTag, FaShoppingCart, FaBars } from "react-icons/fa";

const MobileFooter = ({
  setOpenSidebar,
  setMoreActive,
  moreActive,
  closeSidebar,
}) => {
  const linkStyle = "flex flex-col items-center text-xs";

  const activeStyle = ({ isActive }) =>
    `${linkStyle} ${isActive ? "text-[#ED017F]" : "text-gray-500"}`;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 md:hidden">
      <div className="flex justify-around py-2">
        {/* HOME */}
        <NavLink
          to="/"
          className={activeStyle}
          onClick={() => {
            closeSidebar();
            setMoreActive(false);
          }}
        >
          <FaHome size={20} />
          <span>Home</span>
        </NavLink>

        {/* DEALS */}
        <NavLink
          to="/deals"
          className={activeStyle}
          onClick={() => {
            closeSidebar();
            setMoreActive(false);
          }}
        >
          <FaTag size={20} />
          <span>Deals</span>
        </NavLink>

        {/* CART */}
        <NavLink
          to="/cart"
          className={activeStyle}
          onClick={() => {
            closeSidebar();
            setMoreActive(false);
          }}
        >
          <FaShoppingCart size={20} />
          <span>Cart</span>
        </NavLink>

        {/* MORE */}
        <button
          onClick={() => {
            setOpenSidebar(true);
            setMoreActive(true);
          }}
          className={`flex flex-col items-center text-xs ${
            moreActive ? "text-[#ED017F]" : "text-gray-500"
          }`}
        >
          <FaBars size={20} />
          <span>More</span>
        </button>
      </div>
    </footer>
  );
};

export default MobileFooter;
