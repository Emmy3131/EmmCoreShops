import SectionHeader from "./SectionHeader";
import ProductGrid from "./ProductGrid";

const ProductSection = ({
  title,
  eyebrow = "Featured for you",
  subtitle,
  products = [],
  loading = false,
  viewAllLink = "/products",
  emptyMessage,
}) => {
  return (
    <section className="px-3 sm:px-5 lg:px-8 py-8">

      {/* SECTION HEADER */}

      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        viewAllLink={viewAllLink}
      />

      {/* PRODUCT GRID */}

      <ProductGrid
        products={products}
        loading={loading}
        emptyMessage={
          emptyMessage ||
          `No ${title.toLowerCase()} available right now.`
        }
      />

    </section>
  );
};

export default ProductSection;