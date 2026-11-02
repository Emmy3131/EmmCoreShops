import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

import api from "../../../library/api";

const ProductFilters = ({ filters, setFilters, onSearch }) => {
  const [categories, setCategories] = useState([]);

  /*
    ==========================
    FETCH CATEGORIES
    ==========================
    */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log("Category error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /*
    ==========================
    HANDLE CHANGE
    ==========================
    */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,

      [name]: value,
    });
  };

  /*
    ==========================
    RESET
    ==========================
    */

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      trending: "",
      flashSale: "",
      sort: "",
    });

    onSearch("");
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-sm
      p-5
      mb-8
    "
    >
      <div
        className="
        flex
        items-center
        gap-2
        mb-5
        text-gray-700
        font-semibold
      "
      >
        <FaFilter />
        Product Filters
      </div>

      <div
        className="
        grid
        md:grid-cols-5
        gap-4
      "
      >
        {/* SEARCH */}

        <div
          className="
          md:col-span-2
          relative
        "
        >
          <FaSearch
            className="
              absolute
              left-3
              top-3.5
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              pl-10
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />
        </div>

        {/* CATEGORY */}

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="
            border
            rounded-xl
            p-3
          "
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* TRENDING */}

        <select
          name="trending"
          value={filters.trending}
          onChange={handleChange}
          className="
            border
            rounded-xl
            p-3
          "
        >
          <option value="">Trending</option>

          <option value="true">Trending Only</option>

          <option value="false">Normal Products</option>
        </select>

        {/* FLASH SALE */}

        <select
          name="flashSale"
          value={filters.flashSale}
          onChange={handleChange}
          className="
            border
            rounded-xl
            p-3
          "
        >
          <option value="">Flash Sale</option>

          <option value="true">Flash Sale Only</option>

          <option value="false">Normal Sale</option>
        </select>

        {/* SORT */}

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="
            border
            rounded-xl
            p-3
          "
        >
          <option value="">Sort By</option>

          <option value="-createdAt">Newest</option>

          <option value="price">Price Low</option>

          <option value="-price">Price High</option>

          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* RESET BUTTON */}

      <div
        className="
        mt-5
        flex
        justify-end
      "
      >
        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            gap-2
            bg-gray-100
            hover:bg-gray-200
            px-5
            py-2
            rounded-xl
            text-gray-700
            font-semibold
          "
        >
          <FaRedo />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
