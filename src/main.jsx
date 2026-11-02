import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./AppRouter.jsx";

import "./App.css";
import "./Styles/DesignUi.css";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/CartCountContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRouter />

        {/* GLOBAL TOAST NOTIFICATIONS */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);