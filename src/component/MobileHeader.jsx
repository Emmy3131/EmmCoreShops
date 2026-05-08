import { useState } from "react";
import { FaBars, FaShoppingCart, FaStore, FaSearch } from "react-icons/fa";
import Sidebar from "./SideBar";

const MobileHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <header className="w-full">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={openSidebar}
        closeSidebar={() => setOpenSidebar(false)}
      />

      {/* PROMO BAR */}
      <div className="bg-gray-100 text-center text-xs py-2">
        Explore the Samsung Store
      </div>

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">

        {/* HAMBURGER */}
        <FaBars
          size={22}
          className="cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        />

        {/* LOGO */}
        <h1 className="text-[#ED017F] font-bold text-xl">
          KongaClone
        </h1>

        {/* RIGHT ICONS */}
        <div className="flex gap-4">
          <FaStore size={20} />
          <FaShoppingCart size={20} />
        </div>
      </div>

      {/* SEARCH */}
      <div className="px-3 pb-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-md px-3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-3 bg-transparent outline-none text-sm"
          />
          <FaSearch />
        </div>
      </div>

    </header>
  );
};

export default MobileHeader;