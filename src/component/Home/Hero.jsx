import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../library/api";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  /* ================= FETCH HERO BANNERS ================= */
  const fetchHeroBanners = async () => {
    try {
      const res = await api.get("/hero-banners");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error("Hero error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroBanners();
  }, []);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-black via-black/95 to-black/90 text-white">

      {/* Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 items-center min-h-screen gap-10 transition-all duration-700">

          {/* LEFT CONTENT */}
          <div className="transition-all duration-700">

            <span className="inline-block bg-[#ED017F]/20 text-[#ED017F] px-4 py-2 rounded-full text-sm mb-6">
              🔥 Featured Deal
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {banner.title}
            </h1>

            <p className="mt-6 text-gray-300 text-lg">
              {banner.description}
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to={banner.link || "/products"}
                className="bg-[#ED017F] px-8 py-4 rounded-xl font-semibold hover:bg-pink-700 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="border border-white/20 bg-white/5 px-8 py-4 rounded-xl hover:bg-white/10 transition"
              >
                Explore
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full max-w-2xl object-contain drop-shadow-[0_30px_80px_rgba(237,1,127,0.35)] transition-all duration-700"
            />
          </div>

        </div>

        {/* CONTROLS */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6">

          <button
            onClick={prevSlide}
            className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            ←
          </button>

          <div className="flex gap-2 items-center">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current
                    ? "bg-[#ED017F] w-6"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
};

export default Hero;