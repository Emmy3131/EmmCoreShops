import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import UserLayout from "./Layout/UserLayout";
import VendorLayout from "./Layout/VendorLayout";
import AdminLayout from "./Layout/AdminLayout";

/* PUBLIC PAGES */
import Home from "./pages/public/Home";
import Cart from "./pages/public/Cart";
import Deals from "./pages/public/Deal";
import Menu from "./pages/public/Menu";

/* AUTH */
import Login from "./pages/Auth/Login";

/* USER */
import Dashboard from "./pages/User/Dashboard";

/* VENDOR */
import VendorDashboard from "./pages/Vendor/VendorDashboard";

/* ADMIN */
import AdminDashboard from "./pages/Admin/AdminDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* USER */}
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>

        {/* VENDOR */}
        <Route element={<VendorLayout />}>
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;