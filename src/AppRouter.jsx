import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import UserLayout from "./Layout/UserLayout";
import VendorLayout from "./Layout/VendorLayout";
import AdminLayout from "./Layout/AdminLayout";

/* PUBLIC */
import Home from "./pages/public/Home";
import Cart from "./pages/public/Cart";
import Deals from "./pages/public/Deal";
// import Menu from "./pages/public/Menu";

/* AUTH */
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";

/* USER */
import MyOrder from "./pages/User/MyOrder";
import MyWallet from "./pages/User/MyWallet";

/* VENDOR */
import VendorDashboard from "./pages/Vendor/VendorDashboard";

/* ADMIN */
import AdminDashboard from "./pages/Admin/AdminDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= MAIN WEBSITE ================= */}
        <Route element={<MainLayout />}>

          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/deals" element={<Deals />} />
          {/* <Route path="/menu" element={<Menu />} /> */}

          {/* ================= USER AREA ================= */}
          <Route element={<UserLayout />}>
            <Route path="/user/orders" element={<MyOrder />} />
            <Route path="/user/wallet" element={<MyWallet />} />
          </Route>

          {/* ================= VENDOR AREA ================= */}
          <Route element={<VendorLayout />}>
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          </Route>

          {/* ================= ADMIN AREA ================= */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

        </Route>

        {/* ================= AUTH PAGES ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;