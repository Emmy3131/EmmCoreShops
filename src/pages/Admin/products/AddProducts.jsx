import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaBoxOpen,
  FaFire,
  FaBolt,
  FaTags,
  FaWarehouse,
  FaMoneyBillWave,
} from "react-icons/fa";

import api from "../../../library/api";
import ProductImageInput from "../../../component/ProductImageInput";

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
    imagePublicId: "",

    isTrending: false,

    isFlashSale: false,

    flashSalePrice: "",

    flashSaleEndAt: "",
  });

  /* =====================================================
     FETCH CATEGORIES
  ===================================================== */

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      if (res.data.status === "success") {
        setCategories(res.data.data || []);
      }
    } catch (error) {
      console.error("Category error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to load categories"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (image) => {
    setFormData((prev) => ({
      ...prev,
      image,
    }));
  };

  const handleImagePublicIdChange = (imagePublicId) => {
    setFormData((prev) => ({
      ...prev,
      imagePublicId,
    }));
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please add a product image.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Please enter the product name.");
      return;
    }

    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (
      formData.isFlashSale &&
      (!formData.flashSalePrice ||
        Number(formData.flashSalePrice) <= 0)
    ) {
      alert("Please enter a valid flash sale price.");
      return;
    }

    if (
      formData.isFlashSale &&
      !formData.flashSaleEndAt
    ) {
      alert("Please select the flash sale end date and time.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,

        price: Number(formData.price),

        oldPrice:
          formData.oldPrice === ""
            ? 0
            : Number(formData.oldPrice),

        stock: Number(formData.stock),

        flashSalePrice:
          formData.isFlashSale &&
            formData.flashSalePrice !== ""
            ? Number(formData.flashSalePrice)
            : 0,

        flashSaleEndAt:
          formData.isFlashSale &&
            formData.flashSaleEndAt
            ? new Date(
              formData.flashSaleEndAt
            ).toISOString()
            : null,
      };

      const res = await api.post(
        "/products",
        payload
      );

      if (res.data.status === "success") {
        alert("Product created successfully.");

        navigate("/admin/products");
      }
    } catch (error) {
      console.error(
        "Create product error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed creating product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-8
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          via-cyan-600
          to-sky-600
          p-6
          text-white
          shadow-xl
          md:p-8
        "
      >
        <div className="flex flex-wrap items-center justify-between gap-5">

          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <FaBoxOpen className="text-2xl" />
              </div>

              <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider">
                Product Management
              </span>
            </div>

            <h1 className="text-3xl font-black md:text-4xl">
              Add Product
            </h1>

            <p className="mt-2 text-sm text-white/80 md:text-base">
              Create a new product for your EmmCoreShops store.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              font-bold
              text-blue-600
              shadow-lg
              transition
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            <FaArrowLeft />
            Back to Products
          </button>

        </div>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          max-w-6xl
          space-y-6
        "
      >

        {/* =====================================================
            IMAGE CARD
        ===================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-100
            bg-white
            p-5
            shadow-sm
            md:p-7
          "
        >
          <ProductImageInput
            value={formData.image}
            onChange={handleImageChange}
            onPublicIdChange={handleImagePublicIdChange}
          />
        </section>

        {/* =====================================================
            BASIC INFORMATION
        ===================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-100
            bg-white
            p-5
            shadow-sm
            md:p-7
          "
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaBoxOpen />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Product Information
              </h2>

              <p className="text-xs text-slate-500">
                Basic information about your product
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Product Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Infinix Smart 10"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the product..."
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />
          </div>
        </section>

        {/* =====================================================
            PRICING & STOCK
        ===================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-100
            bg-white
            p-5
            shadow-sm
            md:p-7
          "
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaMoneyBillWave />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Pricing & Inventory
              </h2>

              <p className="text-xs text-slate-500">
                Set product pricing and available stock
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Selling Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="150000"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Old Price
              </label>

              <input
                name="oldPrice"
                type="number"
                min="0"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="180000"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Stock
              </label>

              <input
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="20"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

          </div>
        </section>

        {/* =====================================================
            PRODUCT OPTIONS
        ===================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-100
            bg-white
            p-5
            shadow-sm
            md:p-7
          "
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FaTags />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Store Options
              </h2>

              <p className="text-xs text-slate-500">
                Control how this product appears in your store
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <label
              className={`
                flex
                cursor-pointer
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition
                ${formData.isTrending
                  ? "border-orange-200 bg-orange-50"
                  : "border-slate-200 bg-white"
                }
              `}
            >
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-500"
              />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <FaFire />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Trending Product
                </p>

                <p className="text-xs text-slate-500">
                  Show this product in trending products
                </p>
              </div>
            </label>

            <label
              className={`
                flex
                cursor-pointer
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition
                ${formData.isFlashSale
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-slate-200 bg-white"
                }
              `}
            >
              <input
                type="checkbox"
                name="isFlashSale"
                checked={formData.isFlashSale}
                onChange={handleChange}
                className="h-5 w-5 accent-yellow-500"
              />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <FaBolt />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Flash Sale
                </p>

                <p className="text-xs text-slate-500">
                  Add this product to flash sales
                </p>
              </div>
            </label>

          </div>

          {/* FLASH SALE SETTINGS */}

          {formData.isFlashSale && (
            <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50/50 p-5">

              <h3 className="mb-4 font-bold text-slate-800">
                Flash Sale Settings
              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Flash Sale Price
                  </label>

                  <input
                    name="flashSalePrice"
                    type="number"
                    min="0"
                    value={formData.flashSalePrice}
                    onChange={handleChange}
                    placeholder="120000"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      outline-none
                      focus:border-yellow-500
                      focus:ring-4
                      focus:ring-yellow-500/10
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Flash Sale Ends
                  </label>

                  <input
                    name="flashSaleEndAt"
                    type="datetime-local"
                    value={formData.flashSaleEndAt}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      outline-none
                      focus:border-yellow-500
                      focus:ring-4
                      focus:ring-yellow-500/10
                    "
                  />
                </div>

              </div>
            </div>
          )}
        </section>

        {/* =====================================================
            SUBMIT
        ===================================================== */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-600
              px-8
              py-4
              font-black
              text-white
              shadow-lg
              shadow-blue-500/20
              transition
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FaSave />

            {loading
              ? "Creating Product..."
              : "Create Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;