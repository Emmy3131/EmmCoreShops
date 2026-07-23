import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaQuestionCircle,
  FaStore,
  FaUser,
  FaBox,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartCountContext";
import Button from "../UI/Button";

const DesktopHeader = () => {
  const { user, logout } = useAuth();

  // GLOBAL CART COUNT
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  /* =========================================
     FETCH CATEGORIES
  ========================================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(res.data?.data || []);
      } catch (error) {
        console.error(
          "Category fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchCategories();
  }, []);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/search?keyword=${encodeURIComponent(search.trim())}`
    );
  };

  /* =========================================
     CART
  ========================================= */

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* =========================================
          PROMO BAR
      ========================================= */}

      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white text-center py-2 text-sm font-medium">

        <span className="hidden sm:inline">
          🚀 Fast delivery. Secure payments. Shop smarter with EmmCoreShops.
        </span>

        <span className="sm:hidden">
          🚀 Shop smarter. Shop securely.
        </span>

      </div>


      {/* =========================================
          MAIN HEADER
      ========================================= */}

      <div className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex items-center gap-8">

            {/* =====================================
                LOGO
            ===================================== */}

            <Link
              to="/"
              className="flex-shrink-0 group"
            >

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">

                EmmCore

                <span className="text-blue-600">
                  Shops
                </span>

              </h1>

              <p className="text-xs text-slate-500 font-medium">
                Shop smart. Shop secure.
              </p>

            </Link>


            {/* =====================================
                SEARCH
            ===================================== */}

            <form
              onSubmit={handleSearch}
              className="flex flex-1 max-w-3xl"
            >

              <div
                className="
                  flex
                  items-center
                  w-full
                  bg-slate-100
                  border
                  border-transparent
                  focus-within:border-blue-500
                  focus-within:bg-white
                  rounded-xl
                  overflow-hidden
                  transition-all
                  duration-300
                "
              >

                <FaSearch className="ml-4 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for products, brands and categories..."
                  className="
                    w-full
                    px-4
                    py-3.5
                    bg-transparent
                    outline-none
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                  "
                />

                <button
                  type="submit"
                  className="
                    h-full
                    px-6
                    py-3.5
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    transition-colors
                  "
                >
                  Search
                </button>

              </div>

            </form>


            {/* =====================================
                RIGHT ACTIONS
            ===================================== */}

            <div className="flex items-center gap-5">

              {/* HELP */}

              <Link
                to="/page/contact-us"
                className="
                  hidden
                  xl:flex
                  items-center
                  gap-2
                  text-slate-600
                  hover:text-blue-600
                  transition-colors
                "
              >

                <FaQuestionCircle />

                <span className="text-sm font-medium">
                  Help
                </span>

              </Link>


              {/* =====================================
                  ACCOUNT
              ===================================== */}

              {user ? (

                <div className="relative group">

                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      text-slate-700
                      hover:text-blue-600
                      transition-colors
                    "
                  >

                    <div
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-blue-100
                        text-blue-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaUser />
                    </div>

                    <span className="hidden xl:block text-sm font-semibold">
                      {user.firstName}
                    </span>

                    <FaChevronDown
                      size={12}
                      className="hidden xl:block"
                    />

                  </button>


                  {/* ACCOUNT DROPDOWN */}

                  <div
                    className="
                      absolute
                      right-0
                      top-full
                      mt-4
                      w-72
                      bg-white
                      rounded-2xl
                      shadow-2xl
                      border
                      border-slate-100
                      overflow-hidden
                      opacity-0
                      invisible
                      translate-y-2
                      group-hover:opacity-100
                      group-hover:visible
                      group-hover:translate-y-0
                      transition-all
                      duration-300
                    "
                  >

                    <div
                      className="
                        bg-gradient-to-r
                        from-blue-700
                        to-cyan-500
                        text-white
                        p-5
                      "
                    >

                      <p className="text-sm text-blue-100">
                        Welcome back
                      </p>

                      <h3 className="font-bold text-lg">
                        {user.firstName}
                      </h3>

                    </div>


                    <div className="p-2">

                      <Link
                        to="/profile"
                        className="
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-xl
                          hover:bg-blue-50
                          hover:text-blue-600
                          transition-colors
                        "
                      >
                        <FaUser />
                        Profile
                      </Link>


                      <Link
                        to="/orders"
                        className="
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-xl
                          hover:bg-blue-50
                          hover:text-blue-600
                          transition-colors
                        "
                      >
                        <FaBox />
                        My Orders
                      </Link>


                      <Link
                        to="/wishlist"
                        className="
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-xl
                          hover:bg-blue-50
                          hover:text-blue-600
                          transition-colors
                        "
                      >
                        <FaHeart />
                        Wishlist
                      </Link>


                      <button
                        onClick={logout}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-xl
                          text-red-500
                          hover:bg-red-50
                          transition-colors
                        "
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>

                    </div>

                  </div>

                </div>

              ) : (

                /* =====================================
                   AUTH ACTIONS
                ===================================== */

                <div className="flex items-center gap-2">

                  <Link
                    to="/login"
                    className="
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-slate-600
                      hover:text-blue-600
                      transition-colors
                    "
                  >
                    Login
                  </Link>

                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>

                </div>

              )}


              {/* =====================================
                  GLOBAL CART
              ===================================== */}

              <button
                onClick={handleCart}
                className="
                  relative
                  flex
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-50
                  text-blue-700
                  hover:bg-blue-100
                  transition-colors
                "
              >

                {/* CART ICON */}

                <div className="relative">

                  <FaShoppingCart size={21} />


                  {/* GLOBAL CART BADGE */}

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
                        border-2
                        border-white
                      "
                    >
                      {cartCount}
                    </span>

                  )}

                </div>


                {/* CART DETAILS */}

                <div className="hidden xl:block text-left">

                  <p className="text-[10px] text-slate-500">
                    My Cart
                  </p>

                  <p className="font-bold text-sm">
                    {cartCount}{" "}
                    {cartCount === 1 ? "Item" : "Items"}
                  </p>

                </div>

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          CATEGORY NAVIGATION
      ========================================= */}

      <nav className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6">

          <ul className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">

            <li>

              <button
                onClick={() => setShowCategoryMenu(true)}
                className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  bg-blue-600
                  hover:bg-blue-700
                  font-semibold
                  transition-colors
                "
              >

                <FaBars />

                All Categories

              </button>

            </li>


            {categories.slice(0, 8).map((category) => (

              <li key={category._id}>

                <Link
                  to={`/category/${category._id}`}
                  className="
                    inline-block
                    px-4
                    py-3
                    text-sm
                    text-slate-300
                    hover:text-white
                    hover:bg-slate-800
                    transition-colors
                  "
                >
                  {category.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>

      </nav>


      {/* =========================================
          OVERLAY
      ========================================= */}

      <div
        onClick={() => setShowCategoryMenu(false)}
        className={`
          fixed
          inset-0
          bg-slate-950/60
          z-[60]
          transition-opacity
          duration-300
          ${
            showCategoryMenu
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />


      {/* =========================================
          CATEGORY DRAWER
      ========================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-full
          max-w-md
          bg-white
          z-[70]
          shadow-2xl
          overflow-y-auto
          transition-transform
          duration-300
          ${
            showCategoryMenu
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* DRAWER HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-gradient-to-r
            from-blue-700
            to-cyan-500
            text-white
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-blue-100">
                Explore
              </p>

              <h2 className="text-xl font-bold">
                Shop by Category
              </h2>

            </div>


            <button
              onClick={() => setShowCategoryMenu(false)}
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                hover:bg-white/20
                text-2xl
                transition-colors
              "
            >
              ×
            </button>

          </div>


          <Link
            to="/products"
            onClick={() => setShowCategoryMenu(false)}
            className="
              flex
              items-center
              gap-4
              mt-5
              p-4
              rounded-xl
              bg-white/10
              hover:bg-white/20
              transition-colors
            "
          >

            <FaStore size={22} />

            <div>

              <h3 className="font-bold">
                All Products
              </h3>

              <p className="text-sm text-blue-100">
                Browse our complete collection
              </p>

            </div>

          </Link>

        </div>


        {/* CATEGORIES */}

        <div className="p-5">

          <div className="space-y-3">

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
                  border-slate-200
                  text-slate-700
                  hover:border-blue-500
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition-all
                "
              >

                <span className="font-medium">
                  {category.name}
                </span>

                <span className="text-blue-500">
                  →
                </span>

              </Link>

            ))}

          </div>

        </div>

      </aside>

    </header>
  );
};

export default DesktopHeader;