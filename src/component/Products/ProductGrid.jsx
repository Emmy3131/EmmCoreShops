import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: "Samsung Galaxy Phone",
    price: "850,000",
    image: "https://via.placeholder.com/300",
  }));

  return (
    <div className="px-3 mt-6 pb-24">

      <h2 className="font-semibold text-lg mb-3">
        Flash Deals
      </h2>

      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-3
      ">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductGrid;