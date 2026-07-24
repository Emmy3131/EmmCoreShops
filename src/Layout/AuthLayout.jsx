import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";

const AuthLayout = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ================= TOP NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-primary)]
              transition
            "
          >
            <FaArrowLeft />
            <span className="hidden sm:block">Back to Store</span>
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="
              text-2xl
              sm:text-3xl
              font-extrabold
              tracking-tight
              bg-gradient-to-r
              from-[var(--color-primary)]
              to-[var(--color-accent)]
              bg-clip-text
              text-transparent
            "
          >
            EmmCore<span>Shops</span>
          </Link>

          {/* SECURITY BADGE */}
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <FaShieldAlt className="text-[var(--color-success)]" />
            <span className="hidden sm:block">Secure</span>
          </div>

        </div>

      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="pt-24 min-h-screen">

        <div className="max-w-7xl mx-auto min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-10">

          <div className="w-full max-w-md">

            <Outlet />

          </div>

        </div>

      </main>

    </div>
  );
};

export default AuthLayout;