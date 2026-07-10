import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../library/api";

import { FaSave, FaArrowLeft, FaBox } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",

    oldPrice: "",

    isTrending: false,

    isFlashSale: false,

    flashSalePrice: "",

    flashSaleEndAt: "",
  });

  /* ================= FETCH PRODUCT ================= */

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const product = res.data.data;

      setFormData({
        image: product.image || "",

        name: product.name || "",

        description: product.description || "",

        price: product.price || "",

        category: product.category?._id || product.category || "",

        stock: product.stock || "",

        oldPrice: product.oldPrice || "",

        isTrending: product.isTrending || false,

        isFlashSale: product.isFlashSale || false,

        flashSalePrice: product.flashSalePrice || "",

        flashSaleEndAt: product.flashSaleEndAt
          ? product.flashSaleEndAt.slice(0, 10)
          : "",
      });
    } catch (error) {
      console.log("Fetch product error", error);
    }
  };

  /* ================= FETCH CATEGORY ================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();

    fetchCategories();
  }, []);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.patch(`/products/${id}`, formData);

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

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
bg-gradient-to-r
from-green-600
via-emerald-600
to-teal-700
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
flex-wrap
gap-4
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <FaBox className="text-4xl" />

            <h1
              className="
text-3xl
font-bold
"
            >
              Edit Product
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
            className="
bg-white
text-green-700
px-5
py-3
rounded-xl
font-semibold
flex
items-center
gap-2
"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
bg-white
rounded-3xl
shadow-lg
p-6
space-y-6
"
      >
        {/* IMAGE */}

        <div>
          <label className="font-semibold">Image URL</label>

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="
w-full
border
rounded-xl
p-3
"
          />
        </div>

        {/* NAME PRICE */}

        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <div>
            <label className="font-semibold">Product Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label className="font-semibold">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>
        </div>

        {/* CATEGORY */}

        <div>
          <label className="font-semibold">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
w-full
border
rounded-xl
p-3
"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="font-semibold">Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="
w-full
border
rounded-xl
p-3
"
          />
        </div>

        {/* STOCK OLD PRICE */}

        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <div>
            <label>Stock</label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Old Price</label>

            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="
w-full
border
rounded-xl
p-3
"
            />
          </div>
        </div>

        {/* OPTIONS */}

        <div
          className="
flex
gap-8
flex-wrap
"
        >
          <label
            className="
flex
gap-2
items-center
"
          >
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
            />
            Trending
          </label>

          <label
            className="
flex
gap-2
items-center
"
          >
            <input
              type="checkbox"
              name="isFlashSale"
              checked={formData.isFlashSale}
              onChange={handleChange}
            />
            Flash Sale
          </label>
        </div>

        {/* FLASH SALE */}

        {formData.isFlashSale && (
          <div
            className="
grid
md:grid-cols-2
gap-5
"
          >
            <input
              type="number"
              name="flashSalePrice"
              value={formData.flashSalePrice}
              onChange={handleChange}
              placeholder="Flash Sale Price"
              className="
border
rounded-xl
p-3
"
            />

            <input
              type="date"
              name="flashSaleEndAt"
              value={formData.flashSaleEndAt}
              onChange={handleChange}
              className="
border
rounded-xl
p-3
"
            />
          </div>
        )}

        <button
          disabled={loading}
          className="
bg-green-600
text-white
px-8
py-3
rounded-xl
font-semibold
flex
items-center
gap-2
disabled:opacity-50
"
        >
          <FaSave />

          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
