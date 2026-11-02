import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSave,
  FaArrowLeft,
  FaBox,
  FaFire,
  FaBolt,
  FaTags,
  FaMoneyBillWave,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import api from "../../../library/api";

const initialForm = {
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
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const labelClass = "mb-2 block text-sm font-bold text-slate-700";
const cardClass = "rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-7";

const formatDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [existingImage, setExistingImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    let active = true;

    const loadPage = async () => {
      setFetching(true);
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);

        if (!active) return;

        const product = productResponse.data?.data;
        if (!product) throw new Error("Product not found");

        setExistingImage(product.image || "");
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          category: product.category?._id || product.category || "",
          stock: product.stock ?? "",
          isTrending: Boolean(product.isTrending),
          isFlashSale: Boolean(product.isFlashSale),
          flashSalePrice: product.flashSalePrice ?? "",
          flashSaleEndAt: formatDateTimeLocal(product.flashSaleEndAt),
        });
        setCategories(categoryResponse.data?.data || []);
      } catch (error) {
        console.error("Load product edit page error:", error);
        if (active) {
          window.alert(error.response?.data?.message || error.message || "Unable to load product.");
          navigate("/admin/products");
        }
      } finally {
        if (active) setFetching(false);
      }
    };

    if (id) loadPage();
    else setFetching(false);

    return () => {
      active = false;
    };
  }, [id, navigate]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      window.alert("Choose a JPEG, PNG, WebP, or GIF image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) return window.alert("Please enter the product name.");
    if (formData.description.trim().length < 10) return window.alert("Description must contain at least 10 characters.");
    if (!formData.category) return window.alert("Please select a category.");
    if (formData.price === "" || Number(formData.price) <= 0) return window.alert("Please enter a valid product price.");
    if (formData.stock === "" || Number(formData.stock) < 0) return window.alert("Please enter a valid stock quantity.");

    if (formData.isFlashSale) {
      if (formData.flashSalePrice === "" || Number(formData.flashSalePrice) <= 0) {
        return window.alert("Please enter a valid flash sale price.");
      }
      if (Number(formData.flashSalePrice) >= Number(formData.price)) {
        return window.alert("Flash sale price must be lower than the selling price.");
      }
      if (!formData.flashSaleEndAt || Number.isNaN(new Date(formData.flashSaleEndAt).getTime())) {
        return window.alert("Please select a valid flash sale end date and time.");
      }
    }

    const payload = new FormData();
    // Do not append an image unless a replacement file was selected.
    // This keeps the current database image when editing other fields.
    if (imageFile) payload.append("image", imageFile);

    payload.append("name", formData.name.trim());
    payload.append("description", formData.description.trim());
    payload.append("price", String(Number(formData.price)));
    payload.append("oldPrice", String(formData.oldPrice === "" ? 0 : Number(formData.oldPrice)));
    payload.append("category", formData.category);
    payload.append("stock", String(Number(formData.stock)));
    payload.append("isTrending", String(formData.isTrending));
    payload.append("isFlashSale", String(formData.isFlashSale));
    payload.append("flashSalePrice", String(formData.isFlashSale ? Number(formData.flashSalePrice) : 0));
    payload.append(
      "flashSaleEndAt",
      formData.isFlashSale ? new Date(formData.flashSaleEndAt).toISOString() : "",
    );

    try {
      setLoading(true);
      const response = await api.patch(`/products/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.status === "success") {
        window.alert("Product updated successfully.");
        navigate("/admin/products");
      } else {
        window.alert("The product could not be updated. Please try again.");
      }
    } catch (error) {
      console.error("Update product error:", error);
      window.alert(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-40 rounded-3xl bg-slate-200" />
          <div className="h-72 rounded-3xl bg-white shadow-sm" />
          <div className="h-64 rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><FaBox className="text-2xl" /></div>
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider">Product Management</span>
            </div>
            <h1 className="text-3xl font-black md:text-4xl">Edit Product</h1>
            <p className="mt-2 text-sm text-white/80 md:text-base">Update product details, pricing, inventory and image.</p>
          </div>
          <button type="button" onClick={() => navigate("/admin/products")} className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-600 shadow-lg transition hover:-translate-y-0.5">
            <FaArrowLeft /> Back to Products
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-6">
        <section className={cardClass}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FaImage /></div>
            <div>
              <h2 className="font-bold text-slate-800">Product Image</h2>
              <p className="text-xs text-slate-500">Choose a new image to replace the current one. Maximum 5 MB.</p>
            </div>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
            {(imagePreview || existingImage) ? (
              <img src={imagePreview || existingImage} alt="Product preview" className="mb-4 h-56 max-w-full rounded-xl object-contain" />
            ) : (
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600"><FaImage /></div>
            )}
            <span className="font-bold text-slate-700">{imageFile ? imageFile.name : "Choose replacement image"}</span>
            <span className="mt-1 text-sm text-slate-500">Leave unchanged to keep the current image</span>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} className="sr-only" />
          </label>
          {imageFile && (
            <button type="button" onClick={() => setImageFile(null)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
              <FaTimes /> Cancel image replacement
            </button>
          )}
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FaBox /></div>
            <div><h2 className="font-bold text-slate-800">Product Information</h2><p className="text-xs text-slate-500">Update the basic product information</p></div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Product Name</label>
              <input name="name" value={formData.name} onChange={handleChange} minLength={3} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required className={inputClass}>
                <option value="">Select Category</option>
                {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label className={labelClass}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} minLength={10} rows={5} required className={`${inputClass} resize-y`} />
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><FaMoneyBillWave /></div>
            <div><h2 className="font-bold text-slate-800">Pricing & Inventory</h2><p className="text-xs text-slate-500">Manage price and available quantity</p></div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div><label className={labelClass}>Selling Price (₦)</label><input type="number" min="0.01" step="0.01" name="price" value={formData.price} onChange={handleChange} required className={inputClass} /></div>
            <div><label className={labelClass}>Old Price (₦)</label><input type="number" min="0" step="0.01" name="oldPrice" value={formData.oldPrice} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Stock Quantity</label><input type="number" min="0" step="1" name="stock" value={formData.stock} onChange={handleChange} required className={inputClass} /></div>
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><FaTags /></div>
            <div><h2 className="font-bold text-slate-800">Store Options</h2><p className="text-xs text-slate-500">Manage visibility and promotions</p></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${formData.isTrending ? "border-orange-200 bg-orange-50" : "border-slate-200"}`}>
              <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="h-5 w-5 accent-orange-500" />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500"><FaFire /></span>
              <span><span className="block font-bold text-slate-800">Trending Product</span><span className="text-xs text-slate-500">Display in trending products</span></span>
            </label>
            <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${formData.isFlashSale ? "border-yellow-200 bg-yellow-50" : "border-slate-200"}`}>
              <input type="checkbox" name="isFlashSale" checked={formData.isFlashSale} onChange={handleChange} className="h-5 w-5 accent-yellow-500" />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600"><FaBolt /></span>
              <span><span className="block font-bold text-slate-800">Flash Sale</span><span className="text-xs text-slate-500">Add product to flash sales</span></span>
            </label>
          </div>

          {formData.isFlashSale && (
            <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50/50 p-5">
              <h3 className="mb-4 font-bold text-slate-800">Flash Sale Settings</h3>
              <div className="grid gap-5 md:grid-cols-2">
                <div><label className={labelClass}>Flash Sale Price (₦)</label><input type="number" min="0.01" step="0.01" name="flashSalePrice" value={formData.flashSalePrice} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>Flash Sale Ends</label><input type="datetime-local" name="flashSaleEndAt" value={formData.flashSaleEndAt} onChange={handleChange} required className={inputClass} /></div>
              </div>
            </div>
          )}
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" onClick={() => navigate("/admin/products")} className="rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-600 transition hover:bg-slate-50">Cancel</button>
          <button type="submit" disabled={loading} className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
            <FaSave /> {loading ? "Uploading & Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
