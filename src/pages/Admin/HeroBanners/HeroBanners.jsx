import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaSearch,
  FaImages,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
  FaEye,
} from "react-icons/fa";

import api from "../../../library/api";
import PageHeader from "../../../component/Admin/PageHeader";

const HeroBanners = () => {
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [sortBy, setSortBy] = useState("newest");

  /* ================= FETCH ================= */

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await api.get("/hero-banners/admin");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= DELETE ================= */

  const deleteBanner = async (id) => {
    const confirmDelete = window.confirm("Delete this banner?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/hero-banners/${id}`);

      setBanners((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= TOGGLE ================= */

  const toggleActive = async (banner) => {
    try {
      const res = await api.patch(`/hero-banners/${banner._id}`, {
        active: !banner.active,
      });

      if (res.data.status === "success") {
        setBanners((prev) =>
          prev.map((item) => (item._id === banner._id ? res.data.data : item)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = (id) => {
    navigate(`/admin/hero-banners/edit/${id}`);
  }

  /* ================= STATS ================= */

  const total = banners.length;

  const active = banners.filter((item) => item.active).length;

  const inactive = banners.filter((item) => !item.active).length;

  const today = banners.filter(
    (item) =>
      new Date(item.createdAt).toDateString() === new Date().toDateString(),
  ).length;

  /* ================= FILTER ================= */

  const filteredBanners = banners

    .filter((item) => {
      const searchMatch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? item.active
            : !item.active;

      return searchMatch && statusMatch;
    })

    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
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
      {/* HEADER */}

      <PageHeader
        title="Hero Banners"
        subtitle="Manage homepage sliders and promotions"
        buttonText="Create Banner"
        buttonIcon={<FaPlus />}
        onButtonClick={() => navigate("/admin/hero-banners/add")}
      />

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
        <StatCard icon={<FaImages />} title="Total" value={total} />

        <StatCard icon={<FaCheckCircle />} title="Active" value={active} />

        <StatCard icon={<FaTimesCircle />} title="Hidden" value={inactive} />

        <StatCard icon={<FaCalendarAlt />} title="Today" value={today} />
      </div>

      {/* FILTER */}

      <div
        className="
bg-white
rounded-3xl
shadow
p-5
grid
md:grid-cols-3
gap-4
"
      >
        <div className="relative">
          <FaSearch
            className="
absolute
left-4
top-4
text-gray-400
"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search banner..."
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
border
rounded-xl
px-4
"
        >
          <option value="all">All Status</option>

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

          <option value="title">Title</option>
        </select>
      </div>

      {/* BANNERS */}

      {loading ? (
        <div
          className="
bg-white
rounded-3xl
p-10
text-center
"
        >
          Loading banners...
        </div>
      ) : filteredBanners.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
p-10
text-center
"
        >
          <FaImages
            className="
mx-auto
text-gray-300
text-5xl
mb-3
"
          />

          <h2 className="font-bold text-xl">No banners found</h2>
        </div>
      ) : (
        <div
          className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {filteredBanners.map((banner) => (
            <div
              key={banner._id}
              className="
bg-white
rounded-3xl
shadow-lg
overflow-hidden
"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="
h-52
w-full
object-cover
"
              />

              <div className="p-5">
                <div
                  className="
flex
justify-between
items-center
"
                >
                  <h2
                    className="
font-bold
text-xl
"
                  >
                    {banner.title}
                  </h2>

                  <span
                    className={`
px-3
py-1
rounded-full
text-xs
font-bold

${banner.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}

`}
                  >
                    {banner.active ? "Active" : "Hidden"}
                  </span>
                </div>

                <p
                  className="
text-gray-500
mt-3
text-sm
"
                >
                  {banner.subtitle}
                </p>

                <div
                  className="
flex
gap-2
mt-5
"
                >
                  <button
                    onClick={() =>
                      handleEdit(banner._id)
                    }
                    className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => toggleActive(banner)}
                    className="
bg-yellow-500
text-white
px-3
py-2
rounded-lg
"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => deleteBanner(banner._id)}
                    className="
bg-red-600
text-white
px-3
py-2
rounded-lg
"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
text-sm
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

export default HeroBanners;
