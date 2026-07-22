import { useEffect, useState } from "react";

import api from "../../library/api";
import ProductSection from "../Products/ProductSection";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const res = await api.get(
          "/products/flash-sale"
        );

        setProducts(
          res.data?.data || []
        );
      } catch (error) {
        console.error(
          "Flash sales error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  return (
    <section className="bg-blue-50/50">

      <ProductSection
        eyebrow="Limited time"
        title="Flash Sales"
        subtitle="Limited-time deals you don't want to miss"
        products={products}
        loading={loading}
        viewAllLink="/deals"
        emptyMessage="There are no active flash sales right now."
      />

    </section>
  );
};

export default FlashSales;