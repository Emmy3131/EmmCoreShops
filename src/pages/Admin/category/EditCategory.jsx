import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaSave, FaImage, FaUpload } from "react-icons/fa";

import api from "../../../library/api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  /* ================= IMAGE BASE64 ================= */

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (err) => reject(err);
    });
  };

  /* ================= FETCH CATEGORY ================= */

  const fetchCategory = async () => {
    try {
      const res = await api.get(`/categories/${id}`);

      const data = res.data.data;

      setCategory({
        name: data.name || "",

        description: data.description || "",

        image: data.image || "",
      });

      setPreview(data.image);
    } catch (err) {
      console.error("Fetch category error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    setCategory({
      ...category,

      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCategory({
      ...category,

      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageData = category.image;

      if (category.image instanceof File) {
        imageData = await convertToBase64(category.image);
      }

      const res = await api.patch(`/categories/${id}`, {
        name: category.name,

        description: category.description,

        image: imageData,
      });

      if (res.data.status === "success") {
        alert("Category updated successfully");

        navigate("/admin/category");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);

      alert(err.response?.data?.message || "Update failed");
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
from-indigo-600
via-blue-600
to-cyan-600
rounded-3xl
p-6
md:p-8
text-white
shadow-xl
mb-8
"
      >
        <div
          className="
flex
items-center
gap-4
"
        >
          <button
            onClick={() => navigate(-1)}
            className="
bg-white/20
p-3
rounded-xl
hover:bg-white/30
transition
"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1
              className="
text-3xl
font-bold
"
            >
              Edit Category
            </h1>

            <p
              className="
text-blue-100
mt-1
"
            >
              Update category information and appearance
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
grid
lg:grid-cols-2
gap-8
"
      >
        {/* LEFT SIDE FORM */}

        <div
          className="
bg-white
rounded-3xl
shadow-lg
p-6
space-y-6
"
        >
          <h2
            className="
text-xl
font-bold
"
          >
            Category Details
          </h2>

          <div>
            <label
              className="
text-sm
font-medium
"
            >
              Category Name
            </label>

            <input
              name="name"
              value={category.name}
              onChange={handleChange}
              className="
w-full
mt-2
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-indigo-500
"
            />
          </div>

          <div>
            <label
              className="
text-sm
font-medium
"
            >
              Description
            </label>

            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              rows="6"
              className="
w-full
mt-2
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-indigo-500
"
            />
          </div>

          <button
            disabled={loading}
            className="
w-full
bg-indigo-600
hover:bg-indigo-700
text-white
py-3
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
transition
"
          >
            <FaSave />

            {loading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
w-full
border
py-3
rounded-xl
font-medium
hover:bg-gray-100
"
          >
            Cancel
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}

        <div
          className="
bg-white
rounded-3xl
shadow-lg
p-6
space-y-5
"
        >
          <h2
            className="
text-xl
font-bold
flex
items-center
gap-2
"
          >
            <FaImage />
            Category Image
          </h2>

          <div
            className="
border-2
border-dashed
rounded-3xl
p-5
text-center
"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="
w-full
h-64
object-cover
rounded-2xl
"
              />
            ) : (
              <div
                className="
h-64
flex
flex-col
items-center
justify-center
text-gray-400
"
              >
                <FaImage size={50} />

                <p>No image selected</p>
              </div>
            )}

            <label
              className="
mt-5
cursor-pointer
bg-gray-100
hover:bg-gray-200
py-3
rounded-xl
flex
justify-center
items-center
gap-2
"
            >
              <FaUpload />
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          <div
            className="
bg-indigo-50
rounded-2xl
p-4
text-sm
text-gray-600
"
          >
            <p className="font-semibold mb-2">Tips</p>

            <ul
              className="
space-y-1
list-disc
ml-5
"
            >
              <li>Use high quality category images</li>

              <li>Recommended size: 800x600px</li>

              <li>Keep category names short</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
