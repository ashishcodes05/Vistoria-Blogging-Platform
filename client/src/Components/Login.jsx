import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = ({isOpen, setIsOpen}) => {
  if(!isOpen) return null; // If isOpen is false, do not render the portal
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: ""
    })
    const { token, setToken, axios } = useAppContext();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post('/api/admin/login', {email: user.email, password: user.password});
          if (data.success) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common['Authorization'] = `${data.token}`;
            setIsOpen(false);
            navigate("/admin");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Login failed. Please check your credentials.");
        }
      }
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-7">
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

      {/* Login Form on top of overlay */}
      <div className="relative bg-white p-8 rounded shadow-md w-95 z-10 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700"><span className="text-primary">Admin</span> Login</h2>
        <p className="text-sm text-center text-gray-600 mb-4">Please enter your credentials to access the admin panel.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded outline-primary focus:border-blue-500"
              type="email"
              id="email"
              placeholder="admin@example.com"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value
                }))
              }
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded outline-primary focus:border-blue-500"
              type="password"
              id="password"
              placeholder="admin123"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value
                }))
              }
              required
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
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
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Login;
