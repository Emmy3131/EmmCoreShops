import Categories from "../../component/Products/Categories";
import HeroBanner from "../../component/Products/HeroBanner";
import ProductGrid from "../../component/Products/ProductGrid";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-14">

      <Categories />
      <HeroBanner />
      <ProductGrid />

    </div>
  );
};

export default Home;