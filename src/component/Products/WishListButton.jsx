
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../../library/api";
import { toast } from "react-toastify";

const WishlistButton = ({ productId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= CHECK WISHLIST ================= */


  useEffect(() => {
    if (!productId) {
      setIsSaved(false);
      return;
    }

    const checkWishlist = async () => {
      try {
        const res = await api.get(
          `/wishlist/check/${productId}`
        );

        // Backend returns isSaved at the top level
        setIsSaved(res.data?.isSaved === true);
      } catch (error) {
        console.error(
          "Wishlist check error:",
          error.response?.data || error.message
        );
      }
    };

    checkWishlist();
  }, [productId]);

  const handleWishlist = async () => {
    if (!productId || loading) return;

    try {
      setLoading(true);

      const res = await api.post("/wishlist/toggle", {
        productId,
      });

      if (res.data?.status !== "success") {
        toast.error("Unable to update wishlist");
        return;
      }

      // IMPORTANT: Your backend sends isSaved at the top level
      const saved = res.data.isSaved;

      if (typeof saved !== "boolean") {
        console.error("Unexpected wishlist response:", res.data);
        toast.error("Unexpected wishlist response");
        return;
      }

      setIsSaved(saved);

      if (saved) {
        toast.success("Product added to saved items");
      } else {
        toast.success("Product removed from saved items");
      }
    } catch (error) {
      console.error(
        "Wishlist toggle error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update wishlist"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={loading || !productId}
      aria-label={
        isSaved
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      aria-pressed={isSaved}
      title={
        isSaved
          ? "Remove from saved items"
          : "Save this product"
      }
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${isSaved
          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
          : "border-white/15 bg-white/10 text-white backdrop-blur-md hover:border-blue-400 hover:bg-blue-600 hover:text-white"
        }`}
    >
      <FaHeart
        size={17}
        className={`transition-transform duration-200 ${isSaved ? "scale-110" : ""
          }`}
      />
    </button>
  );
};

export default WishlistButton;
