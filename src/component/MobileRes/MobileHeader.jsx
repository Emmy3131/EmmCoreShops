import {
  FaBars,
  FaShoppingCart,
  FaStore,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const MobileHeader = ({ openSidebar, setOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">

      {/* ✅ ONLY TOP BAR WHEN SIDEBAR IS OPEN */}
      {openSidebar ? (
        <div className="flex items-center justify-between px-4 py-3">

          {/* CLOSE BUTTON */}
          <FaTimes
            size={22}
            className="cursor-pointer"
            onClick={() => setOpenSidebar(false)}
          />

          {/* LOGO */}
          <h1 className="text-[#ED017F] font-bold text-xl">
            EmmCoreShops
          </h1>

          {/* RIGHT ICONS */}
          <div className="flex gap-4">
            <FaStore size={20} />
            <FaShoppingCart size={20} />
          </div>
        </div>
      ) : (
        /* ✅ FULL HEADER WHEN CLOSED */
        <>
          {/* PROMO BAR */}
          <div className="bg-gray-100 text-center text-xs py-2">
            Explore the Samsung Store
          </div>

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 py-3">

            <FaBars
              size={22}
              className="cursor-pointer"
              onClick={() => setOpenSidebar(true)}
            />

            <h1 className="text-[#ED017F] font-bold text-xl">
              EmmCoreShops
            </h1>

            <div className="flex gap-4">
              <FaStore size={20} />
              <FaShoppingCart size={20} />
            </div>
          </div>

          {/* SEARCH */}
          <div className="px-3 pb-3">
            <div className="flex items-center bg-gray-100 rounded-md px-3">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-3 bg-transparent outline-none text-sm"
              />
              <FaSearch />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default MobileHeader;