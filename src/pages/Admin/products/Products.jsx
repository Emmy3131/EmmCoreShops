import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import api from "../../../library/api";

import ProductStats from "./ProductStats";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    trending: "",
    flashSale: "",
    sort: "",
  });

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  /*
  ==========================
  FETCH PRODUCTS
  ==========================
  */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let query = `?page=${page}&limit=12`;

      if (filters.category) {
        query += `&category=${filters.category}`;
      }

      if (filters.sort) {
        query += `&sort=${filters.sort}`;
      }

      const res = await api.get(`/products${query}`);

      setProducts(res.data.data || []);

      if (res.data.pagination) {
        setTotalPages(res.data.pagination.pages);
      }
    } catch (error) {
      console.log("Products error", error);
    } finally {
      setLoading(false);
    }
  };

  /*
  ==========================
  FETCH STATS
  ==========================
  */

  const fetchStats = async () => {
    try {
      const res = await api.get("/products/admin/stats");

      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters.category, filters.sort]);

  useEffect(() => {
    fetchStats();
  }, []);

  /*
  ==========================
  SEARCH
  ==========================
  */

  const handleSearch = async (value) => {
    setFilters({
      ...filters,
      search: value,
    });

    if (!value) {
      fetchProducts();
      return;
    }

    try {
      const res = await api.get(`/products/search?keyword=${value}`);

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ==========================
  DELETE
  ==========================
  */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      fetchProducts();

      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ==========================
  TOGGLE TRENDING
  ==========================
  */

  const toggleTrending = async (id) => {
    try {
      await api.patch(`/products/${id}/toggle-trending`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ==========================
  TOGGLE FLASH SALE
  ==========================
  */

  const toggleFlashSale = async (id) => {
    try {
      await api.patch(`/products/${id}/toggle-flash-sale`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-4
      md:p-8
    "
    >
      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        justify-between
        gap-5
        mb-8
      "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-gray-800
          "
          >
            Products Management
          </h1>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Manage inventory, pricing and product visibility.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            font-semibold
            shadow
          "
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* STATS */}

      <ProductStats stats={stats} />

      {/* FILTERS */}

      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />

      {/* TABLE */}

      <ProductTable
        products={products}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(id) => navigate(`/admin/products/edit/${id}`)}
        onToggleTrending={toggleTrending}
        onToggleFlashSale={toggleFlashSale}
      />

      {/* PAGINATION */}

      <div
        className="
        flex
        justify-center
        gap-3
        mt-8
      "
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            px-4
            py-2
            bg-white
            rounded-lg
            shadow
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span
          className="
          px-4
          py-2
          bg-purple-600
          text-white
          rounded-lg
        "
        >
          {page}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            px-4
            py-2
            bg-white
            rounded-lg
            shadow
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
