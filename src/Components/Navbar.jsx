import React, { use, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router';
import Login from './Login';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 bg-white flex justify-between items-center py-5 max-8 px-8 sm:px-16 mx-auto z-5">
      <div
        onClick={() => navigate("/")}
        className="logo-container flex items-center gap-2 cursor-pointer"
      >
        <img src="/logo.png" alt="Logo" className="w-8 sm:w-10" />
        <h1 className="text-2xl font-bold text-[#1770FF]">Vistoria</h1>
      </div>
      <button onClick={() => setIsOpen(true)} className='flex items-center gap-2 bg-[#1770FF] text-white px-4 py-2 rounded-lg hover:bg-[#145bbf] transition-colors duration-300 cursor-pointer'>
        Login
        <img src={assets.arrow} alt="Search" className='w-3' />
      </button>
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Navbar
