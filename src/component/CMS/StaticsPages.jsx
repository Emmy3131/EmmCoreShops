import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowUp,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";

import api from "../../library/api";

const StaticPage = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  /* =====================================================
     FETCH CMS PAGE
  ===================================================== */

  const fetchPage = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/pages/slug/${slug}`);

      if (res.data.status === "success") {
        setPage(res.data.data);
      } else {
        setPage(null);
      }
    } catch (error) {
      console.error("Page error:", error);
      setPage(null);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FETCH PAGE WHEN SLUG CHANGES
  ===================================================== */

  useEffect(() => {
    fetchPage();

    // Always start CMS pages at the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);

  /* =====================================================
     BACK TO TOP VISIBILITY
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     SCROLL TO TOP
  ===================================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="text-center">
          {/* Logo Loader */}
          <div className="relative mx-auto w-16 h-16 mb-5">
            <div className="absolute inset-0 rounded-2xl bg-blue-600 animate-ping opacity-20" />

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
              <FaFileAlt className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800">
            Loading page
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Please wait a moment...
          </p>

          <div className="mt-5 w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full w-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     PAGE NOT FOUND
  ===================================================== */

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-100" />

            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">
              <FaFileAlt className="text-white text-3xl" />
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            404 Error
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Page Not Found
          </h1>

          <p className="text-slate-500 mt-4 leading-relaxed">
            The page you are looking for may have been moved, deleted,
            or is currently unavailable.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              mt-7
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-semibold
              shadow-lg
              shadow-blue-200
              hover:shadow-xl
              hover:-translate-y-0.5
              transition-all
            "
          >
            <FaHome />
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden">
        {/* Main gradient */}
        <div
          className="
            relative
            min-h-[360px]
            sm:min-h-[420px]
            md:min-h-[500px]
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-cyan-900
            flex
            items-center
          "
        >
          {/* Grid background */}
          <div
            className="
              absolute
              inset-0
              opacity-20
            "
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "45px 45px",
            }}
          />

          {/* Glow 1 */}
          <div
            className="
              absolute
              -top-32
              -right-20
              w-72
              h-72
              sm:w-96
              sm:h-96
              bg-cyan-400/20
              rounded-full
              blur-3xl
            "
          />

          {/* Glow 2 */}
          <div
            className="
              absolute
              -bottom-40
              -left-20
              w-80
              h-80
              sm:w-[450px]
              sm:h-[450px]
              bg-blue-600/25
              rounded-full
              blur-3xl
            "
          />

          {/* Decorative circles */}
          <div
            className="
              absolute
              top-20
              right-[15%]
              w-3
              h-3
              bg-cyan-300
              rounded-full
              shadow-[0_0_25px_rgba(103,232,249,0.9)]
            "
          />

          <div
            className="
              absolute
              bottom-28
              left-[12%]
              w-2
              h-2
              bg-blue-300
              rounded-full
              shadow-[0_0_20px_rgba(147,197,253,0.9)]
            "
          />

          {/* Hero content */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-7xl
              mx-auto
              px-5
              sm:px-8
              lg:px-12
              py-20
            "
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/60 mb-7">
              <Link
                to="/"
                className="hover:text-cyan-300 transition-colors"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-white/80">
                {page.section || "Information"}
              </span>
            </div>

            {/* Section badge */}
            <div className="flex justify-center mb-5">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-md
                  text-cyan-300
                  text-xs
                  sm:text-sm
                  font-semibold
                  uppercase
                  tracking-widest
                "
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

                {page.section || "EmmCoreShops"}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                text-center
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-black
                tracking-tight
                text-white
                leading-[1.05]
                max-w-5xl
                mx-auto
              "
            >
              {page.title}
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                text-center
                text-sm
                sm:text-base
                md:text-lg
                text-blue-100/75
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >
              {page.metaDescription ||
                "Everything you need to know about EmmCoreShops."}
            </p>

            {/* Bottom indicator */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="w-8 h-px bg-white/20" />
                <span>Explore this page</span>
                <span className="w-8 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT AREA
      ================================================= */}

      <main className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto -mt-16 sm:-mt-20 relative z-20">
          {/* Content card */}
          <article
            className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              border
              border-slate-200
              shadow-[0_20px_70px_rgba(15,23,42,0.10)]
              overflow-hidden
            "
          >
            {/* Card top accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

            {/* Article header */}
            <div
              className="
                px-5
                sm:px-8
                md:px-12
                pt-7
                sm:pt-9
                pb-5
                border-b
                border-slate-100
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <FaFileAlt />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-blue-600">
                    EmmCoreShops
                  </p>

                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {page.section || "Information"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actual CMS content */}
            <div
              className="
                px-5
                sm:px-8
                md:px-12
                py-8
                sm:py-10
                md:py-14

                prose
                prose-sm
                sm:prose-base
                md:prose-lg

                max-w-none

                prose-headings:font-extrabold
                prose-headings:text-slate-900

                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h3:text-xl

                prose-headings:tracking-tight

                prose-p:text-slate-600
                prose-p:leading-8

                prose-li:text-slate-600
                prose-li:leading-7

                prose-strong:text-slate-900

                prose-a:text-blue-600
                prose-a:font-semibold
                prose-a:no-underline
                hover:prose-a:text-cyan-600

                prose-blockquote:border-blue-500
                prose-blockquote:bg-blue-50
                prose-blockquote:rounded-r-xl
                prose-blockquote:px-5
                prose-blockquote:py-2

                prose-img:rounded-2xl
                prose-img:shadow-lg

                prose-table:border
                prose-table:border-slate-200

                prose-th:bg-slate-50
                prose-th:text-slate-800

                prose-td:text-slate-600
              "
              dangerouslySetInnerHTML={{
                __html: page.content,
              }}
            />

            {/* Article footer */}
            <div
              className="
                px-5
                sm:px-8
                md:px-12
                py-6
                border-t
                border-slate-100
                bg-slate-50/70
              "
            >
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                "
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Need more help?
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Explore more pages or return to EmmCoreShops.
                  </p>
                </div>

                <Link
                  to="/"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-sm
                    font-semibold
                    transition-all
                    shadow-md
                    shadow-blue-100
                  "
                >
                  <FaArrowLeft />
                  Back Home
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* =================================================
          BACK TO TOP
      ================================================= */}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`
          fixed
          right-5
          bottom-24
          sm:bottom-7
          z-50
          w-12
          h-12
          rounded-full
          bg-gradient-to-br
          from-blue-600
          to-cyan-500
          text-white
          flex
          items-center
          justify-center
          shadow-xl
          shadow-blue-200
          hover:-translate-y-1
          transition-all
          duration-300
          ${showTopButton
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
          }
        `}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default StaticPage;