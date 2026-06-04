import Hero from "../../component/Home/Hero";
import FeaturedCategories from "../../component/Home/FeatureCategories";
import FlashSales from "../../component/Home/Flashsales";
import TrendingProducts from "../../component/Home/TrendingProducts";
import Categories from "../../component/Products/Categories";
import NewArrival from "../../component/Home/NewArrival";
import Newsletter from "../../component/Home/NewsLatter";
// import ProductByCategory from "../../component/Home/CategoryProduct";

const Home = () => {

  return (
    <div className="bg-gray-100 min-h-screen mt-12">

      <Categories />

      {/* HERO */}
      <Hero />

      {/* NEW ARRIVALS */}
      <NewArrival />

       {/* FLASH SALES */}
      <FlashSales/>

       {/* TRENDING */}
      <TrendingProducts />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories />

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
};

export default Home;