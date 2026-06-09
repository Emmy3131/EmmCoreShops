import api from "../../../library/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroBanners = () => {
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BANNERS ================= */
  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await api.get("/hero-banners/admin");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= DELETE BANNER ================= */
  const deleteBanner = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirm) return;

    try {
      await api.delete(`/hero-banners/${id}`);

      setBanners((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* ================= TOGGLE ACTIVE ================= */
  const toggleActive = async (banner) => {
    try {
      const res = await api.patch(`/hero-banners/${banner._id}`, {
        active: !banner.active,
      });

      if (res.data.status === "success") {
        setBanners((prev) =>
          prev.map((item) =>
            item._id === banner._id
              ? res.data.data
              : item
          )
        );
      }
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Hero Banners
        </h1>

        <button
          onClick={() =>
            navigate("/admin/hero-banners/add")
          }
          className="bg-[#ED017F] text-white px-4 py-2 rounded"
        >
          Add New Banner
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading banners...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && banners.length === 0 && (
        <p className="text-gray-500">
          No hero banners found.
        </p>
      )}

      {/* TABLE */}
      {!loading && banners.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Link</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id} className="border">
                  
                  {/* IMAGE */}
                  <td className="p-2 border">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="p-2 border">
                    {banner.title}
                  </td>

                  {/* LINK */}
                  <td className="p-2 border text-sm text-blue-500">
                    {banner.link}
                  </td>

                  {/* STATUS */}
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        banner.active
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {banner.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-2 border space-x-2">
                    
                    {/* TOGGLE */}
                    <button
                      onClick={() =>
                        toggleActive(banner)
                      }
                      className="bg-yellow-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Toggle
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteBanner(banner._id)
                      }
                      className="bg-red-600 text-white px-2 py-1 text-xs rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HeroBanners;