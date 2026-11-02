import {
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
    FaGlobeAfrica,
    FaCity,
    FaMapPin,
    FaCheckCircle,
} from "react-icons/fa";

const AddressForm = ({
    address,
    onChange,
    saveAddress,
    setSaveAddress,
}) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            {/* ================= HEADER ================= */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-2xl" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Delivery Address
                        </h2>

                        <p className="text-blue-100 text-sm mt-1">
                            Enter where you want your order delivered.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= FORM ================= */}

            <div className="p-7">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* FULL NAME */}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Full Name
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                            <input
                                type="text"
                                name="fullName"
                                value={address.fullName}
                                onChange={onChange}
                                placeholder="John Doe"
                                className="auth-input pl-12"
                            />
                        </div>
                    </div>

                    {/* PHONE */}

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Phone Number
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                            <input
                                type="tel"
                                name="phone"
                                value={address.phone}
                                onChange={onChange}
                                placeholder="08012345678"
                                className="auth-input pl-12"
                            />
                        </div>
                    </div>

                    {/* COUNTRY */}

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Country
                        </label>

                        <div className="relative">
                            <FaGlobeAfrica className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                            <input
                                type="text"
                                name="country"
                                value={address.country}
                                onChange={onChange}
                                placeholder="Nigeria"
                                className="auth-input pl-12"
                            />
                        </div>
                    </div>

                    {/* STATE */}

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            State
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={onChange}
                                placeholder="Lagos"
                                className="auth-input pl-12"
                            />
                        </div>
                    </div>

                    {/* CITY */}

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            City
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={onChange}
                                placeholder="Ikeja"
                                className="auth-input pl-12"
                            />
                        </div>
                    </div>

                    {/* POSTAL */}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Postal Code
                        </label>

                        <input
                            type="text"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={onChange}
                            placeholder="100001"
                            className="auth-input"
                        />
                    </div>

                    {/* ADDRESS */}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Delivery Address
                            <span className="text-red-500">*</span>
                        </label>

                        <textarea
                            rows="4"
                            name="address"
                            value={address.address}
                            onChange={onChange}
                            placeholder="House number, street name, nearby landmark..."
                            className="auth-input resize-none"
                        />
                    </div>

                </div>

                {/* ================= OPTIONS ================= */}

                <div className="mt-8 space-y-4">

                    <label className="flex items-center gap-3 cursor-pointer rounded-xl border p-4 hover:bg-blue-50 transition">
                        <input
                            type="checkbox"
                            checked={saveAddress}
                            onChange={(e) =>
                                setSaveAddress(e.target.checked)
                            }
                            className="w-5 h-5 accent-blue-600"
                        />

                        <div>
                            <p className="font-semibold">
                                Save this address
                            </p>

                            <p className="text-sm text-gray-500">
                                Use this address for future orders.
                            </p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-xl border p-4">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={address.isDefault || false}
                            onChange={(e) =>
                                onChange({
                                    target: {
                                        name: "isDefault",
                                        value: e.target.checked,
                                    },
                                })
                            }
                            className="w-5 h-5 accent-green-600"
                        />

                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" />
                                Make Default Address
                            </p>

                            <p className="text-sm text-gray-500">
                                Automatically use this address during checkout.
                            </p>
                        </div>
                    </label>

                </div>

            </div>
        </div>
    );
};

export default AddressForm;