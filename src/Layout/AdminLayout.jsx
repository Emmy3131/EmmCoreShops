import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminMenu from "../component/Menu/AdminMenu";
import { useAuth } from "../Context/AuthContext";
import UserInfo from "../component/UserInfo";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  /* ================= AUTO CLOSE SIDEBAR ================= */
  useEffect(() => {
    setOpenSidebar(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ================= HEADER ================= */}
      <header className="h-16 bg-gray-200 flex items-center justify-between px-4 shadow z-30">
        <button
          onClick={() => setOpenSidebar(true)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        <h1 className="text-[#ED017F] font-bold text-xl">
          EmmCoreShops
        </h1>

        <div>
          <h2 className="text-sm">Welcome,</h2>
          <span className="text-[#ED017F] font-semibold">
            {user?.firstName}
          </span>
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* OVERLAY */}
        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
          fixed md:relative top-0 h-screen md:top-0 left-0
          h-[calc(100vh-4rem)] md:h-full
          bg-white w-64 z-50
          flex flex-col
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        >
          {/* MOBILE CLOSE */}
          <div className="flex justify-between items-center p-4 border-b md:hidden">
            <h2 className="font-bold">Menu</h2>

            <button onClick={() => setOpenSidebar(false)}>
              <FaTimes />
            </button>
          </div>

          {/* MENU */}
          <div className="flex-1 overflow-y-auto p-4">
            <AdminMenu />
          </div>

          {/* USER AREA */}
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <UserInfo />

            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;