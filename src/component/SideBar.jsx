import {
  FaStar,
  FaStore,
  FaTag,
  FaChevronRight,
  FaUser,
  FaBox,
  FaHeart,
  FaWallet,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../Context/AuthContext";
import api from "../library/api";

const Sidebar = ({
  isOpen,
  closeSidebar,
}) => {
  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [
    categories,
    setCategories,
  ] = useState([]);

  /* =========================================
     FETCH CATEGORIES
  ========================================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(
          res.data?.data || []
        );

      } catch (error) {
        console.error(
          "Error fetching categories:",
          error
        );
      }
    };

    fetchCategories();

  }, []);

  /* =========================================
     NAVIGATION
  ========================================= */

  const handleNavigation = (
    path
  ) => {
    closeSidebar();

    navigate(path);
  };

  return (
    <>

      {/* =====================================
          OVERLAY
      ===================================== */}

      <div
        onClick={closeSidebar}
        className={`
          fixed
          inset-0
          bg-slate-950/60
          z-[60]
          transition-opacity
          duration-300
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-full
          max-w-md
          bg-slate-50
          z-[70]
          overflow-y-auto
          shadow-2xl
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            sticky
            top-0
            z-20
            bg-gradient-to-r
            from-blue-700
            to-cyan-500
            text-white
            px-5
            py-4
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-blue-100">
                Welcome to
              </p>

              <h1 className="text-xl font-extrabold">
                EmmCore
                <span className="text-cyan-200">
                  Shops
                </span>
              </h1>

            </div>

            <button
              onClick={closeSidebar}
              className="
                w-10
                h-10
                rounded-xl
                bg-white/10
                hover:bg-white/20
                flex
                items-center
                justify-center
                transition-colors
              "
            >
              <FaTimes size={18} />
            </button>

          </div>

        </div>

        {/* =====================================
            ACCOUNT SECTION
        ===================================== */}

        <section className="bg-white px-5 py-5 border-b border-slate-200">

          {user ? (

            <>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    shadow-md
                  "
                >
                  {user.firstName?.charAt(0)}
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-500">
                    Welcome back
                  </p>

                  <h2 className="font-bold text-slate-900 truncate">
                    {user.firstName}{" "}
                    {user.lastName}
                  </h2>

                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  handleNavigation(
                    "/settings"
                  )
                }
                className="
                  mt-4
                  w-full
                  py-2.5
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  text-sm
                  font-semibold
                  hover:bg-blue-100
                  transition-colors
                "
              >
                Manage Account
              </button>

            </>

          ) : (

            <>

              <div className="flex items-center gap-3 mb-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaUser size={20} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Welcome to EmmCoreShops
                  </h2>

                  <p className="text-xs text-slate-500">
                    Sign in to manage your account
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleNavigation(
                      "/login"
                    )
                  }
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    border
                    border-blue-600
                    text-blue-600
                    text-sm
                    font-semibold
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    handleNavigation(
                      "/signup"
                    )
                  }
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    text-sm
                    font-semibold
                    shadow-md
                    hover:shadow-lg
                    transition-all
                  "
                >
                  Sign Up
                </button>

              </div>

            </>

          )}

        </section>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <section className="px-5 py-5">

          <h3
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-500
              mb-3
            "
          >
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">

            <QuickAction
              icon={<FaBox />}
              title="My Orders"
              description="View orders"
              onClick={() =>
                handleNavigation(
                  "/user/orders"
                )
              }
            />

            <QuickAction
              icon={<FaWallet />}
              title="My Wallet"
              description="Manage balance"
              onClick={() =>
                handleNavigation(
                  "/user/wallet"
                )
              }
            />

            <QuickAction
              icon={<FaHeart />}
              title="Saved Items"
              description="Your wishlist"
              onClick={() =>
                handleNavigation(
                  "/saved"
                )
              }
            />

            <QuickAction
              icon={<FaStore />}
              title="Sell With Us"
              description="Become a seller"
              onClick={() =>
                handleNavigation(
                  "/sell"
                )
              }
            />

          </div>

        </section>

        {/* =====================================
            CATEGORIES
        ===================================== */}

        <section className="bg-white border-y border-slate-200">

          <div className="px-5 py-4">

            <h3
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Shop By Category
            </h3>

          </div>

          <div>

            {categories.map(
              (category) => (

                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    border-t
                    border-slate-100
                    text-slate-700
                    hover:bg-blue-50
                    hover:text-blue-600
                    transition-colors
                  "
                >

                  <span className="font-medium">
                    {category.name}
                  </span>

                  <FaChevronRight
                    size={12}
                    className="text-slate-400"
                  />

                </Link>

              )
            )}

          </div>

        </section>

        {/* =====================================
            SUPPORT
        ===================================== */}

        <section className="bg-white px-5 py-5 border-b border-slate-200">

          <h3
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-500
              mb-4
            "
          >
            Customer Support
          </h3>

          <div className="space-y-4">

            <SupportItem
              icon={<FaEnvelope />}
              title="Email Support"
              value="help@emmcoreshops.com"
            />

            <SupportItem
              icon={<FaPhone />}
              title="Phone Support"
              value="07080635700"
            />

            <SupportItem
              icon={<FaWhatsapp />}
              title="WhatsApp"
              value="09070038400"
            />

          </div>

        </section>

        {/* =====================================
            NEWSLETTER
        ===================================== */}

        <section className="px-5 py-6 bg-gradient-to-br from-blue-50 to-cyan-50">

          <h3 className="font-bold text-slate-900">
            Get the latest deals
          </h3>

          <p className="text-sm text-slate-500 mt-1 mb-4">
            Subscribe for product updates and special offers.
          </p>

          <div className="flex bg-white rounded-xl overflow-hidden border border-blue-100">

            <input
              type="email"
              placeholder="Your email address"
              className="
                flex-1
                min-w-0
                px-3
                py-3
                text-sm
                outline-none
              "
            />

            <button
              className="
                px-4
                bg-blue-600
                text-white
                text-sm
                font-semibold
                hover:bg-blue-700
                transition-colors
              "
            >
              Join
            </button>

          </div>

        </section>

        {/* =====================================
            LOGOUT
        ===================================== */}

        {user && (

          <section className="px-5 py-4 bg-white border-t border-slate-200">

            <button
              onClick={() => {
                logout();
                closeSidebar();
              }}
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

              <span className="font-medium">
                Logout
              </span>

            </button>

          </section>

        )}

        {/* Bottom spacing for mobile footer */}

        <div className="h-24" />

      </aside>

    </>
  );
};


/* =========================================
   QUICK ACTION COMPONENT
========================================= */

const QuickAction = ({
  icon,
  title,
  description,
  onClick,
}) => {

  return (

    <button
      onClick={onClick}
      className="
        text-left
        p-4
        rounded-2xl
        bg-white
        border
        border-slate-200
        hover:border-blue-400
        hover:bg-blue-50
        transition-all
        duration-200
      "
    >

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-blue-100
          text-blue-600
          flex
          items-center
          justify-center
          mb-3
        "
      >
        {icon}
      </div>

      <h4 className="text-sm font-bold text-slate-800">
        {title}
      </h4>

      <p className="text-xs text-slate-500 mt-1">
        {description}
      </p>

    </button>

  );
};


/* =========================================
   SUPPORT ITEM COMPONENT
========================================= */

const SupportItem = ({
  icon,
  title,
  value,
}) => {

  return (

    <div className="flex items-center gap-3">

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-blue-100
          text-blue-600
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-bold text-slate-400 uppercase">
          {title}
        </p>

        <p className="text-sm text-slate-700 truncate">
          {value}
        </p>

      </div>

    </div>

  );
};

export default Sidebar;