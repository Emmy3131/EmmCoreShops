import { useState, useEffect } from "react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [product, setProduct] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      // backend structure: { status, results, data: [] }
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= SUBMIT PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/products", product);

      if (res.data.status === "success") {
        alert("Product created successfully ✅");

        // reset form
        setProduct({
          image: "",
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        });

        setPreview("");
        navigate("/admin/products");
      }
    } catch (err) {
      console.error("Create product error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

 
  /* ================= UI ================= */
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
        Add New Product
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

          {/* NAME */}
          <div>
            <label className="font-medium">Product Name</label>
            <input
              type="text"
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

          {/* CATEGORY DROPDOWN */}
          <div>
            <label className="font-medium">Category</label>
            <select
              name="category"
              value={product.category}
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

          {/* IMAGE */}
          <div className="md:col-span-2">
            <label className="font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
              className="border p-3 w-full rounded-lg"
              placeholder="Paste image URL"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="md:col-span-2">
              <p className="font-medium mb-2">Image Preview</p>
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
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              rows="4"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;