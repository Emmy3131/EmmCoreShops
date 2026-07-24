import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../library/api";
import Button from "../../component/UI/Button";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/users/forgotPassword",
        { email }
      );

      if (res.data.status !== "success") {
        throw new Error(
          res.data.message ||
          "Failed to send reset email"
        );
      }

      toast.success(
        "Password reset instructions sent to your email 📧"
      );

      setEmail("");

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
          <FaEnvelope />
        </div>

        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Forgot Password?
        </h1>

        <p className="text-[var(--color-text-muted)] mt-2">
          No worries. Enter your email and we'll send you reset instructions.
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
          onSubmit={handleForgotPassword}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--color-text-light)]
                "
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full
                  pl-11
                  px-4
                  py-3
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-background)]
                  outline-none
                  focus:border-[var(--color-primary)]
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

            </div>

          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Sending Instructions..."
              : "Send Reset Instructions"}
          </Button>

        </form>

        <div className="text-center mt-7">

          <Link
            to="/login"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[var(--color-primary)]
              hover:text-[var(--color-accent-dark)]
            "
          >
            <FaArrowLeft />
            Back to Login
          </Link>

        </div>

      </div>

    </div>

  );
};

export default ForgotPassword;