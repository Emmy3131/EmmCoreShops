import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../library/api";

const AddHeroBanner = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      return alert("Title and Image URL are required");
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        link,
        image, // URL string
        active: true,
        order: 0,
      };

      const res = await api.post("/hero-banners", payload);

      if (res.data.status === "success") {
        alert("Hero banner created successfully");
        navigate("/admin/hero-banners");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5">Add Hero Banner</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded shadow">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Banner Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Banner Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL (Cloudinary or hosted image)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* LINK */}
        <input
          type="text"
          placeholder="Button Link (e.g /category/phones)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Creating..." : "Create Banner"}
        </button>
      </form>
    </div>
  );
};

export default AddHeroBanner;