import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../library/api";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => navigate("/admin/category/add")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              className="h-40 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <h2 className="text-lg font-bold">
                {cat.name}
              </h2>

              <p className="text-gray-500 text-sm">
                {cat.description}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between pt-3">

                <Link
                  to={`/admin/category/edit/${cat._id}`}
                  className="flex items-center gap-1 text-blue-600 text-sm"
                >
                  <FaEdit />
                  Edit
                </Link>

                <button onClick={() => handleDelete(cat._id)} className="flex items-center gap-1 text-red-500 text-sm">
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Categories;