const FeaturedCategories = ({ categories = [] }) => {
  return (
    <div className=" mx-auto py-10 px-4">

      <h2 className="text-2xl font-bold mb-6">
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 mx-auto object-cover mb-4"
              />

              <h3 className="font-semibold">
                {cat.name}
              </h3>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}

      </div>
    </div>
  );
};

export default FeaturedCategories;