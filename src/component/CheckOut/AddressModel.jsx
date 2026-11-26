
import { useState } from "react";
import {
    FaTimes,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
    FaCity,
    FaGlobeAfrica,
    FaCheck,
} from "react-icons/fa";

const initialAddress = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
    isDefault: false,
};

const AddressModal = ({ onClose, onSave, saving = false }) => {
    const [address, setAddress] = useState(initialAddress);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setAddress((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requiredFields = [
            "fullName",
            "phone",
            "address",
            "city",
            "state",
            "country",
        ];

        const isValid = requiredFields.every((field) =>
            address[field]?.trim()
        );

        if (!isValid) {
            setError("Please complete all required delivery details.");
            return;
        }

        try {
            await onSave(address);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to save this address. Please try again."
            );
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

    const labelClass =
        "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600";

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="address-modal-title"
                className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Modal header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <FaMapMarkerAlt />
                        </div>

                        <div>
                            <h2
                                id="address-modal-title"
                                className="text-lg font-bold text-slate-900"
                            >
                                Add delivery address
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Where should we deliver your order?
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        aria-label="Close address form"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                            Contact information
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Full name *</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="fullName"
                                        value={address.fullName}
                                        onChange={handleChange}
                                        placeholder="Recipient's full name"
                                        className={`${inputClass} pl-10`}
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Phone number *</label>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="phone"
                                        value={address.phone}
                                        onChange={handleChange}
                                        placeholder="080XXXXXXXX"
                                        className={`${inputClass} pl-10`}
                                        type="tel"
                                        autoComplete="tel"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                            Delivery location
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Street address *</label>
                                <textarea
                                    name="address"
                                    value={address.address}
                                    onChange={handleChange}
                                    placeholder="House number, street, landmark..."
                                    className={`${inputClass} min-h-[90px] resize-y`}
                                    autoComplete="street-address"
                                    required
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>City *</label>
                                    <div className="relative">
                                        <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            name="city"
                                            value={address.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className={`${inputClass} pl-10`}
                                            autoComplete="address-level2"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>State *</label>
                                    <input
                                        name="state"
                                        value={address.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className={inputClass}
                                        autoComplete="address-level1"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Country *</label>
                                    <div className="relative">
                                        <FaGlobeAfrica className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            name="country"
                                            value={address.country}
                                            onChange={handleChange}
                                            className={`${inputClass} pl-10`}
                                            autoComplete="country-name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Postal code</label>
                                    <input
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleChange}
                                        placeholder="Optional"
                                        className={inputClass}
                                        autoComplete="postal-code"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={address.isDefault}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 accent-blue-600"
                        />

                        <span>
                            <span className="block text-sm font-semibold text-slate-800">
                                Set as my default address
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                                Use this address for future orders.
                            </span>
                        </span>
                    </label>

                    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <FaCheck />
                            {saving ? "Saving address..." : "Save address"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
