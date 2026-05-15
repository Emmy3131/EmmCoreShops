import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();

  const [products] = useState([
    {
      id: 1,
      name: "Nike Air Force 1",
      price: 50000,
      stock: 10,
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1528701800489-20be3c5f0f8b",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      price: 850000,
      stock: 5,
      category: "Phones",
      image:
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    },
    {
      id: 3,
      name: "MacBook Pro",
      price: 1500000,
      stock: 3,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">

        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <h2 className="font-semibold text-lg">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm">
                Category: {product.category}
              </p>

              <p className="font-bold text-green-600">
                ₦{product.price.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                Stock: {product.stock}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center pt-3">

                <Link
                  to={`/admin/products/edit/${product.id}`}
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

export default Products;