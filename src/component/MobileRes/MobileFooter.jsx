import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTag,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";

const MobileFooter = ({
  setOpenSidebar,
  closeSidebar,
  cartCount = 0,
}) => {
  const navItem = `
    relative
    flex
    flex-col
    items-center
    justify-center
    gap-1
    min-w-[64px]
    py-1.5
    rounded-xl
    transition-all
    duration-200
  `;

  const activeStyle = ({ isActive }) =>
    `${navItem} ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-slate-500 hover:text-blue-600"
    }`;

  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        w-full
        bg-white
        border-t
        border-slate-200
        shadow-[0_-4px_20px_rgba(15,23,42,0.08)]
        z-50
        md:hidden
      "
    >
      <div className="flex items-center justify-around px-2 py-2">

        {/* HOME */}

        <NavLink
          to="/"
          className={activeStyle}
          onClick={closeSidebar}
        >
          <FaHome size={19} />

          <span className="text-[11px] font-medium">
            Home
          </span>
        </NavLink>

        {/* DEALS */}

        <NavLink
          to="/deals"
          className={activeStyle}
          onClick={closeSidebar}
        >
          <FaTag size={19} />

          <span className="text-[11px] font-medium">
            Deals
          </span>
        </NavLink>

        {/* CART */}

        <NavLink
          to="/cart"
          className={activeStyle}
          onClick={closeSidebar}
        >
          <div className="relative">

            <FaShoppingCart size={19} />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-3
                  min-w-5
                  h-5
                  px-1
                  rounded-full
                  bg-cyan-500
                  text-white
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {cartCount}
              </span>
            )}

          </div>

          <span className="text-[11px] font-medium">
            Cart
          </span>
        </NavLink>

        {/* MORE */}

        <button
          onClick={() => setOpenSidebar(true)}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            min-w-[64px]
            py-1.5
            rounded-xl
            text-slate-500
            hover:text-blue-600
            hover:bg-blue-50
            transition-all
            duration-200
          "
        >
          <FaBars size={19} />

          <span className="text-[11px] font-medium">
            More
          </span>
        </button>

      </div>
    </footer>
  );
};

export default MobileFooter;