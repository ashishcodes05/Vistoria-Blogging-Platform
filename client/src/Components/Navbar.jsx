import React, { use, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import Login from "./Login";
import { useAppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, axios } = useAppContext();
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("token") ? false : true
  );
  return (
    <div className="sticky top-0 bg-white flex justify-between items-center py-2 sm:py-5 max-8 px-8 sm:px-16 mx-auto z-5">
      <div
        onClick={() => navigate("/")}
        className="logo-container flex items-center gap-2 cursor-pointer"
      >
        <img src="/logo.png" alt="Logo" className="w-8 sm:w-10" />
        <h1 className="sm:text-xl lg:text-2xl font-bold text-[#1770FF]">Vistoria</h1>
      </div>
      <div className="flex items-center max-sm:text-sm gap-2 sm:gap-4">
        
        {token ? (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-primary px-4 py-1 rounded-full hover:scale-105 transition-colors duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-gear"></i><span className="hidden sm:inline-block">Admin Panel</span>
            </button>
            <button
              onClick={() => {
                MySwal.fire({
                  title: "Are you sure?",
                  text: "You will be logged out from the admin panel.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, logout!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setToken(null);
                    localStorage.removeItem("token");
                    axios.defaults.headers.common["Authorization"] = "";
                    navigate("/");
                  }
                });
              }}
              className="flex items-center gap-1 sm:gap-2 bg-[#1770FF] text-white px-2 sm:px-4 py-1 rounded-lg hover:bg-[#145bbf] transition-all duration-300 cursor-pointer"
            >
              Logout
              <img src={assets.arrow} alt="Search" className="w-3" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsOpen((prevState) => !prevState)}
            className="flex items-center gap-2  text-primary px-4 py-1 rounded-full hover:scale-105 transition-colors duration-300 cursor-pointer"
          >
            Admin Login
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        )}
      </div>

      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
