import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft, FaSave, FaImage } from "react-icons/fa";

import api from "../../../library/api";

const EditHeroBanner = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    active: true,
    order: 0,
  });

  /* ================= FETCH BANNER ================= */

  const fetchBanner = async () => {
    try {
      const res = await api.get(`/hero-banners/${id}`);

      if (res.data.status === "success") {
        const data = res.data.data;

        setFormData({
          title: data.title || "",

          subtitle: data.subtitle || "",

          image: data.image || "",

          buttonText: data.buttonText || "Shop Now",

          buttonLink: data.buttonLink || "/",

          active: data.active,

          order: data.order || 0,
        });

        setPreview(data.image);
      }
    } catch (error) {
      console.error(
        "Fetch banner error:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [id]);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= BASE64 ================= */

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (err) => {
        reject(err);
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

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.patch(`/hero-banners/${id}`, formData);

      if (res.data.status === "success") {
        alert("Hero banner updated successfully");

        navigate("/admin/hero-banners");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Update failed");
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
        flex
        items-center
        gap-4
        mb-6
        "
      >
        <button
          onClick={() => navigate(-1)}
          className="
          bg-white
          shadow
          p-3
          rounded-xl
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
            Edit Hero Banner
          </h1>

          <p
            className="
            text-gray-500
            "
          >
            Update homepage promotional content
          </p>
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
          shadow
          p-6
          space-y-5
          "
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="
            border
            rounded-xl
            p-3
            w-full
            "
            placeholder="Banner title"
            required
          />

          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows="4"
            className="
            border
            rounded-xl
            p-3
            w-full
            "
            placeholder="Subtitle"
          />

          <div>
            <label
              className="
              font-semibold
              block
              mb-2
              "
            >
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="
              border
              p-3
              rounded-xl
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
              className="
              border
              rounded-xl
              p-3
              "
              placeholder="Button text"
            />

            <input
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              className="
              border
              rounded-xl
              p-3
              "
              placeholder="Button link"
            />
          </div>

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="
            border
            rounded-xl
            p-3
            w-full
            "
            placeholder="Order"
          />

          <label
            className="
            flex
            gap-3
            items-center
            "
          >
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active Banner
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
            gap-2
            items-center
            "
          >
            <FaSave />

            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>

        {/* PREVIEW */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow
          p-6
          "
        >
          <h2
            className="
            font-bold
            mb-4
            flex
            gap-2
            items-center
            "
          >
            <FaImage />
            Preview
          </h2>

          {preview ? (
            <img
              src={preview}
              className="
              w-full
              h-48
              object-cover
              rounded-2xl
              "
            />
          ) : (
            <div
              className="
              h-48
              bg-gray-100
              rounded-xl
              flex
              justify-center
              items-center
              "
            >
              No Image
            </div>
          )}

          <h3
            className="
            text-xl
            font-bold
            mt-4
            "
          >
            {formData.title}
          </h3>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            {formData.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditHeroBanner;
