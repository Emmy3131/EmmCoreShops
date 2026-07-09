import { useState } from "react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";

import { FaFileAlt, FaSave, FaArrowLeft } from "react-icons/fa";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaDescription: "",
    section: "company",
    status: "draft",
  });

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  /* ================= AUTO SLUG ================= */

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitle = (e) => {
    const title = e.target.value;

    setFormData({
      ...formData,

      title,

      slug: generateSlug(title),
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/pages", formData);

      if (res.data.status === "success") {
        alert("Page created successfully");

        navigate("/admin/cms-pages");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed creating page");
    } finally {
      setLoading(false);
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
              <FaFileAlt />
              Create CMS Page
            </h1>

            <p
              className="
text-white/80
mt-2
"
            >
              Create website pages and manage content.
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
        onSubmit={handleSubmit}
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
              Page Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleTitle}
              placeholder="About Us"
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
              placeholder="about-us"
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

        {/* META DESCRIPTION */}

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
            placeholder="SEO description..."
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
text-sm
text-gray-500
text-right
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
            Page Content
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
border
rounded-xl
p-3
w-full
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
bg-pink-600
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

          {loading ? "Creating..." : "Create Page"}
        </button>
      </form>
    </div>
  );
};

export default AddPage;
