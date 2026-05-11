import {
  FaStar,
  FaStore,
  FaMapMarkerAlt,
  FaTag,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MenuLink from "./MenuLink";
import MenuItem from "./MenuItem";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useAuth();

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
        {/* ================= USER SECTION ================= */}

        <div className="px-4 pt-7 pb-4 border-b">
          {!user ? (
            /* ================= GUEST VIEW ================= */
            <>
              {/* LOGIN BUTTONS */}
              <div className="flex gap-3 text-center mb-5">
                <Link
                  to="/login"
                  className="flex-1 border border-[#ED017F] text-[#ED017F] py-2 rounded"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="flex-1 border border-[#ED017F] text-[#ED017F] py-2 rounded"
                >
                  Signup
                </Link>
              </div>

              {/* GUEST ACTIONS */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <MenuItem title="Track Orders" />
                <MenuItem title="Pending Items" />
                <MenuItem title="Sell on EmmCore" />
                <MenuItem title="Physical Stores" />
              </div>
            </>
          ) : (
            /* ================= LOGGED USER ================= */
            <>
              <>
                {/* ================= USER PROFILE ================= */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#ED017F] text-white rounded flex items-center justify-center font-bold">
                    {user.firstName?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* ACCOUNT SETTINGS TITLE */}
                <p className="text-xs font-bold text-[#ED017F] mb-4">
                  ACCOUNT SETTINGS
                </p>

                {/* USER MENU GRID */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <MenuLink
                    icon={<FaStore />}
                    title="My Orders"
                    desc="0 Items Ordered"
                    to="user/orders"
                  />

                  <MenuLink
                    icon={<FaMapMarkerAlt />}
                    title="Track Orders"
                    desc="View order status"
                    to="user/track"
                  />

                  <MenuLink
                    icon={<FaStar />}
                    title="Pending Items"
                    to="user/pending"
                  />

                  <MenuLink
                    icon={<FaTag />}
                    title="My Wallet"
                    desc="Bal: ₦0"
                    to="user/wallet"
                  />

                  <MenuLink
                    icon={<FaStore />}
                    title="Sell on EmmCore"
                    desc="Join other merchants"
                    to="/sell"
                  />

                  <MenuLink
                    icon={<FaStar />}
                    title="My Saved Items"
                    desc="View liked items"
                    to="/saved"
                  />

                  <MenuLink
                    icon={<FaStore />}
                    title="Physical Stores"
                    desc="Stores around you"
                    to="/stores"
                  />

                  <MenuLink
                    icon={<FaMapMarkerAlt />}
                    title="My Addresses"
                    desc="View saved addresses"
                    to="/address"
                  />
                </div>
              </>
            </>
          )}
        </div>
        {/* CATEGORY TITLE */}
        <h3 className="px-4 py-3 font-bold text-gray-700 bordr">Categories</h3>

        {/* CATEGORY LIST */}
        <ul className="text-gray-700">
          {[
            "Computers and Accessories",
            "Phones and Tablets",
            "Electronics",
            "Fashions",
            "Home and Kitchen",
            "Baby, Kids and Toys",
            "Other Categories",
          ].map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-4 border-b"
            >
              {item}
              <FaChevronRight size={12} />
            </li>
          ))}
        </ul>

        {user && (
          <div className="px-4 py-4 border-t">
            <button
              onClick={logout}
              className="block w-full text-left py-2 text-red-500 hover:bg-red-50 rounded"
            >
              Logout
            </button>

            <button className="block w-full text-left py-2 text-red-600 hover:bg-red-50 rounded">
              Delete Account
            </button>
          </div>
        )}

        {/* CONTACT US */}
        <div className="px-4 py-6 border-t">
          <h3 className="font-semibold text-gray-700 mb-4">Contact Us</h3>

          <div className="flex gap-3 mb-4">
            <div className="bg-gray-200 p-3 rounded-full">📧</div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                EMAIL SUPPORT
              </p>
              <p className="text-sm">help@emmcOREshops.com</p>
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
          <h3 className="font-semibold text-gray-700 mb-4">GET LATEST DEALS</h3>

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
        <div className="px-4 pb-32 border-t">
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
