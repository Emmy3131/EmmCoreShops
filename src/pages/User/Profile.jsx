import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaSave,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useAuth } from "../../Context/AuthContext";
import Button from "../../component/UI/Button";

const Profile = () => {
  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const fullName =
    `${form.firstName} ${form.lastName}`.trim() ||
    "User";

  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">

      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-xl font-bold">

              {initials}

            </div>

            <div>

              <p className="text-blue-100 text-sm">
                Manage your account
              </p>

              <h1 className="text-2xl md:text-3xl font-bold">
                Account Settings
              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-6">

        {/* ================= PROFILE SUMMARY ================= */}

        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-5 md:p-7 shadow-[var(--shadow-sm)]">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-3xl font-bold shadow-[var(--shadow-primary)]">

              {initials}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                {fullName}
              </h2>

              <p className="text-[var(--color-text-muted)] mt-1">
                {form.email || "No email address"}
              </p>

              <div className="flex items-center gap-2 mt-3">

                <span className="w-2 h-2 bg-emerald-500 rounded-full" />

                <span className="text-sm text-emerald-600 font-medium">
                  Active Account
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= PERSONAL INFORMATION ================= */}

        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-5 md:p-7">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

              <FaUser />

            </div>

            <div>

              <h2 className="font-bold text-lg text-[var(--color-text-primary)]">
                Personal Information
              </h2>

              <p className="text-sm text-[var(--color-text-muted)]">
                Update your personal account details
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* FIRST NAME */}

            <div>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                First Name
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* LAST NAME */}

            <div>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                Last Name
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] mb-2">

                <FaEnvelope className="text-blue-500" />

                Email Address

              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] mb-2">

                <FaPhone className="text-blue-500" />

                Phone Number

              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

          </div>

          <div className="flex justify-end mt-6">

            <Button
              variant="gradient"
              icon={<FaSave />}
            >
              Save Changes
            </Button>

          </div>

        </div>

        {/* ================= PASSWORD ================= */}

        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-5 md:p-7">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">

              <FaShieldAlt />

            </div>

            <div>

              <h2 className="font-bold text-lg text-[var(--color-text-primary)]">
                Security & Password
              </h2>

              <p className="text-sm text-[var(--color-text-muted)]">
                Keep your account secure with a strong password
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {/* CURRENT PASSWORD */}

            <div>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--color-border)] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            {/* NEW PASSWORD */}

            <div>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

          </div>

          <div className="flex justify-end mt-6">

            <Button
              variant="outline"
              icon={<FaLock />}
            >
              Update Password
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;