import { FaBolt, FaShoppingCart } from "react-icons/fa";

const Deal = () => {
  const deals = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 25000,
      oldPrice: 40000,
      discount: 38,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 45000,
      oldPrice: 60000,
      discount: 25,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 18000,
      oldPrice: 30000,
      discount: 40,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: 9000,
      oldPrice: 15000,
      discount: 35,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-2 pt-8">
      {/* HERO SECTION */}
      <div className="bg-red-600 text-white px-4 md:px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
            <FaBolt /> Flash Deals
          </h1>
          <p className="text-sm md:text-base">
            Limited time offers — grab them fast!
          </p>
        </div>

        <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-lg">
          View All
        </button>
      </div>

      {/* DEAL PRODUCTS GRID */}
      <div className="px-4 md:px-10 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 md:h-48 object-cover rounded"
                />

                {/* DISCOUNT BADGE */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  -{item.discount}%
                </span>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-3 flex-1">
                <h2 className="text-sm md:text-base font-semibold line-clamp-2">
                  {item.name}
                </h2>

                <p className="text-red-600 font-bold mt-1">
                  ₦{item.price.toLocaleString()}
                </p>

                <p className="text-gray-400 text-sm line-through">
                  ₦{item.oldPrice.toLocaleString()}
                </p>
              </div>

              {/* ADD TO CART */}
              <button className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deal;