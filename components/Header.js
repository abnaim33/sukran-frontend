import React, { useContext, useState } from 'react'

import Link from 'next/link';

import { Bars3Icon, BeakerIcon, ShoppingBagIcon, ShoppingCartIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { CartContext } from './CartContext';
import { useSession } from "next-auth/react"




const Header = () => {
  const { data: session, status } = useSession()


const {cartProducts}=useContext(CartContext)

    const [mobileNav,setMobileNav]=useState(false)
  return (
    <header className={`fixed top-0 w-full mb-10 h-auto bg-black flex items-center flex-wrap justify-between text-white px-10 py-5 sm:py-1 transition`}>

   
       <Link href="/">
        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1683536005/Black_Gold_Luxury_and_Vintage_Decorative_Ornamental_Premium_Brand_Logo-01_i9ugxu.jpg"
        className='sm:w-[100px] w-[50px] h-[50px]'/>
        </Link> 
        <div className='w-3/5 flex justify-end md:hidden'>
          <Link href="/cart">

            <ShoppingBagIcon className='w-7 h-7'></ShoppingBagIcon>
            <span className='relative bottom-10 left-2 bg-gray-700 px-2 rounded-full'>{cartProducts.length}</span>
          </Link>
            {
                mobileNav?
                <XMarkIcon className='h-7 w-7 bg-white text-black rounded-full ml-10 cursor-pointer' onClick={()=>setMobileNav(!mobileNav)}/>
                :
            <Bars3Icon className='w-7 h-7 cursor-pointer ml-10' onClick={()=>setMobileNav(!mobileNav)}>link 01</Bars3Icon>
            }
         
        </div>

{
    mobileNav ?
    <div className=' flex justify-between items-center w-full mt-8 md:hidden text-sm'>
            <Link href="/">Home</Link>
            {/* <Link href="/products">All Products</Link> */}
            <Link href="/categories">Categories</Link>
            <Link href={"/profile"}>{session?.user?"Profile":"Sign In"}</Link>
            
        </div>:""
}

        <div className='w-2/5 md:flex justify-between hidden'>
            <Link href="/">Home</Link>
            {/* <Link href="/products">All Products</Link> */}
            <Link href="/categories">Categories</Link>
            <Link href={"/profile"}>{session?.user?"Profile":"Sign In"}</Link>
            
            <Link href="/cart" className='flex items-center'><ShoppingCartIcon className='w-6 h-6'/> <span>({cartProducts.length})</span> </Link>
        </div>
    
    </header>
  )
}

export default Header