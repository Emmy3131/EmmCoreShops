
import { useEffect, useState, useCallback } from "react";

import {
  FaStar,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

import api from "../../library/api";

import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  /*
  =========================================
  FETCH ALL REVIEWS
  =========================================
  */

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/reviews");

      if (res.data.status === "success") {
        // Supports either an array or a nested reviews array.
        const reviewData =
          res.data.data?.reviews ||
          res.data.data ||
          [];

        setReviews(Array.isArray(reviewData) ? reviewData : []);
      } else {
        toast.error(res.data.message || "Unable to fetch reviews");
      }
    } catch (error) {
      console.error("FETCH REVIEWS ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  /*
  =========================================
  APPROVE REVIEW
  =========================================
  */

  const approveReview = async (id) => {
    if (!id || processingId) return;

    try {
      setProcessingId(id);

      // IMPORTANT: This URL matches the backend route.
      const res = await api.patch(`/reviews/${id}/approve`);

      if (res.data.status === "success") {
        toast.success(res.data.message || "Review approved successfully");

        await fetchReviews();

        setSelectedReview((current) =>
          current?._id === id
            ? { ...current, status: "approved" }
            : current
        );
      } else {
        toast.error(res.data.message || "Could not approve review");
      }
    } catch (error) {
      console.error("APPROVE REVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to approve review"
      );
    } finally {
      setProcessingId(null);
    }
  };

  /*
  =========================================
  REJECT REVIEW
  =========================================
  */

  const rejectReview = async (id) => {
    if (!id || processingId) return;

    try {
      setProcessingId(id);

      // IMPORTANT: This URL matches the backend route.
      const res = await api.patch(`/reviews/${id}/reject`);

      if (res.data.status === "success") {
        toast.success(res.data.message || "Review rejected successfully");

        await fetchReviews();

        setSelectedReview((current) =>
          current?._id === id
            ? { ...current, status: "rejected" }
            : current
        );
      } else {
        toast.error(res.data.message || "Could not reject review");
      }
    } catch (error) {
      console.error("REJECT REVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to reject review"
      );
    } finally {
      setProcessingId(null);
    }
  };

  /*
  =========================================
  DELETE REVIEW
  =========================================
  */

  const deleteReview = async (id) => {
    if (!id || processingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this review?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(id);

      const res = await api.delete(`/reviews/${id}`);

      if (res.data.status === "success") {
        toast.success(res.data.message || "Review deleted successfully");

        setReviews((previous) =>
          previous.filter((review) => review._id !== id)
        );

        setSelectedReview((current) =>
          current?._id === id ? null : current
        );
      } else {
        toast.error(res.data.message || "Could not delete review");
      }
    } catch (error) {
      console.error("DELETE REVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete review"
      );
    } finally {
      setProcessingId(null);
    }
  };

  /*
  =========================================
  SEARCH REVIEWS
  =========================================
  */

  const filteredReviews = reviews.filter((review) => {
    const user = [
      review.user?.firstName || "",
      review.user?.lastName || "",
    ]
      .join(" ")
      .toLowerCase();

    const product = review.product?.name?.toLowerCase() || "";
    const comment = review.comment?.toLowerCase() || "";
    const status = review.status?.toLowerCase() || "";

    const value = search.trim().toLowerCase();

    return (
      user.includes(value) ||
      product.includes(value) ||
      comment.includes(value) ||
      status.includes(value)
    );
  });

  /*
  =========================================
  STATUS STYLES
  =========================================
  */

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /*
  =========================================
  RENDER
  =========================================
  */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">

      <PageHeader
        title="Product Reviews"
        subtitle="Manage customer feedback and ratings"
      />

      {/* REVIEW SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Total Reviews</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {reviews.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Pending Reviews</p>

          <h2 className="text-2xl font-bold text-yellow-600 mt-2">
            {reviews.filter((review) => review.status === "pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Approved Reviews</p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {reviews.filter((review) => review.status === "approved").length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

        <div className="relative w-full md:w-96">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by customer, product, comment or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          onClick={fetchReviews}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <FaSyncAlt className={loading ? "animate-spin" : ""} />
          Refresh
        </button>

      </div>

      {/* CONTENT */}

      {loading ? (
        <div className="bg-white rounded-xl p-6">
          <PageLoader text="Loading reviews..." />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500">
          <FaStar className="text-3xl mx-auto mb-3 text-gray-300" />

          <p className="font-medium">No reviews found</p>

          <p className="text-sm mt-1">
            Try changing your search or check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">

          {filteredReviews.map((review) => {
            const isProcessing = processingId === review._id;

            return (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >

                {/* HEADER */}

                <div className="flex justify-between items-start gap-3">

                  <div className="min-w-0">

                    <h2 className="font-semibold text-gray-800">
                      {review.user?.firstName || "Unknown"}{" "}
                      {review.user?.lastName || ""}
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Product: {review.product?.name || "Product unavailable"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>

                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full capitalize whitespace-nowrap ${getStatusStyle(
                      review.status
                    )}`}
                  >
                    {review.status || "unknown"}
                  </span>

                </div>

                {/* STARS */}

                <div className="flex mt-3 gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Number(review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                  <span className="text-xs text-gray-500 ml-2">
                    ({review.rating || 0}/5)
                  </span>

                </div>

                {/* COMMENT */}

                <p className="text-gray-600 text-sm mt-3 whitespace-pre-wrap break-words">
                  {review.comment || "No comment provided"}
                </p>

                {/* ACTIONS */}

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">

                  <button
                    onClick={() => setSelectedReview(review)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                    View
                  </button>

                  <div className="flex gap-3">

                    {review.status !== "approved" && (
                      <button
                        onClick={() => approveReview(review._id)}
                        disabled={Boolean(processingId)}
                        title="Approve review"
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 disabled:opacity-40"
                      >
                        {isProcessing ? (
                          <FaSyncAlt className="animate-spin" />
                        ) : (
                          <FaCheck />
                        )}

                        <span className="hidden sm:inline">Approve</span>
                      </button>
                    )}

                    {review.status !== "rejected" && (
                      <button
                        onClick={() => rejectReview(review._id)}
                        disabled={Boolean(processingId)}
                        title="Reject review"
                        className="flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-800 disabled:opacity-40"
                      >
                        <FaTimes />
                        <span className="hidden sm:inline">Reject</span>
                      </button>
                    )}

                    <button
                      onClick={() => deleteReview(review._id)}
                      disabled={Boolean(processingId)}
                      title="Delete review"
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 disabled:opacity-40"
                    >
                      <FaTrash />
                      <span className="hidden sm:inline">Delete</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* VIEW MODAL */}

      {selectedReview && (
        <div
          onClick={() => setSelectedReview(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="font-bold text-xl text-gray-800">
                Review Details
              </h2>

              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FaTimes />
              </button>

            </div>

            <div className="space-y-3 text-sm">

              <p>
                <b>User:</b>{" "}
                {selectedReview.user?.firstName || "Unknown"}{" "}
                {selectedReview.user?.lastName || ""}
              </p>

              <p>
                <b>Product:</b>{" "}
                {selectedReview.product?.name || "Product unavailable"}
              </p>

              <p>
                <b>Rating:</b> {selectedReview.rating || 0}/5
              </p>

              <p>
                <b>Status:</b>{" "}
                <span className="capitalize">
                  {selectedReview.status || "unknown"}
                </span>
              </p>

              <div>
                <b>Comment:</b>

                <p className="mt-2 text-gray-600 whitespace-pre-wrap break-words">
                  {selectedReview.comment || "No comment provided"}
                </p>
              </div>

            </div>

            <button
              onClick={() => setSelectedReview(null)}
              className="mt-6 w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-black transition"
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
