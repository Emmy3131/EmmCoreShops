import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../library/api";

const Signup = () => {
  const navigate = useNavigate();

  /* ===============================
        STATES
  =============================== */
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

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

  /* ===============================
        HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
        FORM VALIDATION
  =============================== */
  const validateForm = () => {
    if (!formData.firstName.trim())
      return "First name is required";

    if (!formData.lastName.trim())
      return "Last name is required";

    if (!formData.email.trim())
      return "Email is required";

    if (!formData.dateOfBirth)
      return "Date of birth is required";

    if (!formData.gender)
      return "Gender is required";

    if (!formData.country.trim())
      return "Country is required";

    if (!formData.address.trim())
      return "Address is required";

    if (!formData.password)
      return "Password is required";

    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    if (formData.password !== formData.passwordConfirm)
      return "Passwords do not match";

    if (!agree)
      return "You must agree to Terms & Policy";

    return null;
  };

  /* ===============================
        SUBMIT HANDLER
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);

      /* Normalize Data For Backend */
      const payload = {
        ...formData,
        gender: formData.gender.toLowerCase(),
      };

      console.log("Sending:", payload);

      const res = await api.post(
        "/users/signup",
        payload
      );

      if (res.data?.status === "success") {
        alert("Account created successfully ✅");

        navigate("/login");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
        UI
  =============================== */
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="input"
          />

          {/* GENDER */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="input"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="input"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />

          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input"
          />

          {/* AGREEMENT */}
          <div className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="accent-[#ED017F]"
            />

            <p className="text-gray-600">
              I agree to{" "}
              <Link to="/terms" className="text-[#ED017F]">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/privacy" className="text-[#ED017F]">
                Privacy Policy
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !agree}
            className={`w-full text-white py-3 rounded-md font-semibold transition
            ${
              agree
                ? "bg-[#33B27B] hover:opacity-90"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <Link
          to="/login"
          className="block text-center mt-6 bg-[#ED017F] text-white py-3 rounded-md font-semibold"
        >
          Login Instead
        </Link>

      </div>
    </div>
  );
};

export default Signup;