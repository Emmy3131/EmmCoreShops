import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaPhone,
  FaQuestionCircle,
  FaLifeRing,
  FaTruck,
  FaStore,
  FaUndo,
  FaUser,
  FaBox,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  /* FETCH CART COUNT */
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await api.get("/cart");

        const items = res.data?.data?.items || [];

        const count = items.reduce((acc, item) => {
          return acc + (item.quantity || 1);
        }, 0);

        setCartCount(count);
      } catch (err) {
        console.log("Cart count error:", err);
      }
    };

   if (user) {
      fetchCartCount();
    }
  }, []);

  return (
    <header className="w-full">
      {/* TOP PROMO BAR */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        Explore the Samsung Store
      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#ED017F] text-white px-24 py-4 min-w-[1440px]">
        <div className="flex items-center justify-between gap-4  mx-auto">
          {/* LOGO */}
          <h1 className="text-4xl font-bold">EmmCoreShops</h1>

          {/* SEARCH BAR */}
          <div className="flex flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-black rounded-l-md outline-none bg-white"
            />

            <button className="bg-orange-500 px-4 rounded-r-md">
              <FaSearch />
            </button>
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-6">
            {/* HELP DROPDOWN */}
            {/* HELP DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-200 transition">
                Help <FaChevronDown size={12} />
              </button>

              {/* DROPDOWN MENU */}
              <div
                className="
      absolute top-full right-[-120px] mt-3
      w-64 bg-white shadow-xl rounded-lg
      opacity-0 invisible
      group-hover:opacity-100
      group-hover:visible
      transition-all duration-200
      z-50 overflow-hidden
    "
              >
                {/* HEADER */}
                <div className="bg-[#ED017F] text-white px-4 py-3 text-sm font-semibold">
                  Customer Support
                </div>

                <ul className="py-2 text-gray-700 text-sm">
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaPhone className="text-[#ED017F]" />
                    Contact Us
                  </li>

                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaQuestionCircle className="text-[#ED017F]" />
                    FAQ
                  </li>

                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaLifeRing className="text-[#ED017F]" />
                    Help Center
                  </li>

                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaTruck className="text-[#ED017F]" />
                    Track Order
                  </li>

                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaStore className="text-[#ED017F]" />
                    Sell on EmmCore
                  </li>

                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <FaUndo className="text-[#ED017F]" />
                    Returns Policy
                  </li>
                </ul>
              </div>
            </div>

            {/* MY ACCOUNT DROPDOWN */}
            <div className="flex items-center gap-6">
              {/* IF USER IS LOGGED IN */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-1">
                    My Account <FaChevronDown size={12} />
                  </button>

                  {/* DROPDOWN */}
                  <div
                    className="
        absolute top-full right-0 mt-3
        w-64 bg-white shadow-xl rounded-lg
        opacity-0 invisible
        group-hover:opacity-100
        group-hover:visible
        transition-all duration-200
        z-50 overflow-hidden
      "
                  >
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-[#ED017F] to-pink-500 text-white px-4 py-3">
                      <p className="text-sm opacity-90">Welcome back</p>
                      <p className="font-bold text-lg">
                        Hi, {user?.firstName || "User"}
                      </p>
                    </div>

                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                        <FaUser className="text-[#ED017F]" />
                        My Profile
                      </li>

                      <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                        <FaBox className="text-[#ED017F]" />
                        My Orders
                      </li>

                      <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                        <FaHeart className="text-[#ED017F]" />
                        My Saved Items
                      </li>

                      {/* LOGOUT */}
                      <li
                        onClick={logout}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-red-500"
                      >
                        <FaSignOutAlt />
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* IF USER IS LOGGED OUT */
                <div className="flex items-center gap-4">
                  <Link to="/login" className="hover:text-gray-200">
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-white text-[#ED017F] px-4 py-1 rounded-md font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <button
              className="relative flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
              onClick={handleCart}
            >
              {/* CART ICON */}
              <FaShoppingCart />
              My Cart
              {/* BADGE COUNTER */}
              {cartCount > 0 && (
                <span
                  className="
      absolute -top-2 -right-2
      bg-red-500 text-white text-xs
      w-5 h-5 flex items-center justify-center
      rounded-full font-bold
      animate-pulse
    "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <nav className="bg-[#9C004F] text-white px-6 py-2 w-full">
        <ul className="flex gap-12 text-sm overflow-x-auto justify-base">
          <li className="flex px-4 justify-center items-center gap-2">
            All Categories
            <FaBars />
          </li>
          <li className="px-4">Computers and Accesories</li>
          <li className="px-4">Phones & Tablets</li>
          <li className="px-4">Electronics</li>
          <li className="px-4">Fashion</li>
          <li className="px-4">Home & Kitchen</li>
          <li className="px-4">Baby, Kids & Toys</li>
          <li className="px-4">Beauty, Health and Personal Care</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
