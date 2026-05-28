import { useEffect, useState } from "react";
import api from "../../library/api";

import Hero from "../../component/Home/Hero";
import FeaturedCategories from "../../component/Home/FeatureCategories";
import FlashSales from "../../component/Home/Flashsales";
import TrendingProducts from "../../component/Home/TrendingProducts";
import { useAuth } from "../../Context/AuthContext";
import Categories from "../../component/Products/Categories";
import ProductGrid from "../../component/Products/ProductGrid";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      if(res.data.status === "success") {
        setProducts(res.data.data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/products/category/:category");

      if(res.data.status === "success") {
        setCategories(res.data.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ================= FILTERS ================= */

  const trendingProducts = products?.filter(
    (product) => product.isTrending
  ) || [];

  const flashSales = products?.filter(
    (product) => product.isFlashSale
  ) || [];

  return (
    <div className="bg-gray-100 min-h-screen mt-12">

      <Categories />

      {/* HERO */}
      <Hero />

      {/*Products */}
      <ProductGrid products={products} />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories categories={categories} />

      {/* FLASH SALES */}
      <FlashSales products={flashSales} />

      {/* TRENDING */}
      <TrendingProducts products={trendingProducts} />

    </div>
  );
};

export default Home;