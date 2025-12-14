import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const LoginPage = () => {
  const loading = false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
  };

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
            Login
          </h2>
          <p className="mt-2 text-xs tracking-widest uppercase text-gray-500">
            Welcome back
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
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 text-sm
            text-black placeholder-gray-400 bg-transparent
            focus:outline-none focus:border-black"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
