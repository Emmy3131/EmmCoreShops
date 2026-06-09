import { useEffect, useState } from "react";
import api from "../../library/api";
import { Link } from "react-router-dom";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await api.get("/hero-banners");

      if (res.data.status === "success") {
        setBanners(res.data.data || []);
      }
    } catch (error) {
      console.error("Hero fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // fallback UI
  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-pink-600 text-white">
        Loading hero...
      </div>
    );
  }

  // if no banners
  if (!banners.length) {
    return (
      <div className="w-full bg-pink-600 text-white p-10 flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Welcome to EmmCoreShops
        </h1>
      </div>
    );
  }

  // use first banner (you can later turn this into slider)
  const banner = banners[0];

  return (
    <div
      className="w-full h-[400px] bg-cover bg-center flex items-center px-6 md:px-20 text-white"
      style={{
        backgroundImage: `url(${banner.image})`,
      }}
    >
      {/* overlay */}
      <div className="bg-black/40 p-6 md:p-10 rounded-lg max-w-xl">
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {banner.title}
        </h1>

        <p className="text-sm md:text-lg mb-6">
          {banner.description}
        </p>

        <Link
          to={banner.link || "/"}
          className="bg-white text-pink-600 px-6 py-3 rounded-lg font-bold inline-block"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;