import { Outlet } from "react-router-dom";
import DesktopHeader from "../component/DesktopRes/DesktopHeader";
import MobileHeader from "../component/MobileRes/MobileHeader";
import MobileFooter from "../component/MobileRes/MobileFooter";
import Sidebar from "../component/SideBar";
import { useState } from "react";

const MainLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* DESKTOP HEADER */}
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden">
        <MobileHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      </div>

      {/* GLOBAL SIDEBAR */}
      <Sidebar
        isOpen={openSidebar}
        closeSidebar={() => setOpenSidebar(false)}
      />

      {/* PAGE CONTENT */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* MOBILE FOOTER */}
      <div className="md:hidden fixed bottom-0 w-full">
        <MobileFooter />
      </div>

    </div>
  );
};

export default MainLayout;