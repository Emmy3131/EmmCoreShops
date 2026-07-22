import { useEffect, useState } from "react";

import api from "../../library/api";
import ProductSection from "../Products/ProductSection";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get(
          "/products/new-arrivals"
        );

        setProducts(
          res.data?.data || []
        );
      } catch (error) {
        console.error(
          "New arrivals error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <ProductSection
      eyebrow="Fresh picks"
      title="New Arrivals"
      subtitle="Fresh products just added to our store"
      products={products}
      loading={loading}
      viewAllLink="/products"
      emptyMessage="No new arrivals available right now."
    />
  );
};

export default NewArrival;