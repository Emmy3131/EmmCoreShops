import { useEffect, useState } from "react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";

const PageList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPages = async () => {
    try {
      const res = await api.get("/pages");

      if (res.data.status === "success") {
        setPages(res.data.data);
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

  const deletePage = async (id) => {
    try {
      await api.delete(`/pages/${id}`);
      setPages(pages.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await api.patch(`/pages/${id}`, {
        status: current === "published" ? "draft" : "published",
      });

      setPages((prev) =>
        prev.map((p) =>
          p._id === id
            ? {
                ...p,
                status:
                  current === "published"
                    ? "draft"
                    : "published",
              }
            : p
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading pages...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          CMS Pages
        </h1>

        <button
          onClick={() =>
            navigate("/admin/cms-pages/create")
          }
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          + Add Page
        </button>
      </div>

      {/* TABLE */}
      <div className="space-y-4">

        {pages.map((page) => (
          <div
            key={page._id}
            className="border p-4 rounded flex justify-between items-center"
          >

            {/* INFO */}
            <div>
              <h2 className="font-bold">
                {page.title}
              </h2>

              <p className="text-sm text-gray-500">
                /{page.slug}
              </p>

              <span
                className={`text-sm ${
                  page.status === "published"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {page.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() =>
                  navigate(
                    `/admin/cms-pages/edit/${page._id}`
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  toggleStatus(
                    page._id,
                    page.status
                  )
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>

              <button
                onClick={() =>
                  deletePage(page._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default PageList;