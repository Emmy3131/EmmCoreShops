import { useState, useEffect } from "react";
import { FaPlus, FaArrowLeft, FaImage, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../library/api";

const AddCategory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  /* ================= CONVERT IMAGE ================= */

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = reject;
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageData = form.image;

      if (form.image instanceof File) {
        imageData = await convertToBase64(form.image);
      }

      const res = await api.post("/categories", {
        name: form.name,
        description: form.description,
        image: imageData,
      });

      if (res.data.status === "success") {
        alert("Category created successfully");

        navigate("/admin/category");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);

      alert(err.response?.data?.message || "Failed creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER */}

      <div
        className="
      bg-gradient-to-r 
      from-indigo-600 
      via-blue-600 
      to-cyan-600
      rounded-3xl
      p-6 md:p-8
      text-white
      shadow-xl
      mb-8
      "
      >
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="
              flex items-center gap-2
              text-sm
              mb-3
              opacity-90
              "
            >
              <FaArrowLeft />
              Back
            </button>

            <h1
              className="
            text-3xl 
            md:text-4xl
            font-bold
            "
            >
              Add New Category
            </h1>

            <p className="text-blue-100 mt-2">
              Create and organize products into categories
            </p>
          </div>

          <div
            className="
          hidden md:flex
          w-20 h-20
          rounded-3xl
          bg-white/20
          items-center
          justify-center
          "
          >
            <FaPlus size={35} />
          </div>
        </div>
      </div>

      <div
        className="
      grid
      lg:grid-cols-3
      gap-8
      "
      >
        {/* FORM */}

        <div
          className="
        lg:col-span-2
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}

            <div>
              <label className="font-semibold">Category Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Smartphones"
                className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
                "
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="font-semibold">Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe this category..."
                className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
                "
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="font-semibold">Category Image</label>

              <label
                className="
              mt-3
              border-2
              border-dashed
              rounded-2xl
              h-48
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:bg-gray-50
              "
              >
                <FaImage className="text-gray-400" size={35} />

                <p className="text-gray-500 mt-2">Upload category image</p>

                <input type="file" hidden onChange={handleImage} />
              </label>

              {preview && (
                <img
                  src={preview}
                  className="
                mt-4
                h-48
                w-full
                object-cover
                rounded-2xl
                "
                />
              )}
            </div>

            <button
              disabled={loading}
              className="
            w-full
            bg-indigo-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-indigo-700
            transition
            "
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </form>
        </div>

        {/* PREVIEW */}

        <div
          className="
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        h-fit
        "
        >
          <h2
            className="
          font-bold
          text-lg
          mb-4
          "
          >
            Live Preview
          </h2>

          <div
            className="
          rounded-2xl
          overflow-hidden
          shadow
          "
          >
            <img
              src={preview || "https://via.placeholder.com/400"}
              className="
            h-48
            w-full
            object-cover
            "
            />

            <div className="p-4">
              <h3 className="font-bold text-xl">
                {form.name || "Category Name"}
              </h3>

              <p
                className="
              text-gray-500
              text-sm
              mt-2
              "
              >
                {form.description || "Category description will appear here"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EXISTING CATEGORIES */}

      <div
        className="
      mt-10
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      "
      >
        <h2
          className="
        font-bold
        text-xl
        mb-5
        "
        >
          Existing Categories
        </h2>

        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
        "
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="
            border
            rounded-xl
            overflow-hidden
            "
            >
              <img
                src={cat.image}
                className="
              h-24
              w-full
              object-cover
              "
              />

              <div className="p-3">
                <p className="font-medium text-sm">{cat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
