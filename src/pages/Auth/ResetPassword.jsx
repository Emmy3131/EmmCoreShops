import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../library/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  // ================= STATE =================
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });

      if (res.data.status !== "success") {
        throw new Error(res.data.message || "Password reset failed");
      }

      setSuccess("Password reset successful ✅ Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className=" flex items-center justify-center  px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="bg-green-100 text-green-600 text-sm p-3 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* NEW PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm mt-6">
          Remember password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
