import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../library/api";

const PreviewPage = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/pages/slug/${slug}`);

        setPage(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [slug]);

  if (!page)
    return (
      <div
        className="
p-10
text-center
"
      >
        Loading preview...
      </div>
    );

  return (
    <div
      className="
min-h-screen
bg-gray-100
p-5
"
    >
      <div
        className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-8
"
      >
        <div
          className="
bg-yellow-100
text-yellow-700
px-4
py-3
rounded-xl
mb-6
font-semibold
"
        >
          Preview Mode - Not Public
        </div>

        <h1
          className="
text-4xl
font-bold
mb-6
"
        >
          {page.title}
        </h1>

        <div
          className="
prose
max-w-none
"
          dangerouslySetInnerHTML={{
            __html: page.content,
          }}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
