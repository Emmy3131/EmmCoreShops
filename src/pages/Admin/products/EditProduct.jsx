import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../library/api";
import { FaArrowLeft } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const data = res.data.data;

      setProduct({
        name: data.name || "",
        price: data.price || "",
        stock: data.stock || "",
        image: data.image || "",
        description: data.description || "",
        category: data.category?._id || "",
      });

      setPreview(data.image);
    } catch (err) {
      console.error("Fetch product error:", err);
    }
  };

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchProduct(), fetchCategories()]);
      setPageLoading(false);
    };

    init();
  }, [id]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setPreview(value);
    }
  };

  /* ================= UPDATE PRODUCT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ CLEAN PAYLOAD FOR BACKEND
      const payload = {
        name: product.name.trim(),
        price: Number(product.price),
        stock: Number(product.stock),
        category: product.category,
        image: product.image,
        description: product.description,
      };

      const res = await api.patch(`/products/${id}`, payload);

      if (res.data.status === "success") {
        alert("Product updated successfully ✅");
        navigate("/admin/products");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 grid md:grid-cols-2 gap-5"
      >
        {/* NAME */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-medium">Category</label>

          <select
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            required
            className="border p-3 w-full rounded-lg"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* STOCK */}
        <div>
          <label className="font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* IMAGE URL */}
        <div className="md:col-span-2">
          <label className="font-medium">Image URL</label>
          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="md:col-span-2">
            <p className="font-medium mb-2">Preview</p>
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;