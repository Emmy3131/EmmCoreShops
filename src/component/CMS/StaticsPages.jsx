import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../library/api";

const StaticPage = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPage = async () => {
    try {
      const res = await api.get(`/pages/slug/${slug}`);

      if (res.data.status === "success") {
        setPage(res.data.data);
      }
    } catch (error) {
      console.error("Page error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading page...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-10 text-center">
        Page not found
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-100">

    {/* HERO SECTION */}
    <section className="relative mt-16 overflow-hidden">
      <div className="bg-gradient-to-r from-[#ED017F] via-purple-700 to-indigo-900 h-[300px] md:h-[400px] flex items-center justify-center">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            {page.title}
          </h1>

          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Learn more about EmmCoreShops and everything you need to know.
          </p>
        </div>
      </div>
    </section>

    {/* CONTENT SECTION */}
    <section className="relative -mt-20 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-6
          md:p-12
          border
          border-gray-100
        ">

          <div
            className="
              prose
              prose-lg
              max-w-none
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-li:text-gray-700
              prose-strong:text-black
            "
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          />

        </div>

      </div>
    </section>

  </div>
);
};

export default StaticPage;