import {
  FaStar,
  FaStore,
  FaMapMarkerAlt,
  FaTag,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-[53px] left-0 h-full w-full
          bg-white shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-50 overflow-y-auto
        `}
      >
        {/* LOGIN / SIGNUP */}
        <div className="flex gap-3 px-4 pb-4 pt-7">
          <button className="flex-1 border border-[#ED017F] text-[#ED017F] py-2 rounded">
            Login
          </button>

          <button className="flex-1 border border-[#ED017F] text-[#ED017F] py-2 rounded">
            Signup
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-4 px-4 py-4 border-t border-b text-sm">
          <div className="flex gap-3">
            <FaMapMarkerAlt className="text-orange-500 mt-1" />
            <div>
              <p className="font-semibold">Track Orders</p>
              <span className="text-gray-400 text-xs">Order status</span>
            </div>
          </div>

          <div className="flex gap-3">
            <FaStar className="text-gray-600 mt-1" />
            <div>
              <p className="font-semibold">Pending Items</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FaTag className="text-gray-600 mt-1" />
            <div>
              <p className="font-semibold">Sell on Konga</p>
              <span className="text-gray-400 text-xs">
                Join other merchants
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <FaStore className="text-gray-600 mt-1" />
            <div>
              <p className="font-semibold">Physical Stores</p>
              <span className="text-gray-400 text-xs">
                Stores around you
              </span>
            </div>
          </div>
        </div>

        {/* CATEGORY TITLE */}
        <h3 className="px-4 py-3 font-bold text-gray-700">Categories</h3>

        {/* CATEGORY LIST */}
        <ul className="text-gray-700">
          {[
            "Computers and Accessories",
            "Phones and Tablets",
            "Electronics",
            "Konga Fashion",
            "Home and Kitchen",
            "Baby, Kids and Toys",
            "Beauty, Health & Personal Care",
            "Drinks & Groceries",
            "Other Categories",
          ].map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-4 border-t"
            >
              {item}
              <FaChevronRight size={12} />
            </li>
          ))}
        </ul>

        {/* CONTACT US */}
        <div className="px-4 py-6 border-t">
          <h3 className="font-semibold text-gray-700 mb-4">Contact Us</h3>

          <div className="flex gap-3 mb-4">
            <div className="bg-gray-200 p-3 rounded-full">📧</div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                EMAIL SUPPORT
              </p>
              <p className="text-sm">help@konga.com</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 font-semibold">PHONE SUPPORT</p>
            <p className="text-sm">07080635700, 02018883435</p>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="bg-gray-200 p-3 rounded-full">💬</div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">WHATSAPP</p>
              <p className="text-sm">0907 0038 400, 0809 460 5555</p>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="px-4 py-6 border-t">
          <h3 className="font-semibold text-gray-700 mb-4">
            GET LATEST DEALS
          </h3>

          <div className="flex border rounded overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 py-2 outline-none text-sm"
            />

            <button className="bg-[#ED017F] text-white px-4 text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="px-4 pb-20 border-t">
          <h3 className="font-semibold text-gray-700 mb-4">
            CONNECT US ON SOCIAL MEDIA
          </h3>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              f
            </div>

            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              X
            </div>

            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              📷
            </div>

            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              ▶
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;