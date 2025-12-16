import { ShoppingCart, UserCog, User } from "lucide-react"
import { Link } from 'react-router-dom'
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className='fixed top-0 left-0 w-full z-40 bg-white'>
      <div className='container mx-auto mt-3 flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link
          to={'/'}
          className='text-2xl font-medium tracking-wide text-gray-900 hover:text-gray-700 transition-colors'>
          SHOPIFY
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex justify-center gap-6">

          {/* Home */}
          <Link
            to={"/"}
            className="text-black hover:text-gray-700 transition inline-block border-b-2 border-transparent hover:border-black">
            Home
          </Link>

          {/* About */}
          <Link
            to="/about"
            className="text-black hover:text-gray-700 transition inline-block border-b-2 border-transparent hover:border-black">
            About
          </Link>

          {/* Career */}
          <Link
            to="/career"
            className="text-black hover:text-gray-700 transition inline-block border-b-2 border-transparent hover:border-black">
            Career
          </Link>
        </nav>


        <nav className="flex items-center gap-5">
          {/* Shopping Cart  Icon*/}
          {user && (
            <Link to="/cart"
              className="relative text-black hover:text-gray-700 transition">
              {/* Cart badge above the icon */}
              <span className='absolute -top-2 text-xs font-bold text-white bg-black px-1 rounded-full'>
                3
              </span>
              <ShoppingCart className='w-6 h-6 stroke-current' />
              {/* <span className='text-xs text-gray-600 mt-1'>Cart</span> */}
            </Link>
          )}

          {/* Dashboard - Admin Panel Icon*/}
          {isAdmin && (
            <Link to={"/secret-dashboard"}
              className='flex flex-col items-center text-black hover:text-gray-700 transition'>
              <UserCog className='w-6 h-6 mb-1 stroke-current' />
              {/* <span className='text-xs'>Dashboard</span> */}
            </Link>
          )}

          {/* Logout Button */}
          {user ? (
            <button onClick={logout}
              className="flex items-center cursor-pointer text-black hover:text-gray-700 transition">
              Logout
            </button>
          ) : (
            <>
              {/* Signup/Login Icon */}
              <Link to={"/signup"} className="flex items-center text-black hover:text-gray-700 transition">
                <User className="w-6 h-6 mb-1 stroke-current" />
              </Link>

              {/* <Link to={"/login"} className="flex items-center text-black hover:text-gray-700 transition">
                Login
              </Link> */}
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar
