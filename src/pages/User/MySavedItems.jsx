import { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const MySavedItems = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: "Apple AirPods Pro",
      price: "₦185,000",
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231658",
    },
    {
      id: 2,
      name: "Samsung 55'' Smart TV Ultra HD Crystal Display",
      price: "₦520,000",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    },
  ]);

  const removeItem = (id) => {
    setSavedItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Saved Items
        </h1>

        <span className="text-sm text-gray-500">
          {savedItems.length} items
        </span>
      </div>

      {/* EMPTY STATE */}
      {savedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <FaHeart size={40} />
          <p className="mt-4">No saved items yet</p>
        </div>
      ) : (

        /* PRODUCT GRID */
        <div className="grid grid-cols-2 gap-4 p-4">

          {savedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                >
                  <FaTrash className="text-red-500 text-sm" />
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-3">

                {/* TITLE WITH TOOLTIP */}
                <div className="relative group">

                  <h2 className="text-sm font-medium truncate w-24">
                    {item.name}
                  </h2>

                  {/* FULL TEXT ON HOVER */}
                  <div className="absolute left-0 top-full mt-2 
                                  hidden group-hover:block 
                                  bg-black text-white text-xs 
                                  p-2 rounded shadow-lg 
                                  w-max max-w-[200px] z-50">
                    {item.name}
                  </div>

                </div>

                {/* PRICE */}
                <p className="text-[#ED017F] font-bold mt-1">
                  {item.price}
                </p>

                {/* ACTION BUTTON */}
                <button className="mt-3 w-full bg-[#ED017F] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                  <FaShoppingCart />
                  Move to Cart
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MySavedItems;