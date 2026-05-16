import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log("Fetch categories response:", res.data);
      setCategories(res.data.data);
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

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/categories", form);

      if (res.data.status === "success") {
        alert("Category added successfully");

        setForm({
          name: "",
          description: "",
          image: "",
        });
        navigate("/admin/category");
        fetchCategories(); // refresh dropdown
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-blue-600" />
        <h2 className="text-2xl font-bold text-white">Add Category</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Category Name"
            className="w-full border p-3 rounded-lg"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
          />

          {/* IMAGE URL */}
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* ================= CATEGORY DROPDOWN ================= */}

      <div className="mt-8 bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">Existing Categories</h3>

        <select className="w-full border p-3 rounded-lg">
          <option>Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddCategory;
