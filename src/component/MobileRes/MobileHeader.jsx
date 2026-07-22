import {
  FaBars,
  FaShoppingCart,
  FaStore,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MobileHeader = ({
  openSidebar,
  setOpenSidebar,
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/search?keyword=${encodeURIComponent(search.trim())}`
    );
  };

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      {openSidebar ? (

        /* =====================================
           SIDEBAR OPEN HEADER
        ===================================== */

        <div className="flex items-center justify-between px-4 py-3">

          <button
            onClick={() => setOpenSidebar(false)}
            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-slate-600
              hover:bg-blue-50
              hover:text-blue-600
              transition-colors
            "
          >
            <FaTimes size={20} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="font-extrabold text-xl text-slate-900"
          >
            EmmCore
            <span className="text-blue-600">
              Shops
            </span>
          </button>

          <button
            onClick={handleCart}
            className="
              relative
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              bg-blue-50
              text-blue-600
            "
          >
            <FaShoppingCart size={19} />
          </button>

        </div>

      ) : (

        /* =====================================
           NORMAL HEADER
        ===================================== */

        <>

          {/* PROMO BAR */}

          <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-center text-[11px] font-medium py-2">

            🚀 Secure shopping. Fast delivery.

          </div>

          {/* TOP BAR */}

          <div className="flex items-center justify-between px-4 py-3">

            {/* MENU */}

            <button
              onClick={() => setOpenSidebar(true)}
              className="
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-600
                transition-colors
              "
            >
              <FaBars size={21} />
            </button>

            {/* LOGO */}

            <button
              onClick={() => navigate("/")}
              className="font-extrabold text-xl text-slate-900"
            >
              EmmCore
              <span className="text-blue-600">
                Shops
              </span>
            </button>

            {/* ACTIONS */}

            <div className="flex items-center gap-2">

              <button
                onClick={() => navigate("/")}
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-slate-600
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition-colors
                "
              >
                <FaStore size={19} />
              </button>

              <button
                onClick={handleCart}
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-blue-600
                  text-white
                  shadow-sm
                  hover:bg-blue-700
                  transition-colors
                "
              >
                <FaShoppingCart size={18} />
              </button>

            </div>

          </div>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="px-3 pb-3"
          >

            <div
              className="
                flex
                items-center
                bg-slate-100
                border
                border-transparent
                focus-within:border-blue-500
                focus-within:bg-white
                rounded-xl
                overflow-hidden
                transition-all
              "
            >

              <FaSearch className="ml-4 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full
                  py-3
                  px-3
                  bg-transparent
                  outline-none
                  text-sm
                "
              />

              <button
                type="submit"
                className="
                  px-4
                  py-3
                  text-blue-600
                  hover:bg-blue-50
                  transition-colors
                "
              >
                <FaSearch />
              </button>

            </div>

          </form>

        </>

      )}

    </header>

  );
};

export default MobileHeader;