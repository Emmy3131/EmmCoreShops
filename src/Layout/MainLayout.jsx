import { Outlet } from "react-router-dom";
import DesktopHeader from "../component/DesktopRes/DesktopHeader";
import MobileHeader from "../component/MobileRes/MobileHeader";
import MobileFooter from "../component/MobileRes/MobileFooter";
import Sidebar from "../component/SideBar";
import { useState } from "react";

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [moreActive, setMoreActive] = useState(false);
  const closeSidebar = () => {
    setOpenSidebar(false);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <MobileHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </div>

      <div className="hidden md:block fixed top-0 left-0 w-full z-50">
        <DesktopHeader />
      </div>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={openSidebar}
        closeSidebar={closeSidebar}
      />

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto pt-24 pb-16">
        <Outlet context={{ setOpenSidebar }} />
      </main>

      {/* FOOTER */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <MobileFooter setOpenSidebar={setOpenSidebar}
        setMoreActive={setMoreActive}
        closeSidebar={closeSidebar}
        moreActive={moreActive} />
      </div>
    </div>
  );
};

export default MainLayout;