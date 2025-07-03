import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import 'quill/dist/quill.snow.css'

const App = () => {
  return (
    <div className='min-h-screen relative'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
