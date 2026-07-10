import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaSave, FaBoxOpen, FaFire, FaBolt } from "react-icons/fa";

import api from "../../../library/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "",

    isTrending: false,

    isFlashSale: false,

    flashSalePrice: "",

    flashSaleEndAt: "",
  });

  /*
  ====================================
  FETCH CATEGORIES
  ====================================
  */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      if (res.data.status === "success") {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error("Category error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /*
  ====================================
  INPUT CHANGE
  ====================================
  */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  /*
  ====================================
  SUBMIT
  ====================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/products", formData);

      if (res.data.status === "success") {
        alert("Product created successfully");

        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed creating product");
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
to-emerald-700
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
          <div>
            <h1
              className="
text-3xl
font-bold
flex
items-center
gap-3
"
            >
              <FaBoxOpen />
              Add Product
            </h1>

            <p
              className="
text-white/80
mt-2
"
            >
              Create a new store product
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
            className="
bg-white
text-green-700
px-5
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
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
shadow
p-6
space-y-6
"
      >
        {/* IMAGE */}

        <div>
          <label
            className="
font-semibold
block
mb-2
"
          >
            Product Image URL
          </label>

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://image-url.com"
            className="
w-full
border
rounded-xl
p-3
"
          />
        </div>

        {/* NAME + CATEGORY */}

        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <div>
            <label>Product Name</label>

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
            <label>Category</label>

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
              <option>Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div>
          <label>Description</label>

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

        {/* PRICE */}

        <div
          className="
grid
md:grid-cols-3
gap-5
"
        >
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="
border
rounded-xl
p-3
"
          />

          <input
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            value={formData.oldPrice}
            onChange={handleChange}
            className="
border
rounded-xl
p-3
"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="
border
rounded-xl
p-3
"
          />
        </div>

        {/* OPTIONS */}

        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <label
            className="
flex
items-center
gap-3
border
p-4
rounded-xl
"
          >
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
            />
            <FaFire className="text-red-500" />
            Trending Product
          </label>

          <label
            className="
flex
items-center
gap-3
border
p-4
rounded-xl
"
          >
            <input
              type="checkbox"
              name="isFlashSale"
              checked={formData.isFlashSale}
              onChange={handleChange}
            />
            <FaBolt className="text-yellow-500" />
            Flash Sale
          </label>
        </div>

        {formData.isFlashSale && (
          <div
            className="
grid
md:grid-cols-2
gap-5
"
          >
            <input
              name="flashSalePrice"
              type="number"
              placeholder="Flash Sale Price"
              value={formData.flashSalePrice}
              onChange={handleChange}
              className="
border
rounded-xl
p-3
"
            />

            <input
              name="flashSaleEndAt"
              type="datetime-local"
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
font-bold
flex
items-center
gap-2
disabled:opacity-50
"
        >
          <FaSave />

          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
