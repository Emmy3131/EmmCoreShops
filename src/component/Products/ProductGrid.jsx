import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading = false,
  emptyMessage = "No products found",
}) => {
  /* =========================================
     LOADING SKELETON
  ========================================= */

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-3
          sm:gap-5
          lg:gap-6
        "
      >
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (!products || products.length === 0) {
    return (
      <div
        className="
          min-h-[300px]
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
      >
        <div
          className="
            w-16
            h-16
            rounded-full
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
            text-2xl
            mb-4
          "
        >
          🛍️
        </div>

        <h3 className="text-lg font-bold text-slate-800">
          No products found
        </h3>

        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          {emptyMessage}
        </p>
      </div>
    );
  }

  /* =========================================
     PRODUCT GRID
  ========================================= */

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-3
        sm:gap-5
        lg:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};


/* =========================================
   PRODUCT SKELETON
========================================= */

const ProductSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        bg-white
        border
        border-slate-200
        rounded-2xl
        animate-pulse
      "
    >
      {/* IMAGE */}

      <div
        className="
          h-48
          sm:h-56
          md:h-64
          bg-slate-200
        "
      />

      {/* CONTENT */}

      <div className="p-4 space-y-3">

        <div className="h-4 w-24 bg-slate-200 rounded" />

        <div className="h-4 w-full bg-slate-200 rounded" />

        <div className="h-4 w-3/4 bg-slate-200 rounded" />

        <div className="h-6 w-32 bg-slate-200 rounded" />

        <div className="h-11 w-full bg-slate-200 rounded-xl" />

      </div>
    </div>
  );
};

export default ProductGrid;