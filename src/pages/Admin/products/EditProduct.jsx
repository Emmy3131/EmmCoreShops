import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    rating: "",
    image: null,
    preview: "",
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    // 🔥 Replace with API call
    const fetchedProduct = {
      name: "Sample Product",
      price: "20000",
      stock: "5",
      category: "Electronics",
      description: "Demo product",
      rating: "4.5",
      image:
        "https://via.placeholder.com/300x200.png?text=Product+Image",
    };

    setProduct({
      ...fetchedProduct,
      preview: fetchedProduct.image,
    });
  }, [id]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];

    setProduct({
      ...product,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Product:", product);

    // PUT/PATCH API HERE

    navigate("/admin/products");
  };

  /* ================= UI ================= */
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-3 rounded-full shadow hover:bg-gray-100"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-2xl font-bold">
          Edit Product
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg grid md:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-4">

          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating (0 - 5)"
            className="border p-3 w-full rounded-lg"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={5}
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6">

          {product.preview ? (
            <img
              src={product.preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="text-gray-400 text-center mb-4">
              No Image Selected
            </div>
          )}

          <label className="cursor-pointer bg-gray-100 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <FaUpload />
            Change Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </label>
        </div>

        {/* BUTTONS */}
        <div className="md:col-span-2 flex gap-4 justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Update Product
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProduct;