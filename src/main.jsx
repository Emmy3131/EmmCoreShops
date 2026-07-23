import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import './App.css'
import './Styles/DesignUi.css'
import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/CartCountContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
      <AppRouter />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
