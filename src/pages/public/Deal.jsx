import { FaBolt, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../../library/api";

const Deal = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashSales = async () => {
    try {
      const res = await api.get("/products/flash-sale");

      console.log("Flash Sale Response:", res.data);

      if (res.data.status === "success") {
        setDeals(res.data.data || []);
      }
    } catch (error) {
      console.error(
        "Error fetching flash sales:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-lg font-semibold">
          Loading Flash Deals...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-6 pt-8">
      {/* HERO SECTION */}
      <div className="bg-red-600 text-white px-4 md:px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
            <FaBolt />
            Flash Deals
          </h1>

          <p className="text-sm md:text-base">
            Limited time offers — grab them fast!
          </p>
        </div>

        <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-lg">
          View All
        </button>
      </div>

      {/* EMPTY STATE */}
      {deals.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-700">
            No Flash Sale Products Available
          </h2>

          <p className="text-gray-500 mt-2">
            Check back later for exciting deals.
          </p>
        </div>
      ) : (
        <div className="px-4 md:px-10 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {deals.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={
                      item.image ||
                      item.images?.[0]?.url ||
                      "/placeholder-product.png"
                    }
                    alt={item.name}
                    className="w-full h-36 md:h-48 object-cover rounded"
                  />

                  {/* DISCOUNT BADGE */}
                  {item.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      -{item.discount}%
                    </span>
                  )}

                  {/* FLASH SALE BADGE */}
                  <span className="absolute top-2 right-2 bg-yellow-400 text-red-700 text-xs font-bold px-2 py-1 rounded">
                    FLASH SALE
                  </span>
                </div>

                {/* PRODUCT INFO */}
                <div className="mt-3 flex-1">
                  <h2 className="text-sm md:text-base font-semibold line-clamp-2">
                    {item.name}
                  </h2>

                  {/* FLASH SALE PRICE */}
                  <p className="text-red-600 font-bold text-lg mt-1">
                    ₦
                    {item.flashSalePrice?.toLocaleString() || "0"}
                  </p>

                  {/* OLD PRICE */}
                  {item.oldPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      ₦{item.oldPrice.toLocaleString()}
                    </p>
                  )}

                  {/* SALE END DATE */}
                  {item.flashSaleEndAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Sale ends:{" "}
                      {new Date(
                        item.flashSaleEndAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* ADD TO CART */}
                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition">
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deal;