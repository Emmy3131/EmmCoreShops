import {
  FaBox,
  FaFire,
  FaBolt,
  FaWarehouse,
} from "react-icons/fa";

const ProductStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Products",
      value: stats.total || 0,
      icon: <FaBox />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Trending",
      value: stats.trending || 0,
      icon: <FaFire />,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Flash Sale",
      value: stats.flashSale || 0,
      icon: <FaBolt />,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Total Stock",
      value: stats.totalStock || 0,
      icon: <FaWarehouse />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 text-white shadow-lg`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80 text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className="text-5xl opacity-40">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;