import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"


function App() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background gradient */}

      <div className="relative z-50 pt-20">
      <Navbar />
      <Routes>
        <Route path='/' element= {<HomePage />} />
        <Route path='/signup' element= {<SignupPage />} />
        <Route path='/login' element= {<LoginPage />} />
      </Routes>

      </div>
    </div>
  )
}

export default App 
