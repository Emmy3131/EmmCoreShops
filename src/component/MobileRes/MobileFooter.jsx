import { NavLink } from "react-router-dom";
import { FaHome, FaTag, FaShoppingCart, FaBars } from "react-icons/fa";

const MobileFooter = ({ setOpenSidebar, closeSidebar }) => {
  const linkStyle = "flex flex-col items-center text-xs";

  const activeStyle = ({ isActive }) =>
    `${linkStyle} ${isActive ? "text-[#ED017F]" : "text-gray-500"}`;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 md:hidden">
      <div className="flex justify-around py-2">
        {/* HOME */}
        <NavLink to="/" className={activeStyle} onClick={closeSidebar}>
          <FaHome size={20} />
          <span>Home</span>
        </NavLink>

        {/* DEALS */}
        <NavLink to="/deals" className={activeStyle} onClick={closeSidebar}>
          <FaTag size={20} />
          <span>Deals</span>
        </NavLink>

        {/* CART */}
        <NavLink to="/cart" className={activeStyle} onClick={closeSidebar}>
          <FaShoppingCart size={20} />
          <span>Cart</span>
        </NavLink>

        {/* MORE */}
        <button
          className="flex flex-col items-center hover:text-[#ED017F] text-xs text-gray-500"
          onClick={() => setOpenSidebar(true)}
        >
          <FaBars size={20} />
          <span>More</span>
        </button>
      </div>
    </footer>
  );
};

export default MobileFooter;
