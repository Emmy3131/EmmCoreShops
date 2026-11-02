import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../library/api";
import Button from "../../component/UI/Button";

const ResetPassword = () => {

  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (password !== passwordConfirm) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {

      setLoading(true);

      const res = await api.patch(
        `/users/resetPassword/${token}`,
        {
          password,
          passwordConfirm,
        }
      );

      if (res.data.status !== "success") {
        throw new Error(
          res.data.message ||
          "Password reset failed"
        );
      }

      toast.success(
        "Password reset successfully 🎉"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
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
            shadow-[var(--shadow-primary)]
            mb-4
          "
        >
          <FaLock />
        </div>

        <h1 className="text-3xl font-bold">
          Create New Password
        </h1>

        <p className="text-[var(--color-text-muted)] mt-2">
          Choose a strong password for your account.
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
          onSubmit={handleResetPassword}
          className="space-y-5"
        >

          {/* PASSWORD */}

          <div className="relative">

            <label className="block text-sm font-semibold mb-2">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="auth-input pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="
                absolute
                right-4
                bottom-4
                text-[var(--color-text-muted)]
              "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) =>
                setPasswordConfirm(e.target.value)
              }
              required
              placeholder="Confirm new password"
              className="auth-input pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="
                absolute
                right-4
                bottom-4
                text-[var(--color-text-muted)]
              "
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </Button>

        </form>

        <div className="text-center mt-7">

          <Link
            to="/login"
            className="
              text-sm
              font-semibold
              text-[var(--color-primary)]
              hover:text-[var(--color-accent-dark)]
            "
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>

  );
};

export default ResetPassword;