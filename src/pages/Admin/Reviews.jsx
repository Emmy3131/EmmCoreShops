import { useState } from "react";
import { FaStar, FaTrash, FaEye } from "react-icons/fa";

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      user: "John Doe",
      product: "iPhone 14 Pro",
      rating: 5,
      comment: "Amazing product, very fast delivery!",
      date: "2026-05-10",
    },
    {
      id: 2,
      user: "Mary Smith",
      product: "Samsung Galaxy S23",
      rating: 4,
      comment: "Good phone but battery could be better.",
      date: "2026-05-08",
    },
  ]);

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Reviews</h1>

        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-4">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 md:p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >

            {/* TOP SECTION */}
            <div className="flex justify-between items-start gap-3">

              <div>
                <h2 className="font-semibold text-gray-800">
                  {review.user}
                </h2>
                <p className="text-xs text-gray-500">
                  Product: {review.product}
                </p>
                <p className="text-xs text-gray-400">
                  {review.date}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 text-gray-500">
                <button className="hover:text-blue-500">
                  <FaEye />
                </button>

                <button className="hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* STARS */}
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* COMMENT */}
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {review.comment}
            </p>

            {/* FOOTER */}
            <div className="flex justify-end mt-4">
              <button className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-600">
                Mark as Reviewed
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Reviews;