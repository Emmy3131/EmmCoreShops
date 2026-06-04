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
    <header className="w-full">
      {/* TOP BAR */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        Explore the Samsung Store
      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#ED017F] text-white px-24 py-4 min-w-[1440px]">
        <div className="flex items-center justify-between gap-4 mx-auto">
          {/* LOGO */}
          <h1 className="text-4xl font-bold">EmmCoreShops</h1>

          {/* SEARCH */}
          <div className="flex flex-1 max-w-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-black rounded-l-md outline-none bg-white"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-500 px-4 rounded-r-md"
            >
              <FaSearch />
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            {/* HELP */}
            <div className="relative group">
              <button className="flex items-center gap-1">
                Help <FaChevronDown size={12} />
              </button>

              <div className="absolute top-full right-[-120px] mt-3 w-64 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <div className="bg-[#ED017F] text-white px-4 py-3 text-sm font-semibold">
                  Customer Support
                </div>

                <ul className="py-2 text-sm text-gray-700">
                  <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                    <FaPhone className="text-[#ED017F]" />
                    Contact Us
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                    <FaQuestionCircle className="text-[#ED017F]" />
                    FAQ
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                    <FaLifeRing className="text-[#ED017F]" />
                    Help Center
                  </li>
                </ul>
              </div>
            </div>

            {/* ACCOUNT */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1">
                  My Account <FaChevronDown size={12} />
                </button>

                <div className="absolute top-full right-0 mt-3 w-64 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                  <div className="bg-gradient-to-r from-[#ED017F] to-pink-500 text-white px-4 py-3">
                    <p className="text-sm">Welcome back</p>
                    <p className="font-bold">{user?.firstName || "User"}</p>
                  </div>

                  <ul className="py-2 text-sm text-gray-700">
                    <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                      <FaUser className="text-[#ED017F]" />
                      Profile
                    </li>

                    <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                      <FaBox className="text-[#ED017F]" />
                      Orders
                    </li>

                    <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3">
                      <FaHeart className="text-[#ED017F]" />
                      Wishlist
                    </li>

                    <li
                      onClick={logout}
                      className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-red-500 cursor-pointer"
                    >
                      <FaSignOutAlt />
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link
                  className="bg-white text-[#ED017F] px-3 py-1 rounded-md"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* CART */}
            <button
              onClick={handleCart}
              className="relative flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md"
            >
              <FaShoppingCart />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <nav className="bg-[#9C004F] text-white px-6 py-3">
        <ul className="flex gap-6 text-sm overflow-x-auto whitespace-nowrap">
          {/* ALL */}
          <li className="flex items-center gap-2 px-4 py-2">
            <FaBars />
            All Categories
          </li>

          {/* DYNAMIC CATEGORIES */}
          {categories.map((category) => (
            <li key={category._id}>
              <Link
                to={`/category/${category._id}`}
                className="px-4 py-2 hover:bg-[#ED017F] rounded-lg"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
