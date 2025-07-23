import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='min-h-screen relative'>
      <Toaster position='top-center'/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
