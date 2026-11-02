
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaGamepad,
  FaClock,
  FaBolt,
  FaTags,
  FaShoppingBag,
  FaStar,
  FaTruck,
} from "react-icons/fa";
import api from "../../library/api";

const categories = [
  { name: "Smartphones", icon: FaMobileAlt, link: "/shop?category=smartphones" },
  { name: "Computers", icon: FaLaptop, link: "/shop?category=computers" },
  { name: "Accessories", icon: FaHeadphones, link: "/shop?category=accessories" },
  { name: "Gaming", icon: FaGamepad, link: "/shop?category=gaming" },
  { name: "Smart Watches", icon: FaClock, link: "/shop?category=watches" },
  { name: "Flash Deals", icon: FaBolt, link: "/shop?flashSale=true" },
  { name: "Best Sellers", icon: FaStar, link: "/shop?trending=true" },
  { name: "All Products", icon: FaShoppingBag, link: "/shop" },
];

const promotions = [
  {
    title: "Smart Deals",
    subtitle: "Technology at better prices",
    icon: FaBolt,
    link: "/shop",
    style: "from-blue-600 to-cyan-500",
  },
  {
    title: "Accessories",
    subtitle: "Upgrade your everyday tech",
    icon: FaHeadphones,
    link: "/shop",
    style: "from-indigo-700 to-blue-500",
  },
  {
    title: "Shop More",
    subtitle: "Discover new arrivals",
    icon: FaTags,
    link: "/shop",
    style: "from-cyan-700 to-teal-500",
  },
  {
    title: "Fast Delivery",
    subtitle: "Get your orders delivered",
    icon: FaTruck,
    link: "/shop",
    style: "from-slate-700 to-slate-500",
  },
];

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/hero-banners");
        const data = res.data?.data || [];
        setBanners(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Hero banners:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const banner = banners[current];

  return (
    <section className="w-full bg-[#05070D] py-3 sm:py-5">
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-7">

        {/* =========================================
            MAIN MARKETPLACE GRID
        ========================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-[180px_minmax(0,1fr)_180px] gap-3">

          {/* LEFT PROMOTIONAL SIDEBAR */}

          <aside className="hidden xl:flex flex-col gap-3">

            {/* <Link
              to="/shop"
              className="relative flex-1 min-h-[175px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 p-4 flex flex-col justify-between group"
            >
              <FaBolt className="text-3xl text-white/70" />

              <div>
                <p className="text-xs uppercase tracking-widest text-blue-100">
                  EmmCore Deals
                </p>
                <h3 className="text-2xl font-black text-white leading-tight">
                  TECH
                  <br />
                  SAVINGS
                </h3>
              </div>

              <FaArrowRight className="absolute bottom-4 right-4 text-white group-hover:translate-x-1 transition" />
            </Link> */}

            {/* <Link
              to="/shop"
              className="relative flex-1 min-h-[175px] overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-700 to-purple-950 p-4 flex flex-col justify-between group"
            >
              <FaTags className="text-3xl text-white/70" />

              <div>
                <p className="text-xs uppercase tracking-widest text-pink-100">
                  Special offers
                </p>
                <h3 className="text-3xl font-black text-white leading-tight">
                  BIG
                  <br />
                  DEALS
                </h3>
              </div>

              <span className="text-xs font-bold text-white/80">
                SHOP NOW →
              </span>
            </Link> */}

          </aside>

          {/* CENTER CONTENT */}

          <div className="min-w-0">

            {/* MAIN HERO SLIDER */}

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#102B54] via-[#07182E] to-[#030A14] min-h-[340px] sm:min-h-[400px] lg:min-h-[390px]">

              {/* Background decoration */}

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[90px]" />
                <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-blue-600/20 blur-[90px]" />

                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "35px 35px",
                  }}
                />
              </div>

              {loading ? (
                <div className="relative z-10 flex min-h-[340px] items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400" />
                </div>
              ) : banner ? (
                <div
                  key={banner._id || current}
                  className="relative z-10 grid min-h-[340px] sm:min-h-[400px] lg:min-h-[390px] grid-cols-1 md:grid-cols-2 items-center"
                >

                  {/* TEXT */}

                  <div className="relative z-10 px-5 pt-8 pb-3 sm:px-9 sm:pt-10 md:py-12 lg:px-12">

                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300">
                      <FaBolt />
                      EmmCore Special Offer
                    </span>

                    <h1 className="mt-5 max-w-xl text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black leading-[1.08] tracking-tight text-white">
                      {banner.title || "Discover More. Shop Smarter."}
                    </h1>

                    <p className="mt-4 max-w-md text-sm sm:text-base leading-7 text-slate-300">
                      {banner.description ||
                        "Explore quality smartphones, gadgets and accessories at EmmCoreShops."}
                    </p>

                    <Link
                      to={banner.link}
                      className="mt-6 inline-flex items-center gap-3 rounded-lg bg-cyan-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-white hover:-translate-y-0.5"
                    >
                      {banner.buttonText || "Shop Now"}
                      <FaArrowRight />
                    </Link>

                  </div>

                  {/* BANNER IMAGE */}

                  <div className="relative flex min-h-[190px] sm:min-h-[230px] md:min-h-[320px] items-center justify-center px-5 pb-14 md:py-8">

                    <div className="absolute h-[75%] w-[75%] rounded-full bg-cyan-400/10 blur-3xl" />

                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title || "EmmCore promotion"}
                        className="relative z-10 max-h-[210px] sm:max-h-[280px] md:max-h-[330px] w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                      />
                    ) : (
                      <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
                        <FaShoppingBag className="text-7xl text-cyan-300" />
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex min-h-[340px] items-center px-6 sm:px-12">
                  <div className="max-w-lg">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                      Welcome to EmmCoreShops
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl font-black text-white">
                      Your Tech. Your Style. Your Store.
                    </h1>
                    <p className="mt-4 text-slate-300">
                      Shop smartphones, gadgets and accessories.
                    </p>
                    <Link
                      to="/shop"
                      className="mt-6 inline-flex items-center gap-3 rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950"
                    >
                      Explore Shop <FaArrowRight />
                    </Link>
                  </div>
                </div>
              )}

              {/* SLIDER CONTROLS */}

              {banners.length > 1 && (
                <>
                  <button
                    onClick={previousSlide}
                    aria-label="Previous banner"
                    className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-cyan-400 hover:text-black"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next banner"
                    className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-cyan-400 hover:text-black"
                  >
                    <FaChevronRight />
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                    {banners.map((item, index) => (
                      <button
                        key={item._id || index}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to banner ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          current === index
                            ? "w-9 bg-cyan-400"
                            : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* SMALL PROMOTIONAL TILES */}

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">

              {promotions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.link}
                    className={`relative flex min-h-[105px] sm:min-h-[145px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${item.style} p-3 sm:p-4 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/30`}
                  >
                    <Icon className="text-xl sm:text-2xl text-white/80" />

                    <div className="relative z-10">
                      <h3 className="text-sm sm:text-base font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] sm:text-xs text-white/75">
                        {item.subtitle}
                      </p>
                    </div>

                    <Icon className="absolute -right-3 -top-2 text-7xl text-white/10" />
                  </Link>
                );
              })}

            </div>

          </div>

          {/* RIGHT PROMOTIONAL SIDEBAR */}

          <aside className="hidden xl:flex flex-col gap-3">

            {/* <Link
              to="/shop"
              className="flex-1 min-h-[175px] rounded-xl border border-white/10 bg-gradient-to-br from-[#122D4D] to-[#081321] p-4 flex flex-col justify-between"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                EmmCore Rewards
              </span>

              <div>
                <h3 className="text-2xl font-black text-white">
                  Shop & Save
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Find great products and offers.
                </p>
              </div>

              <span className="text-xs font-bold text-cyan-300">
                DISCOVER MORE →
              </span>
            </Link> */}

            {/* <Link
              to="/shop"
              className="flex-1 min-h-[175px] rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-4 flex flex-col justify-between"
            >
              <FaStar className="text-3xl text-white/80" />

              <div>
                <h3 className="text-2xl font-black text-white">
                  New Arrivals
                </h3>
                <p className="mt-2 text-xs text-blue-50">
                  Discover the latest technology.
                </p>
              </div>

              <span className="text-xs font-bold text-white">
                SHOP NOW →
              </span>
            </Link> */}

          </aside>

        </div>

        {/* =========================================
            CATEGORY NAVIGATION
        ========================================= */}

        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-xl">

          <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-3">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                Explore Categories
              </h2>
              <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500">
                Find what you need, all in one place
              </p>
            </div>

            <Link
              to="/shop"
              className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-cyan-600"
            >
              View all <FaArrowRight />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 py-4 sm:py-5 scrollbar-hide snap-x">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={category.link}
                  className="group flex w-[105px] sm:w-[125px] flex-shrink-0 snap-start flex-col items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50"
                >
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="text-2xl sm:text-3xl" />
                  </div>

                  <span className="text-center text-[11px] sm:text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                    {category.name}
                  </span>
                </Link>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
