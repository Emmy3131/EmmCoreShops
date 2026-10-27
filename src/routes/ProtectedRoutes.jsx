
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  const role = String(user.role || "").toLowerCase();

  // Determine which area the current URL belongs to.
  const isAdminPath = location.pathname.startsWith("/admin");
  const isVendorPath = location.pathname.startsWith("/vendor");
  const isUserPath =
    location.pathname.startsWith("/user") ||
    ["/wishlist", "/sell", "/profile", "/checkout", "/payment-success", "/withdrawal"].includes(
      location.pathname
    );

  if (isAdminPath && role !== "admin") {
    if (role === "vendor") {
      return <Navigate to="/vendor/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  if (isVendorPath && role !== "vendor") {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  if (isUserPath && role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isUserPath && role === "vendor") {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
