import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setCategory({ ...category, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(category);

    // API POST HERE

    navigate("/admin/categories");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h1 className="text-2xl font-bold">
          Add Category
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5 max-w-2xl"
      >

        <input
          name="name"
          placeholder="Category Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* IMAGE */}
        <div>
          <label className="block mb-2 font-medium">
            Category Image
          </label>

          <label className="border-dashed border-2 p-6 flex flex-col items-center rounded-lg cursor-pointer">
            <FaUpload />
            <p className="text-sm text-gray-500">
              Upload Image
            </p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </label>

          {preview && (
            <img
              src={preview}
              className="mt-3 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full">
          Save Category
        </button>

      </form>
    </div>
  );
};

export default AddCategory;