import {
  FaThLarge,
  FaTshirt,
  FaLaptop,
  FaMobileAlt,
  FaTag,
} from "react-icons/fa";

const categories = [
  { icon: <FaThLarge />, name: "Browse All" },
  { icon: <FaTshirt />, name: "Fashion" },
  { icon: <FaLaptop />, name: "Computers" },
  { icon: <FaMobileAlt />, name: "Phones" },
  { icon: <FaTag />, name: "All Deals" },
];

const Categories = () => {
  return (
    <div className="bg-white py-3 md:hidden overflow-x-auto">
      <div className="flex gap-6 px-4 min-w-max">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <div className="bg-gray-100 p-3 rounded-full text-lg">
              {cat.icon}
            </div>
            <span className="mt-1">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;