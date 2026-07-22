import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import DesktopHeader from "../component/DesktopRes/DesktopHeader";
import DesktopFooter from "../component/DesktopRes/DesktopFooter";

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

  /* =========================================
     CLOSE SIDEBAR ON ROUTE CHANGE
  ========================================= */

  useEffect(() => {
    setOpenSidebar(false);
    setMoreActive(false);
  }, [location.pathname]);

  return (

    <div className="h-screen flex flex-col overflow-hidden">

      {/* =====================================
          MOBILE HEADER
      ===================================== */}

      <div className="md:hidden">

        <MobileHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

      </div>

      {/* =====================================
          DESKTOP HEADER
      ===================================== */}

      <div className="hidden md:block">

        <DesktopHeader />

      </div>

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <Sidebar
        isOpen={openSidebar}
        closeSidebar={closeSidebar}
      />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main
        className="
          flex-1
          overflow-y-auto
          pt-[132px]
          md:pt-0
          pb-20
        "
      >

        <Outlet
          context={{
            setOpenSidebar,
          }}
        />

        {/* DESKTOP FOOTER */}

        <div className="hidden md:block mt-10">

          <DesktopFooter />

        </div>

      </main>

      {/* =====================================
          MOBILE FOOTER
      ===================================== */}

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">

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