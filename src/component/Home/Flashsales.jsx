import ProductCard from "./ProductsCard";

const FlashSales = ({ products }) => {
  return (
    <div className="mx-auto py-10 px-4">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-red-600">
          Flash Sales
        </h2>

        <button className="text-pink-600 font-semibold">
          See All
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>
    </div>
  );
};

export default FlashSales;