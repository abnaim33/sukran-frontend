import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='min-w-full p-4 flex items-center justify-between bg-gray-200'>
       <h1 className='text-xl flex items-center '>{`Sukran `} <span className='ml-3 text-sm hidden sm:block'>Luxury gift corner</span></h1>
       <h1 className='text-sm sm:text-base'>
       all right reserved
       </h1>

       <Link target='_blank' href="https://www.facebook.com/SukraNgiftcorner/">
       <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1684332324/Facebook-logo-blue-circle-large-transparent-png_fepukl.png" className='w-[40px] h-[40px]'/>
       </Link>
    </footer>
  )
}

export default Footer