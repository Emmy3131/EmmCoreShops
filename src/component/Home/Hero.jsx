import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../library/api";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHeroBanners = async () => {
    try {
      const res = await api.get("/heroes");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error("Hero banner fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ED017F] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Loading Hero Banner...</p>
        </div>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to EmmCoreShops
          </h1>

          <p className="text-gray-300 text-lg">
            Discover amazing deals and premium products.
          </p>
        </div>
      </div>
    );
  }

  const banner = banners[0];

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-br from-black via-black/95 to-black/90">

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#ED017F]/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[90vh] md:min-h-screen">

          {/* LEFT SIDE */}
          <div>

            <span className="inline-flex items-center bg-[#ED017F]/20 text-[#ED017F] border border-[#ED017F]/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🔥 Featured Collection
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              {banner.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {banner.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to={banner.link || "/products"}
                className="bg-[#ED017F] hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Explore Products
              </Link>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">

              <div>
                <h3 className="text-3xl font-bold text-white">
                  10K+
                </h3>
                <p className="text-gray-400">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  5K+
                </h3>
                <p className="text-gray-400">
                  Happy Buyers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  24/7
                </h3>
                <p className="text-gray-400">
                  Support
                </p>
              </div>

            </div>

            {/* Trust Box */}
            <div className="mt-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 max-w-lg">

              <div className="flex flex-col gap-2 text-gray-300">

                <span>✓ Secure Payments</span>

                <span>✓ Fast Nationwide Delivery</span>

                <span>✓ Genuine Products</span>

                <span>✓ Easy Returns</span>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center items-center">

            <img
              src={banner.image}
              alt={banner.title}
              className="
                w-full
                max-w-2xl
                object-contain
                drop-shadow-[0_30px_80px_rgba(237,1,127,0.35)]
                hover:scale-105
                transition-all
                duration-700
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;