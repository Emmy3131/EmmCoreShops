import Hero from "../../component/Home/Hero";
import FeaturedCategories from "../../component/Home/FeatureCategories";
import FlashSales from "../../component/Home/Flashsales";
import TrendingProducts from "../../component/Home/TrendingProducts";
import Categories from "../../component/Products/Categories";
import NewArrival from "../../component/Home/NewArrival";

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen mt-8 lg:mt-0">

      {/* CATEGORIES */}
      <Categories />

      {/* HERO */}
      <Hero />

      {/* NEW ARRIVALS */}
      <NewArrival />

      {/* FLASH SALES */}
      <FlashSales />

      {/* TRENDING */}
      <TrendingProducts />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories />

    </div>
  );
};

export default Home;