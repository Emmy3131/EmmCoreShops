import {
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaGlobeAfrica,
  FaCity,
} from "react-icons/fa";

const AddressForm = ({ address, onChange, saveAddress, setSaveAddress }) => {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-blue-100
            text-blue-600
            flex
            items-center
            justify-center
          "
        >
          <FaMapMarkerAlt />
        </div>

        <div>
          <h2 className="text-xl font-bold">New Delivery Address</h2>

          <p className="text-sm text-gray-500">Enter a new shipping address.</p>
        </div>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}

        <div className="md:col-span-2">
          <label className="auth-label">Full Name</label>

          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={onChange}
              placeholder="Full Name"
              className="auth-input pl-11"
            />
          </div>
        </div>

        {/* Phone */}

        <div>
          <label className="auth-label">Phone Number</label>

          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={onChange}
              placeholder="08012345678"
              className="auth-input pl-11"
            />
          </div>
        </div>

        {/* Country */}

        <div>
          <label className="auth-label">Country</label>

          <div className="relative">
            <FaGlobeAfrica className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="country"
              value={address.country}
              onChange={onChange}
              placeholder="Nigeria"
              className="auth-input pl-11"
            />
          </div>
        </div>

        {/* State */}

        <div>
          <label className="auth-label">State</label>

          <input
            type="text"
            name="state"
            value={address.state}
            onChange={onChange}
            placeholder="Rivers"
            className="auth-input"
          />
        </div>

        {/* City */}

        <div>
          <label className="auth-label">City</label>

          <div className="relative">
            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={onChange}
              placeholder="Port Harcourt"
              className="auth-input pl-11"
            />
          </div>
        </div>

        {/* Postal Code */}

        <div>
          <label className="auth-label">Postal Code</label>

          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={onChange}
            placeholder="500001"
            className="auth-input"
          />
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label className="auth-label">Delivery Address</label>

          <textarea
            rows="4"
            name="address"
            value={address.address}
            onChange={onChange}
            placeholder="House number, street name, landmark..."
            className="auth-input resize-none"
          />
        </div>
      </div>

      {/* Save */}

      <div className="mt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />

          <span className="text-sm font-medium">
            Save this address for future orders
          </span>
        </label>
      </div>
    </div>
  );
};

export default AddressForm;
