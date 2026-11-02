import { useEffect, useState } from "react";

import { FaStar, FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa";

import api from "../../library/api";

import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);

  /*
  ================================
  FETCH REVIEWS
  ================================
  */

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await api.get("/reviews");
      if (res.data.status === "success") {
        setReviews(res.data.data || []);
      }
    } catch (error) {
      console.error("FETCH REVIEWS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /*
  ================================
  APPROVE REVIEW
  ================================
  */

  const approveReview = async (id) => {
    try {
      await api.patch(`/reviews/approve/${id}`);

      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  /*
  ================================
  REJECT REVIEW
  ================================
  */

  const rejectReview = async (id) => {
    try {
      await api.patch(`/reviews/reject/${id}`);

      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  /*
  ================================
  DELETE REVIEW
  ================================
  */

  const deleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);

      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  /*
  ================================
  SEARCH
  ================================
  */

  const filteredReviews = reviews.filter((review) => {
    const user = `${review.user?.firstName || ""}
      ${review.user?.lastName || ""}`.toLowerCase();

    const product = review.product?.name?.toLowerCase() || "";

    const comment = review.comment?.toLowerCase() || "";

    const value = search.toLowerCase();

    return (
      user.includes(value) || product.includes(value) || comment.includes(value)
    );
  });

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-6
space-y-6
"
    >
      <PageHeader
        title="Product Reviews"
        subtitle="Manage customer feedback and ratings"
      />

      {/* SEARCH */}

      <div
        className="
bg-white
rounded-xl
shadow
p-4
"
      >
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
w-full
md:w-96
px-4
py-2
border
rounded-lg
outline-none
focus:ring-2
focus:ring-pink-500
"
        />
      </div>

      {/* CONTENT */}

      {loading ? (
        <div
          className="
bg-white
rounded-xl
p-6
"
        >
          <PageLoader text="Loading reviews..." />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div
          className="
bg-white
rounded-xl
p-8
text-center
text-gray-500
"
        >
          No reviews found
        </div>
      ) : (
        <div
          className="
grid
gap-4
"
        >
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="
bg-white
rounded-2xl
shadow-sm
p-5
hover:shadow-md
transition
"
            >
              {/* HEADER */}

              <div
                className="
flex
justify-between
items-start
gap-3
"
              >
                <div>
                  <h2
                    className="
font-semibold
text-gray-800
"
                  >
                    {review.user?.firstName} {review.user?.lastName}
                  </h2>

                  <p
                    className="
text-xs
text-gray-500
"
                  >
                    Product: {review.product?.name}
                  </p>

                  <p
                    className="
text-xs
text-gray-400
"
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS */}

                <span
                  className={`
text-xs
px-3
py-1
rounded-full

${review.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : review.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }

`}
                >
                  {review.status}
                </span>
              </div>

              {/* STARS */}

              <div
                className="
flex
mt-3
gap-1
"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* COMMENT */}

              <p
                className="
text-gray-600
text-sm
mt-3
"
              >
                {review.comment}
              </p>

              {/* ACTIONS */}

              <div
                className="
flex
justify-between
items-center
mt-5
"
              >
                <button
                  onClick={() => setSelectedReview(review)}
                  className="
text-blue-600
hover:text-blue-800
"
                >
                  <FaEye />
                </button>

                <div
                  className="
flex
gap-3
"
                >
                  <button
                    onClick={() => approveReview(review._id)}
                    className="
text-green-600
hover:text-green-800
"
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() => rejectReview(review._id)}
                    className="
text-yellow-600
hover:text-yellow-800
"
                  >
                    <FaTimes />
                  </button>

                  <button
                    onClick={() => deleteReview(review._id)}
                    className="
text-red-600
hover:text-red-800
"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}

      {selectedReview && (
        <div
          className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
p-4
"
        >
          <div
            className="
bg-white
rounded-2xl
max-w-md
w-full
p-6
"
          >
            <h2
              className="
font-bold
text-xl
mb-3
"
            >
              Review Details
            </h2>

            <p>
              <b>User:</b> {selectedReview.user?.firstName}{" "}
              {selectedReview.user?.lastName}
            </p>

            <p>
              <b>Product:</b> {selectedReview.product?.name}
            </p>

            <p className="mt-3">{selectedReview.comment}</p>

            <button
              onClick={() => setSelectedReview(null)}
              className="
mt-5
bg-black
text-white
px-4
py-2
rounded-lg
"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
