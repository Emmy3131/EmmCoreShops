import {
  FaBolt,
  FaClock,
  FaFire,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../library/api";
import ProductSection from "../../component/Products/ProductSection";

const Deal = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashSales = async () => {
    try {
      const res = await api.get("/products/flash-sale");

      console.log("Flash Sale Response:", res.data);

      if (res.data.status === "success") {
        setDeals(res.data.data || []);
      }
    } catch (error) {
      console.error(
        "Error fetching flash sales:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-300/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* HERO CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5">
                <FaBolt className="text-yellow-300" />

                <span className="text-sm font-semibold">
                  LIMITED TIME OFFERS
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Flash Deals
                <span className="block text-cyan-200">
                  You Can't Miss
                </span>
              </h1>

              <p className="mt-5 text-blue-100 text-base md:text-lg max-w-xl">
                Get incredible products at unbeatable prices.
                These deals won't last forever.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#flash-deals"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                  <FaFire />
                  Shop Deals
                </a>

                <div className="flex items-center gap-2 text-blue-100">
                  <FaClock />

                  <span className="text-sm">
                    Limited availability
                  </span>
                </div>
              </div>
            </div>

            {/* HERO STATS */}
            <div className="lg:flex justify-end">
              <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <p className="text-3xl font-black">
                    {deals.length}
                  </p>

                  <p className="text-blue-100 text-sm mt-1">
                    Active Deals
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <p className="text-3xl font-black">
                    HOT
                  </p>

                  <p className="text-blue-100 text-sm mt-1">
                    Limited Offers
                  </p>
                </div>

                <div className="col-span-2 bg-white text-slate-900 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FaBolt />
                    </div>

                    <div>
                      <p className="font-bold">
                        Don't wait too long
                      </p>

                      <p className="text-sm text-slate-500">
                        Popular products sell out fast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FaTruck />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Fast Delivery
                </p>

                <p className="text-xs text-slate-500">
                  Get your orders quickly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <FaShieldAlt />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Secure Shopping
                </p>

                <p className="text-xs text-slate-500">
                  Shop with confidence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <FaFire />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Hot Deals
                </p>

                <p className="text-xs text-slate-500">
                  Prices you'll love
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FLASH SALES PRODUCT SECTION
      ====================================================== */}
      <section
        id="flash-deals"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14"
      >
        <ProductSection
          eyebrow="Limited time only"
          title="Today's Flash Deals"
          subtitle="Grab these deals before they disappear."
          products={deals}
          loading={loading}
          viewAllLink="/deals"
          emptyMessage="No Flash Deals Available. Check back later for exciting new offers."
        />
      </section>
    </div>
  );
};

export default Deal;