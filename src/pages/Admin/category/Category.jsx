import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHeader from "../../../component/Admin/PageHeader";

import {
  FaPlus,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import api from "../../../library/api";

import CategoryStats from "./CategorieStats";
import CategoryModal from "../../../component/Admin/CategorieModel";
import DeleteCategoryModal from "../../../component/Admin/DeleteCategorieModel";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [sortBy, setSortBy] = useState("newest");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteCategory, setDeleteCategory] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= DELETE CATEGORY ================= */

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((cat) => cat._id !== id));

      setDeleteCategory(null);
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  /* ================= FILTER ================= */

  const filteredCategories = categories

    .filter((cat) => {
      const matchSearch = cat.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? cat.status !== "inactive"
            : cat.status === "inactive";

      return matchSearch && matchStatus;
    })

    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-8
space-y-6
"
    >
      {/* ================= HEADER ================= */}

      <PageHeader
        title="Categories"
        subtitle="Manage your store categories"
        buttonText="Add Category"
        buttonIcon={<FaPlus />}
        onButtonClick={() => navigate("/admin/category/add")}
      />


      <CategoryStats categories={categories} />

      {/* ================= FILTER ================= */}

      <div
        className="
bg-white
rounded-3xl
shadow
p-5
"
      >
        <div
          className="
grid
md:grid-cols-3
gap-4
"
        >
          <div
            className="
relative
md:col-span-1
"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="
Search category...
"
              className="
w-full
border
rounded-xl
py-3
pl-12
pr-4
outline-none
focus:ring-2
focus:ring-indigo-500
"
            />

            <FaSearch
              className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
border
rounded-xl
px-4
"
          >
            <option value="all">All</option>

            <option value="active">Active</option>

            <option value="inactive">Hidden</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
border
rounded-xl
px-4
"
          >
            <option value="newest">Newest</option>

            <option value="oldest">Oldest</option>

            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* ================= GRID ================= */}

      {filteredCategories.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
shadow
p-10
text-center
text-gray-500
"
        >
          No categories found
        </div>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-6
"
        >
          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="
bg-white
rounded-3xl
overflow-hidden
shadow
hover:shadow-xl
transition
group
"
            >
              {/* IMAGE */}

              <div
                className="
relative
h-52
"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-500
"
                />

                <div
                  className="
absolute
inset-0
bg-gradient-to-t
from-black/70
to-transparent
"
                />

                <div
                  className="
absolute
bottom-4
left-4
text-white
"
                >
                  <h2
                    className="
text-xl
font-bold
"
                  >
                    {cat.name}
                  </h2>

                  <p
                    className="
text-sm
"
                  >
                    {cat.products?.length || 0}
                    Products
                  </p>
                </div>

                {/* MENU */}

                <div
                  className="
absolute
top-4
right-4
"
                >
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === cat._id ? null : cat._id)
                    }
                    className="
bg-white
w-10
h-10
rounded-full
shadow
flex
items-center
justify-center
"
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenu === cat._id && (
                    <div
                      className="
absolute
right-0
mt-2
bg-white
rounded-xl
shadow-xl
w-44
overflow-hidden
z-20
"
                    >
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          setOpenMenu(null);
                        }}
                        className="
w-full
px-4
py-3
flex
gap-2
hover:bg-gray-100
"
                      >
                        <FaEye />
                        View
                      </button>

                      <Link
                        to={`/admin/category/edit/${cat._id}`}
                        className="
px-4
py-3
flex
gap-2
hover:bg-gray-100
"
                      >
                        <FaEdit />
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          setDeleteCategory(cat);
                          setOpenMenu(null);
                        }}
                        className="
w-full
px-4
py-3
flex
gap-2
text-red-600
hover:bg-red-50
"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT */}

              <div
                className="
p-5
"
              >
                <p
                  className="
text-gray-500
text-sm
line-clamp-2
"
                >
                  {cat.description}
                </p>

                <div
                  className="
flex
justify-between
items-center
mt-4
"
                >
                  <span
                    className={`

px-3
py-1
rounded-full
text-xs
font-semibold

${cat.status === "inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                      }

`}
                  >
                    {cat.status === "inactive" ? "Hidden" : "Active"}
                  </span>

                  <span
                    className="
text-xs
text-gray-400
"
                  >
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODALS ================= */}

      <CategoryModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      <DeleteCategoryModal
        category={deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Categories;
