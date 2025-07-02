import React from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";

const Login = ({isOpen, setIsOpen}) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-7">
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

      {/* Login Form on top of overlay */}
      <div className="relative bg-white p-8 rounded shadow-md w-95 z-10 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded outline-primary focus:border-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded outline-primary focus:border-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsOpen(false)
                navigate("/admin")
              }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
            <button
            onClick={() => setIsOpen(false)}
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Login;
