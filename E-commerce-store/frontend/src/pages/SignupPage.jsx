import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const SignupPage = () => {

  const loading = false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Form Submitted", formData);
    
  }

  return (
    <div className="flex flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">

      {/* Heading */}
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-xl font-medium tracking-wide uppercase text-black">
            Create Account
          </h2>
          <p className="mt-2 text-xs tracking-widest uppercase text-gray-500">
            Get started in seconds
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            text-black placeholder-gray-400 bg-transparent
            focus:outline-none focus:border-black"
          />

          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            text-black placeholder-gray-400 bg-transparent
            focus:outline-none focus:border-black"
          />

          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            text-black placeholder-gray-400 bg-transparent
            focus:outline-none focus:border-black"
          />

          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            placeholder="Confirm Password"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            text-black placeholder-gray-400 bg-transparent
            focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full border border-black py-2 text-sm font-medium
            text-black hover:bg-black hover:text-white transition
            disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );


}

export default SignupPage