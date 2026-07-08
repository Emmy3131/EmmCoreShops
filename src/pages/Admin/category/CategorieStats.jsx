import {
  FaFolderOpen,
  FaCheckCircle,
  FaBoxOpen,
  FaEyeSlash,
} from "react-icons/fa";
import api from "../../../library/api";

const CategoryStats = ({ categories }) => {

  const total = categories.length;

  const active = categories.filter(
    (c) => c.status !== "inactive"
  ).length;

  const hidden = total - active;

  const totalProducts = categories.reduce(
    (sum, cat) => sum + (cat.products?.length || 0),
    0
  );

  const stats = [
    {
      title: "Categories",
      value: total,
      icon: <FaFolderOpen />,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Active",
      value: active,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: <FaBoxOpen />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Hidden",
      value: hidden,
      icon: <FaEyeSlash />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stat.value}
              </h2>

            </div>

            <div
              className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-xl`}
            >
              {stat.icon}
            </div>

          </div>
        </div>

      ))}

    </div>
  );
};

export default CategoryStats;