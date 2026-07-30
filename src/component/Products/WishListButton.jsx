import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../../library/api";
import {toast} from 'react-toastify'

const WishlistButton = ({ productId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= CHECK WISHLIST ================= */
  useEffect(() => {
    if (!productId) return;

    const checkWishlist = async () => {
      try {
        const res = await api.get(`/wishlist/check/${productId}`);

        setIsSaved(res.data?.data?.isSaved || false);
      } catch (error) {
        console.error(
          "Wishlist check error:",
          error.response?.data || error.message
        );
      }
    };

    checkWishlist();
  }, [productId]);

  /* ================= TOGGLE WISHLIST ================= */
  const handleWishlist = async () => {
    if (!productId || loading) return;

    try {
      setLoading(true);

      const res = await api.post("/wishlist/toggle", {
        productId,
      });

      if (res.data?.status === "success") {
        setIsSaved(res.data?.data);

        console.log("Wishlist:", res.data.data);
         toast.success("Product liked successfully 👋");
      }
    } catch (error) {
      console.error(
        "Wishlist toggle error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={loading}
      aria-label={
        isSaved
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isSaved
          ? "bg-red-50 text-red-500"
          : "bg-white text-slate-400 hover:text-red-500"
      }`}
    >
      <FaHeart
        className={`transition-all duration-300 ${
          isSaved ? "fill-current scale-110" : ""
        }`}
      />
    </button>
  );
};

export default WishlistButton;