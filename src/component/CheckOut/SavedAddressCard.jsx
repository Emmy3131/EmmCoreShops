import {
  FaCheckCircle,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaTrash,
  FaLocationArrow,
} from "react-icons/fa";

const SavedAddressCard = ({
  addresses = [],
  selectedAddress,
  onSelect,
  onDelete,
  onAddNew,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>

          <p className="text-sm text-gray-500 mt-1">
            Select where you want your order delivered
          </p>
        </div>

        <button
          type="button"
          onClick={onAddNew}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-5
            py-3
            text-white
            font-semibold
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          <FaPlus />
          Add Address
        </button>
      </div>

      {/* ================= Empty ================= */}

      {addresses.length === 0 ? (
        <div className="py-16 text-center">
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-blue-50
              flex
              items-center
              justify-center
              mx-auto
              mb-6
            "
          >
            <FaMapMarkerAlt className="text-4xl text-blue-500" />
          </div>

          <h3 className="text-xl font-bold text-gray-800">
            No Saved Addresses
          </h3>

          <p className="text-gray-500 mt-3 max-w-sm mx-auto">
            Save delivery addresses to checkout faster on your next purchase.
          </p>

          <button
            onClick={onAddNew}
            className="
              mt-8
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-semibold
              hover:scale-105
              transition
            "
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="p-6 grid gap-5">
          {addresses.map((item) => {
            const selected = selectedAddress?._id === item._id;

            return (
              <div
                key={item._id}
                className={`
                  relative
                  rounded-2xl
                  border-2
                  p-6
                  transition-all
                  duration-300

                  ${
                    selected
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }
                `}
              >
                {/* Selected Badge */}

                {selected && (
                  <div
                    className="
                      absolute
                      top-5
                      right-5
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      text-xs
                      font-semibold
                    "
                  >
                    <FaCheckCircle />
                    Selected
                  </div>
                )}

                {/* Default Badge */}

                {item.isDefault && (
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      mb-5
                    "
                  >
                    <FaHome />
                    Default Address
                  </div>
                )}

                {/* Name */}

                <h3 className="text-xl font-bold text-gray-900">
                  {item.fullName}
                </h3>

                {/* Phone */}

                <div className="flex items-center gap-3 mt-4 text-gray-600">
                  <FaPhone className="text-blue-600" />

                  <span>{item.phone}</span>
                </div>

                {/* Address */}

                <div className="flex gap-3 mt-5">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <div className="text-gray-700 leading-7">
                    <p>{item.address}</p>

                    <p>
                      {item.city}, {item.state}
                    </p>

                    <p>{item.country}</p>

                    {item.postalCode && (
                      <p className="text-gray-500">
                        Postal Code: {item.postalCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer */}

                <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
                  <button
                    type="button"
                    disabled={selected}
                    onClick={() => onSelect(item)}
                    className={`
                      flex
                      items-center
                      gap-2
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      transition

                      ${
                        selected
                          ? "bg-blue-600 text-white cursor-default"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                      }
                    `}
                  >
                    <FaLocationArrow />

                    {selected ? "Delivering Here" : "Deliver Here"}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item._id);
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-5
                      py-3
                      text-red-600
                      font-medium
                      hover:bg-red-100
                      transition
                    "
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedAddressCard;
