import { useState } from "react";
import { FaGoogle, FaApple, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../library/api";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../component/UI/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    try {
      setLoading(true);

      const res = await api.post("/users/login", formData);

      const token = res.data.token;
      const user = res.data.data;

      if (!token || !user) {
        toast.error("Login failed. Please try again.");
        return;
      }

      login(user, token);

      toast.success("Welcome back 👋");

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "vendor") {
          navigate("/vendor/dashboard");
        } else {
          navigate("/");
        }
      }, 700);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* ================= BRAND HEADER ================= */}

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

        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[var(--color-text-muted)]">
          Login to continue shopping with EmmCoreShops
        </p>

      </div>

      {/* ================= CARD ================= */}

      <div
        className="
          bg-[var(--color-surface)]
          border
          border-[var(--color-border)]
          rounded-[var(--radius-xl)]
          p-6
          sm:p-8
          shadow-[var(--shadow-lg)]
        "
      >

        {/* SOCIAL LOGIN */}

        <div className="grid grid-cols-2 gap-3 mb-6">

          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2
              border
              border-[var(--color-border)]
              rounded-[var(--radius-md)]
              py-3
              text-sm
              font-medium
              text-[var(--color-text-secondary)]
              hover:bg-[var(--color-surface-hover)]
              transition
            "
          >
            <FaGoogle className="text-red-500" />
            Google
          </button>

          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2
              border
              border-[var(--color-border)]
              rounded-[var(--radius-md)]
              py-3
              text-sm
              font-medium
              text-[var(--color-text-secondary)]
              hover:bg-[var(--color-surface-hover)]
              transition
            "
          >
            <FaApple />
            Apple
          </button>

        </div>

        {/* DIVIDER */}

        <div className="flex items-center gap-3 mb-6">

          <div className="h-px bg-[var(--color-border)] flex-1" />

          <span className="text-xs text-[var(--color-text-light)]">
            OR CONTINUE WITH EMAIL
          </span>

          <div className="h-px bg-[var(--color-border)] flex-1" />

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="
                w-full
                px-4
                py-3
                rounded-[var(--radius-md)]
                border
                border-[var(--color-border)]
                bg-[var(--color-background)]
                text-[var(--color-text-primary)]
                outline-none
                transition
                focus:border-[var(--color-primary)]
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold text-[var(--color-text-primary)]">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-semibold
                  text-[var(--color-primary)]
                  hover:text-[var(--color-accent-dark)]
                "
              >
                Forgot Password?
              </Link>

            </div>

            <div className="relative">

              <FaLock
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--color-text-light)]
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-background)]
                  outline-none
                  transition
                  focus:border-[var(--color-primary)]
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--color-text-muted)]
                  hover:text-[var(--color-primary)]
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* BUTTON */}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login to Account"}
          </Button>

        </form>

        {/* FOOTER */}

        <div className="text-center mt-7">

          <p className="text-sm text-[var(--color-text-muted)]">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="
                font-bold
                text-[var(--color-primary)]
                hover:text-[var(--color-accent-dark)]
              "
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;