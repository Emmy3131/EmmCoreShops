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
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.log("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  /* ================= FETCH CART COUNT ================= */
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
  }, [user]);

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?keyword=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-center py-2 text-sm font-medium">
        🔥 Flash Sale! Up to 70% OFF on selected products
      </div>

      {/* Main Header */}
      <div className="bg-[#ED017F] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/">
              <h1 className="text-4xl font-extrabold">
                EmmCore
                <span className="text-orange-400">Shops</span>
              </h1>

              <p className="text-xs text-pink-100">Shop Smart. Shop Secure.</p>
            </Link>

            {/* Search */}
            <div className="flex flex-1 max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 text-black outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-orange-500 px-6 hover:bg-orange-600"
              >
                <FaSearch />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">
              {/* Help */}
              <Link to="/page/contact-us" className="hover:text-orange-300">
                Help
              </Link>

              {/* Account */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <FaUser />
                    {user.firstName}
                    <FaChevronDown />
                  </button>

                  <div
                    className="
                absolute
                right-0
                top-full
                mt-3
                w-72
                bg-white
                text-black
                rounded-xl
                shadow-2xl
                opacity-0
                invisible
                group-hover:opacity-100
                group-hover:visible
                transition
              "
                  >
                    <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4">
                      <h4 className="font-bold">Welcome Back</h4>

                      <p>{user.firstName}</p>
                    </div>

                    <ul className="py-2">
                      <li>
                        <Link
                          className="block px-4 py-3 hover:bg-gray-100"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="block px-4 py-3 hover:bg-gray-100"
                          to="/orders"
                        >
                          Orders
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="block px-4 py-3 hover:bg-gray-100"
                          to="/wishlist"
                        >
                          Wishlist
                        </Link>
                      </li>

                      <li
                        onClick={logout}
                        className="
                      px-4
                      py-3
                      hover:bg-gray-100
                      text-red-500
                      cursor-pointer
                    "
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="hover:text-orange-300">
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="
                  bg-white
                  text-[#ED017F]
                  px-4
                  py-2
                  rounded-lg
                  font-semibold
                "
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Cart */}
              <button
                onClick={handleCart}
                className="
              relative
              flex
              items-center
              gap-3
              bg-green-600
              px-5
              py-3
              rounded-lg
              shadow-lg
            "
              >
                <FaShoppingCart size={20} />

                <div>
                  <p className="text-xs">My Cart</p>

                  <p className="font-bold">{cartCount}</p>
                </div>

                {cartCount > 0 && (
                  <span
                    className="
                  absolute
                  -top-2
                  -right-2
                  w-6
                  h-6
                  rounded-full
                  bg-red-500
                  flex
                  items-center
                  justify-center
                  text-xs
                "
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="bg-[#79003F] text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            {/* MEGA MENU */}
            <li className="relative group">
              <button
                onClick={() => setShowCategoryMenu(true)}
                className="
    flex items-center gap-2
    px-5 py-3
    font-semibold
    hover:bg-[#ED017F]
    transition
  "
              >
                <FaBars />
                All Categories
              </button>

              <div
                className="
            absolute
            left-50
            top-full
            hidden
            group-hover:flex
            bg-blue-600
            text-black
            shadow-2xl
            z-200
            min-w-[700px]
            rounded-b-lg
          "
              >
                {/* LEFT SIDE */}
                <div
                  className="
              w-72
              border-r
              max-h-[500px]
              overflow-y-auto
            "
                >
                  <Link
                    to="/products"
                    className="
                block
                px-5 py-4
                font-bold
                text-[#ED017F]
                border-b
                hover:bg-pink-50
              "
                  >
                    🛒 All Products
                  </Link>

                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category._id}`}
                      className="
                  flex
                  justify-between
                  items-center
                  px-5 py-3
                  border-b
                  hover:bg-gray-100
                "
                    >
                      <span>{category.name}</span>
                      <span>›</span>
                    </Link>
                  ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="w-[400px] bg-gray-50 p-6">
                  <h3 className="text-xl font-bold mb-4">Shop By Category</h3>

                  <p className="text-gray-600 mb-5">
                    Explore thousands of products across all departments.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 10).map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category._id}`}
                        className="
                    bg-white
                    border
                    rounded-lg
                    p-3
                    hover:border-[#ED017F]
                    hover:shadow-md
                    transition
                  "
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* QUICK LINKS */}
            {categories.slice(0, 8).map((category) => (
              <li key={category._id}>
                <Link
                  to={`/category/${category._id}`}
                  className="
              px-4 py-2
              hover:bg-[#ED017F]
              rounded-lg
              transition
            "
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* OVERLAY */}
      <div
        onClick={() => setShowCategoryMenu(false)}
        className={`
    fixed inset-0
    bg-black/60
    z-50
    transition-all duration-300
    ${showCategoryMenu ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
      />

      {/* CATEGORY SIDEBAR */}
      <div
        className={` fixed  top-0 left-0 h-screen w-[380px] bg-white z-[60] shadow-2xl transition-all duration-300 overflow-y-auto ${showCategoryMenu ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="sticky top-0 bg-[#ED017F] text-white p-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">Categories</h2>

            <button
              onClick={() => setShowCategoryMenu(false)}
              className="text-2xl"
            >
              ×
            </button>
          </div>

          <Link
            to="/"
            onClick={() => setShowCategoryMenu(false)}
            className="
    flex items-center gap-4
    p-4
    m-4
    bg-gradient-to-r
    from-orange-500
    to-pink-600
    text-white
    rounded-xl
    shadow-md
  "
          >
            <FaStore size={20} />

            <div>
              <h3 className="font-bold">All Products</h3>

              <p className="text-sm opacity-90">Browse everything</p>
            </div>
          </Link>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-700 mb-4">Shop by Category</h3>

          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                onClick={() => setShowCategoryMenu(false)}
                className="
          flex
          items-center
          justify-between
          p-4
          rounded-xl
          border
          hover:border-pink-500
          hover:bg-pink-50
          transition
        "
              >
                <span className="font-medium">{category.name}</span>

                <span className="text-pink-500">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
