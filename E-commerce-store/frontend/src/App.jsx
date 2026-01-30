import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import CategoryPage from "./pages/CategoryPage"

import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import CartPage from "./pages/CartPage"
import { useCartStore } from "./stores/useCartStore"


function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }

  }, [getCartItems, user]);

  if (checkingAuth) {
    return <LoadingSpinner />
  }
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background gradient */}

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to="/" />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/secret-dashboard' element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App 
