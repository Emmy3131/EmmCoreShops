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
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

/* USER */
import MyOrder from "./pages/User/MyOrder";
import MyWallet from "./pages/User/MyWallet";
import MySavedItems from "./pages/User/MySavedItems";
import SellOnEmmCoreShopes from "./component/SellOnEmmcore/SellOnEmmCoreShopes";
import Settings from "./pages/User/Settings";
import Checkout from "./pages/User/CheckOut";
import PaymentSuccess from "./pages/User/PaymentSuccess";
import SearchProducts from "./pages/public/SearchProducts";

/* VENDOR */
import VendorDashboard from "./pages/Vendor/VendorDashboard";

/* ADMIN */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Orders from "./pages/Admin/Orders";
import Products from "./pages/Admin/products/Products";
import AddProduct from "./pages/Admin/products/AddProducts";
import EditProduct from "./pages/Admin/products/EditProduct";
import Category from "./pages/Admin/category/Category";
import AddCategory from "./pages/Admin/category/AddCategory";
import EditCategory from "./pages/Admin/category/EditCategory";
import Reviews from "./pages/Admin/Reviews";
import Payments from "./pages/Admin/Payments";
import Report from "./pages/Admin/Report";
import Profile from "./pages/Admin/Profile";
import Vendors from "./pages/Admin/Vendors";
import NewsletterSub from "./pages/Admin/NewsletterSub";
import AddHeroBanners from "./pages/Admin/HeroBanners/AddHeroBanner";
import HeroBanners from "./pages/Admin/HeroBanners/HeroBanners";

import { useAuth } from "./Context/AuthContext";
import CategoryProducts from "./pages/public/categories/CategoryProduct";

const AppRouter = () => {
 
   const { loading } = useAuth();

  // 🚨 BLOCK ENTIRE ROUTER UNTIL AUTH IS READY
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  return (
   
      <BrowserRouter>
        <Routes>
          {/* ================= MAIN WEBSITE ================= */}
          <Route element={<MainLayout />}>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/search" element={<SearchProducts />} />
            {/* ================= USER AREA ================= */}

            <Route element={<ProtectedRoute />}>
              <Route element={<UserLayout />}>
                <Route path="/user/orders" element={<MyOrder />} />
                <Route path="/user/wallet" element={<MyWallet />} />
                <Route path="/saved" element={<MySavedItems />} />
                <Route path="/sell" element={<SellOnEmmCoreShopes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
              </Route>
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
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/hero-banners" element={<HeroBanners />} />
              <Route path="/admin/hero-banners/add" element={<AddHeroBanners />} />
              <Route path="/admin/newsletter" element={<NewsletterSub />} />
              <Route path="/admin/category/add" element={<AddCategory />} />
              <Route
                path="/admin/category/edit/:id"
                element={<EditCategory />}
              />
              <Route path="/admin/reviews" element={<Reviews />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/report" element={<Report />} />
              <Route path="/admin/vendors" element={<Vendors />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route
                path="/admin/products/edit/:id"
                element={<EditProduct />}
              />
            </Route>
          </Route>

          {/* ================= AUTH ================= */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
   
  );
};

export default AppRouter;
