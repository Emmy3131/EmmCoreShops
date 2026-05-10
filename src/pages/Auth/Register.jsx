import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Signup = () => {
  const navigate = useNavigate();

  /* ===============================
        STATE
  =================================*/
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ===============================
        INPUT CHANGE
  =================================*/
 
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
        VALIDATION
  =================================*/
  

  /* ===============================
        SUBMIT HANDLER
  =================================*/
  

  /* ===============================
        UI
  =================================*/
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create An Account
      </h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      <form className="space-y-4">

        {/* FIRST NAME */}
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="input"
        />

        {/* LAST NAME */}
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="input"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="input"
        />

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="input"
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="input"
        />

        {/* GENDER */}
        <select
          name="gender"
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="input"
        />

        {/* AGREEMENT */}
        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 accent-[#ED017F]"
          />

          <p className="text-gray-600">
            By clicking submit, you agree to our{" "}
            <Link to="/terms" className="text-[#ED017F]">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#ED017F]">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading || !agree}
          className={`w-full text-white py-3 rounded-md font-semibold transition
            ${
              agree
                ? "bg-[#33B27B] hover:opacity-90"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* LOGIN BUTTON */}
      <Link
        to="/login"
        className="block w-full text-center mt-6 bg-[#ED017F] text-white py-3 rounded-md font-semibold hover:bg-[#b80a64]"
      >
        Login
      </Link>
    </div>
  );
};

export default Signup;