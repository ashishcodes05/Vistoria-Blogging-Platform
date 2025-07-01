import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className='bg-[#F9FAFB] min-h-screen relative'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
