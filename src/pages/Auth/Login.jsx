import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const res = await api.post("/users/login", formData);
    console.log("Login response:", res.data); // Debugging log

    const token = res.data.token; // ✅ FIXED
    const user = res.data.data; // ✅ FIXED
    console.log("Decoded user:", user); // Debugging log

    if (!token || !user) {
      setError("Login failed");
      return;
    }

    // ✅ Save to Context + localStorage
    login(user, token);

    /* ================= REDIRECT ================= */

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } 
    else if (user.role === "vendor") {
      navigate("/vendor/dashboard");
    } 
    else {
      navigate("/");
    }

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message ||
      "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold py-5 border-b">
          Login
        </h2>

        <div className="p-6">
          {/* ERROR */}
          {error && (
            <p className="bg-red-100 text-red-600 p-2 mb-4 text-sm rounded">
              {error}
            </p>
          )}

          {/* SOCIAL */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 border rounded-md py-2 flex items-center justify-center gap-2">
              <FaGoogle className="text-red-500" />
              Google
            </button>

            <button className="flex-1 border rounded-md py-2 flex items-center justify-center gap-2">
              <FaApple />
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1" />
            <span className="text-sm text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm">Email</label>

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full border rounded-md px-3 py-3 mt-1"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between text-sm">
                <label>Password</label>
                <button  type="button" className="text-[#ED017F]" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full border rounded-md px-3 py-3 mt-1"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 text-center p-6 rounded-b-lg">
          <p className="text-sm text-gray-500 mb-3">Don't have an Account?</p>

          <Link
            to="/signup"
            className="block bg-[#ED017F] text-white py-2 rounded-md font-semibold"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
