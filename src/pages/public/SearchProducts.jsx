import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../library/api";
import ProductCard from "../../component/Products/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/products/search?keyword=${keyword}`
        );

        setProducts(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  return (
    <div className="mx-auto p-5 mt-5">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{keyword}"
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;