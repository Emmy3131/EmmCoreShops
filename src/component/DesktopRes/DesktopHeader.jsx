import {FaShoppingCart, FaSearch, FaBars, FaChevronDown} from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full">
      {/* TOP PROMO BAR */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        Explore the Samsung Store
      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#ED017F] text-white px-24 py-4 min-w-[1440px]">
        <div className="flex items-center justify-between gap-4  mx-auto">
          {/* LOGO */}
          <h1 className="text-4xl font-bold">EmmCoreShops</h1>

          {/* SEARCH BAR */}
          <div className="flex flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-black rounded-l-md outline-none bg-white"
            />

            <button className="bg-orange-500 px-4 rounded-r-md">
              <FaSearch />
            </button>
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-6">
            {/* HELP DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1">
                Help <FaChevronDown size={12} />
              </button>

              {/* DROPDOWN MENU */}
              <div
                className="
      absolute top-full right-[-150px] mt-2
      w-56 bg-white shadow-lg rounded-md
      opacity-0 invisible
      group-hover:opacity-100
      group-hover:visible
      transition-all duration-200
      z-50
    "
              >
                <ul className="py-4 text-gray-700">
                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    Contact Us
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    FAQ
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    Help Center
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    Track Order
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    Sell On EmmCore
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
                    Returns Policy
                  </li>
                </ul>
              </div>
            </div>

            <button>Login / Signup</button>

            <button className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md">
              <FaShoppingCart />
              My Cart
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <nav className="bg-[#9C004F] text-white px-6 py-2 w-full">
        <ul className="flex gap-12 text-sm overflow-x-auto justify-base">
          <li className="flex px-4 justify-center items-center gap-2">
            All Categories
            <FaBars />
          </li>
          <li className="px-4">Computers and Accesories</li>
          <li className="px-4">Phones & Tablets</li>
          <li className="px-4">Electronics</li>
          <li className="px-4">Fashion</li>
          <li className="px-4">Home & Kitchen</li>
          <li className="px-4">Baby, Kids & Toys</li>
          <li className="px-4">Beauty, Health and Personal Care</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
