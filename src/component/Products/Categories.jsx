import {
  FaThLarge,
  FaTshirt,
  FaLaptop,
  FaMobileAlt,
  FaTag,
  FaShoppingBag,
  FaHome,
  FaGamepad,
  FaHeadphones,
  FaCamera,
  FaCouch,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../library/api";

/* ===============================
   GET CATEGORY ICON
================================= */
const getCategoryIcon = (name = "") => {
  const category = name.toLowerCase();

  if (
    category.includes("fashion") ||
    category.includes("cloth") ||
    category.includes("wear")
  ) {
    return <FaTshirt />;
  }

  if (
    category.includes("computer") ||
    category.includes("laptop")
  ) {
    return <FaLaptop />;
  }

  if (
    category.includes("phone") ||
    category.includes("mobile")
  ) {
    return <FaMobileAlt />;
  }

  if (
    category.includes("game") ||
    category.includes("gaming")
  ) {
    return <FaGamepad />;
  }

  if (
    category.includes("audio") ||
    category.includes("headphone")
  ) {
    return <FaHeadphones />;
  }

  if (
    category.includes("camera") ||
    category.includes("photo")
  ) {
    return <FaCamera />;
  }

  if (
    category.includes("home") ||
    category.includes("furniture")
  ) {
    return <FaCouch />;
  }

  return <FaShoppingBag />;
};

/* ===============================
   CATEGORY COMPONENT
================================= */
const Categories = () => {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Only show the first 2 database categories
  const visibleCategories = categories.slice(0, 2);

  return (
    <div className="bg-white py-3 md:hidden overflow-x-auto border-b border-gray-100">
      <div className="grid grid-cols-4 gap-2 px-3">

        {/* ===============================
            BROWSE ALL
        ================================= */}
        <Link
          to="/products"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-[10px]
            text-gray-600
            min-w-0
            group
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              flex
              items-center
              justify-center
              bg-cyan-50
              text-cyan-600
              text-lg
              group-hover:bg-cyan-600
              group-hover:text-white
              transition
            "
          >
            <FaThLarge />
          </div>

          <span className="truncate max-w-full">
            Browse All
          </span>
        </Link>

        {/* ===============================
            TWO DATABASE CATEGORIES
        ================================= */}
        {visibleCategories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-[10px]
              text-gray-600
              min-w-0
              group
            "
          >
            <div
              className="
                w-11
                h-11
                rounded-2xl
                flex
                items-center
                justify-center
                bg-blue-50
                text-blue-600
                text-lg
                group-hover:bg-blue-600
                group-hover:text-white
                transition
              "
            >
              {getCategoryIcon(category.name)}
            </div>

            <span
              className="
                truncate
                max-w-full
                text-center
              "
              title={category.name}
            >
              {category.name}
            </span>
          </Link>
        ))}

        {/* ===============================
            ALL DEALS
        ================================= */}
        <Link
          to="/deals"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-[10px]
            text-gray-600
            min-w-0
            group
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              flex
              items-center
              justify-center
              bg-blue-50
              text-blue-600
              text-lg
              group-hover:bg-blue-600
              group-hover:text-white
              transition
            "
          >
            <FaTag />
          </div>

          <span className="truncate max-w-full">
            All Deals
          </span>
        </Link>

      </div>
    </div>
  );
};

export default Categories;