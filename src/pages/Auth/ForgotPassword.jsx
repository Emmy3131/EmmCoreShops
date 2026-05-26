import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../library/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= SEND EMAIL =================
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", { email });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setSuccess("✅ Password reset instructions sent to your email");

      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive password reset instructions.
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Remember password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
