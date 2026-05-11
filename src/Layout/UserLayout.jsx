import { Outlet } from "react-router-dom";
import { useState } from "react";

import Header from "../component/MobileRes/MobileHeader";
import Sidebar from "../component/SideBar";
import Footer from "../component/MobileRes/MobileFooter";
import MobileFooter from "../component/MobileRes/MobileFooter";


const UserLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openMenu = () => setOpenSidebar(true);
  const closeMenu = () => setOpenSidebar(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= HEADER ================= */}
      <Header openMenu={openMenu} />

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        isOpen={openSidebar}
        closeSidebar={closeMenu}
      />

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1 pt-[140px] pb-[70px]">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <Outlet />
        </div>
      </main>

      {/* ================= MOBILE NAV ================= */}
      <MobileFooter openMenu={openMenu} />

    </div>
  );
};

export default UserLayout;