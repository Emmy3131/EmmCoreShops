import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";


const ProductDetailsCard = ({
  product,
  onAddToCart,
  loading,
  onReviewClick,
}) => {


  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={
          i < Math.round(rating)
            ? "text-yellow-400"
            : "text-gray-300"
        }
      />
    ));


  return (
    <div className="
      max-w-6xl 
      mx-auto 
      bg-white 
      rounded-3xl 
      shadow-xl 
      overflow-hidden 
      grid 
      md:grid-cols-2
    ">


      {/* ================= IMAGE SECTION ================= */}

      <div className="
        relative
        bg-gradient-to-br 
        from-gray-50 
        to-gray-100
        flex
        items-center
        justify-center
        p-8
      ">


        {/* Wishlist */}

        <button
          className="
          absolute
          top-6
          right-6
          bg-white
          shadow-md
          p-3
          rounded-full
          hover:bg-[#ED017F]
          hover:text-white
          transition
          "
        >
          <FaHeart />
        </button>



        <img
          src={product?.image}
          alt={product?.name}
          className="
          w-full
          max-h-[430px]
          object-contain
          transition
          duration-500
          hover:scale-105
          "
        />


      </div>

      {/* ================= DETAILS SECTION ================= */}

      <div className="
        p-6
        md:p-10
        space-y-6
      ">


        {/* CATEGORY */}

        <span
          className="
          inline-block
          text-xs
          bg-pink-100
          text-[#ED017F]
          px-4
          py-2
          rounded-full
          font-medium
          "
        >
          {product?.category?.name || "General"}
        </span>

        {/* TITLE */}

        <h1
          className="
          text-3xl
          md:text-4xl
          font-extrabold
          text-gray-900
          "
        >
          {product?.name}
        </h1>

        {/* CLICKABLE RATING */}

        <button
          onClick={onReviewClick}
          className="
          flex
          items-center
          gap-3
          group
          cursor-pointer
          "
        >

          <div className="
            flex
            gap-1
            text-lg
          ">
            {renderStars(
              product?.ratingsAverage || 0
            )}
          </div>


          <span
            className="
            text-sm
            text-gray-500
            group-hover:text-[#ED017F]
            transition
            "
          >

            (
            {product?.ratingsQuantity || 0}
            {" "}
            reviews
            )

          </span>


        </button>

        {/* PRICE + STOCK */}

        <div
          className="
          bg-gray-50
          rounded-2xl
          p-5
          flex
          justify-between
          items-center
          "
        >

          <div>

            <p
              className="
              text-3xl
              font-bold
              text-[#ED017F]
              "
            >
              ₦
              {product?.price?.toLocaleString()}
            </p>


            <p
              className="
              text-sm
              text-gray-400
              line-through
              "
            >
              ₦
              {
                (
                  product?.price * 1.2
                )
                  ?.toLocaleString()
              }
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Availability
            </p>


            <p
              className={
                product?.stock > 0
                  ?
                  "text-green-600 font-semibold"
                  :
                  "text-red-500 font-semibold"
              }
            >

              {
                product?.stock > 0
                  ?
                  "In Stock"
                  :
                  "Out of Stock"
              }

            </p>


          </div>


        </div>

        {/* DESCRIPTION */}

        <p
          className="
          text-gray-600
          leading-7
          "
        >
          {product?.description}
        </p>

        {/* ACTION BUTTONS */}

        <div
          className="
          flex
          gap-4
          "
        >

          <button
            onClick={onAddToCart}
            disabled={loading}
            className="
            flex-1
            bg-[#ED017F]
            hover:bg-pink-700
            text-white
            py-4
            rounded-2xl
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition
            shadow-md
            "
          >

            <FaShoppingCart />

            {
              loading
                ?
                "Adding..."
                :
                "Add to Cart"
            }


          </button>

          <button
            className="
            px-5
            border
            rounded-2xl
            hover:bg-gray-100
            transition
            "
          >

            <FaHeart />

          </button>


        </div>

        {/* SERVICE FEATURES */}

        <div
          className="
          grid
          grid-cols-3
          gap-3
          pt-5
          border-t
          "
        >

          <div className="
          text-xs
          text-gray-500
          flex
          flex-col
          items-center
          gap-2
          ">
            <FaTruck className="text-[#ED017F]" />
            Fast Delivery
          </div>



          <div className="
          text-xs
          text-gray-500
          flex
          flex-col
          items-center
          gap-2
          ">
            <FaShieldAlt className="text-[#ED017F]" />
            Secure Payment
          </div>



          <div className="
          text-xs
          text-gray-500
          flex
          flex-col
          items-center
          gap-2
          ">
            <FaUndo className="text-[#ED017F]" />
            Easy Return
          </div>



        </div>


      </div>


    </div>
  );
};


export default ProductDetailsCard;