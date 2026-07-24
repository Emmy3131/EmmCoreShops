import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../library/api";
import Button from "../../component/UI/Button";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });

  /* ================= INPUT ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {

    if (!formData.firstName.trim())
      return "First name is required";

    if (!formData.lastName.trim())
      return "Last name is required";

    if (!formData.email.trim())
      return "Email is required";

    if (!formData.phone.trim())
      return "Phone number is required";

    if (!formData.dateOfBirth)
      return "Date of birth is required";

    if (!formData.gender)
      return "Gender is required";

    if (!formData.country.trim())
      return "Country is required";

    if (!formData.address.trim())
      return "Address is required";

    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    if (formData.password !== formData.passwordConfirm)
      return "Passwords do not match";

    if (!agree)
      return "Please agree to the Terms and Privacy Policy";

    return null;

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      return toast.error(validationError);
    }

    try {

      setLoading(true);

      const payload = {
        ...formData,
        gender: formData.gender.toLowerCase(),
      };

      const res = await api.post(
        "/users/signup",
        payload
      );

      if (res.data?.status === "success") {

        toast.success(
          "Account created successfully 🎉"
        );

        setTimeout(() => {
          navigate("/login");
        }, 800);

      }

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Signup failed. Try again."
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="w-full">

      {/* HEADER */}

      <div className="text-center mb-8">

        <div
          className="
            w-16
            h-16
            mx-auto
            rounded-2xl
            bg-gradient-to-br
            from-[var(--color-primary)]
            to-[var(--color-accent)]
            flex
            items-center
            justify-center
            text-white
            text-2xl
            font-bold
            shadow-[var(--shadow-primary)]
            mb-4
          "
        >
          EC
        </div>

        <h1 className="text-3xl font-bold">
          Create Your Account
        </h1>

        <p className="text-[var(--color-text-muted)] mt-2">
          Join EmmCoreShops and start shopping today.
        </p>

      </div>

      {/* CARD */}

      <div
        className="
          bg-white
          border
          border-[var(--color-border)]
          rounded-[var(--radius-xl)]
          p-6
          sm:p-8
          shadow-[var(--shadow-lg)]
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}

          <div className="grid grid-cols-2 gap-3">

            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="auth-input"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="auth-input"
            />

          </div>

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="auth-input"
          />

          {/* PHONE */}

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="auth-input"
          />

          {/* DATE + GENDER */}

          <div className="grid grid-cols-2 gap-3">

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="auth-input"
              placeholder="DateOfBirth"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="auth-input"
            >

              <option value="">
                Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>

            </select>

          </div>

          {/* COUNTRY */}

          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="auth-input"
          />

          {/* ADDRESS */}

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address"
            rows="3"
            className="auth-input resize-none"
          />

          {/* PASSWORD */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="auth-input pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="auth-input pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* AGREEMENT */}

          <label className="flex gap-3 text-sm text-[var(--color-text-secondary)]">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 accent-blue-600"
            />

            <span>

              I agree to the{" "}

              <Link
                to="/terms"
                className="font-semibold text-[var(--color-primary)]"
              >
                Terms
              </Link>{" "}

              and{" "}

              <Link
                to="/privacy"
                className="font-semibold text-[var(--color-primary)]"
              >
                Privacy Policy
              </Link>

            </span>

          </label>

          {/* BUTTON */}

          <Button
            type="submit"
            disabled={loading || !agree}
            className="w-full"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>

        </form>

        <div className="text-center mt-7">

          <p className="text-sm text-[var(--color-text-muted)]">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-[var(--color-primary)]"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Signup;