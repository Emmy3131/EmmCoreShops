import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const data = {
      name: "Electronics",
      description: "Phones and gadgets",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    };

    setCategory(data);
    setPreview(data.image);
  }, [id]);

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

    // API UPDATE HERE

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
          Edit Category
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5 max-w-2xl"
      >

        <input
          name="name"
          value={category.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={category.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* IMAGE */}
        <div>
          <label className="block mb-2">
            Change Image
          </label>

          <input
            type="file"
            onChange={handleImage}
            className="w-full border p-3 rounded-lg"
          />

          {preview && (
            <img
              src={preview}
              className="mt-3 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
          Update Category
        </button>

      </form>
    </div>
  );
};

export default EditCategory;