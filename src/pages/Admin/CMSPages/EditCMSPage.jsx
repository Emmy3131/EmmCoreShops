import { useEffect, useState } from "react";
import api from "../../../library/api";
import { useNavigate, useParams } from "react-router-dom";

import { FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaDescription: "",
    section: "company",
    status: "draft",
  });

  /* ================= FETCH PAGE ================= */

  const fetchPage = async () => {
    try {
      setFetching(true);

      const res = await api.get(`/pages/${id}`);

      if (res.data.status === "success") {
        const page = res.data.data;

        setFormData({
          title: page.title || "",

          slug: page.slug || "",

          content: page.content || "",

          metaDescription: page.metaDescription || "",

          section: page.section || "company",

          status: page.status || "draft",
        });
      }
    } catch (error) {
      console.error(error);

      alert("Failed loading page");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [id]);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.patch(
        `/pages/${id}`,

        formData,
      );

      if (res.data.status === "success") {
        alert("Page updated successfully");

        navigate("/admin/cms-pages");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div
        className="
p-8
text-center
"
      >
        Loading page...
      </div>
    );

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
bg-gradient-to-r
from-pink-600
via-purple-600
to-indigo-600
rounded-3xl
p-8
text-white
shadow-xl
mb-6
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
              <FaEdit />
              Edit CMS Page
            </h1>

            <p
              className="
text-white/80
mt-2
"
            >
              Update your website content
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/cms-pages")}
            className="
bg-white
text-purple-700
px-5
py-3
rounded-xl
font-semibold
flex
items-center
gap-2
"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="
bg-white
rounded-3xl
shadow-lg
p-6
space-y-6
"
      >
        {/* TITLE + SLUG */}

        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <div>
            <label
              className="
font-semibold
block
mb-2
"
            >
              Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label
              className="
font-semibold
block
mb-2
"
            >
              Slug
            </label>

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>
        </div>

        {/* SECTION */}

        <div>
          <label
            className="
font-semibold
block
mb-2
"
          >
            Section
          </label>

          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="
w-full
border
rounded-xl
p-3
"
          >
            <option value="company">Company</option>

            <option value="help">Help</option>

            <option value="legal">Legal</option>

            <option value="affiliate">Affiliate</option>
          </select>
        </div>

        {/* META */}

        <div>
          <label
            className="
font-semibold
block
mb-2
"
          >
            Meta Description
          </label>

          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            maxLength="160"
            className="
w-full
border
rounded-xl
p-3
h-28
"
          />

          <p
            className="
text-right
text-sm
text-gray-500
"
          >
            {formData.metaDescription.length}
            /160
          </p>
        </div>

        {/* CONTENT */}

        <div>
          <label
            className="
font-semibold
block
mb-2
"
          >
            Content
          </label>

          <div
            className="
border
rounded-xl
overflow-hidden
"
          >
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(event, editor) => {
                setFormData({
                  ...formData,

                  content: editor.getData(),
                });
              }}
            />
          </div>
        </div>

        {/* STATUS */}

        <div>
          <label
            className="
font-semibold
block
mb-2
"
          >
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
w-full
border
rounded-xl
p-3
"
          >
            <option value="draft">Draft</option>

            <option value="published">Published</option>

            <option value="archived">Archived</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="
bg-green-600
text-white
px-8
py-3
rounded-xl
font-semibold
flex
items-center
gap-2
disabled:opacity-50
"
        >
          <FaSave />

          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
