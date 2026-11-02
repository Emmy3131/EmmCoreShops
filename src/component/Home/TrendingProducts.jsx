import { useEffect, useState } from "react";

import api from "../../library/api";
import ProductSection from "../Products/ProductSection";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await api.get(
          "/products/trending"
        );

        setProducts(
          res.data?.data || []
        );
      } catch (error) {
        console.error(
          "Trending products error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <ProductSection
      eyebrow="Popular right now"
      title="Trending Products"
      subtitle="What shoppers are loving right now"
      products={products}
      loading={loading}
      viewAllLink="/products"
      emptyMessage="No trending products available right now."
    />
  );
};

export default TrendingProducts;