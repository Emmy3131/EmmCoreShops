import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full">

      {/* TOP PROMO BAR */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        Explore the Samsung Store
      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#ED017F] text-white px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <h1 className="text-2xl font-bold">KongaClone</h1>

          {/* SEARCH BAR */}
          <div className="flex flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-black rounded-l-md outline-none"
            />

            <button className="bg-orange-500 px-4 rounded-r-md">
              <FaSearch />
            </button>
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-6">

            <button>Help</button>

            <button>Login / Signup</button>

            <button className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md">
              <FaShoppingCart />
              My Cart
            </button>

          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <nav className="bg-[#9C004F] text-white px-6 py-2">
        <ul className="flex gap-6 text-sm overflow-x-auto">
          <li>All Categories</li>
          <li>Computers</li>
          <li>Phones & Tablets</li>
          <li>Electronics</li>
          <li>Fashion</li>
          <li>Home & Kitchen</li>
          <li>Beauty</li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;