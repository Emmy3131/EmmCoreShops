import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

import AdminMenu from "../component/Menu/AdminMenu";
import { useAuth } from "../Context/AuthContext";
import UserInfo from "../component/UserInfo";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================
     AUTO CLOSE MOBILE SIDEBAR
  ========================================= */
  useEffect(() => {
    setOpenSidebar(false);
  }, [location.pathname]);

  /* =========================================
     LOGOUT
  ========================================= */
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-800">
      {/* =========================================
          TOP HEADER
      ========================================= */}
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          h-16
          z-40
          bg-white
          border-b
          border-slate-200
          shadow-sm
        "
      >
        <div className="h-full flex items-center justify-between px-4 sm:px-6">
          {/* =====================================
              LEFT SIDE
          ===================================== */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setOpenSidebar(true)}
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-blue-50
                text-blue-600
                hover:bg-blue-100
                transition-colors
              "
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>

            {/* BRAND */}
            <div className="flex items-center gap-3">
              {/* LOGO */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500
                  text-white
                  font-black
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                E
              </div>

              {/* BRAND NAME */}
              <div className="hidden sm:block">
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  EmmCore
                  <span className="text-blue-600">
                    Shops
                  </span>
                </h1>

                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}
          <div className="flex items-center gap-3">
            {/* WELCOME */}
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-[11px] text-slate-400">
                Welcome back
              </p>

              <p className="text-sm font-bold text-slate-800">
                {user?.firstName || "Admin"}
              </p>
            </div>

            {/* SMALL USER AVATAR */}
            <div
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                text-white
                font-bold
                text-sm
                shadow-md
                shadow-blue-500/20
                overflow-hidden
              "
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""
                  }`.toUpperCase()
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          PAGE AREA
      ========================================= */}
      <div className="flex h-screen pt-16 overflow-hidden">
        {/* =========================================
            MOBILE OVERLAY
        ========================================= */}
        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="
              fixed
              inset-0
              top-16
              bg-slate-950/50
              backdrop-blur-sm
              z-40
              md:hidden
            "
          />
        )}

        {/* =========================================
            SIDEBAR
        ========================================= */}
        <aside
          className={`
            fixed
            md:relative
            top-16
            md:top-0
            left-0
            h-[calc(100vh-4rem)]
            md:h-full
            w-72
            bg-white
            border-r
            border-slate-200
            z-50
            flex
            flex-col
            shadow-xl
            md:shadow-none
            transform
            transition-transform
            duration-300
            ease-out
            ${openSidebar
              ? "translate-x-0"
              : "-translate-x-full"
            }
            md:translate-x-0
          `}
        >
          {/* =====================================
              SIDEBAR HEADER
          ===================================== */}
          <div
            className="
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              border-slate-100
              bg-gradient-to-r
              from-blue-50
              to-cyan-50
            "
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-500">
                Administration
              </p>

              <h2 className="mt-1 text-base font-bold text-slate-800">
                Control Center
              </h2>
            </div>

            {/* MOBILE CLOSE */}
            <button
              type="button"
              onClick={() => setOpenSidebar(false)}
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-9
                h-9
                rounded-xl
                bg-white
                border
                border-slate-200
                text-slate-500
                hover:text-red-500
                hover:border-red-200
                transition-colors
              "
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
          </div>

          {/* =====================================
              NAVIGATION
          ===================================== */}
          <div
            className="
              flex-1
              overflow-y-auto
              px-3
              py-5
              scrollbar-thin
              scrollbar-thumb-slate-200
              scrollbar-track-transparent
            "
          >
            {/* SECTION LABEL */}
            <div className="px-3 mb-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                Main Menu
              </p>
            </div>

            <AdminMenu />
          </div>

          {/* =====================================
              USER AREA
          ===================================== */}
          <div
            className="
              border-t
              border-slate-200
              p-4
              bg-slate-50
            "
          >
            {/* USER INFO */}
            <UserInfo />

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                group
                w-full
                mt-3
                flex
                items-center
                justify-between
                gap-3
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                text-sm
                font-semibold
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                transition-all
                duration-200
              "
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    rounded-lg
                    bg-slate-100
                    text-slate-500
                    group-hover:bg-red-100
                    group-hover:text-red-600
                    transition-colors
                  "
                >
                  <FaSignOutAlt />
                </span>

                <span>
                  Logout
                </span>
              </div>

              <FaChevronRight
                className="
                  text-xs
                  text-slate-300
                  group-hover:text-red-400
                  transition-colors
                "
              />
            </button>
          </div>
        </aside>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}
        <main
          className="
            flex-1
            min-w-0
            h-full
            overflow-y-auto
            bg-slate-100
          "
        >
          {/* BACKGROUND PATTERN */}
          <div className="relative min-h-full">
            {/* DECORATIVE GLOW */}
            <div
              className="
                pointer-events-none
                fixed
                top-16
                right-0
                w-96
                h-96
                rounded-full
                bg-blue-500/5
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                fixed
                bottom-0
                left-72
                w-80
                h-80
                rounded-full
                bg-cyan-500/5
                blur-3xl
              "
            />

            {/* CONTENT */}
            <div
              className="
                relative
                p-4
                sm:p-6
                lg:p-8
                min-h-full
              "
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;