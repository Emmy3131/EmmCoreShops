import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";

import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import UserLayout from "./Layout/UserLayout";
import VendorLayout from "./Layout/VendorLayout";
import AdminLayout from "./Layout/AdminLayout";

/* PUBLIC */
import Home from "./pages/public/Home";
import Cart from "./pages/public/Cart";
import Deals from "./pages/public/Deal";

/* AUTH */
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";

/* USER */
import MyOrder from "./pages/User/MyOrder";
import MyWallet from "./pages/User/MyWallet";
import MySavedItems from "./pages/User/MySavedItems";
import SellOnEmmCoreShopes from "./component/SellOnEmmcore/SellOnEmmCoreShopes";
import Settings from "./pages/User/Settings";

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

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/deals" element={<Deals />} />

          {/* ================= USER AREA ================= */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/user/orders" element={<MyOrder />} />
              <Route path="/user/wallet" element={<MyWallet />} />
              <Route path="/saved" element={<MySavedItems />} />
              <Route path="/sell" element={<SellOnEmmCoreShopes />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* ================= VENDOR AREA ================= */}
          <Route element={<ProtectedRoute />}>
            <Route element={<VendorLayout />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            </Route>
          </Route>

          {/* ================= ADMIN AREA ================= */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>

        </Route>

        {/* ================= AUTH ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;