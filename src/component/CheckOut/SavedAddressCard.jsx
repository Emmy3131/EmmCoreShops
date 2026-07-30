import {
  FaCheckCircle,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const SavedAddressCard = ({
  addresses = [],
  selectedAddress,
  onSelect,
  onDelete,
  onAddNew,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Saved Addresses
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            Choose a delivery address
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-blue-700
            transition
          "
        >
          <FaPlus />
          Add New
        </button>
      </div>

      {/* Empty */}

      {addresses.length === 0 ? (
        <div
          className="
            border-2
            border-dashed
            border-gray-300
            rounded-xl
            py-12
            text-center
          "
        >
          <FaMapMarkerAlt className="mx-auto text-4xl text-gray-300 mb-3" />

          <h3 className="font-semibold text-lg">No saved addresses</h3>

          <p className="text-sm text-gray-500 mt-2">
            Add your first delivery address.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((item) => {
            const selected = selectedAddress?._id === item._id;

            return (
              <div
                key={item._id}
                onClick={() => onSelect(item)}
                className={`
                  relative
                  cursor-pointer
                  rounded-2xl
                  border-2
                  p-5
                  transition-all

                  ${
                    selected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}
              >
                {/* Selected */}

                {selected && (
                  <div className="absolute top-4 right-4 text-blue-600">
                    <FaCheckCircle />
                  </div>
                )}

                {/* Default */}

                {item.isDefault && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-700
                      mb-4
                    "
                  >
                    <FaHome />
                    Default
                  </span>
                )}

                {/* Name */}

                <h3 className="font-bold text-lg">{item.fullName}</h3>

                {/* Phone */}

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <FaPhone />

                  {item.phone}
                </div>

                {/* Address */}

                <div className="flex gap-2 mt-3">
                  <FaMapMarkerAlt className="mt-1 text-blue-600" />

                  <div className="text-sm">
                    <p>{item.address}</p>

                    <p>
                      {item.city}, {item.state}
                    </p>

                    <p>{item.country}</p>
                  </div>
                </div>

                {/* Actions */}

                <div className="flex justify-end mt-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item._id);
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-red-200
                      px-3
                      py-2
                      text-sm
                      text-red-600
                      hover:bg-red-50
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
