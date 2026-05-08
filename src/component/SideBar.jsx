import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg text-[#ED017F]">
            KongaClone
          </h2>

          <FaTimes
            className="cursor-pointer"
            size={20}
            onClick={closeSidebar}
          />
        </div>

        {/* MENU ITEMS */}
        <ul className="p-4 space-y-4 text-gray-700">
          <li className="font-semibold">All Categories</li>
          <li>Phones & Tablets</li>
          <li>Electronics</li>
          <li>Computers</li>
          <li>Fashion</li>
          <li>Home & Kitchen</li>
          <li>Beauty & Personal Care</li>
          <li>Groceries</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;