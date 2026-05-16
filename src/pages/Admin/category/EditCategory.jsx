import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../../library/api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  /* ================= CONVERT IMAGE TO BASE64 ================= */
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

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

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCategory((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE CATEGORY ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageData = category.image;

      // convert file → base64 if user changed image
      if (category.image instanceof File) {
        imageData = await convertToBase64(category.image);
      }

      const res = await api.patch(`/categories/${id}`, {
        name: category.name,
        description: category.description,
        image: imageData,
      });

      if (res.data.status === "success") {
        alert("Category updated successfully ✅");
        navigate("/admin/category");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5 max-w-2xl"
      >

        {/* NAME */}
        <input
          name="name"
          value={category.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Category Name"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={category.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Description"
          required
        />

        {/* IMAGE */}
        <div>
          <label className="block mb-2">Change Image</label>

          <input
            type="file"
            onChange={handleImage}
            className="w-full border p-3 rounded-lg"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>

      </form>
    </div>
  );
};

export default EditCategory;