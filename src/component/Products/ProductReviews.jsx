import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../../library/api";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  /*
    ==========================
    FETCH REVIEWS
    ==========================
    */

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/reviews/${productId}`);

      setReviews(res.data.data || []);
    } catch (error) {
      console.log(
        "Review loading error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  /*
    ==========================
    SUBMIT REVIEW
    ==========================
    */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a star rating");

      return;
    }

    if (!comment.trim()) {
      alert("Please write your comment");

      return;
    }

    try {
      setSubmitting(true);

      await api.post(`/reviews/${productId}`, {
        rating,
        comment,
      });

      alert("Review submitted successfully");

      setRating(0);

      setComment("");

      fetchReviews();
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(error.response?.data?.message || "Unable to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="
      max-w-6xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      md:p-10
      "
    >
      {/* HEADER */}

      <div className="mb-8">
        <h2
          className="
          text-2xl
          font-bold
          text-gray-900
          "
        >
          Customer Reviews
        </h2>

        <p className="text-gray-500">Share your experience with this product</p>
      </div>

      {/* WRITE REVIEW */}

      <form
        onSubmit={handleSubmit}
        className="
        bg-gray-50
        rounded-2xl
        p-5
        mb-10
        "
      >
        <h3
          className="
          font-semibold
          mb-4
          "
        >
          Rate this product
        </h3>

        {/* STAR SELECT */}

        <div
          className="
          flex
          gap-2
          mb-5
          "
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={30}
              onClick={() => setRating(star)}
              className={`
                cursor-pointer
                transition
                ${star <= rating ? "text-yellow-400" : "text-gray-300"}
                `}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          className="
          w-full
          border
          rounded-xl
          p-4
          outline-none
          focus:ring-2
          focus:ring-pink-400
          "
        />

        <button
          disabled={submitting}
          className="
          mt-4
          bg-[#ED017F]
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-pink-700
          transition
          "
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* REVIEW LIST */}

      {loading ? (
        <div className="text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div
          className="
            text-center
            py-8
            text-gray-500
            "
        >
          No reviews yet. Be the first to review this product.
        </div>
      ) : (
        <div
          className="
            space-y-5
            "
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className="
                  border
                  rounded-2xl
                  p-5
                  "
            >
              {/* USER */}

              <div
                className="
                    flex
                    justify-between
                    items-start
                    "
              >
                <div>
                  <h4
                    className="
                        font-semibold
                        "
                  >
                    {review.user?.firstName} {review.user?.lastName}
                  </h4>

                  <div className="flex mt-1">
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
                </div>

                <span
                  className="
                      text-xs
                      text-gray-400
                      "
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* COMMENT */}

              <p
                className="
                    mt-4
                    text-gray-600
                    leading-6
                    "
              >
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
