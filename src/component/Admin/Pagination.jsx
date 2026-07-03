import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-2xl shadow-sm">

      {/* Left Controls */}
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border disabled:opacity-40"
      >
        <FaChevronLeft />
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2 flex-wrap justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              currentPage === page
                ? "bg-pink-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border disabled:opacity-40"
      >
        Next
        <FaChevronRight />
      </button>

    </div>
  );
};

export default Pagination;