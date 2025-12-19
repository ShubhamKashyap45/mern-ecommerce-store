import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from"./pages/AdminPage"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"


function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(checkingAuth){
    return <LoadingSpinner />
  }
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background gradient */}

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to="/" /> } />
          <Route path='/login' element={!user ?<LoginPage /> : <Navigate to="/" />} />
          <Route path='/secret-dashboard' element={user?.role === 'admin' ?<AdminPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App 
