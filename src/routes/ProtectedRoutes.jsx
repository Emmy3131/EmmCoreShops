import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  // 🚨 IMPORTANT: block route evaluation until auth is ready
  if (loading) return null;

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // role protection
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;