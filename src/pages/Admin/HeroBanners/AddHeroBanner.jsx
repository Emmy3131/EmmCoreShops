import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaSave, FaImage, FaPlus } from "react-icons/fa";

import api from "../../../library/api";

const AddHeroBanner = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "Shop Now",
    buttonLink: "/",
    active: true,
    order: 0,
  });

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= IMAGE CONVERTER ================= */

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /* ================= IMAGE ================= */

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const base64 = await convertToBase64(file);

    setFormData((prev) => ({
      ...prev,

      image: base64,
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/hero-banners", formData);

      if (res.data.status === "success") {
        alert("Hero banner created successfully");

        navigate("/admin/hero-banners");
      }
    } catch (error) {
      console.error(
        "Create banner error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to create banner");
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
          "
        >
          <div>
            <h1
              className="
              text-3xl
              font-bold
              flex
              gap-3
              items-center
              "
            >
              <FaPlus />
              Add Hero Banner
            </h1>

            <p
              className="
              text-white/80
              mt-2
              "
            >
              Create homepage promotional slider
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="
            bg-white
            text-purple-700
            px-5
            py-3
            rounded-xl
            flex
            gap-2
            items-center
            font-semibold
            "
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>

      <div
        className="
        grid
        lg:grid-cols-3
        gap-6
        "
      >
        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
          lg:col-span-2
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          space-y-5
          "
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Banner title"
            required
            className="
            w-full
            border
            rounded-xl
            p-3
            "
          />

          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Banner subtitle"
            rows="4"
            className="
            w-full
            border
            rounded-xl
            p-3
            "
          />

          <div>
            <label
              className="
              font-semibold
              block
              mb-2
              "
            >
              Banner Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
              className="
              border
              rounded-xl
              p-3
              w-full
              "
            />
          </div>

          <div
            className="
            grid
            md:grid-cols-2
            gap-4
            "
          >
            <input
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Button text"
              className="
              border
              rounded-xl
              p-3
              "
            />

            <input
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              placeholder="Button link"
              className="
              border
              rounded-xl
              p-3
              "
            />
          </div>

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            placeholder="Display order"
            className="
            border
            rounded-xl
            p-3
            w-full
            "
          />

          <label
            className="
            flex
            items-center
            gap-3
            "
          >
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Publish banner immediately
          </label>

          <button
            disabled={loading}
            className="
            bg-gradient-to-r
            from-pink-600
            to-purple-600
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            "
          >
            <FaSave />

            {loading ? "Saving..." : "Create Banner"}
          </button>
        </form>

        {/* PREVIEW */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          "
        >
          <h2
            className="
            font-bold
            flex
            items-center
            gap-2
            mb-4
            "
          >
            <FaImage />
            Preview
          </h2>

          {preview ? (
            <img
              src={preview}
              className="
              h-48
              w-full
              object-cover
              rounded-2xl
              "
            />
          ) : (
            <div
              className="
              h-48
              bg-gray-100
              rounded-2xl
              flex
              justify-center
              items-center
              text-gray-400
              "
            >
              Image Preview
            </div>
          )}

          <h3
            className="
            text-xl
            font-bold
            mt-4
            "
          >
            {formData.title || "Banner Title"}
          </h3>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            {formData.subtitle || "Banner description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddHeroBanner;
