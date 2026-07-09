import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../library/api";

const StaticPage = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PAGE ================= */

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
      <div
        className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      "
      >
        <div
          className="
        text-gray-500
        text-lg
        animate-pulse
        "
        >
          Loading page...
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div
        className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-5
      text-center
      "
      >
        <div>
          <h1
            className="
        text-3xl
        font-bold
        text-gray-800
        "
          >
            Page Not Found
          </h1>

          <p
            className="
        text-gray-500
        mt-3
        "
          >
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-gray-50
overflow-hidden
"
    >
      {/* ================= HERO ================= */}

      <section
        className="
relative
mt-14
"
      >
        <div
          className="
relative
h-[280px]
sm:h-[320px]
md:h-[420px]
bg-gradient-to-r
from-[#ED017F]
via-purple-700
to-indigo-900
flex
items-center
justify-center
overflow-hidden
"
        >
          {/* OVERLAY */}

          <div
            className="
absolute
inset-0
bg-black/40
"
          />

          {/* DECORATIONS */}

          <div
            className="
absolute
-top-10
-left-10
w-40
h-40
sm:w-52
sm:h-52
bg-white/10
rounded-full
blur-3xl
"
          />

          <div
            className="
absolute
bottom-0
right-0
w-48
h-48
sm:w-64
sm:h-64
bg-pink-500/20
rounded-full
blur-3xl
"
          />

          {/* TITLE */}

          <div
            className="
relative
z-10
text-center
px-5
max-w-4xl
"
          >
            <p
              className="
uppercase
tracking-widest
text-xs
sm:text-sm
text-white/70
mb-4
"
            >
              {page.section}
            </p>

            <h1
              className="
text-3xl
sm:text-4xl
md:text-6xl
font-extrabold
text-white
leading-tight
"
            >
              {page.title}
            </h1>

            <p
              className="
mt-4
text-sm
sm:text-base
md:text-lg
text-white/80
max-w-2xl
mx-auto
"
            >
              {page.metaDescription ||
                "Learn more about EmmCore and our services."}
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section
        className="
relative
-translate-y-16
sm:-translate-y-20
px-4
sm:px-6
lg:px-10
pb-16
"
      >
        <div
          className="
max-w-6xl
mx-auto
"
        >
          <div
            className="
bg-white
rounded-2xl
sm:rounded-3xl
shadow-xl
border
border-gray-100
p-5
sm:p-8
md:p-12
"
          >
            <div
              className="
prose
prose-sm
sm:prose-base
md:prose-lg
max-w-none

prose-headings:
font-bold

prose-headings:text-gray-900

prose-p:text-gray-700

prose-p:leading-relaxed

prose-li:text-gray-700

prose-a:text-pink-600

prose-img:rounded-xl

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
