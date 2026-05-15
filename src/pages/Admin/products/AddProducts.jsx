import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    rating: "",
    description: "",
    image: null,
  });

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    console.log("PRODUCT:", product);

    // 👉 API POST HERE
    // await api.post("/products", formData)

    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl font-bold">
          Add New Product
        </h1>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-6 max-w-4xl"
      >

        {/* PRODUCT NAME */}
        <div>
          <label className="block mb-1 font-medium">
            Product Name
          </label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
            placeholder="Nike Air Force"
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1 font-medium">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
              placeholder="₦50000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
              placeholder="50"
            />
          </div>

        </div>

        {/* CATEGORY + RATING */}
        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Shoes"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Rating (0 - 5)
            </label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={product.rating}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="4.5"
            />
          </div>

        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2 font-medium">
            Product Image
          </label>

          <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">

            <FaUpload className="text-2xl mb-2 text-gray-500" />

            <span className="text-sm text-gray-500">
              Click to upload image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Product details..."
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Save Product
          </button>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;