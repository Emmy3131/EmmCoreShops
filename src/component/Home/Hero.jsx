import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaChevronRight,
} from "react-icons/fa";

import api from "../../library/api";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  /* =====================================================
      FETCH HERO BANNERS
  ====================================================== */
  const fetchHeroBanners = async () => {
    try {
      const res = await api.get("/hero-banners");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error(
        "Hero error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroBanners();
  }, []);

  /* =====================================================
      AUTO SLIDE
  ====================================================== */
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  /* =====================================================
      NAVIGATION
  ====================================================== */
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

  /* =====================================================
      LOADING
  ====================================================== */
  if (loading) {
    return (
      <section className="min-h-[650px] md:min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-400">
            Loading amazing deals...
          </p>
        </div>
      </section>
    );
  }

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative min-h-[650px] md:min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blue glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full" />

        {/* Cyan glow */}
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-500/15 blur-[140px] rounded-full" />

        {/* Bottom glow */}
        <div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />

        {/* Grid effect */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 items-center min-h-[650px] md:min-h-screen gap-10 lg:gap-20">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div
            key={`content-${current}`}
            className="animate-[fadeIn_0.7s_ease-in-out]"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaBolt className="text-yellow-300" />

              <span>
                Featured Deal
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">

              {banner.title}

            </h1>

            {/* Description */}
            <p className="mt-6 text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">

              {banner.description}

            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">

              <Link
                to={banner.link || "/products"}
                className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 md:px-8 py-3.5 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20"
              >
                Shop Now

                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products"
                className="group inline-flex items-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold transition"
              >
                Explore Products

                <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

            {/* Small Trust Details */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-slate-400">

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

                <span>
                  Limited-time offer
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full" />

                <span>
                  Fast delivery available
                </span>
              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}

          <div
            key={`image-${current}`}
            className="relative flex items-center justify-center animate-[fadeIn_0.8s_ease-in-out]"
          >

            {/* Image glow */}
            <div className="absolute w-[70%] h-[70%] bg-blue-500/20 blur-[100px] rounded-full" />

            {/* Glass container */}
            <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 md:p-8">

              {/* Top badge */}
              <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                <FaBolt className="text-yellow-300" />

                HOT DEAL
              </div>

              {/* Product Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="relative z-10 w-full max-h-[420px] md:max-h-[550px] object-contain drop-shadow-[0_30px_80px_rgba(37,99,235,0.45)] transition-all duration-700 hover:scale-105"
              />

              {/* Bottom glass label */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">

                <div>
                  <p className="text-xs text-slate-400">
                    Featured product
                  </p>

                  <p className="font-semibold text-sm md:text-base truncate max-w-[200px]">
                    {banner.title}
                  </p>
                </div>

                <FaBolt className="text-yellow-300" />

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SLIDER CONTROLS
        ====================================================== */}

        {banners.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-5">

            {/* Previous */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition"
            >
              <FaArrowLeft />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">

              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-blue-500"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}

            </div>

            {/* Next */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition"
            >
              <FaArrowRight />
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default Hero;