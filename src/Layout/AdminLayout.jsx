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
  }, [location.pathname]); // runs whenever route changes

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-gray-200 p-4 flex justify-between">
        <button
          onClick={() => setOpenSidebar(true)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        <h1 className="text-[#ED017F] font-bold text-xl">EmmCoreShops</h1>

        <div>
          <h2>Welcome,</h2>
          <span className="text-[#ED017F]">{user?.firstName}</span>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* OVERLAY */}
        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
    fixed md:static top-0 left-0 h-full
    bg-white w-64 z-50
    transform transition-transform duration-300
    flex flex-col
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

          {/* MENU AREA */}
          <div className="flex-1 overflow-y-auto p-4">
            <AdminMenu />
          </div>

          {/* USER + LOGOUT AREA */}
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <UserInfo />

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2
      bg-red-500 hover:bg-red-600 text-white
      py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
