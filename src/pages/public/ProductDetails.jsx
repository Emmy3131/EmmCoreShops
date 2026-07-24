import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductDetailsCard from "../../component/Products/ProductDetailsCard";
import ProductReviews from "../../component/Products/ProductReviews";


import api from "../../library/api";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  /*
  ===============================
  FETCH PRODUCT
  ===============================
  */

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products/${id}`
      );

      if (
        res.data?.status === "success"
      ) {
        setProduct(res.data.data);
      }
    } catch (error) {
      console.error(
        "Fetch product error:",
        error.response?.data ||
        error.message
      );
    } finally {
      setLoading(false);
    }
  };



  const handleBuyNow = async (quantity = 1) => {
    const success =
      await handleAddToCart(quantity);

    if (success) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  /*
  ===============================
  ADD TO CART
  ===============================
  */

  const handleAddToCart = async (quantity = 1) => {
    if (!product?._id) {
      return false;
    }

    try {
      setCartLoading(true);

      const res = await api.post("/cart", {
        productId: product._id,
        quantity,
      });

      if (res.data?.status === "success") {
        return true;
      }

      return false;
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );

      return false;
    } finally {
      setCartLoading(false);
    }
  };

  /*
  ===============================
  SCROLL TO REVIEWS
  ===============================
  */

  const scrollToReviews = () => {
    const reviewSection =
      document.getElementById(
        "reviews"
      );

    if (reviewSection) {
      reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /*
  ===============================
  LOADING
  ===============================
  */

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-50
        "
      >
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              mx-auto
              mb-3
              rounded-full
              border-4
              border-blue-100
              border-t-blue-600
              animate-spin
            "
          />

          <p className="text-sm text-slate-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  /*
  ===============================
  NOT FOUND
  ===============================
  */

  if (!product) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-50
        "
      >
        <div className="text-center">
          <h2
            className="
              text-xl
              font-bold
              text-slate-800
            "
          >
            Product not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This product may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-3
        py-6
        sm:px-5
        md:px-8
        lg:px-12
      "
    >
      {/* PRODUCT INFORMATION */}

      <ProductDetailsCard
        product={product}
        loading={cartLoading}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onReviewClick={scrollToReviews}
      />

      {/* REVIEWS */}

      <ProductReviews
        productId={product._id}
      />
    </main>
  );
};

export default ProductDetails;