import { useEffect, useState } from "react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaArchive,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

const PageList = () => {
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  /* ================= FETCH ================= */

  const fetchPages = async () => {
    try {
      setLoading(true);

      const res = await api.get("/pages");

      if (res.data.status === "success") {
        setPages(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  /* ================= DELETE ================= */

  const deletePage = async (id) => {
    const confirmDelete = window.confirm("Delete this page permanently?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/pages/${id}`);

      setPages((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= STATUS ================= */

  const toggleStatus = async (page) => {
    const newStatus = page.status === "published" ? "draft" : "published";

    try {
      const res = await api.patch(`/pages/${page._id}`, {
        status: newStatus,
      });

      if (res.data.status === "success") {
        setPages((prev) =>
          prev.map((item) =>
            item._id === page._id
              ? {
                ...item,
                status: newStatus,
              }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FILTER ================= */

  const filteredPages = pages.filter((page) => {
    const matchSearch = page.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "all" ? true : page.status === status;

    return matchSearch && matchStatus;
  });

  /* ================= STATS ================= */

  const total = pages.length;

  const published = pages.filter((p) => p.status === "published").length;

  const draft = pages.filter((p) => p.status === "draft").length;

  const archived = pages.filter((p) => p.status === "archived").length;

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
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-pink-600
via-purple-600
to-indigo-600
rounded-3xl
p-8
text-white
shadow-xl
"
      >
        <div
          className="
flex
justify-between
items-center
flex-wrap
gap-5
"
        >
          <div>
            <h1
              className="
text-3xl
font-bold
flex
items-center
gap-3
"
            >
              <FaFileAlt />
              CMS Page Manager
            </h1>

            <p
              className="
text-white/80
mt-2
"
            >
              Manage website pages, legal pages and company information.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/cms-pages/create")}
            className="
bg-white
text-purple-700
px-6
py-3
rounded-xl
font-semibold
flex
gap-2
items-center
"
          >
            <FaPlus />
            Create Page
          </button>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"
      >
        <StatCard icon={<FaFileAlt />} title="Total Pages" value={total} />

        <StatCard
          icon={<FaCheckCircle />}
          title="Published"
          value={published}
        />

        <StatCard icon={<FaClock />} title="Draft" value={draft} />

        <StatCard icon={<FaArchive />} title="Archived" value={archived} />
      </div>

      {/* FILTER */}

      <div
        className="
bg-white
rounded-3xl
shadow
p-5
grid
md:grid-cols-2
gap-4
"
      >
        <div
          className="
relative
"
        >
          <FaSearch
            className="
absolute
left-4
top-1/2
-transform
text-gray-400
"
          />

          <input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
w-full
border
rounded-xl
p-3
pl-12
"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
border
rounded-xl
p-3
"
        >
          <option value="all">All Status</option>

          <option value="published">Published</option>

          <option value="draft">Draft</option>

          <option value="archived">Archived</option>
        </select>
      </div>

      {/* CONTENT */}

      <div
        className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
"
      >
        {loading ? (
          <p>Loading pages...</p>
        ) : (
          filteredPages.map((page) => (
            <div
              key={page._id}
              className="
bg-white
rounded-3xl
shadow
p-6
space-y-4
"
            >
              <div
                className="
flex
justify-between
"
              >
                <div>
                  <h2
                    className="
font-bold
text-xl
"
                  >
                    {page.title}
                  </h2>

                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    /{page.slug}
                  </p>
                </div>

                <span
                  className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${page.status === "published"
                      ? "bg-green-100 text-green-700"
                      : page.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
`}
                >
                  {page.status}
                </span>
              </div>

              <p
                className="
text-sm
text-gray-500
"
              >
                Section:
                <b> {page.section}</b>
              </p>

              <div
                className="
flex
gap-2
flex-wrap
"
              >
                <button
                  onClick={() => navigate(`/admin/cms-pages/edit/${page._id}`)}
                  className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
flex
gap-2
items-center
"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => toggleStatus(page)}
                  className="
bg-yellow-500
text-white
px-3
py-2
rounded-lg
"
                >
                  Toggle
                </button>

                <button
                  onClick={() => deletePage(page._id)}
                  className="
bg-red-600
text-white
px-3
py-2
rounded-lg
flex
gap-2
items-center
"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div
    className="
bg-white
rounded-3xl
shadow
p-5
flex
items-center
gap-4
"
  >
    <div
      className="
bg-purple-100
text-purple-700
p-4
rounded-2xl
text-xl
"
    >
      {icon}
    </div>

    <div>
      <p
        className="
text-gray-500
"
      >
        {title}
      </p>

      <h2
        className="
text-3xl
font-bold
"
      >
        {value}
      </h2>
    </div>
  </div>
);

export default PageList;
