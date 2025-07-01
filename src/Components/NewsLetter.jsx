import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold text-primary'>Stay in the Loop!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blogs, updates and news.</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input type="email" className='border border-gray-400 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' placeholder="Enter your email" required />
        <button className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none' type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
