import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import DesktopHeader from "../component/DesktopRes/DesktopHeader";
import MobileHeader from "../component/MobileRes/MobileHeader";
import MobileFooter from "../component/MobileRes/MobileFooter";
import Sidebar from "../component/SideBar";

const MainLayout = () => {
  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [moreActive, setMoreActive] = useState(false);

  const closeSidebar = () => {
    setOpenSidebar(false);
    setMoreActive(false);
  };

  /* ✅ AUTO CLOSE WHEN ROUTE CHANGES */
  useEffect(() => {
    setOpenSidebar(false);
    setMoreActive(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <MobileHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden md:block fixed top-0 left-0 w-full z-50">
        <DesktopHeader />
      </div>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={openSidebar}
        closeSidebar={closeSidebar}
      />

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto pt-24 pb-16">
        <Outlet context={{ setOpenSidebar }} />
      </main>

      {/* MOBILE FOOTER */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <MobileFooter
          setOpenSidebar={setOpenSidebar}
          setMoreActive={setMoreActive}
          closeSidebar={closeSidebar}
          moreActive={moreActive}
        />
      </div>

    </div>
  );
};

export default MainLayout;