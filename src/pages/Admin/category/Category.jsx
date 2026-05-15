import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const navigate = useNavigate();

  const [categories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Phones, laptops and gadgets",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing and accessories",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Home appliances and utensils",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    },
  ]);

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
            key={cat.id}
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
                  to={`/admin/category/edit/${cat.id}`}
                  className="flex items-center gap-1 text-blue-600 text-sm"
                >
                  <FaEdit />
                  Edit
                </Link>

                <button className="flex items-center gap-1 text-red-500 text-sm">
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